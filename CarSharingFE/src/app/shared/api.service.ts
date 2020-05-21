import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Car } from './car.model';
import { City } from './city.model';
import { Client } from './client.model';
import { Shop } from './shop.model';
import { EditRentalModalComponent } from '../edit/edit-rental-modal/edit-rental-modal.component';
import { EditCarModalComponent } from '../edit/edit-car-modal/edit-car-modal.component';
import { Rental } from './rental.model';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  

  constructor(private http: HttpClient) {}

  header = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  baseUrl = 'https://localhost:44376/api';
 
  editRental(rental: Rental) {
    return this.http.put(this.baseUrl + '/rental/' + rental.id.toString(), {
      'carModel': rental.carModel,
      'clientFirstName':rental.clientFirstName,
      'clientLastName':rental.clientLastName,
      'dStartDate':rental.dStartDate,
      'period':rental.period
    }, { headers: this.header })
  

}

  editClient(client: Client) {
    return this.http.put(this.baseUrl + '/client/' + client.id.toString(),{
      'cnp':client.cnp,
      'firstName':client.firstName,
      'lastName':client.lastName,
      'address':client.address
    }, { headers: this.header })
}
  editCar(car: Car) {
  return this.http.put(this.baseUrl + '/car/' + car.id.toString(),{
    'model':car.model,
    'shopId':car.shopId
  }, { headers: this.header })
}

editShop(shop: Shop) {
  return this.http.put(this.baseUrl + '/shop/' + shop.id.toString(),{
    'name':shop.name,
    'cityId':shop.cityId
  }, { headers: this.header })
}
  deleteRental(id:number){
    return this.http.delete(this.baseUrl + '/rental/' + id.toString(), { headers: this.header });

  }

  deleteCar(id: number) {
    return this.http.delete(this.baseUrl + '/car/' + id.toString(), { headers: this.header });
  }

  deleteClient(id: number) {
    return this.http.delete(this.baseUrl + '/client/' + id.toString(), { headers: this.header });
  }

  deleteShop(id: number) {
    return this.http.delete(this.baseUrl + '/shop/' + id.toString(), { headers: this.header });
  }

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

  getShop(id:number){
    return this.http.get(this.baseUrl + '/shop/' + id.toString(), { headers: this.header });

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

 
}

