import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SupabaseService } from '../services/supabase.service';


 // instala npm install @solana/wallet-standard-features SI TE ARROJA ERROR SOLANA_WALLET_STANDARD_FEATURES
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],  // ¡NO se pone el servicio aquí!
})
export class RegisterPage {
  nombre: string = '';
  correo: string = '';
  contra: string = '';

  // El servicio se inyecta en el constructor con minúscula para la propiedad
  constructor(
    private router: Router,
    private supabaseService: SupabaseService
  ) {}

  async registrar() {
    try {
      const { data, error } = await this.supabaseService.signUp(this.correo, this.contra);

      if (error) throw error;

      console.log(data.user)
      if (data.user) {
        const authUserId = data.user.id;

        const perfil = await this.supabaseService.createUserProfile(authUserId, this.nombre, this.correo, this.contra);

        if (perfil.error) throw perfil.error;

        alert('Registro exitoso');
        this.router.navigate(['/home'], { replaceUrl: true });
      }
    } catch (error: any) {
      console.error('Error en registro:', error);
      alert('Error al registrar: ' + (error.message || error));
    }
  }
}
