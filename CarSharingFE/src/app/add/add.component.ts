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
      carId: [null, Validators.required],
      clientId: [null, Validators.required]
    });

    this.addCarForm = this.fb.group({
      model: [null, Validators.required],
      shopId: [null, Validators.required],
    });

    this.addCityForm = this.fb.group({
      name: [null, Validators.required],
      country: [null, Validators.required],
    });

    this.addShopForm = this.fb.group({
      name: [null, Validators.required],
      cityId: [null, Validators.required],
    });

    this.addClientForm = this.fb.group({
      CNP: [null, Validators.required],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      address: [null, Validators.required],
    });

    this.currentFormRef = this.addShopForm;

    this.api.getCities().subscribe((data: City[]) => {
      this.cities = data;
      console.log(this.cities);
    },
    (er: Error) => {
      console.log('err', er);
    });

    
    this.api.getCars().subscribe((data: Car[]) => {
      this.cars = data;
      console.log(this.cars);
    },
    (er: Error) => {
      console.log('err', er);
    });


    this.api.getShops().subscribe((data: Shop[]) => {
      this.shops = data;
      console.log(this.shops);
    },
    (er: Error) => {
      console.log('err', er);
    });
    

    this.api.getClients().subscribe((data: Client[]) => {
      this.clients = data;
      console.log(this.clients);
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