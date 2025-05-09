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
        'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('token')
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
  edit(id: number){
    console.log('httpOptions', this.httpOptions)
    return this.http.get('http://localhost:8000/api/clinic/show/'+id, this.httpOptions);
  }
  update(id: number, data: any) {
    return this.http.put(`http://localhost:8000/api/clinic/`+id, data, this.httpOptions);
  }

  delete(id: number) {
    return this.http.delete(`http://localhost:8000/api/clinic/${id}`, this.httpOptions);
  }

}

