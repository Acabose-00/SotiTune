import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonInput, IonItem, IonLabel, IonText } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonButton, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonItem, IonLabel, IonText, FormsModule],
})
export class HomePage {
  correo: string = '';
  contrasena: string = '';
  errorMessage: string = '';
  SesionActiva: boolean = false;

  constructor(private router: Router, private auth: AuthService, private supabase: SupabaseService) {}

  goToPage() {
    this.router.navigate(['/menu-instrumentos'], {replaceUrl:true});
  }

    goToRegister() {
    this.router.navigate(['register'], {replaceUrl:true});
  }

  async iniciarSesion() {
    if (!this.correo || !this.contrasena) {
      this.errorMessage = 'Por favor, complete ambos campos.';
    } else {
      this.errorMessage = '';
      const loginCorrecto = await this.supabase.login(this.correo, this.contrasena);
      if (loginCorrecto) {

        this.router.navigate(['menu-instrumentos'], {replaceUrl:true});
      } else  { 
        this.errorMessage = 'Usuario o contraseña incorrectos'
      }
    }
  }

}
