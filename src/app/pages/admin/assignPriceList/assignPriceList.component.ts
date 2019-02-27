import { Component, ViewChild, NgZone, ChangeDetectorRef, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ItemService } from 'src/Services/ItemService/ItemService';
import { LoadingSwitchService } from 'src/Services/LoadingSwitchService/LoadingSwitchService';
import ArrayStore from 'devextreme/data/array_store';
import { SelectBoxModel } from 'src/Models/SelectBoxModel';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { UIService } from 'src/Services/UIService/ui.service';
import { PanchangaService } from 'src/Services/PanchangaService/PanchangaService';
import { PanchangaRequest } from 'src/Models/Panchanga/PanchangaRequest';
import { MapsAPILoader } from '@agm/core';
import { PartyService } from 'src/Services/PartyService/PartyService';
import { ToastrManager } from 'ng6-toastr-notifications';


export class ComboBoxModel{
  Id:string;
  Name:string;
}
@Component({
    templateUrl: 'assignPriceList.component.html',
    styleUrls: [ './assignPriceList.component.scss' ]
  })
  
  export class AssignPriceListComponent implements OnInit {
  priceList: any;
  priceListUpdated: boolean;
  
    constructor(public router: Router,public loadingSwitchService: LoadingSwitchService, public itemService:ItemService,public formBuilder: FormBuilder){
      this.itemService.GetAssignedPriceList().subscribe((data:any)=>{
        if (data.Errors == undefined) {
            this.priceListUpdated=true;
            if(data.length!=0){
                this.priceList = data;  
            }  
        }
      });
    }

    ngOnInit() {
      
    }
    onRowRemoving(event){
      var List={
          Id:event.data.Id
      }
    this.itemService.DeleteAssignedPriceList(List).subscribe((data:any)=>{
      this.loadingSwitchService.loading = false;
      if (data.Errors == undefined) {
            if(data==true){
              this.itemService.GetAssignedPriceList().subscribe((data:any)=>{
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
           // this.dataSource=data;         
        }
      });
    

  }
  OnAssignNewPriceList(){
    this.router.navigate(["/admin/assignNewPriceList"]);
  }
}