import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingSwitchService } from 'src/Services/LoadingSwitchService/LoadingSwitchService';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WalletService } from 'src/Services/Wallet/WalletService';
import { SelectBoxModel } from 'src/Models/SelectBoxModel';
import ArrayStore from 'devextreme/data/array_store';



@Component({
  templateUrl: 'walletGift.component.html',
  styleUrls: ['./walletGift.component.scss']
})

export class WalletGiftComponent implements OnInit {
  userdata: any;
  walletGiftForm: FormGroup;
  addWalletGiftForm: FormGroup;
  walletTypes: SelectBoxModel[] = [
    { Id: "Z", Text: 'Cash Convert' },
    { Id: "X", Text: 'Correction Entry' }
  ];
  walletTypedata: ArrayStore;
  walletTypevalue: any;
  message: string;
  popupVisible: boolean;
  selectboxdisabled: boolean;
  GetCustomerWalletDetails: { UserId: any; };
  balancepopupVisible: boolean;
  walletBalanceAmount: any;
  dataSource: any;
  constructor(public formbuilder: FormBuilder, public router: Router, public loadingSwitchService: LoadingSwitchService, public walletService: WalletService) {
    this.walletGiftForm=this.formbuilder.group({
      UserId:['',[Validators.required]]
    });
    this.addWalletGiftForm=this.formbuilder.group({
      Amount: [null, [Validators.required]],
      Remarks:['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.walletTypedata = new ArrayStore({
      data: this.walletTypes,
      key: "Id"
    });
  }

  walletTypedataSelection(event) {
    this.walletTypevalue = event.value;
  }

  OnSearch_click(){
    this.loadingSwitchService.loading=true;
    this.GetCustomerWalletDetails={
      UserId:this.walletGiftForm.controls['UserId'].value
    }
    this.walletService.GetCustomerWalletDetails(this.GetCustomerWalletDetails).subscribe((data: any) => {
      if(data==null){
        this.popupVisible=true;
        this.message='Invalid User Id';
      }
      else if(data.Errors==undefined){
        this.userdata=data;
      }
      this.loadingSwitchService.loading=false;
    });
  }
  onAmount(value) {
    if (value < 0) {
      this.selectboxdisabled = false;
    }
    else {
      this.selectboxdisabled = true;
    }
  }
  onContentReady(e) {
    e.component.option("loadPanel.enabled", false);
}
  OnBalanceClick() {
    this.loadingSwitchService.loading = true;
    var WalletStatement = {
      From: null,
      To: null,
      PartyMastId: this.userdata.PartyMastId
    }
    this.walletService.WalletStatement(WalletStatement).subscribe((data: any) => {
      if (data.Errors == undefined) {
        this.dataSource = data;
      }
      this.walletService.GetWalletBalance(this.userdata.PartyMastId).subscribe((data) => {
        if (data.Errors == undefined) {
          this.walletBalanceAmount = data;
        }
        this.loadingSwitchService.loading = false;
      });

    });
    this.balancepopupVisible = true;
  }
  OnSubmit_click() {
    this.loadingSwitchService.loading=true;
    var AddWalletGift = {
      PartyMastId:this.userdata.PartyMastId,
      Amount:this.addWalletGiftForm.controls['Amount'].value,
      WalletType:this.walletTypevalue,
      Remarks:this.addWalletGiftForm.controls['Remarks'].value
    }
    this.walletService.AddWalletGift(AddWalletGift).subscribe((data: any) => {
      if(data.Errors==undefined){
        if(data==true){
          this.addWalletGiftForm.controls['Amount'].setValue('');
          this.addWalletGiftForm.controls['Remarks'].setValue('');
          this.walletService.GetCustomerWalletDetails(this.GetCustomerWalletDetails).subscribe((data: any) => {
            if(data.Errors==undefined){
              this.userdata=data;
            }
            this.loadingSwitchService.loading=false;
          });
        }
      }
      this.loadingSwitchService.loading=false;
    });
  }
}