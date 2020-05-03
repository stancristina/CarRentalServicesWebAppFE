import { Component, OnInit, ViewChild } from '@angular/core';
import { Rental } from 'src/app/shared/rental.model';
import { CartService } from 'src/app/shared/cart.service';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.css']
})
export class CartModalComponent implements OnInit {
  @ViewChild('cartModal') modal: ModalDirective;
  rentals: Rental[] = [];


  constructor(private cartService: CartService) { }

  ngOnInit(): void {
  }

  initialize() {
    this.modal.show();
    this.rentals = this.cartService.get();
  }

  delete(id: number) {
    this.rentals.splice(id, 1);
  }
}
