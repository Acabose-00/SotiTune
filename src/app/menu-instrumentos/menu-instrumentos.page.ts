import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonFooter, IonButton, IonButtons, IonIcon, IonMenuButton, IonLabel, IonSegment, IonSegmentButton, IonTab, IonTabBar, IonTabs, IonTabButton, IonFab, IonFabButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { create, ellipsisHorizontal, ellipsisVertical, helpCircle, personCircle, search, star, speedometer, mic, list, musicalNoteOutline, flashOutline, trendingUpOutline, happyOutline, heartOutline, keyOutline } from 'ionicons/icons';
import { Router } from '@angular/router';
import { ClavijeroComponent } from "../components/clavijero/clavijero.component";
import { AuthService } from '../services/auth.service';
import { FooterComponent } from '../plantillas/footer/footer.component';
import { FooterUserComponent } from '../plantillas/footer-user/footer-user.component';

@Component({
  selector: 'app-menu-instrumentos',
  templateUrl: './menu-instrumentos.page.html',
  styleUrls: ['./menu-instrumentos.page.scss'],
  standalone: true,
  imports: [IonFabButton, IonFab, IonTabButton, IonTab, IonContent, IonHeader, IonTitle, IonToolbar, IonFooter, CommonModule, FormsModule,
    IonButton, IonButton, IonButtons, IonIcon, IonMenuButton, IonLabel, IonSegment, IonSegmentButton, IonTabBar, IonTabs, ClavijeroComponent, FooterComponent, FooterUserComponent]
})
export class MenuInstrumentosPage implements OnInit {
  sesionActiva: boolean = false;

  constructor(private router: Router, private auth: AuthService) { 
    addIcons({
      musicalNoteOutline,flashOutline,trendingUpOutline,
      happyOutline,heartOutline,keyOutline,personCircle,
      list,create,ellipsisHorizontal,ellipsisVertical,
      helpCircle,search,star,speedometer,mic});
    this.sesionActiva = this.auth.isLogged();
  }

  ngOnInit() {
    this.sesionActiva = this.auth.isLogged();
  }

  ionViewWillEnter() {
  this.sesionActiva = this.auth.isLogged();
}

  goToLogin() {
    this.router.navigate(['/home'], {replaceUrl:true});
  }

  goToInstruments() {
    this.router.navigate(['/menu-instrumentos'], {replaceUrl:true});
  }

  goToAfinacion(instrumento: string) {
    this.router.navigate(['/medidor-afinacion'],  {
      queryParams: { instrumento: instrumento }
    });
  }

}
