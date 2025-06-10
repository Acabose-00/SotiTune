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

  // 📥 Registro de usuario
  async signUp(email: string, password: string) {
    return this.supabase.auth.signUp({ email, password });
  }

  // 🔐 Inicio de sesión
  async signIn(email: string, password: string) {
    return this.supabase.auth.signInWithPassword({ email, password });
  }

  // 🚪 Cerrar sesión
  async signOut() {
    return this.supabase.auth.signOut();
  }

  // 👤 Obtener usuario actual
  async getUser() {
    return this.supabase.auth.getUser();
  }

  // 🎼 Subir partitura
  async uploadPartitura(file: File, path: string) {
    return this.supabase.storage
      .from('partituras')
      .upload(path, file);
  }

  // 📦 Obtener partituras de un usuario
  async getPartituras(usuarioId: string) {
    return this.supabase
      .from('partituras')
      .select('*')
      .eq('usuario_id', usuarioId);
  }

  async createUserProfile(id: string, nombre: string, correo: string, contra: string) {
  // Inserta el perfil con el id que te entrega auth
  return this.supabase.from('Users').insert([
    {
      id,         // id que viene del usuario autenticado
      nombre,
      correo,
      contra,
      date_creation: new Date().toISOString()
    }
  ]);
}

}
