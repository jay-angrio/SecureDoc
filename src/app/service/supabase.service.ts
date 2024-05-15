import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  [x: string]: any;
  supabase: SupabaseClient;
  login = false;

  constructor() {
    this.supabase = createClient(
      environment.supabase.supabaseUrl,
      environment.supabase.supabaseApiKey
    );
  }

  async signUpUser(email: string, password: string) {
    return this.supabase.auth.signUp({
      email: email,
      password: password,
    });
  }

  async signInUser(body: any) {
    return this.supabase.auth.signInWithPassword(body);
  }

  async addUser(userDetails: any) {
    return await this.supabase.from('users').insert(userDetails).select('*');
  }

  async getUserId(id: string) {
    return await this.supabase.from('users').select('*').eq('userId', id);
  }

  async signOut() {
    return await this.supabase.auth.signOut();
  }

  async uploadImage(fileName: string, compressedImage: File): Promise<string> {
    return await new Promise(async (resolve, reject) => {
      const supa = createClient(
        environment.supabase.supabaseUrl,
        environment.supabase.supabaseApiKey
      );
      const { data, error } = await supa.storage
        .from('documents')
        .upload(fileName, compressedImage);
      if (error) {
        resolve(error.message);
        return;
      }
      console.log('Supabase service:', data);
      resolve(data.path);
    });
  }

  async addData(documents: any) {
    return await this.supabase.from('data').insert(documents).select('*');
  }

  async getDocuments(userId: string) {
    return await this.supabase.from('data').select('*').eq('userId', userId);
  }

  async getDocumentId(id: string) {
    console.log('id', id);

    return await this.supabase.from('data').select('*').eq('id', id);
  }
}
