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
    return this.http.get<any>("https://10.0.2.2:3000/reservas")
  }
  createReserva(reserva:Reserva){
    return this.http.post(`https://10.0.2.2:3000//reservas`,reserva)
  }
}
