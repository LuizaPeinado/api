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
    return this.http.get<any>("https://339b-2804-7f0-9281-aba4-1d2c-cbf3-291c-e171.ngrok-free.app/reservas")
  }
  createReserva(reserva:Reserva){
    return this.http.post(`https://339b-2804-7f0-9281-aba4-1d2c-cbf3-291c-e171.ngrok-free.app/reservas`,reserva)
  }
}
