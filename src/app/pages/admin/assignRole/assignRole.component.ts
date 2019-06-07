import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingSwitchService } from 'src/Services/LoadingSwitchService/LoadingSwitchService';
import { AdminService } from 'src/Services/AdminService/AdminService';
import ArrayStore from 'devextreme/data/array_store';
import { SelectBoxModel } from 'src/Models/SelectBoxModel';



export class ComboBoxModel {
  Id: string;
  Name: string;
}
@Component({
  templateUrl: 'assignRole.component.html',
  styleUrls: ['./assignRole.component.scss']
})

export class AssignRoleComponent implements OnInit {
  priceList: any;
  priceListUpdated: boolean;
  categorydata: ArrayStore;
  categories: SelectBoxModel[] = [
    { Id: "#S", Text: "Staff" },
    { Id: "#D", Text: "Dealer" }];
  categoryvalue: any;
  userdata: any;
  FindParty: { Search: any; };
  constructor(public router: Router, public loadingSwitchService: LoadingSwitchService, public adminService: AdminService) {
    this.adminService.GetAssignedPriceList().subscribe((data: any) => {
      if (data.Errors == undefined) {
        this.priceListUpdated = true;
        if (data.length != 0) {
          this.priceList = data;
        }
      }
    });

    this.categorydata = new ArrayStore({
      data: this.categories,
      key: "Id"
    });
  }

  ngOnInit() {

  }
  onUserId(value){
    this.loadingSwitchService.loading=true;
    this.FindParty={
      Search:value
    }
    this.adminService.GetParty(this.FindParty).subscribe((data: any) => {
      if(data.Errors==undefined){
        this.userdata=data;
        this.loadingSwitchService.loading=false;
      }
    });
  }
  categorydataSelection(event) {
    this.categoryvalue = event.value;

  }
  OnSubmit_click(){
    this.loadingSwitchService.loading=true;
    var CustomerCategory={
      CategoryId:this.categoryvalue,
      PartyMastId:this.userdata.PartyMastId
    }
    this.adminService.UpdateCustomerCategory(CustomerCategory).subscribe((data: any) => {
      if(data.Errors==undefined){
        this.categoryvalue='';
        this.adminService.GetParty(this.FindParty).subscribe((data: any) => {
          if(data.Errors==undefined){
            this.userdata=data;
            this.loadingSwitchService.loading=false;
          }
        });
      }
    });
  }
}