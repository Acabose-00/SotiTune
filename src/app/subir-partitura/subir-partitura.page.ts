import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { SupabaseService } from '../services/supabase.service';
import { Router } from '@angular/router';

// Ionic Components
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-subir-partitura',
  templateUrl: './subir-partitura.page.html',
  styleUrls: ['./subir-partitura.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    ReactiveFormsModule // necesario para usar formularios reactivos
  ]
})
export class SubirPartituraPage {
  formulario: FormGroup;
  archivoSeleccionado: File | null = null;

  constructor(
    private fb: FormBuilder,
    private supabaseService: SupabaseService,
    private router: Router
  ) {
    this.formulario = this.fb.group({
      titulo: ['', Validators.required],
      instrumento: ['', Validators.required], // aún no se guarda en BD
      genero: ['', Validators.required],
    });
  }

  onFileSelected(event: any) {
    this.archivoSeleccionado = event.target.files[0];
  }

  async subirPartitura() {
    if (!this.archivoSeleccionado || !this.formulario.valid) {
      alert('Completa todos los campos y selecciona un archivo válido.');
      return;
    }

    const { titulo, genero, instrumento } = this.formulario.value;

    const usuario = this.supabaseService.getUsuarioActual();
    const usuario_id = usuario?.id;

    if (!usuario_id) {
      alert('No se encontró el usuario actual.');
      return;
    }

    const fecha_creacion = new Date().toISOString();
    const archivoBuffer = await this.archivoSeleccionado.arrayBuffer();
    const nombreArchivo = this.archivoSeleccionado.name.toLowerCase();

    let partitura_pdf = null;
    let partitura_xml = null;

    if (nombreArchivo.endsWith('.pdf')) {
      partitura_pdf = archivoBuffer;
    } else if (nombreArchivo.endsWith('.xml')) {
      partitura_xml = new TextDecoder().decode(archivoBuffer);
    } else {
      alert('Solo se permiten archivos PDF o XML.');
      return;
    }

    const { error } = await this.supabaseService.supabase
      .from('partituras')
      .insert({
        titulo,
        genero_musical: genero,
        usuario_id,
        fecha_creación: fecha_creacion,
        likes: false,
        partitura_pdf,
        partitura_xml
      });

    if (error) {
      console.error('Error al subir:', error);
      alert('Ocurrió un error al subir la partitura.');
      return;
    }

    alert('🎵 ¡Partitura subida con éxito!');
    this.router.navigate(['/partituras']);
  }

  goToInstruments() {
    this.router.navigate(['/menu-instrumentos'], {replaceUrl:true});
  }
}
