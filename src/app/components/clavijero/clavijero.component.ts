import { Component, EventEmitter, Input, Output, OnInit, OnChanges, SimpleChanges } from '@angular/core';
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
export class ClavijeroComponent implements OnInit, OnChanges {
@Input() selectedInstrument: string = 'bajo';
@Input() selectedStringIndex: number | null = null;
@Output() stringSelected = new EventEmitter<number>();

strings: StringTuning[] = [];

ngOnInit(): void {
this.updateStrings();
}

ngOnChanges(changes: SimpleChanges): void {
if (changes['selectedInstrument']) {
this.updateStrings();
}
}

updateStrings() {
this.strings = instrumentTunings[this.selectedInstrument] || [];
}

selectString(index: number) {
this.stringSelected.emit(index);
}
}