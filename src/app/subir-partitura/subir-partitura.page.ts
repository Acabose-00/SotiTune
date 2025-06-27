import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-subir-partitura',
  templateUrl: './subir-partitura.page.html',
  styleUrls: ['./subir-partitura.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class SubirPartituraPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
