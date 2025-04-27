import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonFooter } from '@ionic/angular/standalone';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonIcon,
  IonMenuButton,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { create, ellipsisHorizontal, ellipsisVertical, helpCircle, personCircle, search, star } from 'ionicons/icons';

@Component({
  selector: 'app-menu-instrumentos',
  templateUrl: './menu-instrumentos.page.html',
  styleUrls: ['./menu-instrumentos.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonFooter, CommonModule, FormsModule,
            IonBackButton, IonButton, IonButtons, IonIcon, IonMenuButton, IonTitle, IonToolbar]
})
export class MenuInstrumentosPage implements OnInit {

  constructor() { 
    addIcons({ create, ellipsisHorizontal, ellipsisVertical, helpCircle, personCircle, search, star });
  }

  ngOnInit() {
  }

}


