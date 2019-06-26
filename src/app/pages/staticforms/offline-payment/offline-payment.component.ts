import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/Services/StorageService/Storage_Service';
import { ItemService } from 'src/Services/ItemService/ItemService';

@Component({
  selector: 'app-offline-payment',
  templateUrl: './offline-payment.component.html',
  styleUrls: ['./offline-payment.component.css']
})
export class OfflinepaymentComponent implements OnInit {
  OrderId: string;
  ExtCode: string;
  AmounttoPay_Offline: any;

  constructor() { 
    this.OrderId = StorageService.GetItem('OrderId');
    this.ExtCode = StorageService.GetItem('ExtCode');
    this.AmounttoPay_Offline = StorageService.GetItem('AmounttoPay_Offline');
  }

  ngOnInit() {

  }

}
