
import {Injectable} from '@angular/core';
import {Rental} from './rental.model';
import {Car} from './car.model';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
 

  rentals: Rental[];
  localStorageKey: string;

  constructor(private api: ApiService) {
    this.localStorageKey = "cart-rentals";
    this.rentals = [];
    var idsList = this.getFromLocalStorage();
    for(let i = 0; i < idsList.length; i ++) {
      this.api.getRental(idsList[i]).subscribe((data: Rental) => {
        if(data.id != 0) {
          this.rentals.push(data);
        }
      },
        (er: Error) => {
          console.log('err', er);
        });
    }
  }

  getFromLocalStorage() {
    var _localStorageData = localStorage.getItem(this.localStorageKey);
    if(_localStorageData != undefined) {
      return _localStorageData.split("-").map(p => parseInt(p));
    } else {
      return [];
    }
  }

  add(rental: Rental){
    var isPresent = false;
    for(let i = 0; i < this.rentals.length; i ++) {
      if(this.rentals[i].id == rental.id) {
        isPresent = true;
      }
    }
    if(!isPresent) {
      this.rentals.push(rental);
    }
    return this.rentals;
  }

  delete(id) {
    this.rentals.splice(id, 1);
    return this.rentals;
  }

  updateLocalStorage() {
    var idsList = [];
    for(let i = 0; i < this.rentals.length; i ++) {
      idsList.push(this.rentals[i].id);
    }
    localStorage.setItem(this.localStorageKey, idsList.map(p => p.toString()).join("-"));
  }

  get() {
    return this.rentals;
  }

}
