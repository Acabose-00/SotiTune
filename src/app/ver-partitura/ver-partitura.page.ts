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

  // 1. Obtener archivo_url desde Supabase
  const { data, error } = await this.supabaseService.supabase
    .from('partituras')
    .select('archivo_url')
    .eq('id', id)
    .single();

  if (error || !data?.archivo_url) {
    console.error('Error al obtener archivo_url:', error);
    return;
  }

  const fullPath = data.archivo_url; // Ej: 'partituras/1_1752097881241.pdf'
  const fileName = fullPath.replace('partituras/', '');

  // 2. Obtener URL firmada
  const { data: signed, error: signedError } = await this.supabaseService.supabase
    .storage
    .from('partituras')
    .createSignedUrl(fileName, 3600); // 1 hora

  if (signedError || !signed?.signedUrl) {
    console.error('Error al generar URL firmada:', signedError);
    return;
  }

  // 3. Mostrar PDF
  this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(signed.signedUrl);
}
}