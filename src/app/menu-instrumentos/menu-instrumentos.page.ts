import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonFooter, IonButton, IonButtons, IonIcon, IonMenuButton, IonLabel, IonSegment, IonSegmentButton, IonTab, IonTabBar, IonTabs, IonTabButton, IonFab, IonFabButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { create, ellipsisHorizontal, ellipsisVertical, helpCircle, personCircle, search, star, speedometer, mic, list, musicalNoteOutline, flashOutline, trendingUpOutline, happyOutline, heartOutline, keyOutline } from 'ionicons/icons';
import { Router } from '@angular/router';
import { ClavijeroComponent } from "../components/clavijero/clavijero.component";

@Component({
  selector: 'app-menu-instrumentos',
  templateUrl: './menu-instrumentos.page.html',
  styleUrls: ['./menu-instrumentos.page.scss'],
  standalone: true,
  imports: [IonFabButton, IonFab, IonTabButton, IonTab, IonContent, IonHeader, IonTitle, IonToolbar, IonFooter, CommonModule, FormsModule,
    IonButton, IonButton, IonButtons, IonIcon, IonMenuButton, IonLabel, IonSegment, IonSegmentButton, IonTabBar, IonTabs, ClavijeroComponent]
})
export class MenuInstrumentosPage implements OnInit {

  constructor(private router: Router) { 
    addIcons({musicalNoteOutline,flashOutline,trendingUpOutline,happyOutline,heartOutline,keyOutline,personCircle,list,create,ellipsisHorizontal,ellipsisVertical,helpCircle,search,star,speedometer,mic});
  }

  ngOnInit() {
  }

  goToLogin() {
    this.router.navigate(['/home']);
  }

  goToInstruments() {
    this.router.navigate(['/menu-instrumentos']);
  }

  goToAfinacion() {
    this.router.navigate(['/medidor-afinacion']);
  }

}
