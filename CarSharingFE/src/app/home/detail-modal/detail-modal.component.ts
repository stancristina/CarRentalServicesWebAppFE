import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Rental } from '../../shared/rental.model';
import { ApiService } from '../../shared/api.service';
import { CartService } from '../../shared/cart.service';

@Component({
  selector: 'app-detail-modal',
  templateUrl: './detail-modal.component.html',
  styleUrls: ['./detail-modal.component.css']
})
export class DetailModalComponent implements OnInit {
  @ViewChild('detailModal') modal: ModalDirective;
  rental = new Rental();
  car: string;
 

  constructor(private api: ApiService, private cart: CartService) { }

  ngOnInit() {}

  initialize(id: number): void {
    this.getRental(id);
    this.modal.show();
  }

  getRental(id: number) {
    this.api.getRental(id)
      .subscribe((data: Rental) => {
        this.rental = data;
      },
        (err: Error) => {
          console.log('err', err);

        });
  }

  addToCart(rental: Rental) {
    this.cart.add(rental);
    this.modal.hide();
  }
}
