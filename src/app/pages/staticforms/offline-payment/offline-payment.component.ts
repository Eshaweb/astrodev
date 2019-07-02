import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/Services/StorageService/Storage_Service';
import { ItemService } from 'src/Services/ItemService/ItemService';
import { LoadingSwitchService } from 'src/Services/LoadingSwitchService/LoadingSwitchService';

@Component({
  selector: 'app-offline-payment',
  templateUrl: './offline-payment.component.html',
  styleUrls: ['./offline-payment.component.css']
})
export class OfflinepaymentComponent implements OnInit {
  OrderId: string;
  ExtCode: string;
  AmounttoPay_Offline: any;

  constructor(public loadingSwitchService:LoadingSwitchService) { 
    this.OrderId = StorageService.GetItem('OrderId');
    this.ExtCode = StorageService.GetItem('ExtCode');
    this.AmounttoPay_Offline = StorageService.GetItem('AmounttoPay_Offline');
  }

  ngOnInit() {
    this.loadingSwitchService.loading = false;
  }

}
