import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hotel } from '../interfaces/hotel';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  constructor(private http:HttpClient) { }

  getAllHotel(){
    return this.http.get<any>("https://10.0.2.2:3000/hotel")
  }
  createUser(hotel:Hotel){
    return this.http.post(`https://10.0.2.2:3000/hotel`,hotel)
  }
}
