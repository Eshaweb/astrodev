import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../../Services/AdminService/AdminService';
import { LoadingSwitchService } from '../../../../Services/LoadingSwitchService/LoadingSwitchService';
import { FormBuilder, FormGroup } from '@angular/forms';
import { interval, Observable, timer } from 'rxjs';
import { SelectBoxModel } from 'src/Models/SelectBoxModel';
import ArrayStore from 'devextreme/data/array_store';


@Component({
  selector: 'app-orderstatus',
  templateUrl: './orderstatus.component.html',
  styleUrls: ['./orderstatus.component.scss']
})
export class OrderstatusComponent implements OnInit {

  dataSource: any;
    connectionStarted: boolean;
  orderStatusSearchForm: FormGroup;
  sub: any;
  countDown;
  counter = 20;
  tick = 1000;
  dateinDateFormat: Date;
  statuses: SelectBoxModel[] = [
    { Id: "0", Text: "Status not available" },
    { Id: "1", Text: "Process started from main server" },
    { Id: "2", Text: "Process started in resource server" },
    { Id: "3", Text: "Report generated" },
    { Id: "4", Text: "Report generation failure" }];
  statusvalue: string;
  statusesdata: ArrayStore;
    constructor(public formBuilder:FormBuilder,public adminService:AdminService, public loadingSwitchService:LoadingSwitchService) {
      this.dateinDateFormat = new Date();
      this.orderStatusSearchForm=this.formBuilder.group({
        From: new Date(),
        To: new Date()
      });   
    }


  ngOnInit() {
    this.statusesdata = new ArrayStore({
      data: this.statuses,
      key: "Id"
    });
    this.GetOrderStatus();
  }

  statusdataSelection(event) {
    this.statusvalue = event.value;
  }

  OnSearch_click(){
    this.GetOrderStatus();
  }
  GetOrderStatus(){
    this.loadingSwitchService.loading = true;
    var GetOrderStatus = {
      From:this.orderStatusSearchForm.controls['From'].value,
      To:this.orderStatusSearchForm.controls['To'].value,
      Status:this.statusvalue
    }
    this.adminService.GetOrderStatus(GetOrderStatus).subscribe((data: any) => {
      this.dataSource=data;
      this.loadingSwitchService.loading = false;
      this.sub = interval(10000).subscribe((val) => {
        //this.GetOrderStatus();
        for (var i = 0; i < this.dataSource.length; i++) {
          if(this.dataSource.length!=0){
            if (i == 0) {
              var AstroReportId = [this.dataSource[0].AstroReportId]
            }
            else {
              AstroReportId.push(this.dataSource[i].AstroReportId);
            }
            var AstroReportIds={
              AstroReportIds:AstroReportId
            }
            this.adminService.GetUpdatedStatus(AstroReportIds).subscribe((data: any) => {
              for(var i=0;i<data.length;i++){
                this.dataSource.forEach((item) => {
                  this.dataSource[i].AstroReportId = data[i].AstroReportId;
                  this.dataSource[i].Status = data[i].Status;
                });
              }
              this.sub.unsubscribe();
            });
          }
        }
      });
    });
  }
}
