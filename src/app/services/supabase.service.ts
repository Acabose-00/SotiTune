// src/app/services/supabase.service.ts
import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseAnonKey);
  }

  async signUp(email: string, password: string) {
    return await this.supabase.auth.signUp({
      email,
      password,
    });
  }

  async createUserProfile(userId: string, nombre: string, correo: string, contra: string) {
    return await this.supabase
      .from('usuarios')
      .insert([{
        id: userId,
        correo,
        contra,
        nombre,
        fecha_creacion: new Date().toISOString(),
      }]);
  }

}
