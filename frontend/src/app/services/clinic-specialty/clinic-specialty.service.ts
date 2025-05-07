import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class ClinicSpecialtyService {

  httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('token')
    })

  }
  constructor(private http:HttpClient, private token:TokenService) { }

  getSpecialty(){
    return this.http.get('http://localhost:8000/api/clinic-specialty', this.httpOptions);
  }
}
