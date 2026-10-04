/* js/main.js – Channi Transport */
(function () {
  "use strict";

  /* ── Language ── */
  var lang = "en";
  try { lang = localStorage.getItem("ct_lang") || "en"; } catch (e) {}
  if (!T[lang]) lang = "en";

  function t(key) { return (T[lang] && T[lang][key]) || (T.en[key]) || key; }

  function applyLang() {
    document.documentElement.lang = lang === "hi" ? "hi" : lang === "pa" ? "pa" : "en";
    document.querySelectorAll("[data-i]").forEach(function (el) {
      var key = el.getAttribute("data-i");
      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
        el.placeholder = t(key);
      } else {
        el.textContent = t(key);
      }
    });
    /* select options */
    var selGoods = document.getElementById("goods");
    if (selGoods) {
      selGoods.options[0].text = t("goods_household");
      selGoods.options[1].text = t("goods_shop");
      selGoods.options[2].text = t("goods_construction");
      selGoods.options[3].text = t("goods_other");
    }
    /* lang pill */
    document.querySelectorAll(".lang-pill button").forEach(function (btn) {
      btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
    });
    /* update aria-label on hero canvas */
    var cv = document.getElementById("hero-canvas");
    if (cv) cv.setAttribute("aria-label", t("hero_h1") + " – " + t("hero_tagline"));
    /* update title */
    document.title = t("hero_h1") + " | " + t("hero_tagline");
  }

  document.querySelectorAll(".lang-pill button").forEach(function (btn) {
    btn.addEventListener("click", function () {
      lang = btn.getAttribute("data-lang");
      try { localStorage.setItem("ct_lang", lang); } catch (e) {}
      applyLang();
    });
  });

  /* ── Preloader ── */
  var preloader = document.getElementById("preloader");
  var preFill = document.getElementById("pre-fill");
  var prePct = document.getElementById("pre-pct");
  var loaded = 0;
  var images = [];
  var preloaderDone = false;
  var TIMEOUT_MS = 12000;

  function hidePreloader() {
    if (preloaderDone) return;
    preloaderDone = true;
    preloader.classList.add("hidden");
    /* reveal h1 mask */
    var h1inner = document.querySelector(".cap-h1-inner");
    if (h1inner) {
      requestAnimationFrame(function () {
        h1inner.classList.add("revealed");
      });
    }
  }

  /* timeout fallback */
  var preloaderTimeout = setTimeout(hidePreloader, TIMEOUT_MS);

  function onFrameLoad() {
    loaded++;
    var pct = Math.round((loaded / FRAME_COUNT) * 100);
    if (preFill) preFill.style.width = pct + "%";
    if (prePct) prePct.textContent = pct + "%";
    if (loaded >= FRAME_COUNT) {
      clearTimeout(preloaderTimeout);
      hidePreloader();
    }
  }

  /* preload all hero frames */
  for (var i = 0; i < FRAMES.length; i++) {
    var img = new Image();
    img.src = FRAMES[i];
    img.onload = onFrameLoad;
    img.onerror = onFrameLoad;
    images.push(img);
  }

  /* Preload Supro 24 Frames */
  var suproImages = [];
  var suproLoaded = 0;
  if (typeof SUPRO_FRAMES !== "undefined") {
    for (var k = 0; k < SUPRO_FRAMES.length; k++) {
      var sImg = new Image();
      sImg.src = SUPRO_FRAMES[k];
      sImg.onload = function () {
        suproLoaded++;
        if (typeof renderCard360 === "function") renderCard360();
      };
      sImg.onerror = function () {
        suproLoaded++;
      };
      suproImages.push(sImg);
    }
  }

  /* ── Navbar hide/show on scroll ── */
  var navbar = document.getElementById("navbar");
  var lastScrollY = 0;
  window.addEventListener("scroll", function () {
    var y = window.scrollY;
    if (y > lastScrollY + 4) {
      if (y > 80) navbar.classList.add("hidden");
    } else if (y < lastScrollY - 4) {
      navbar.classList.remove("hidden");
    }
    lastScrollY = y;
  }, { passive: true });

  /* ── Hero scroll-scrubbed canvas ── */
  var canvas = document.getElementById("hero-canvas");
  var ctx = canvas ? canvas.getContext("2d") : null;
  var heroSection = document.getElementById("hero");
  var progressFill = document.querySelector(".hero-progress-fill");
  var curFrame = 0;
  var targetFrame = 0;

  function setCanvasSize() {
    if (!canvas || !ctx) return;
    var DPR = Math.min(window.devicePixelRatio || 1, 2);
    var W = canvas.offsetWidth || window.innerWidth;
    var H = canvas.offsetHeight || window.innerHeight;
    canvas.width = W * DPR;
    canvas.height = H * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    drawFrame(Math.round(curFrame));
  }

  function drawFrame(idx) {
    if (!ctx || !canvas) return;
    idx = Math.max(0, Math.min(FRAME_COUNT - 1, Math.round(idx)));
    var img = images[idx];
    if (!img || !img.complete || !img.naturalWidth) return;
    var W = canvas.offsetWidth || window.innerWidth;
    var H = canvas.offsetHeight || window.innerHeight;
    if (W === 0 || H === 0) return;
    var isLandscape = W > H;
    var scaleX = W / img.naturalWidth;
    var scaleY = H * (isLandscape ? 0.66 : 0.5) / img.naturalHeight;
    var scale = Math.min(scaleX, scaleY);
    var dw = img.naturalWidth * scale;
    var dh = img.naturalHeight * scale;
    var dx = (W - dw) / 2;
    var dy = H * (isLandscape ? 0.10 : 0.12);
    ctx.clearRect(0, 0, W, H);
    ctx.drawImage(img, dx, dy, dw, dh);
  }

  function getScrollProgress() {
    if (!heroSection) return 0;
    var rect = heroSection.getBoundingClientRect();
    var scrolled = -rect.top;
    var maxScroll = heroSection.offsetHeight - window.innerHeight;
    if (maxScroll <= 0) return 0;
    return Math.max(0, Math.min(1, scrolled / maxScroll));
  }

  /* caption visibility */
  var cap0 = document.getElementById("cap0");
  var cap1 = document.getElementById("cap1");
  var cap2 = document.getElementById("cap2");
  var cap3 = document.getElementById("cap3");

  function lerpOpacity(p, inStart, inEnd, outStart, outEnd) {
    var FADE = 0.06;
    if (p < inStart || p > outEnd) return 0;
    if (p < inStart + FADE) return (p - inStart) / FADE;
    if (p > outEnd - FADE) return (outEnd - p) / FADE;
    return 1;
  }

  function updateCaptions(p) {
    if (cap0) {
      var op0 = Math.max(0, 1 - p / 0.12);
      cap0.style.opacity = op0;
      cap0.style.transform = op0 > 0.01 ? "translateY(0)" : "translateY(12px)";
      cap0.style.pointerEvents = op0 < 0.01 ? "none" : "auto";
    }
    function setCapOpacity(el, op) {
      if (!el) return;
      el.style.opacity = op;
      el.style.transform = op > 0.01 ? "translateY(0)" : "translateY(12px)";
      el.style.pointerEvents = op > 0.5 ? "auto" : "none";
    }
    setCapOpacity(cap1, lerpOpacity(p, 0.18, 0.25, 0.35, 0.42));
    setCapOpacity(cap2, lerpOpacity(p, 0.45, 0.52, 0.62, 0.68));
    setCapOpacity(cap3, lerpOpacity(p, 0.72, 0.78, 0.94, 1.00));
  }

  /* rAF loop */
  function animate() {
    curFrame += (targetFrame - curFrame) * 0.14;
    drawFrame(curFrame);
    var p = getScrollProgress();
    if (progressFill) progressFill.style.height = (p * 100) + "%";
    updateCaptions(p);
    requestAnimationFrame(animate);
  }

  window.addEventListener("scroll", function () {
    targetFrame = getScrollProgress() * (FRAME_COUNT - 1);
  }, { passive: true });

  var resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      setCanvasSize();
      if (typeof renderCard360 === "function") renderCard360();
    }, 120);
  });

  /* ── Interactive 360 Card Viewer (Supro 24 Frames • Tilt Phone / Drag Mouse / Touch) ── */
  var cardCanvas = document.getElementById("card-360-canvas");
  var cardCtx = cardCanvas ? cardCanvas.getContext("2d") : null;
  var cardAngle = 0;
  var isDragging = false;
  var startX = 0;
  var angleBadge = document.getElementById("card-360-deg");

  function renderCard360() {
    if (!cardCanvas || !cardCtx) return;
    var DPR = Math.min(window.devicePixelRatio || 1, 2);
    var W = cardCanvas.offsetWidth || 600;
    var H = cardCanvas.offsetHeight || 380;
    if (W === 0 || H === 0) return;

    if (cardCanvas.width !== W * DPR || cardCanvas.height !== H * DPR) {
      cardCanvas.width = W * DPR;
      cardCanvas.height = H * DPR;
    }
    cardCtx.setTransform(DPR, 0, 0, DPR, 0, 0);

    var totalFrames = suproImages.length > 0 ? suproImages.length : FRAME_COUNT;
    var normAngle = ((cardAngle % 360) + 360) % 360;
    var frameIdx = Math.floor((normAngle / 360) * totalFrames);
    frameIdx = Math.max(0, Math.min(totalFrames - 1, frameIdx));

    if (angleBadge) {
      angleBadge.textContent = Math.round(normAngle) + "°";
    }

    var img = suproImages.length > 0 ? suproImages[frameIdx] : images[frameIdx];
    cardCtx.clearRect(0, 0, W, H);
    if (img && img.complete && img.naturalWidth) {
      var scaleX = W / img.naturalWidth;
      var scaleY = H / img.naturalHeight;
      var scale = Math.min(scaleX, scaleY) * 0.92;
      var dw = img.naturalWidth * scale;
      var dh = img.naturalHeight * scale;
      var dx = (W - dw) / 2;
      var dy = (H - dh) / 2;
      cardCtx.drawImage(img, dx, dy, dw, dh);
    }
  }

  if (cardCanvas) {
    function onPointerDown(e) {
      isDragging = true;
      startX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0) || 0;
    }
    function onPointerMove(e) {
      if (!isDragging) return;
      var currentX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0) || 0;
      var deltaX = currentX - startX;
      startX = currentX;
      cardAngle += deltaX * 0.75;
      renderCard360();
    }
    function onPointerUp() {
      isDragging = false;
    }

    cardCanvas.addEventListener("mousedown", onPointerDown);
    window.addEventListener("mousemove", onPointerMove);
    window.addEventListener("mouseup", onPointerUp);

    cardCanvas.addEventListener("touchstart", onPointerDown, { passive: true });
    window.addEventListener("touchmove", onPointerMove, { passive: true });
    window.addEventListener("touchend", onPointerUp);

    /* Phone Gyroscope & Motion (DeviceOrientation) */
    var lastGamma = null;
    window.addEventListener("deviceorientation", function (e) {
      if (e.gamma !== null && e.gamma !== undefined) {
        if (lastGamma !== null) {
          var deltaG = e.gamma - lastGamma;
          if (Math.abs(deltaG) > 0.3) {
            cardAngle += deltaG * 1.5;
            renderCard360();
          }
        }
        lastGamma = e.gamma;
      }
    }, { passive: true });

    /* Auto rotate slowly when idle */
    setInterval(function () {
      if (!isDragging) {
        cardAngle += 0.35;
        renderCard360();
      }
    }, 45);
  }

  /* ── 68 BPM Ultra-Soothing Ambient E-Major Pentatonic Music Engine ── */
  var bgAudio = document.getElementById("bg-music");
  var musicBtn = document.getElementById("music-toggle");
  var musicLabel = musicBtn ? musicBtn.querySelector(".music-label") : null;
  var isPlaying = false;
  var audioCtx = null;
  var synthLoopInterval = null;

  function updateMusicUI(active) {
    isPlaying = active;
    if (musicBtn) {
      musicBtn.classList.toggle("playing", active);
    }
    if (musicLabel) {
      musicLabel.textContent = active ? "Music On" : "Music";
    }
  }

  function startWebAudioSynth() {
    if (audioCtx) {
      if (audioCtx.state === "suspended") audioCtx.resume();
      return;
    }
    try {
      var AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      audioCtx = new AudioContextClass();

      var bpm = 68; // 68 BPM Peaceful Soothing Tempo
      var beatSec = 60 / bpm;
      var currentStep = 0;

      // Ultra-Soothing Emaj9 - C#m7 - Aadd9 - B11 Chord Progression
      var chords = [
        [164.81, 246.94, 311.13, 370.00, 493.88], // Emaj9
        [138.59, 207.65, 246.94, 329.63, 415.30], // C#m7
        [110.00, 164.81, 220.00, 277.18, 370.00], // Aadd9
        [123.47, 185.00, 246.94, 293.66, 370.00]  // B11
      ];
      var bassFreqs = [82.41, 69.30, 55.00, 61.74];
      var bellNotes = [659.25, 830.61, 987.77, 1108.73, 1318.51];

      synthLoopInterval = setInterval(function () {
        if (!isPlaying || !audioCtx || audioCtx.state !== "running") return;
        var now = audioCtx.currentTime;
        var barIdx = Math.floor(currentStep / 4) % 4;

        // Sub-bass
        var bassOsc = audioCtx.createOscillator();
        var bassGain = audioCtx.createGain();
        bassOsc.type = "sine";
        bassOsc.frequency.setValueAtTime(bassFreqs[barIdx], now);
        bassGain.gain.setValueAtTime(0.35, now);
        bassGain.gain.exponentialRampToValueAtTime(0.001, now + beatSec * 0.95);
        bassOsc.connect(bassGain);
        bassGain.connect(audioCtx.destination);
        bassOsc.start(now);
        bassOsc.stop(now + beatSec);

        // Warm Soft Velvet Synth Pad
        var padChord = chords[barIdx];
        for (var c = 0; c < padChord.length; c++) {
          var padOsc = audioCtx.createOscillator();
          var padGain = audioCtx.createGain();
          padOsc.type = "sine";
          padOsc.frequency.setValueAtTime(padChord[c], now);
          padGain.gain.setValueAtTime(0.08, now);
          padGain.gain.linearRampToValueAtTime(0.03, now + beatSec);
          padOsc.connect(padGain);
          padGain.connect(audioCtx.destination);
          padOsc.start(now);
          padOsc.stop(now + beatSec);
        }

        // Crystalline Serene Bell Plucks
        if (currentStep % 2 === 0) {
          var bOsc = audioCtx.createOscillator();
          var bGain = audioCtx.createGain();
          var bNote = bellNotes[(currentStep % bellNotes.length)];
          bOsc.type = "sine";
          bOsc.frequency.setValueAtTime(bNote, now);
          bGain.gain.setValueAtTime(0.14, now);
          bGain.gain.exponentialRampToValueAtTime(0.001, now + beatSec * 0.7);
          bOsc.connect(bGain);
          bGain.connect(audioCtx.destination);
          bOsc.start(now);
          bOsc.stop(now + beatSec * 0.75);
        }

        currentStep = (currentStep + 1) % 16;
      }, (beatSec * 1000));
    } catch (e) {}
  }

  function playMusic() {
    if (bgAudio) {
      bgAudio.volume = 1.0;
      var p = bgAudio.play();
      if (p !== undefined) {
        p.then(function () {
          updateMusicUI(true);
        }).catch(function () {
          startWebAudioSynth();
          updateMusicUI(true);
        });
      } else {
        updateMusicUI(true);
      }
    } else {
      startWebAudioSynth();
      updateMusicUI(true);
    }
  }

  function toggleMusic() {
    if (isPlaying) {
      if (bgAudio) bgAudio.pause();
      if (audioCtx && audioCtx.state === "running") audioCtx.suspend();
      updateMusicUI(false);
    } else {
      playMusic();
    }
  }

  if (musicBtn) {
    musicBtn.addEventListener("click", function (e) {
      e.preventDefault();
      toggleMusic();
    });
  }

  /* Universal auto-trigger on ANY user interaction (click, tap, scroll, keypress) */
  function autoStartInteraction() {
    if (!isPlaying) {
      playMusic();
    }
    ["click", "touchstart", "pointerdown", "scroll", "keydown"].forEach(function (evt) {
      window.removeEventListener(evt, autoStartInteraction);
    });
  }

  ["click", "touchstart", "pointerdown", "scroll", "keydown"].forEach(function (evt) {
    window.addEventListener(evt, autoStartInteraction, { passive: true });
  });

  /* ── Counters ── */
  function animateCounter(el) {
    var target = parseInt(el.getAttribute("data-n"), 10);
    var suffix = el.getAttribute("data-suffix") || "";
    var duration = 1600;
    var start = null;
    function ease(t) { return 1 - Math.pow(1 - t, 3); }
    function step(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      el.textContent = Math.round(ease(progress) * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  var counters = document.querySelectorAll(".stat-n");
  var countersTriggered = false;
  function checkCounters() {
    if (countersTriggered) return;
    var section = document.getElementById("numbers");
    if (!section) return;
    var rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85) {
      countersTriggered = true;
      counters.forEach(function (el) { animateCounter(el); });
    }
  }
  window.addEventListener("scroll", checkCounters, { passive: true });
  checkCounters();

  /* ── WhatsApp form ── */
  var form = document.getElementById("booking-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var valid = true;
      var firstInvalid = null;

      function clearErr(id) {
        var el = document.getElementById(id + "-err");
        if (el) { el.textContent = ""; el.classList.remove("show"); }
      }
      function showErr(id, msg) {
        var el = document.getElementById(id + "-err");
        if (el) { el.textContent = msg; el.classList.add("show"); }
        if (valid) {
          firstInvalid = document.getElementById(id);
        }
        valid = false;
      }

      ["name", "phone", "pickup", "drop"].forEach(clearErr);

      var name = document.getElementById("name").value.trim();
      var phone = document.getElementById("phone").value.trim();
      var pickup = document.getElementById("pickup").value.trim();
      var drop = document.getElementById("drop").value.trim();
      var goodsEl = document.getElementById("goods");
      var goods = goodsEl ? goodsEl.options[goodsEl.selectedIndex].text : "Household goods";

      if (!name) showErr("name", t("err_name"));

      var rawPhone = phone.replace(/[\s\-]/g, "");
      rawPhone = rawPhone.replace(/^\+91/, "").replace(/^91(?=[6-9])/, "").replace(/^0/, "");
      if (!/^[6-9]\d{9}$/.test(rawPhone)) showErr("phone", t("err_phone"));

      if (!pickup) showErr("pickup", t("err_pickup"));
      if (!drop) showErr("drop", t("err_drop"));

      if (!valid) {
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      var msg = "Hello Channi Transport, I need a tempo.\nName: " + name +
        "\nPhone: " + phone +
        "\nPickup: " + pickup +
        "\nDrop: " + drop +
        "\nGoods: " + goods;
      var url = "https://wa.me/917508260068?text=" + encodeURIComponent(msg);
      showToast(t("toast_ok"));
      setTimeout(function () { window.open(url, "_blank", "noopener"); }, 400);
      form.reset();
    });
  }

  /* ── Toast ── */
  var toast = document.getElementById("toast");
  var toastTimer = null;
  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove("show"); }, 3000);
  }

  /* ── Floating call popup ── */
  var fabCall = document.getElementById("fab-call");
  var callPopup = document.getElementById("call-popup");
  if (fabCall && callPopup) {
    fabCall.addEventListener("click", function (e) {
      e.stopPropagation();
      var isOpen = callPopup.classList.contains("open");
      callPopup.classList.toggle("open", !isOpen);
      fabCall.setAttribute("aria-expanded", !isOpen ? "true" : "false");
    });
    document.addEventListener("click", function (e) {
      if (!callPopup.contains(e.target) && e.target !== fabCall) {
        callPopup.classList.remove("open");
        fabCall.setAttribute("aria-expanded", "false");
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && callPopup.classList.contains("open")) {
        callPopup.classList.remove("open");
        fabCall.setAttribute("aria-expanded", "false");
        fabCall.focus();
      }
    });
  }

  /* ── Init ── */
  applyLang();
  requestAnimationFrame(function () {
    setCanvasSize();
    animate();
    renderCard360();
  });

})();