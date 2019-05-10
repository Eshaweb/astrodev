import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/Services/StorageService/Storage_Service';

@Component({
  selector: 'app-offline-payment',
  templateUrl: './offline-payment.component.html',
  styleUrls: ['./offline-payment.component.css']
})
export class OfflinepaymentComponent implements OnInit {
  OrderId: string;

  constructor() { 
    this.OrderId = StorageService.GetItem('OrderId');
  }

  ngOnInit() {
  }

}
