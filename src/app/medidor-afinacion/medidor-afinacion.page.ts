import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { TunerComponent } from '../components/tuner/tuner.component';
import { ClavijeroComponent } from '../components/clavijero/clavijero.component';


@Component({
  selector: 'app-medidor-afinacion',
  templateUrl: './medidor-afinacion.page.html',
  styleUrls: ['./medidor-afinacion.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, TunerComponent, ClavijeroComponent,]
})
export class MedidorAfinacionPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
