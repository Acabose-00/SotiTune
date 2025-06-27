import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { FooterComponent } from '../plantillas/footer/footer.component';
import { FooterUserComponent } from '../plantillas/footer-user/footer-user.component';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { IonButton, IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-partituras',
  templateUrl: './partituras.page.html',
  styleUrls: ['./partituras.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, FooterComponent, FooterUserComponent, IonButton, IonIcon, IonButtons, IonBackButton]
})
export class PartiturasPage implements OnInit {
  sesionActiva: boolean = false;
  selectedInstrument: string = 'bajo';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService
  ) {
    this.sesionActiva = this.auth.isLogged();
  }

  goToInstruments() {
    this.router.navigate(['/menu-instrumentos'], {replaceUrl:true});
  }

  goToSubirPartitura() {
    this.router.navigate(['/subir-partitura'], {replaceUrl:true});
  }
  ngOnInit() {
    this.sesionActiva = this.auth.isLogged();
    this.route.queryParams.subscribe(params => {
      if (params['instrumento']) {
        this.selectedInstrument = params['instrumento'];
      }
    });
  }
}
