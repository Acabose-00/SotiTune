import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router'; 

import { TunerComponent } from '../components/tuner/tuner.component';
import { ClavijeroComponent } from '../components/clavijero/clavijero.component';
import { FooterComponent } from '../plantillas/footer/footer.component';
import { FooterUserComponent } from '../plantillas/footer-user/footer-user.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-medidor-afinacion',
  templateUrl: './medidor-afinacion.page.html',
  styleUrls: ['./medidor-afinacion.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TunerComponent,
    ClavijeroComponent,
    FooterComponent,
    FooterUserComponent,
  ]
})
export class MedidorAfinacionPage implements OnInit {
  selectedInstrument: string = 'bajo';
  sesionActiva: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService
  ) {
    this.sesionActiva = this.auth.getLoggedUser();
  }

  ngOnInit() {
    this.sesionActiva = this.auth.getLoggedUser();
    this.route.queryParams.subscribe(params => {
      if (params['instrumento']) {
        this.selectedInstrument = params['instrumento'];
      }
    });
  }

  goToInstruments() {
    this.router.navigate(['/menu-instrumentos'], {replaceUrl:true});
  }
}
