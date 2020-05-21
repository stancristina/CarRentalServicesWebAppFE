import { Component, EventEmitter, Output, ViewChild } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../shared/api.service';

import { ModalDirective } from 'ngx-bootstrap/modal';
import { Shop } from 'src/app/shared/shop.model';

@Component({
  selector: 'app-edit-shop-modal',
  templateUrl:'./edit-shop-modal.component.html',
  styleUrls: ['./edit-shop-modal.component.css']
})
export class EditShopModalComponent {
  @ViewChild('editShopModal') modal: ModalDirective;
  @Output() change: EventEmitter<string> = new EventEmitter<string>();
  editShopForm: FormGroup;
  currentShop = new Shop();


  constructor(public fb: FormBuilder, private api: ApiService) { }

  initialize(id: number): void {
    this.modal.show();
    this.api.getShop(id)
      .subscribe((data: Shop) => {
        this.currentShop = data;
        this.initializeFrom(this.currentShop);
      },
        (error: Error) => {
          console.log('err', error);

        });
  }

  initializeFrom(currentShop: Shop) {
    this.editShopForm = this.fb.group({
      name: [currentShop.name, Validators.required],
      cityId: [currentShop.cityId, Validators.required],
      
      
    });
  }

  editShop() {
    const editedShop = new Shop({
      id: this.currentShop.id,
      name: this.editShopForm.value.name,
      cityId: this.editShopForm.value.cityId,
    });

    this.api.editShop(editedShop)
      .subscribe(() => {
        //this.change.emit('shop');
        this.modal.hide();
      },
        (error: Error) => {
          console.log('err', error);
        });
  }

 /* getCars() {
    this.api.getCars()
      .subscribe((data: Car[]) => {
        this.cars = [];

        for (let i = 0; i < data.length; i++) {
          this.api.getCar(data[i].id)
            .subscribe((info: Car) => {
              info.id = data[i].id;
              this.cars.push(info);
            },
              (e: Error) => {
                console.log('err', e);
              });
        }

      },
        (error: Error) => {
          console.log('err', error);

        });



      }
      */
    }