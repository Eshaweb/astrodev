import { Component } from '@angular/core';
import { Service } from 'src/app/shared/services/app.service';
import { Router } from '@angular/router';
import { ItemService } from 'src/Services/ItemService/ItemService';
import { BasePrice } from '../pricelist/pricelist.component';
import { LoadingSwitchService } from 'src/Services/LoadingSwitchService/LoadingSwitchService';
import { AdminService } from 'src/Services/AdminService/AdminService';

export class PriceList {
    Id: number;
    Name: string;
    Formula: string;
}
@Component({
    templateUrl: 'masterDetail.component.html',
    styleUrls: [ './masterDetail.component.scss' ]
  })
  
  export class MasterDetailComponent {
    priceList: PriceList[];
    dataSource: BasePrice[];
    priceListUpdated: boolean;

    constructor(public loadingSwitchService:LoadingSwitchService, public router: Router, private service: Service, private adminService:AdminService) {
        
    }

ngOnInit(){
    this.loadingSwitchService.loading = true;
        this.adminService.GetPriceList().subscribe((data:any)=>{
            if (data.Errors == undefined) {
                this.priceListUpdated=true;
                this.loadingSwitchService.loading = false;
                if(data.length!=0){
                    this.priceList = data;  
                }  
            }
          });
}

    onRowRemoving(event){
        var Rate={
            PriceListId:event.data.Id
        }
      this.adminService.DeletePriceList(Rate).subscribe((data:any)=>{
        this.loadingSwitchService.loading = false;
        if (data.Errors == undefined) {
              if(data==true){
                this.adminService.GetPriceList().subscribe((data:any)=>{
                    if (data.Errors == undefined) {
                        this.priceListUpdated=true;
                        if(data.length!=0){
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
        //e.component.expandRow([e.key]);
        e.component.expandRow(e.currentSelectedRowKeys[0]);
        // var Rate={
        //     PriceListId:e.key
        // }
        var Rate={
            PriceListId:e.selectedRowsData[0].Id
        }
      this.adminService.GetRate(Rate).subscribe((data:any)=>{
        this.loadingSwitchService.loading = false;
        if (data.Errors == undefined) {
              this.priceListUpdated=true;
              this.dataSource=data;         
          }
        });
    }

    onRowCollapsed(event){
        event.component.collapseAll(-1);
    }
    OnAddNewPriceList(){
        this.router.navigate(["/admin/priceList"]);
    }

  }