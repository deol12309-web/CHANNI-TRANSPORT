const fs = require('fs');
const path = require('path');

const sampleRate = 44100;
const durationSeconds = 16; // 16 seconds loopable
const totalSamples = sampleRate * durationSeconds;
const numChannels = 2; // Stereo for lush spatial sound
const bytesPerSample = 2;
const blockAlign = numChannels * bytesPerSample;

const leftBuffer = new Float32Array(totalSamples);
const rightBuffer = new Float32Array(totalSamples);

const bpm = 85;
const beatSec = 60 / bpm;
const barSec = beatSec * 4;

// Chords: Emaj9, C#m7, Aadd9, B11
const chords = [
  [164.81, 246.94, 311.13, 370.00, 493.88], // Emaj9
  [138.59, 207.65, 246.94, 329.63, 415.30], // C#m7
  [110.00, 164.81, 220.00, 277.18, 370.00], // Aadd9
  [123.47, 185.00, 246.94, 293.66, 370.00]  // B11
];
const bassNotes = [82.41, 69.30, 55.00, 61.74];
const leadMelody = [
  { t: 0.0, f: 659.25, dur: 1.2 },
  { t: 0.75, f: 830.61, dur: 1.0 },
  { t: 1.5, f: 987.77, dur: 1.5 },
  { t: 2.5, f: 1108.73, dur: 1.0 },
  { t: 3.25, f: 987.77, dur: 1.2 },
  { t: 4.0, f: 830.61, dur: 1.5 },
  { t: 5.0, f: 659.25, dur: 1.0 },
  { t: 6.0, f: 739.99, dur: 1.8 },
  { t: 8.0, f: 987.77, dur: 1.2 },
  { t: 9.0, f: 1108.73, dur: 1.0 },
  { t: 10.0, f: 1318.51, dur: 1.5 },
  { t: 11.25, f: 1108.73, dur: 1.0 },
  { t: 12.0, f: 987.77, dur: 1.8 },
  { t: 14.0, f: 830.61, dur: 1.5 }
];

// Generate Synth Pad & Bass
for (let i = 0; i < totalSamples; i++) {
  const t = i / sampleRate;
  const barIdx = Math.floor((t % 16) / 4);
  const barTime = t % 4;

  // Bass (Sine + Warm Triangle harmonics)
  const bFreq = bassNotes[barIdx];
  const subBass = Math.sin(2 * Math.PI * bFreq * t) * 0.35;
  const midBass = Math.sin(2 * Math.PI * (bFreq * 2) * t) * 0.15;
  const bassVal = subBass + midBass;

  // Synth Pad Chords with gentle LFO chorus
  let padLeft = 0;
  let padRight = 0;
  const chord = chords[barIdx];
  const chorusLFO = Math.sin(2 * Math.PI * 0.25 * t);
  for (let c = 0; c < chord.length; c++) {
    const f = chord[c];
    const detuneL = 1.0 + chorusLFO * 0.002 * (c + 1);
    const detuneR = 1.0 - chorusLFO * 0.002 * (c + 1);
    const waveL = Math.sin(2 * Math.PI * (f * detuneL) * t);
    const waveR = Math.sin(2 * Math.PI * (f * detuneR) * t);
    padLeft += waveL * 0.08;
    padRight += waveR * 0.08;
  }

  leftBuffer[i] += bassVal + padLeft;
  rightBuffer[i] += bassVal + padRight;
}

// Generate Crystalline Lead Melody
leadMelody.forEach(note => {
  const startSample = Math.floor(note.t * beatSec * 2 * sampleRate); // spread over beat
  const noteSamples = Math.floor(note.dur * beatSec * sampleRate);
  for (let s = 0; s < noteSamples; s++) {
    const idx = startSample + s;
    if (idx >= totalSamples) break;
    const noteT = s / sampleRate;
    const env = Math.exp(-noteT * 2.5); // smooth bell decay
    const sine = Math.sin(2 * Math.PI * note.f * noteT);
    const harmonic = Math.sin(2 * Math.PI * (note.f * 2) * noteT) * 0.3;
    const bellVal = (sine + harmonic) * env * 0.22;
    leftBuffer[idx] += bellVal * 0.9;
    rightBuffer[idx] += bellVal * 1.1; // stereo width
  }
});

// Generate Gentle Lo-Fi Beat (Kick on 1, 3; Soft Snare/Rim on 2, 4; Soft Hi-hats)
for (let beat = 0; beat < 16; beat++) {
  const beatTime = beat * beatSec;
  const beatStart = Math.floor(beatTime * sampleRate);

  // Soft Kick on beat 0, 2, 6, 8, 10, 14
  if ([0, 2, 6, 8, 10, 14].includes(beat)) {
    const kickSamples = Math.floor(0.2 * sampleRate);
    for (let k = 0; k < kickSamples; k++) {
      const idx = beatStart + k;
      if (idx >= totalSamples) break;
      const kT = k / sampleRate;
      const freq = 110 * Math.exp(-kT * 25) + 45;
      const kEnv = Math.exp(-kT * 12);
      const kickVal = Math.sin(2 * Math.PI * freq * kT) * kEnv * 0.40;
      leftBuffer[idx] += kickVal;
      rightBuffer[idx] += kickVal;
    }
  }

  // Soft Rim / Snare on beat 4, 12
  if ([4, 12].includes(beat)) {
    const snareSamples = Math.floor(0.15 * sampleRate);
    for (let sn = 0; sn < snareSamples; sn++) {
      const idx = beatStart + sn;
      if (idx >= totalSamples) break;
      const snT = sn / sampleRate;
      const noise = (Math.random() * 2 - 1) * Math.exp(-snT * 30);
      const tone = Math.sin(2 * Math.PI * 220 * snT) * Math.exp(-snT * 20);
      const snareVal = (noise * 0.15 + tone * 0.15);
      leftBuffer[idx] += snareVal;
      rightBuffer[idx] += snareVal;
    }
  }

  // Soft Hi-Hat on every 8th note
  for (let sub = 0; sub < 2; sub++) {
    const hhStart = Math.floor((beatTime + sub * (beatSec / 2)) * sampleRate);
    const hhSamples = Math.floor(0.04 * sampleRate);
    for (let h = 0; h < hhSamples; h++) {
      const idx = hhStart + h;
      if (idx >= totalSamples) break;
      const hT = h / sampleRate;
      const hhNoise = (Math.random() * 2 - 1) * Math.exp(-hT * 80);
      const hhVal = hhNoise * 0.06;
      leftBuffer[idx] += hhVal * 0.8;
      rightBuffer[idx] += hhVal * 1.2;
    }
  }
}

// Find Peak Amplitude for 100% Normalization (0 dBFS)
let maxAmp = 0;
for (let i = 0; i < totalSamples; i++) {
  const absL = Math.abs(leftBuffer[i]);
  const absR = Math.abs(rightBuffer[i]);
  if (absL > maxAmp) maxAmp = absL;
  if (absR > maxAmp) maxAmp = absR;
}

const normFactor = maxAmp > 0 ? (0.95 / maxAmp) : 1.0;
console.log(`Peak before norm: ${maxAmp.toFixed(4)}, Normalization Factor: ${normFactor.toFixed(4)}`);

// Encode WAV Header + PCM 16-bit
const headerSize = 44;
const dataSize = totalSamples * blockAlign;
const wavBuf = Buffer.alloc(headerSize + dataSize);

wavBuf.write('RIFF', 0);
wavBuf.writeUInt32LE(36 + dataSize, 4);
wavBuf.write('WAVE', 8);
wavBuf.write('fmt ', 12);
wavBuf.writeUInt32LE(16, 16);
wavBuf.writeUInt16LE(1, 20); // PCM
wavBuf.writeUInt16LE(numChannels, 22);
wavBuf.writeUInt32LE(sampleRate, 24);
wavBuf.writeUInt32LE(sampleRate * blockAlign, 28);
wavBuf.writeUInt16LE(blockAlign, 32);
wavBuf.writeUInt16LE(bytesPerSample * 8, 34);
wavBuf.write('data', 36);
wavBuf.writeUInt32LE(dataSize, 40);

let offset = 44;
for (let i = 0; i < totalSamples; i++) {
  const sampleL = Math.max(-1, Math.min(1, leftBuffer[i] * normFactor));
  const sampleR = Math.max(-1, Math.min(1, rightBuffer[i] * normFactor));

  const valL = Math.round(sampleL < 0 ? sampleL * 32768 : sampleL * 32767);
  const valR = Math.round(sampleR < 0 ? sampleR * 32768 : sampleR * 32767);

  wavBuf.writeInt16LE(valL, offset);
  wavBuf.writeInt16LE(valR, offset + 2);
  offset += 4;
}

const outputPath = path.join(__dirname, '../audio/background.wav');
fs.writeFileSync(outputPath, wavBuf);
console.log(`Successfully generated high-fidelity audio: ${outputPath} (${(wavBuf.length / 1024 / 1024).toFixed(2)} MB)`);
