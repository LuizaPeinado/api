import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hotel } from '../interfaces/hotel';
import { Reserva } from '../interfaces/reserva';

@Injectable({
  providedIn: 'root'
})
export class ReservaHotel {

  constructor(private http:HttpClient) { }

  getAllReserva(){
    return this.http.get<any>("http://192.168.15.14:3000/reservas")
  }
  createReserva(reserva:Reserva){
    return this.http.post(`http://192.168.15.14:3000/reservas`,reserva)
  }
}
