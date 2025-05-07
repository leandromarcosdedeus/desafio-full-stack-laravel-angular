import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class ClinicService {


  httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token') + ' ' + localStorage.getItem('access_token')
    })
  };

  constructor(private http:HttpClient, private token:TokenService) { }


  create(data: any) {
    return this.http.post('http://localhost:8000/api/clinic', data, this.httpOptions);
  }
  list(){
    console.log('httpOptions', this.httpOptions)
    return this.http.get('http://localhost:8000/api/clinic', this.httpOptions);
  }
}

