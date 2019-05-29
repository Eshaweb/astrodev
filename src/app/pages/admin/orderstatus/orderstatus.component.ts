import { Component, OnInit } from '@angular/core';
import { HubConnectionBuilder } from '@aspnet/signalr';
import { DxDataGridModule } from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import { AdminService } from '../../../../Services/AdminService/AdminService';
import { LoadingSwitchService } from '../../../../Services/LoadingSwitchService/LoadingSwitchService';
import { FormBuilder, FormGroup } from '@angular/forms';
import { interval, Observable, timer } from 'rxjs';


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
    constructor(public formBuilder:FormBuilder,public adminService:AdminService, public loadingSwitchService:LoadingSwitchService) {
      this.orderStatusSearchForm=this.formBuilder.group({
        From: new Date(),
        To: new Date()
      });   
      
      // this.connectionStarted = false;

      //   var hubConnection = new HubConnectionBuilder()
      //       .withUrl("https://js.devexpress.com/Demos/NetCore/liveUpdateSignalRHub")
      //       .build();

      //   var store = new CustomStore({
      //       load: () => hubConnection.invoke("getAllStocks"),
      //       key: "symbol"
      //   });

      //   hubConnection
      //       .start()
      //       .then(() => {
      //           hubConnection.on("updateStockPrice", (data: any) => {
      //               store.push([{ type: "update", key: data.symbol, data: data }]);
      //           });
      //           this.dataSource = store;
      //           this.connectionStarted = true;
      //       });
    }


  ngOnInit() {
    this.GetOrderStatus();
    this.sub = interval(10000).subscribe((val) => {
      //this.GetOrderStatus();
      for (var i = 0; i < this.dataSource.length; i++) {
        if (i == 0) {
          var AstroReportId = [this.dataSource[0].AstroReportId]
        }
        else {
          AstroReportId.push(this.dataSource[i].AstroReportId);
        }
      }
      this.loadingSwitchService.loading = true;
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
        this.loadingSwitchService.loading = false;
      });
    });
  //   this.dataSource.store = new CustomStore({
  //     load: function (loadOptions: any) {
  //         var params = '?';

  //         params += 'skip=' + loadOptions.skip;
  //         params += '&take=' + loadOptions.take;

  //         if(loadOptions.sort) {
  //             params += '&orderby=' + loadOptions.sort[0].selector;
  //             if(loadOptions.sort[0].desc) {
  //                 params += ' desc';
  //             }
  //         }
  //         return '';
  //         // return httpClient.get('https://js.devexpress.com/Demos/WidgetsGallery/data/orderItems' + params)
  //         //     .toPromise()
  //         //     .then((data: any) => {
  //         //         return {
  //         //             data: data.items,
  //         //             totalCount: data.totalCount
  //         //         }
  //         //     })
  //         //     .catch(error => { throw 'Data Loading Error' });
  //     }
  // });
  }

  OnSearch_click(){
    this.GetOrderStatus();
  }
  GetOrderStatus(){
    this.loadingSwitchService.loading = true;
    var GetOrderStatus = {
      From:this.orderStatusSearchForm.controls['From'].value,
      To:this.orderStatusSearchForm.controls['To'].value,
    }
    this.adminService.GetOrderStatus(GetOrderStatus).subscribe((data: any) => {
      this.dataSource=data;
      this.loadingSwitchService.loading = false;
    });
  }
}
