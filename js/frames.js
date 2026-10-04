/* js/frames.js – frame manifests */
var FRAME_COUNT = 240;
var FRAMES = [];
(function () {
  for (var i = 1; i <= FRAME_COUNT; i++) {
    FRAMES.push("frames/fr_" + ("00" + i).slice(-3) + ".webp");
  }
})();

var SUPRO_FRAME_COUNT = 24;
var SUPRO_FRAMES = [];
(function () {
  for (var i = 1; i <= SUPRO_FRAME_COUNT; i++) {
    var num = ("0" + i).slice(-2);
    SUPRO_FRAMES.push("frames_supro/supro_" + num + ".png");
  }
})();
