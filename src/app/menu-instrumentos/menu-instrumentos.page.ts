import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonFooter, IonButton, IonButtons, IonIcon, IonMenuButton, IonLabel, IonSegment, IonSegmentButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { create, ellipsisHorizontal, ellipsisVertical, helpCircle, personCircle, search, star, speedometer, mic, list } from 'ionicons/icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-instrumentos',
  templateUrl: './menu-instrumentos.page.html',
  styleUrls: ['./menu-instrumentos.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonFooter, CommonModule, FormsModule,
            IonButton, IonButton, IonButtons, IonIcon, IonMenuButton, IonLabel, IonSegment, IonSegmentButton]
})
export class MenuInstrumentosPage implements OnInit {

  constructor(private router: Router) { 
    addIcons({ create, ellipsisHorizontal, ellipsisVertical, helpCircle, personCircle, search, star, speedometer, mic, list });
  }

  ngOnInit() {
  }

  goToLogin() {
    this.router.navigate(['/home']);
  }

  goToInstruments() {
    this.router.navigate(['/menu-instrumentos']);
  }

}
