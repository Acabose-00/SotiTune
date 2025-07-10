import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
  providers: [AndroidPermissions]  // <-- Aquí lo agregas
})
export class AppComponent implements OnInit {
  constructor(private androidPermissions: AndroidPermissions) {}

  async ngOnInit() {
    await this.solicitarPermisoMicrofono();
  }

  async solicitarPermisoMicrofono() {
    try {
      const result = await this.androidPermissions.checkPermission('android.permission.RECORD_AUDIO');
      if (!result.hasPermission) {
        const requestResult = await this.androidPermissions.requestPermission('android.permission.RECORD_AUDIO');
        if (!requestResult.hasPermission) {
          alert('Se requiere permiso de micrófono para que la app funcione correctamente.');
        }
      }
      console.log('Permiso de micrófono concedido');
    } catch (error) {
      console.error('Error al solicitar permiso de micrófono:', error);
    }
  }
}
