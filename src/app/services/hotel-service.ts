import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hotel } from '../interfaces/hotel';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private url = 'https://afd5-2804-214-90e3-6d5-c0c6-61bc-579d-2638.ngrok-free.app/hotel'


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
