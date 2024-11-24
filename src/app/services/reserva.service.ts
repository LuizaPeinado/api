import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hotel } from '../interfaces/hotel';
import { Reserva } from '../interfaces/reserva';

@Injectable({
  providedIn: 'root'
})
export class ReservaHotel {

  private url = 'https://a8c6-187-34-245-193.ngrok-free.app/reservas'

  constructor(private http:HttpClient) { }

  getAllReserva(){
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true'  // Define o cabeçalho para evitar o aviso do ngrok
    });
    return this.http.get<any>(this.url, {headers})
  }
  createReserva(reserva:Reserva){
    return this.http.post(this.url,reserva)
  }
}
