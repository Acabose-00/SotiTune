import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonTitle, IonToolbar, IonFab } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { FooterComponent } from '../plantillas/footer/footer.component';
import { FooterUserComponent } from '../plantillas/footer-user/footer-user.component';
import { instrumentDisplayList, InstrumentDisplay } from '../components/data/instrument-icons';
import { addIcons } from 'ionicons';
import {
  musicalNoteOutline, flashOutline, trendingUpOutline,
  happyOutline, heartOutline, keyOutline, personCircle,
  list, create, ellipsisHorizontal, ellipsisVertical,
  helpCircle, search, star, speedometer, mic
} from 'ionicons/icons';

@Component({
  selector: 'app-menu-instrumentos',
  templateUrl: './menu-instrumentos.page.html',
  styleUrls: ['./menu-instrumentos.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonFab,
    FooterComponent,
    FooterUserComponent
  ]
})
export class MenuInstrumentosPage implements OnInit {
  instrumentos: InstrumentDisplay[] = instrumentDisplayList;
  sesionActiva: boolean = false;

  constructor(private router: Router, private auth: AuthService) {
    addIcons({
      musicalNoteOutline, flashOutline, trendingUpOutline,
      happyOutline, heartOutline, keyOutline, personCircle,
      list, create, ellipsisHorizontal, ellipsisVertical,
      helpCircle, search, star, speedometer, mic
    });
  }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.sesionActiva = this.auth.getLoggedUser();
  }

  goToLogin() {
    this.router.navigate(['/home'], { replaceUrl: true });
  }

  goToInstruments(key: string) {
    this.router.navigate(['/menu-instrumentos'], { replaceUrl: true });
  }

  goToAfinacion(instrumento: string) {
    this.router.navigate(['/medidor-afinacion'], {
      queryParams: { instrumento: instrumento }
    });
  }
}
