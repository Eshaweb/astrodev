import { Component, ViewChild } from '@angular/core';
import { Service, Employee } from 'src/app/shared/services/app.service';
import ArrayStore from 'devextreme/data/array_store';
import DataSource from 'devextreme/data/data_source';
import { Router } from '@angular/router';
import { ItemService } from 'src/Services/ItemService/ItemService';
import { BasePrice } from '../pricelist/pricelist.component';


@Component({
    templateUrl: 'masterDetail.component.html',
    styleUrls: [ './masterDetail.component.scss' ]
  })
  
  export class MasterDetailComponent {
    employees: Employee[];
    dataSource: BasePrice[];
    priceListUpdated: boolean;

    constructor(public router: Router, private service: Service, private itemService:ItemService) {
        this.employees = service.getEmployees();
        this.itemService.GetBasePrice().subscribe((data:any)=>{
            if (data.Errors == undefined) {
                this.priceListUpdated=true;
                this.dataSource=data;         
            }
          });
    }


    contentReady(e) {
        if (!e.component.getSelectedRowKeys().length)
            e.component.selectRowsByIndexes(0);
    }
    selectionChanged(e) {
        e.component.collapseAll(-1);
        e.component.expandRow(e.currentSelectedRowKeys[0]);


    }
    click(){
        this.router.navigate(["/admin/priceList"]);
    }

  }