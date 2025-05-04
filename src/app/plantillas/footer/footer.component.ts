import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonFooter, IonButton, IonButtons, IonIcon, IonMenuButton, IonLabel, IonSegment, IonSegmentButton, IonTab, IonTabBar, IonTabs, IonTabButton } from '@ionic/angular/standalone';
import { create, ellipsisHorizontal, ellipsisVertical, helpCircle, personCircle, search, star, speedometer, mic, list, musicalNoteOutline, flashOutline, trendingUpOutline, happyOutline, heartOutline, keyOutline } from 'ionicons/icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  imports: [IonTabButton, IonTab, IonContent, IonHeader, IonTitle, IonToolbar, IonFooter, CommonModule, FormsModule,
    IonButton, IonButton, IonButtons, IonIcon, IonMenuButton, IonLabel, IonSegment, IonSegmentButton, IonTabBar, IonTabs],
})
export class FooterComponent  implements OnInit {

  constructor(private router: Router) { 
  addIcons({musicalNoteOutline,flashOutline,trendingUpOutline,happyOutline,heartOutline,keyOutline,personCircle,list,create,ellipsisHorizontal,ellipsisVertical,helpCircle,search,star,speedometer,mic});
}

  ngOnInit() {}
  goToLogin() {
    this.router.navigate(['/home']);
  }

  goToInstruments() {
    this.router.navigate(['/menu-instrumentos']);
  }

}
