import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<any>('http://192.168.15.14:3000/users');
  }
  createUser(user: User) {
    return this.http.post(`http://192.168.15.14:3000/users`, user);
  }
}
