import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TunerComponent } from '../components/tuner/tuner.component';
import { ClavijeroComponent } from '../components/clavijero/clavijero.component';
import { FooterComponent } from '../plantillas/footer/footer.component';

@Component({
  selector: 'app-medidor-afinacion',
  templateUrl: './medidor-afinacion.page.html',
  styleUrls: ['./medidor-afinacion.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, TunerComponent, ClavijeroComponent, FooterComponent]
})
export class MedidorAfinacionPage implements OnInit {

  selectedInstrument: string = 'bajo';
  selectedStringIndex: number | null = null;
  currentNote: string = '';

  constructor() { }

  ngOnInit() {}
}
