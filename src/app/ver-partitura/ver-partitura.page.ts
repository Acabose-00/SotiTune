import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SupabaseService } from '../services/supabase.service';

@Component({
  selector: 'app-ver-partitura',
  templateUrl: './ver-partitura.page.html',
  styleUrls: ['./ver-partitura.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class VerPartituraPage {
  pdfSrc: SafeResourceUrl | null = null;

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private supabaseService: SupabaseService
  ) {}

  private convertirHexAUint8Array(hex: string): Uint8Array {
    if (hex.startsWith('\\x')) {
      hex = hex.slice(2);
    }
    const bytes = new Uint8Array(hex.length / 2);
    for (let i = 0; i < hex.length; i += 2) {
      bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
    }
    return bytes;
  }

  async ngOnInit() {
    const id = +this.route.snapshot.queryParamMap.get('id')!;
    if (!id) {
      console.error('ID inválido');
      return;
    }

    const { data, error } = await this.supabaseService.supabase
      .from('partituras')
      .select('partitura_pdf')
      .eq('id', id)
      .single();

    if (error || !data || !data.partitura_pdf) {
      console.error('Error al obtener o no hay PDF en esta partitura:', error);
      return;
    }

    const byteArray = this.convertirHexAUint8Array(data.partitura_pdf);
    const blob = new Blob([byteArray], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}