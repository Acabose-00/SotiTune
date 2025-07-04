import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { SafeUrlPipe } from '../pipes/safe-url.pipe';

@Component({
  selector: 'app-ver-partitura',
  templateUrl: './ver-partitura.page.html',
  styleUrls: ['./ver-partitura.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, SafeUrlPipe]  // <--- Aquí lo agregas
})
export class VerPartituraPage {
  url!: string;
  tipo!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.url = params['url'];
      this.tipo = params['tipo'];
    });
  }
}
