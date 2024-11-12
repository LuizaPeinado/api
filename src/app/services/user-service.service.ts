import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  private url = 'https://8a7e-2804-7f0-9282-89c-4869-3742-56ff-7513.ngrok-free.app/users'

  getAll() {
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true'  // Define o cabeçalho para evitar o aviso do ngrok
    });

    return this.http.get<any>(this.url,{headers});
  }
  createUser(user: User) {
    return this.http.post(this.url, user);
  }
  getHotels() {
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true'  // Define o cabeçalho para evitar o aviso do ngrok
    });



    return this.http.get(this.url, { responseType: 'text' as 'json' }).pipe(
      catchError(this.handleError)
    ).subscribe(response => {
      try {
        // Tenta fazer o parse para JSON
        const data = JSON.parse(response as string);
        console.log('Resposta JSON:', data);
      } catch (e) {
        console.warn('Resposta não está no formato JSON:', response);
      }
    });
  }
  

    // Tratamento de erros
    private handleError(error: HttpErrorResponse) {
      let errorMessage = 'Erro desconhecido!';
      if (error.error instanceof ErrorEvent) {
        errorMessage = `Erro do lado do cliente: ${error.error.message}`;
      } else {
        errorMessage = `Erro do lado do servidor: ${error.status}, ` + `Mensagem: ${error.message}`;
      }
      console.error(errorMessage);
      return throwError(errorMessage);
    }
}
