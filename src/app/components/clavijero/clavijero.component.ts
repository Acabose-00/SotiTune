
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { instrumentTunings, StringTuning } from '../data/frecuencia-instrumentos';

@Component({
  selector: 'app-clavijero',
  templateUrl: './clavijero.component.html',
  styleUrls: ['./clavijero.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class ClavijeroComponent {
  @Input() instrument: string = 'bajo'; // Instrumento por defecto
  @Input() selectedStringIndex: number | null = null; // Cuerda seleccionada manualmente
  @Input() detectedStringIndex: number | null = null; // Cuerda detectada automáticamente

  @Output() stringSelected = new EventEmitter<number>();

  get strings(): StringTuning[] {
    return instrumentTunings[this.instrument] || [];
  }

  selectString(index: number) {
    this.stringSelected.emit(index);
  }

  get clavijeroImage(): string {
    return `/assets/clavijas/${this.instrument}.png`;
  }
  
  getPositionStyle(index: number): any {
    const positions = [
      { top: '20%', left: '30%' }, // ejemplo para clavija 1
      { top: '30%', left: '20%' },
      { top: '40%', left: '10%' },
      { top: '50%', left: '15%' },
      // debes ajustar según tu imagen
    ];
    return positions[index] || {};
  }
  

}
