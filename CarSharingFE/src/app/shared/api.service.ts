import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  header = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  baseUrl = 'https://localhost:44376/api';
 
  getRental(id: number) {
    return this.http.get(this.baseUrl + '/rental/' + id.toString(), { headers: this.header });
  }

  getRentals() {
    return this.http.get(this.baseUrl + '/rental', { headers: this.header });
  }

  getCar(id: number) {
    return this.http.get(this.baseUrl + '/car/' + id.toString(), { headers: this.header });
  }

  getCars() {
    return this.http.get(this.baseUrl + '/car', { headers: this.header });
  }

  getClient(id: number) {
    return this.http.get(this.baseUrl + '/client/' + id.toString(), { headers: this.header });
  }

  getClients(id: number) {
    return this.http.get(this.baseUrl + '/client/', { headers: this.header });
  }
}

