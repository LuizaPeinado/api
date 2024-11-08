import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hotel } from '../interfaces/hotel';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  constructor(private http:HttpClient) { }

  getAllHotel(){
    return this.http.get<any>("https://339b-2804-7f0-9281-aba4-1d2c-cbf3-291c-e171.ngrok-free.app:3000/hotel")
  }
  createUser(hotel:Hotel){
    return this.http.post(`https://339b-2804-7f0-9281-aba4-1d2c-cbf3-291c-e171.ngrok-free.app:3000/hotel`,hotel)
  }
}
