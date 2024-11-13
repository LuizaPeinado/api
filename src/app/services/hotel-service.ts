import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hotel } from '../interfaces/hotel';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private url = 'https://8011-2804-389-77-bc4e-b5d8-f54a-8b52-ccab.ngrok-free.app/hotel'


  constructor(private http:HttpClient) { }

  getAllHotel(){
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true'  // Define o cabeçalho para evitar o aviso do ngrok
    });
    return this.http.get<any>(this.url,{headers})
  }
  createUser(hotel:Hotel){
    return this.http.post(this.url,hotel)
  }
}
