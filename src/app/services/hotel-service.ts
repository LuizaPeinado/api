import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hotel } from '../interfaces/hotel';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  constructor(private http:HttpClient) { }

  getAllHotel(){
    return this.http.get<any>("http://192.168.15.14:3000/hotel")
  }
  createUser(hotel:Hotel){
    return this.http.post(`http://192.168.15.14:3000/hotel`,hotel)
  }
}
