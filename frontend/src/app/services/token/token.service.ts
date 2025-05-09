import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  handle(token: string) {
    const fullToken = token;
    this.set(fullToken);
  }


  set(token: any){
    localStorage.setItem('token_type', token.token_type)
    return localStorage.setItem('token', token.access_token);
  }
  get(){
    return localStorage.getItem('token');
  }
  remove(){
    localStorage.removeItem('token_type');
    return localStorage.removeItem('token');
  }

  isValid(){
    const token = this.get();
    if(token){
      const payload = this.payload(token);
      if(payload){
        return (payload.iss==="http://localhost:8000/api/login")?true:false;
      }
    }
    return false;
  }
  payload(token: any){
    const payload = token.split('.')[1];
    return this.decode(payload);
  }
  decode(payload: any){
    try {
      return JSON.parse(atob(payload));
    } catch (e) {
      return null;
    }
  }

  loggedIn(){
    return this.isValid()
  }
}
