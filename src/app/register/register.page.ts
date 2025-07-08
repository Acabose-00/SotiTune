import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SupabaseService } from '../services/supabase.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})
export class RegisterPage {
  nombre: string = '';
  correo: string = '';
  contra: string = '';
  errorMessage: string = '';

  constructor(
    private router: Router,
    private supabaseService: SupabaseService,
  ) {}

  async registrar() {
    this.errorMessage = '';

    // Validación básica de campos vacíos
    if (!this.nombre.trim() || !this.correo.trim() || !this.contra.trim()) {
      this.errorMessage = 'Rellena todos los campos';
      return;
    }

    // Validación de formato de correo
  const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!correoValido.test(this.correo)) {
    this.errorMessage = 'Ingresa un correo válido';
    return;
}


    try {
      const { data: existingUser, error: userError } = await this.supabaseService.getUserByEmail(this.correo);
      if (userError) throw userError;

      if (existingUser && existingUser.length > 0) {
        this.errorMessage = 'Este correo ya está registrado';
        return;
      }

      const perfil = await this.supabaseService.createUserProfile(
        this.nombre,
        this.correo,
        this.contra
      );

      if (perfil.error) throw perfil.error;


      const getLoggedUser = await this.supabaseService.login(this.correo, this.contra);
      if (getLoggedUser) {
        this.router.navigate(['/menu-instrumentos'], { replaceUrl: true });
      } else {
        throw new Error('No se pudo iniciar sesión automáticamente');
      }

    } catch (error: any) {
      this.errorMessage = 'Error al registrar: ' + (error.message || error);
    }
  }

  goToLogin() {
    this.router.navigate(['/home'], { replaceUrl: true });
  }

}
