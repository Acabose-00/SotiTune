import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { instrumentTunings, StringTuning } from '../data/frecuencia-instrumentos';

@Component({
  selector: 'app-tuner',
  templateUrl: './tuner.component.html',
  styleUrls: ['./tuner.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class TunerComponent implements OnInit, OnDestroy {
  // variables de aguja medidor
  needleAngle: number = 0;
  signalLost: boolean = false;
  private lastDetectionTime: number = Date.now();
  // Variables para el microfono
  audioContext!: AudioContext;
  analyser!: AnalyserNode;
  dataArray!: Float32Array;
  mediaStreamSource!: MediaStreamAudioSourceNode;
  rafId!: number;

  frequency: number = 0;
  currentNote: string = '';
  targetFrequency: number = 0;
  isMicrophoneActive: boolean = false;

  // Variables para la afinacion segun instrumento
  selectedInstrument: string = 'bajo';
  currentTuning: StringTuning[] = instrumentTunings['bajo'];

  constructor() {}

  selectInstrument(instrument: string) {
    this.selectedInstrument = instrument;
    this.currentTuning = instrumentTunings[instrument];
  }

  detectClosestNote(frequency: number): string {
    let closest = this.currentTuning[0];
    let minDiff = Math.abs(frequency - closest.frequency);

    for (const stringTuning of this.currentTuning) {
      const diff = Math.abs(frequency - stringTuning.frequency);
      if (diff < minDiff) {
        closest = stringTuning;
        minDiff = diff;
      }
    }

    return closest.note;
  }

  isInTune(): boolean {
    return Math.abs(this.frequency - this.targetFrequency) < 2;
  }

  ngOnInit() {
    this.initAudio();
  }

  ngOnDestroy() {
    this.stopAudio();
  }

  async initAudio() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.mediaStreamSource = this.audioContext.createMediaStreamSource(stream);

      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 2048;

      this.dataArray = new Float32Array(this.analyser.fftSize);
      this.mediaStreamSource.connect(this.analyser);

      this.isMicrophoneActive = true;
      this.updateFrequency();

    } catch (err) {
      console.error('Error accediendo al micrófono', err);
      this.isMicrophoneActive = false;
    }
  }

  updateFrequency() {
    this.analyser.getFloatTimeDomainData(this.dataArray);
    this.frequency = this.autoCorrelate(this.dataArray, this.audioContext.sampleRate) || 0;
    const now = Date.now();
    if (this.frequency > 0) {
      this.currentNote = this.detectClosestNote(this.frequency);
      this.targetFrequency = this.currentTuning.find(t => t.note === this.currentNote)?.frequency || 0;
      // logica para la aguja
      const diff = this.frequency - this.targetFrequency;
      this.needleAngle = Math.max(Math.min(diff * 5, 45), -45);
      this.lastDetectionTime = now;
      this.signalLost = false;
    } else {
      // Si pasan más de 3 segundos sin detectar nada, muestra Sin señal
      if (now - this.lastDetectionTime > 3000) {
        this.signalLost = true;
      }
      this.needleAngle = 0; // Regresa aguja al centro
    }

    this.rafId = requestAnimationFrame(() => this.updateFrequency());
  }

  stopAudio() {
    if (this.audioContext) {
      this.audioContext.close();
    }
    cancelAnimationFrame(this.rafId);
  }

  autoCorrelate(buffer: Float32Array, sampleRate: number): number | null {
    let SIZE = buffer.length;
    let rms = 0;

    for (let i = 0; i < SIZE; i++) {
      let val = buffer[i];
      rms += val * val;
    }
    rms = Math.sqrt(rms / SIZE);
    if (rms < 0.01) return null;

    let r1 = 0, r2 = SIZE - 1, thres = 0.2;
    for (let i = 0; i < SIZE / 2; i++) {
      if (Math.abs(buffer[i]) < thres) { r1 = i; break; }
    }
    for (let i = 1; i < SIZE / 2; i++) {
      if (Math.abs(buffer[SIZE - i]) < thres) { r2 = SIZE - i; break; }
    }

    buffer = buffer.slice(r1, r2);
    SIZE = buffer.length;

    const c = new Array(SIZE).fill(0);
    for (let i = 0; i < SIZE; i++) {
      for (let j = 0; j < SIZE - i; j++) {
        c[i] = c[i] + buffer[j] * buffer[j + i];
      }
    }

    let d = 0;
    while (c[d] > c[d + 1]) d++;
    let maxval = -1, maxpos = -1;
    for (let i = d; i < SIZE; i++) {
      if (c[i] > maxval) {
        maxval = c[i];
        maxpos = i;
      }
    }
    let T0 = maxpos;

    if (T0 == 0) return null;

    return sampleRate / T0;
  }
}