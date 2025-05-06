import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonFooter, IonButton, IonButtons, IonIcon, IonMenuButton, IonLabel, IonSegment, IonSegmentButton, IonTab, IonTabBar, IonTabs, IonTabButton, IonFab } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { create, ellipsisHorizontal, ellipsisVertical, helpCircle, personCircle, search, star, speedometer, mic, list, musicalNoteOutline, flashOutline, trendingUpOutline, happyOutline, heartOutline, keyOutline } from 'ionicons/icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-usuario',
  templateUrl: './menu-usuario.page.html',
  styleUrls: ['./menu-usuario.page.scss'],
  standalone: true,
  imports: [IonFab, IonTabButton, IonTab, IonContent, IonHeader, IonTitle, IonToolbar, IonFooter, CommonModule, FormsModule,
            IonButton, IonButton, IonButtons, IonIcon, IonMenuButton, IonLabel, IonSegment, IonSegmentButton, IonTabBar, IonTabs]
})
export class MenuUsuarioPage implements OnInit {

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
    this.router.navigate(['/menu-bajo']);
  }

}
