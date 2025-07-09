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
    ReactiveFormsModule
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
      instrumento: ['', Validators.required],
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
    const fecha_creacion = new Date().toISOString();

    if (!usuario_id) {
      alert('No se encontró el usuario actual.');
      return;
    }

    const archivo = this.archivoSeleccionado;
    const extension = archivo.name.split('.').pop()?.toLowerCase();
    const nombreArchivo = `${usuario_id}_${Date.now()}.${extension}`;

    // 🟦 Subir archivo al bucket
    const { error: uploadError } = await this.supabaseService.supabase.storage
      .from('partituras')
      .upload(nombreArchivo, archivo, {
        contentType: archivo.type
      });

    if (uploadError) {
      console.error('Error al subir al bucket:', uploadError);
      alert('Error al subir archivo al bucket');
      return;
    }

    // 🟨 Guardar metadata en tabla
    const { error: insertError } = await this.supabaseService.supabase
      .from('partituras')
      .insert({
        titulo,
        instrumento,
        genero_musical: genero,
        usuario_id,
        fecha_creacion,
        archivo_url: nombreArchivo // solo el nombre, no incluyas "partituras/"
      });

    if (insertError) {
      console.error('Error al guardar metadata:', insertError);
      alert('Error al guardar partitura.');
    } else {
      alert('¡Partitura subida con éxito!');
      this.router.navigate(['/partituras']);
    }
  }

  goToInstruments() {
    this.router.navigate(['/menu-instrumentos'], { replaceUrl: true });
  }
}
