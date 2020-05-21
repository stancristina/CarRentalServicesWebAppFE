import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { City } from '../shared/city.model';
import { Car } from '../shared/car.model';
import { Shop } from '../shared/shop.model';
import { Client } from '../shared/client.model';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  options = ['Rental', 'Car', 'City', 'Shop', 'Client'];
  selectedOption = 'Car';
  currentFormRef: any;
  addRentalForm: FormGroup;
  addCarForm: FormGroup;
  addCityForm: FormGroup;
  addClientForm: FormGroup;
  addShopForm: FormGroup;
  success: boolean;
  cities: City[];
  cars: Car[];
  shops: Shop[];
  clients: Client[];


  constructor(public fb: FormBuilder, private api: ApiService) { }


  ngOnInit() {

    this.addRentalForm = this.fb.group({
      dStartDate: [null, Validators.required],
      period: [null, Validators.required],
      carId: [-1, Validators.min(0)],
      clientId: [-1, Validators.min(0)]
    });

    this.addCarForm = this.fb.group({
      model: [null, Validators.required],
      shopId: [-1, Validators.min(0)],
    });

    this.addCityForm = this.fb.group({
      name: [null, Validators.required],
      country: [null, Validators.required],
    });

    this.addShopForm = this.fb.group({
      name: [null, Validators.required],
      cityId: [-1, Validators.min(0)],
    });

    this.addClientForm = this.fb.group({
      cnp: [null, Validators.required],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      address: [null, Validators.required],
    });

    this.currentFormRef = this['add' + this.selectedOption + 'Form'];

    this.api.getCities().subscribe((data: City[]) => {
      this.cities = data;
    },
    (er: Error) => {
      console.log('err', er);
    });

    
    this.api.getCars().subscribe((data: Car[]) => {
      this.cars = data;
    },
    (er: Error) => {
      console.log('err', er);
    });


    this.api.getShops().subscribe((data: Shop[]) => {
      this.shops = data;
    },
    (er: Error) => {
      console.log('err', er);
    });
    

    this.api.getClients().subscribe((data: Client[]) => {
      this.clients = data;
    },
    (er: Error) => {
      console.log('err', er);
    });
  }

  radioChange(event: any) {
    this.selectedOption = event.target.value;
    this.currentFormRef = this['add' + this.selectedOption + 'Form'];
    /*
      notatiile this.api si this[api] sunt echivalente

     folosind paratenze putem utiliza variabile

     this['add' + this.selectedOption + 'Form'] = this['addAlbumForm']  = this.addAlbumForm sau
                                                                        = this.addSongForm sau
                                                                        = this.addArtist
    */
  }

  add() {
    /*


    this.api['add' + this.selectedOption] = this.api['addAlbum'] = this.api.addAlbum sau
                                          = this.api['addSong] sau
                                          = this.api['addArtist]
    */
   console.log(this.currentFormRef.value);
    this.api['add' + this.selectedOption](this.currentFormRef.value).subscribe(() => {

      this.currentFormRef.reset();
      this.success = true;
      setTimeout(() => {
        this.success = null;
      }, 3000);
    },
      (error: Error) => {
        console.log(error);
        this.currentFormRef.reset();
        this.success = false;
        setTimeout(() => {
          this.success = null;
        }, 3000);
      });

  }
}
