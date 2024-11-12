import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hotel } from '../interfaces/hotel';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private url = 'https://9a6a-2804-389-77-bc4e-8cf2-d3b4-4466-31c2.ngrok-free.app/hotel'


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
