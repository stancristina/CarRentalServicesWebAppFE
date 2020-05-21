import { Component, EventEmitter, Output, ViewChild } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../shared/api.service';
import { Rental } from '../../shared/rental.model';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Car } from 'src/app/shared/car.model';

@Component({
  selector: 'app-edit-rental-modal',
  templateUrl:'./edit-rental-modal.component.html',
  styleUrls: ['./edit-rental-modal.component.css']
})
export class EditRentalModalComponent {
  cars:Car[]=[];
  @ViewChild('editRentalModal') modal: ModalDirective;
  @Output() change: EventEmitter<string> = new EventEmitter<string>();
  editRentalForm: FormGroup;
  currentRental = new Rental();


  constructor(public fb: FormBuilder, private api: ApiService) { }

  initialize(id: number): void {
    this.modal.show();
    this.api.getRental(id)
      .subscribe((data: Rental) => {
        this.currentRental = data;
        this.initializeFrom(this.currentRental);
      },
        (error: Error) => {
          console.log('err', error);

        });
  }

  initializeFrom(currentRental: Rental) {
    this.editRentalForm = this.fb.group({
      carModel: [currentRental.carModel, Validators.required],
      clientFirstName: [currentRental.clientFirstName, Validators.required],
      clientLastName: [currentRental.clientLastName,Validators.required],
      dStartDate: [currentRental.dStartDate, Validators.required],
      period: [currentRental.period, Validators.required],
      
    });
  }

  editRental() {
    const editedRental = new Rental({
      id: this.currentRental.id,
      carModel: this.editRentalForm.value.carModel,
      clientFirstName: this.editRentalForm.value.clientFirstName,
      clientLastName: this.editRentalForm.value.clientLastName,
      dStartDate: this.editRentalForm.value.dStartDate,
      period: this.editRentalForm.value.period,
      
    });

    this.api.editRental(editedRental)
      .subscribe(() => {
        //this.change.emit('rental');
        this.modal.hide();
      },
        (error: Error) => {
          console.log('err', error);
        });
  }

  getCars() {
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
    }