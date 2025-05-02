import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonInput, IonItem, IonLabel, IonList, IonText } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonButton, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonItem, IonLabel, IonList, IonText, FormsModule],
})
export class HomePage {
  correo: string = '';
  contrasena: string = '';
  errorMessage: string = ''; // Mensaje de error

  constructor(private router: Router) {}

  goToPage() {
    this.router.navigate(['/menu-instrumentos']);
  }

  iniciarSesion() {
    if (!this.correo || !this.contrasena) {
      this.errorMessage = 'Por favor, complete ambos campos.';
    } else {
      this.errorMessage = '';
      // Aquí podrías validar las credenciales si quieres más adelante
      this.router.navigate(['/menu-usuario']);
    }
  }
}
