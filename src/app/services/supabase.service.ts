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

  async login(email: string, password: string): Promise<boolean> {
    try {
      alert("INTENTO DE BALATREARSE");

      const { data, error } = await this.supabase
        .from('usuarios')
        .select('*')
        .eq('correo', email)
        .eq('contra', password)
        .single();

      if (error || !data) {
        console.log("USUARIO NO ENCONTRADO");
        return false;
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
        alert("SE ACABO LA FAMILIA BALATRO")
        await this.supabase.auth.signOut();
        sessionStorage.removeItem('sesion');
      } catch (error) {
        console.error('Error al cerrar sesión:', error);
        throw error;
      }
  }

}
