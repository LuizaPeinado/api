import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  private url = 'https://5282-2804-7f0-9281-aba4-1d2c-cbf3-291c-e171.ngrok-free.app/users'

  getAll() {
    return this.http.get<any>(this.url);
  }
  createUser(user: User) {
    return this.http.post(this.url, user);
  }
  getHotels() {
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
