import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<any>('https://339b-2804-7f0-9281-aba4-1d2c-cbf3-291c-e171.ngrok-free.app/users');
  }
  createUser(user: User) {
    return this.http.post(`https://339b-2804-7f0-9281-aba4-1d2c-cbf3-291c-e171.ngrok-free.app/users`, user);
  }
}
