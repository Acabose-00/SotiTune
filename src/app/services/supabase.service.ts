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
    function hexToUint8Array(hex: string): Uint8Array {
      if (hex.startsWith('\\x')) {
        hex = hex.slice(2);
      }
      const bytes = new Uint8Array(hex.length / 2);
      for (let i = 0; i < hex.length; i += 2) {
        bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
      }
  return bytes;
}
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
      console.log(sessionStorage.getItem('sesion'));
      const sesion = JSON.parse(sessionStorage.getItem('sesion') || '{}');
      console.log(sesion.id);
      return true;

    } catch (err) {
      console.error('Error en login:', err);
      return false;
    }
  }

  // Cerrar sesión
  async logout(): Promise<void> {
    try {
      await this.supabase.auth.signOut();
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

  getUsuarioActual() {
    const sesion = sessionStorage.getItem('sesion');
    return sesion ? JSON.parse(sesion) : null;
  }

  async getPartituras(userId: string) {
    const { data, error } = await this.supabase
      .rpc('get_partitura_info', { user_id: userId });

    if (error) throw error;
    return data;
  }

  async gestionarFavoritos(partitura: any, usuario_id: any) {
    const partitura_id = partitura;

    console.log(partitura_id, typeof(partitura_id))

    const { data, error: selectError } = await this.supabase
      .from('partituras_valoraciones')
      .select('*')
      .eq('usuario_id', usuario_id)
      .eq('partitura_id', partitura_id);

    if (selectError) {
      console.error('Error al consultar favoritos:', selectError);
      return;
    }

    console.log(data)
    if (data.length > 0) {
      const { error: deleteError } = await this.supabase
        .from('partituras_valoraciones')
        .delete()
        .eq('usuario_id', usuario_id)
        .eq('partitura_id', partitura_id);

      if (deleteError) {
        console.error('Error al eliminar favorito:', deleteError);
      } else {
        console.log('Favorito eliminado');
      }
      return false;
    } else {
      const { error: insertError } = await this.supabase
        .from('partituras_valoraciones')
        .insert([{ usuario_id, partitura_id }]);

      if (insertError) {
        console.error('Error al agregar favorito:', insertError);
      } else {
        console.log('Favorito agregado');
      }
      return true;
    }
  }

  

  async getPartituraById(id: number) {
    const { data, error } = await this.supabase
      .from('partituras')
      .select('id, partitura_pdf, partitura_mxl')
      .eq('id', id)
      .single();
  
    if (error) {
      console.error('Error al obtener partitura por ID:', error);
      return null;
    }
  
    return data;
  }
  
  
}
