import { Component, OnInit, ViewChild } from '@angular/core';
import { ItemService } from 'src/Services/ItemService/ItemService';
import { LoadingSwitchService } from 'src/Services/LoadingSwitchService/LoadingSwitchService';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminService } from 'src/Services/AdminService/AdminService';
import CustomStore from 'devextreme/data/custom_store';
import { DxDataGridComponent } from 'devextreme-angular';
import { Router } from '@angular/router';
import { WalletService } from 'src/Services/Wallet/WalletService';
import { SelectBoxModel } from 'src/Models/SelectBoxModel';
import ArrayStore from 'devextreme/data/array_store';



@Component({
  templateUrl: 'walletGift.component.html',
  styleUrls: ['./walletGift.component.scss']
})

export class WalletGiftComponent implements OnInit {
  priceList: any;
  priceListUpdated: boolean;
  categoryvalue: any;
  userdata: any;
  FindParty: { Search: any; };
  walletGiftForm: FormGroup;
  Form: FormGroup;
  timeformats: SelectBoxModel[] = [
    { Id: "STANDARD", Text: 'Standard Time' },
    { Id: "SUMMER", Text: 'Summer Time' },
    { Id: "DOUBLE", Text: 'Double Summer Time' },
    { Id: "WAR", Text: 'War Time' }
  ];
  timeformatdata: ArrayStore;
  timeformatvalue: any;
  constructor(public formbuilder: FormBuilder, public router: Router, public loadingSwitchService: LoadingSwitchService, public walletService: WalletService) {
    this.walletGiftForm=this.formbuilder.group({
      UserId:['',[Validators.required]]
    });
    this.Form=this.formbuilder.group({
      Amount: [null, [Validators.required, Validators.min(50), Validators.max(20000)]],
      BillPayMode: [null, []]
    });
  }

  ngOnInit() {
    this.timeformatdata = new ArrayStore({
      data: this.timeformats,
      key: "Id"
    });
  }
  timeformatdataSelection(event) {
    this.timeformatvalue = event.value;
  }
  OnSubmit_click(value){
    this.loadingSwitchService.loading=true;
    var GetCustomerWalletDetails={
      UserId:this.walletGiftForm.controls['UserId'].value
    }
    this.walletService.GetCustomerWalletDetails(GetCustomerWalletDetails).subscribe((data: any) => {
      if(data.Errors==undefined){
        this.userdata=data;
        this.loadingSwitchService.loading=false;
      }
    });
  }

  categorydataSelection(event) {
    this.categoryvalue = event.value;
  }
  
}