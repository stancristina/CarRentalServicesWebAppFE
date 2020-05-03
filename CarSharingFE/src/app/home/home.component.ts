import { Component, OnInit, ViewChild } from '@angular/core';
import { Rental } from '../shared/rental.model';
import { ApiService } from '../shared/api.service';
import { DetailModalComponent } from './detail-modal/detail-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  rentals: Rental[] = [];
  searchText: string;
  title: string;

  @ViewChild('detailModal') detailModal: DetailModalComponent;


  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getRentals().subscribe((data: Rental[]) => {
      this.rentals = data;
    },
      (er: Error) => {
        console.log('err', er);
      });
  }

  showDM(id: number): void {
    this.detailModal.initialize(id);
  }

}
