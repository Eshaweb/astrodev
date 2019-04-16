import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from 'src/Services/ItemService/ItemService';
import { LoadingSwitchService } from 'src/Services/LoadingSwitchService/LoadingSwitchService';
import { AdminService } from 'src/Services/AdminService/AdminService';



export class ComboBoxModel {
  Id: string;
  Name: string;
}
@Component({
  templateUrl: 'assignPriceList.component.html',
  styleUrls: ['./assignPriceList.component.scss']
})

export class AssignPriceListComponent implements OnInit {
  priceList: any;
  priceListUpdated: boolean;

  constructor(public router: Router, public loadingSwitchService: LoadingSwitchService, public adminService: AdminService) {
    
  }

  ngOnInit() {
    this.loadingSwitchService.loading=true;
    this.adminService.GetAssignedPriceList().subscribe((data: any) => {
      if (data.Errors == undefined) {
        this.priceListUpdated = true;
        if (data.length != 0) {
          this.priceList = data;
        }
      }
      this.loadingSwitchService.loading=false;
    });
  }
  onRowRemoving(event) {
    var List = {
      Id: event.data.Id
    }
    this.adminService.DeleteAssignedPriceList(List).subscribe((data: any) => {
      this.loadingSwitchService.loading = false;
      if (data.Errors == undefined) {
        if (data == true) {
          this.adminService.GetAssignedPriceList().subscribe((data: any) => {
            if (data.Errors == undefined) {
              this.priceListUpdated = true;
              if (data.length != 0) {
                this.priceList = data;
              }
            }
          });
        }
      }
    });
  }
  selectionChanged(e) {
    this.loadingSwitchService.loading = true;
    e.component.collapseAll(-1);
    e.component.expandRow(e.currentSelectedRowKeys[0]);
    var Rate = {
      PriceListId: e.selectedRowsData[0].Id
    }
    this.adminService.GetRate(Rate).subscribe((data: any) => {
      this.loadingSwitchService.loading = false;
      if (data.Errors == undefined) {
        this.priceListUpdated = true;
        // this.dataSource=data;         
      }
    });


  }
  OnAssignNewPriceList() {
    this.router.navigate(["/admin/assignNewPriceList"]);
  }
}