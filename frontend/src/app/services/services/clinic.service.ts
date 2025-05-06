import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class ClinicService {

  constructor(private http:HttpClient, private token:TokenService) { }

  create(data: any) {
    return this.http.post('http://localhost:8000/api/login', data);
  }
}

