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

  async createUserProfile(nombre: string, correo: string, contra: string) {
    return await this.supabase
      .from('usuarios')
      .insert([{
        correo,
        contra,
        nombre,
        fecha_creacion: new Date().toISOString(),
      }]);
  }

  async login(email: string, password: string): Promise<boolean> {
    try {
      const { data, error } = await this.supabase
        .from('usuarios')
        .select('*')
        .eq('correo', email)
        .eq('contra', password)
        .single();

      if (error || !data) {
        throw error
      }

      sessionStorage.setItem('sesion', JSON.stringify(data));
      return true;

    } catch (err) {
      console.error('Error en login:', err);
      return false;
    }
  }


    async logout(): Promise<void> {
      try {
        await this.supabase.auth.signOut();
        sessionStorage.removeItem('sesion');
      } catch (error) {
        throw error;
      }
  }

  async getUserByEmail(correo: string) {
      return await this.supabase
        .from('usuarios')
        .select('*')
        .eq('correo', correo)
        .limit(1);
    }

}
