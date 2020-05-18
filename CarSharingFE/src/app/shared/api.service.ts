import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Car } from './car.model';
import { City } from './city.model';
import { Client } from './client.model';
import { Shop } from './shop.model';


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

  getClients() {
    return this.http.get(this.baseUrl + '/client/', { headers: this.header });
  }

  getCities() {
    return this.http.get(this.baseUrl + '/city', { headers: this.header });
  }

  getShops() {
    return this.http.get(this.baseUrl + '/shop', { headers: this.header });
  }


  addCar(car: Car) {
    return this.http.post(this.baseUrl + '/car', car, { headers: this.header });
  }

  addCity(city: City) {
    return this.http.post(this.baseUrl + '/city', city, { headers: this.header });
  }

  addClient(client: Client) {
    return this.http.post(this.baseUrl + '/client', client, { headers: this.header });
  }

  addShop(shop: Shop) {
    return this.http.post(this.baseUrl + '/shop', shop, { headers: this.header });
  }

  addRental(rental) {
    return this.http.post(this.baseUrl + '/rental', {
      'dStartDate': rental.dStartDate,
      'period': rental.period,
      'carId': rental.carId,
      'clientId': rental.clientId
    }, { headers: this.header });

  }

  deleteRental(id: Number) {
    return this.http.delete(this.baseUrl + '/rental/' + id.toString(), { headers: this.header }).subscribe();
  }
}

