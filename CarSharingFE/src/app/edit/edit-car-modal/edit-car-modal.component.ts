import { Component, EventEmitter, Output, ViewChild } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../shared/api.service';

import { ModalDirective } from 'ngx-bootstrap/modal';
import { Car } from 'src/app/shared/car.model';

@Component({
  selector: 'app-edit-car-modal',
  templateUrl:'./edit-car-modal.component.html',
  styleUrls: ['./edit-car-modal.component.css']
})
export class EditCarModalComponent {
  @ViewChild('editCarModal') modal: ModalDirective;
  @Output() change: EventEmitter<string> = new EventEmitter<string>();
  editCarForm: FormGroup;
  currentCar = new Car();


  constructor(public fb: FormBuilder, private api: ApiService) { }

  initialize(id: number): void {
    this.modal.show();
    this.api.getCar(id)
      .subscribe((data: Car) => {
        this.currentCar = data;
        this.initializeFrom(this.currentCar);
      },
        (error: Error) => {
          console.log('err', error);

        });
  }

  initializeFrom(currentCar: Car) {
    this.editCarForm = this.fb.group({
      model: [currentCar.model, Validators.required],
      shopId: [currentCar.shopId, Validators.required],
      
      
    });
  }

  editCar() {
    const editedCar = new Car({
      id: this.currentCar.id,
      model: this.editCarForm.value.modal,
      shopId: this.editCarForm.value.shopId,
    });

    this.api.editCar(editedCar)
      .subscribe(() => {
        this.change.emit('car');
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