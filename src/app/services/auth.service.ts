import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private sesionActiva = false;

  constructor() {

    this.sesionActiva = localStorage.getItem('SesionActiva') === 'true';
  }

  login(correo: string, contrasena: string): void {
    localStorage.setItem('correo', correo);
    localStorage.setItem('contrasena', contrasena);
    localStorage.setItem('SesionActiva', 'true');
    this.sesionActiva = true;
  }

  logout(): void {
    localStorage.clear();
    this.sesionActiva = false;
  }

  isSesionActiva(): boolean {
    return this.sesionActiva;
  }
}
