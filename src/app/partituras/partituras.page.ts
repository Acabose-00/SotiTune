import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FooterComponent } from '../plantillas/footer/footer.component';
import { FooterUserComponent } from '../plantillas/footer-user/footer-user.component';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';

import { addIcons } from 'ionicons';
import { chevronBack, add, star } from 'ionicons/icons';

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
  sesionActiva: any = null;
  selectedInstrument: string = 'bajo';
  partituras: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private supabaseService: SupabaseService,
  ) {
    addIcons({
      'chevron-back': chevronBack,
      'add': add
    , 'star': star
    });
}

  async ngOnInit() {
    this.sesionActiva = this.auth.getLoggedUser();

    this.route.queryParams.subscribe(params => {
      if (params['instrumento']) {
        this.selectedInstrument = params['instrumento'];
      }
    });

    try {
      this.partituras = await this.supabaseService.getPartituras(this.sesionActiva.id);
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
    console.log("TA LUEGO")
    this.router.navigate(['/ver-partitura'], {
      queryParams: {
        id: partitura.id
      }
    });
  }

  async gestionarFavorito(event: Event, partitura: any) {
    event.stopPropagation();

    const liked = await this.supabaseService.gestionarFavoritos(partitura.id, this.sesionActiva.id);
    console.log(liked);
    if (liked) {
      if (!partitura.canciones_favoritas.includes(partitura.id)) {
        partitura.canciones_favoritas.push(partitura.id);
      }
      partitura.num_valoraciones += 1;
    } else {
      const index = partitura.canciones_favoritas.indexOf(partitura.id);
      if (index !== -1) {
        partitura.canciones_favoritas.splice(index, 1);
      }
      partitura.num_valoraciones = Math.max(0, partitura.num_valoraciones - 1);
    }
  }
}
