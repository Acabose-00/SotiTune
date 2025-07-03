import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  public supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseAnonKey);
  }

  // Crear nuevo usuario en tabla personalizada
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

  // Iniciar sesión (consulta personalizada)
  async login(email: string, password: string): Promise<boolean> {
    try {
      const { data, error } = await this.supabase
        .from('usuarios')
        .select('*')
        .eq('correo', email)
        .eq('contra', password)
        .single();

      if (error || !data) {
        throw error;
      }

      sessionStorage.setItem('sesion', JSON.stringify(data));
      return true;

    } catch (err) {
      console.error('Error en login:', err);
      return false;
    }
  }

  // Cerrar sesión
  async logout(): Promise<void> {
    try {
      await this.supabase.auth.signOut(); // Aunque no estés usando auth, lo dejas por si lo activas más adelante
      sessionStorage.removeItem('sesion');
    } catch (error) {
      throw error;
    }
  }

  // Obtener usuario por correo
  async getUserByEmail(correo: string) {
    return await this.supabase
      .from('usuarios')
      .select('*')
      .eq('correo', correo)
      .limit(1);
  }

  // ✅ Obtener el usuario actualmente logueado desde sessionStorage
  getUsuarioActual() {
    const sesion = sessionStorage.getItem('sesion');
    return sesion ? JSON.parse(sesion) : null;
  }

  async getPartituras() {
    const { data, error } = await this.supabase
      .from('partituras')
      .select('*');
    if (error) throw error;
    return data;
  }
}
