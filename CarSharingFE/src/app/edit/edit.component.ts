import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { Rental } from '../shared/rental.model';
import { EditRentalModalComponent } from './edit-rental-modal/edit-rental-modal.component';
import { Car } from '../shared/car.model';
import { EditCarModalComponent } from './edit-car-modal/edit-car-modal.component';
import { EditShopModalComponent } from './edit-shop-modal/edit-shop-modal.component';
import { Shop } from '../shared/shop.model';
import { Client } from '../shared/client.model';
import { EditClientModalComponent } from './edit-client-modal/edit-client-modal.component';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  rentals: Rental[] = [];
  cars:Car[]=[];
  shops:Shop[]=[];
  clients:Client[]=[];
  @ViewChild('editRentalModal') editRentalModal: EditRentalModalComponent;
  @ViewChild('editCarModal') editCarModal:EditCarModalComponent;
  @ViewChild('editShopModal') editShopModal:EditShopModalComponent;
  @ViewChild('editClientModal') editClientModal:EditClientModalComponent;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getRentals();
    this.getCars();
    this.getShops();
    this.getClients();
    
    this.api.getCars().subscribe((data: Car[]) => {
      this.cars = data;
    },
    (er: Error) => {
      console.log('err', er);
    });
  }
  getClients() {
    this.api.getClients()
      .subscribe((data: Client[]) => {
        this.clients = data;
      },
        (error: Error) => {
          console.log('err', error);
        });
  }
  getCars() {
    this.api.getCars()
      .subscribe((data: Car[]) => {
        this.cars = data;
      },
        (error: Error) => {
          console.log('err', error);
        });
  }

  getRentals() {
    this.api.getRentals()
      .subscribe((data: Rental[]) => {
        this.rentals = data;
      },
        (error: Error) => {
          console.log('err', error);
        });
  }

  getShops() {
    this.api.getShops()
      .subscribe((data: Shop[]) => {
        this.shops = data;
      },
        (error: Error) => {
          console.log('err', error);
        });
  }

  deleteRental(id: number) {
    this.api.deleteRental(id)
      .subscribe(() => {
        this.getRentals();
      },
        (error: Error) => {
          console.log(error);
        });
  }

  deleteCar(id: number) {
    this.api.deleteCar(id)
      .subscribe(() => {
        this.getCars();
      },
        (error: Error) => {
          console.log(error);
        });
  }

  deleteShop(id: number) {
    this.api.deleteShop(id)
      .subscribe(() => {
        this.getShops();
      },
        (error: Error) => {
          console.log(error);
        });
  }

  deleteClient(id: number) {
    this.api.deleteClient(id)
      .subscribe(() => {
        this.getShops();
      },
        (error: Error) => {
          console.log(error);
        });
  }

  showM1(id: number) {
    this.editRentalModal.initialize(id);
  }

  showM2(id:number){
    this.editCarModal.initialize(id);
  }

  showM3(id:number){
    this.editShopModal.initialize(id);
  }
  
  showM4(id:number){
    
    this.editClientModal.initialize(id);
  }
  onEditFinished(event: string) {
    if (event === 'rental') {
      this.getRentals();
    }
    if(event==='car'){
      this.getCars();
    }
    if(event==='shop'){
      this.getShops();
    }
    if(event==='client'){
      this.getClients();
    }
  
  }

}
