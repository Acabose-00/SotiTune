import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FooterComponent } from '../plantillas/footer/footer.component';
import { FooterUserComponent } from '../plantillas/footer-user/footer-user.component';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';

@Component({
  selector: 'app-partituras',
  templateUrl: './partituras.page.html',
  styleUrls: ['./partituras.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FooterComponent,
    FooterUserComponent
  ]
})
export class PartiturasPage implements OnInit {
  sesionActiva: boolean = false;
  selectedInstrument: string = 'bajo';
  partituras: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private supabaseService: SupabaseService,
  ) {}

  async ngOnInit() {
    this.sesionActiva = this.auth.isLogged();
  
    this.route.queryParams.subscribe(params => {
      if (params['instrumento']) {
        this.selectedInstrument = params['instrumento'];
      }
    });
  
    try {
      this.partituras = await this.supabaseService.getPartituras();
    } catch (error) {
      console.error('Error al obtener partituras:', error);
    }
  }
  
  goToInstruments() {
    this.router.navigate(['/menu-instrumentos'], { replaceUrl: true });
  }

  goToSubirPartitura() {
    this.router.navigate(['/subir-partitura'], { replaceUrl: true });
  }

  verPartitura(partitura: any) {
    this.router.navigate(['/ver-partitura'], {
      queryParams: {
        url: partitura.archivo_url,
        tipo: partitura.tipo
      }
    });
  }
}
