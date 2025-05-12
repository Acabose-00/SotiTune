import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router'; 

import { TunerComponent } from '../components/tuner/tuner.component';
import { ClavijeroComponent } from '../components/clavijero/clavijero.component';
import { FooterComponent } from '../plantillas/footer/footer.component';

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
    FooterComponent
  ]
})
export class MedidorAfinacionPage implements OnInit {
  selectedInstrument: string = 'bajo';

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['instrumento']) {
        this.selectedInstrument = params['instrumento'];
      }
    });
  }

  goToInstruments() {
    this.router.navigate(['/menu-instrumentos']);
  }
}
