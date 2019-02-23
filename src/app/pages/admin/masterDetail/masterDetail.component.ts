import { Component, ViewChild } from '@angular/core';
import { Service } from 'src/app/shared/services/app.service';
import ArrayStore from 'devextreme/data/array_store';
import DataSource from 'devextreme/data/data_source';
import { Router } from '@angular/router';
import { ItemService } from 'src/Services/ItemService/ItemService';
import { BasePrice } from '../pricelist/pricelist.component';
import { LoadingSwitchService } from 'src/Services/LoadingSwitchService/LoadingSwitchService';

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

    constructor(public loadingSwitchService:LoadingSwitchService, public router: Router, private service: Service, private itemService:ItemService) {
        this.itemService.GetPriceList().subscribe((data:any)=>{
            if (data.Errors == undefined) {
                this.priceListUpdated=true;
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
      this.itemService.DeletePriceList(Rate).subscribe((data:any)=>{
        this.loadingSwitchService.loading = false;
        if (data.Errors == undefined) {
              if(data==true){
                this.itemService.GetPriceList().subscribe((data:any)=>{
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
        e.component.expandRow(e.currentSelectedRowKeys[0]);
        var Rate={
            PriceListId:e.selectedRowsData[0].Id
        }
      this.itemService.GetRate(Rate).subscribe((data:any)=>{
        this.loadingSwitchService.loading = false;
        if (data.Errors == undefined) {
              this.priceListUpdated=true;
              this.dataSource=data;         
          }
        });
      

    }
    OnAddNewPriceList(){
        this.router.navigate(["/admin/priceList"]);
    }

  }