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

    if (!usuario_id) {
      alert('No se encontró el usuario actual.');
      return;
    }
    
    const fecha_creacion = new Date().toISOString();
    const archivo = this.archivoSeleccionado;
    const nombreArchivo = archivo.name.toLowerCase();

    const arrayBuffer = await archivo.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    let insertData: any = {
      titulo,
      instrumento,
      genero_musical: genero,
      usuario_id,
      fecha_creacion,
    };

    if (nombreArchivo.endsWith('.pdf')) {
      insertData.partitura_pdf = uint8Array; // GUARDAR bytes directos sin stringify
      insertData.partitura_mxl = null;
    } else if (nombreArchivo.endsWith('.mxl')) {
      insertData.partitura_pdf = null;
      insertData.partitura_mxl = uint8Array; // GUARDAR bytes directos sin stringify
    } else {
      alert('Solo puede subir archivos PDF o MXL.');
      return;
    }

    const { error } = await this.supabaseService.supabase
      .from('partituras')
      .insert(insertData);

    if (error) {
      console.error('Error al subir:', error);
      alert('Error al subir partitura.');
    } else {
      alert('¡Partitura subida con éxito!');
      this.router.navigate(['/partituras']);
    }
  }

  goToInstruments() {
    this.router.navigate(['/menu-instrumentos'], { replaceUrl: true });
  }

  onFileSelected1(event: any) {
  const archivo: File = event.target.files[0];
  if (!archivo || !archivo.name.endsWith('.pdf')) {
    alert('Debes seleccionar un archivo PDF válido.');
    return;
  }

  const lector = new FileReader();
  lector.onload = async () => {
    const buffer = lector.result as ArrayBuffer;
    const pdfBytes = new Uint8Array(buffer);

    const usuario = this.supabaseService.getUsuarioActual();
    const usuario_id = usuario?.id;
    const fecha_creacion = new Date().toISOString();

    const data = {
      titulo: 'Partitura PDF Directa',
      instrumento: 'Desconocido',
      genero_musical: 'Sin clasificar',
      usuario_id,
      fecha_creacion,
      partitura_pdf: pdfBytes,
      partitura_mxl: null
    };

    const { error } = await this.supabaseService.supabase
      .from('partituras')
      .insert(data);

    if (error) {
      console.error('Error al subir PDF:', error);
      alert('Ocurrió un error al subir el PDF');
    } else {
      alert('PDF subido correctamente como intento alternativo');
    }
  };

  lector.readAsArrayBuffer(archivo);
}
}
