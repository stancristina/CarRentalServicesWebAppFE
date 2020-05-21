import { Component, EventEmitter, Output, ViewChild } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../shared/api.service';
import { Client } from '../../shared/client.model';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Car } from 'src/app/shared/car.model';

@Component({
  selector: 'app-edit-client-modal',
  templateUrl:'./edit-client-modal.component.html',
  styleUrls: ['./edit-client-modal.component.css']
})
export class EditClientModalComponent {
  clients:Client[]=[]
  @ViewChild('editClientModal') modal: ModalDirective;
  @Output() change: EventEmitter<string> = new EventEmitter<string>();
  editClientForm: FormGroup;
  currentClient = new Client();


  constructor(public fb: FormBuilder, private api: ApiService) { }

  initialize(id: number): void {
    this.modal.show();
    this.api.getClient(id)
      .subscribe((data: Client) => {
        this.currentClient = data;
        this.initializeFrom(this.currentClient);
      },
        (error: Error) => {
          console.log('err', error);

        });
  }

  initializeFrom(currentClient: Client) {
    this.editClientForm = this.fb.group({
      cnp: [currentClient.cnp, Validators.required],
      firstName: [currentClient.firstName, Validators.required],
      lastName: [currentClient.lastName,Validators.required],
      address: [currentClient.address, Validators.required],
      
    });
  }

  editClient() {
    const editedClient = new Client({
      id: this.currentClient.id,
      cnp: this.editClientForm.value.cnp,
      firstName: this.editClientForm.value.firstName,
      lastName: this.editClientForm.value.lastName,
      address: this.editClientForm.value.address,
      
    });

    this.api.editClient(editedClient)
      .subscribe(() => {
        //this.change.emit('rental');
        this.modal.hide();
      },
        (error: Error) => {
          console.log('err', error);
        });
  }

  getClients() {
    this.api.getClients()
      .subscribe((data: Client[]) => {
        this.clients = [];

        for (let i = 0; i < data.length; i++) {
          this.api.getClient(data[i].id)
            .subscribe((info: Client) => {
              info.id = data[i].id;
              this.clients.push(info);
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