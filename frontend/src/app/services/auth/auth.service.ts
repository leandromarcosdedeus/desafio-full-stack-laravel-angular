import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { TokenService } from '../token/token.service';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.token.loggedIn())
  authStatus = this.loggedIn.asObservable();

  changeAuthStatus(value:boolean){
    this.loggedIn.next();
  }

  constructor(private http:HttpClient, private token:TokenService) { }

  login(data: any) {
    return this.http.post('http://localhost:8000/api/login', data);
  }
}
