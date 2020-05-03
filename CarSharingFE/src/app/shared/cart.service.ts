
import {Injectable} from '@angular/core';
import {Rental} from './rental.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  rentals: Rental[] =[];


  constructor() {

  }

  add(rental: Rental){
    this.rentals.push(rental);

  }

  get() {
    return this.rentals;
  }


}
