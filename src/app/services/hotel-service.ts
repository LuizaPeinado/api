import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hotel } from '../interfaces/hotel';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private url = 'https://8a7e-2804-7f0-9282-89c-4869-3742-56ff-7513.ngrok-free.app/hotel'


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
