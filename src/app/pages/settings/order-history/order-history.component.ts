import { Component, OnInit } from '@angular/core';
import ArrayStore from 'devextreme/data/array_store';
import { SelectBoxModel } from 'src/Models/SelectBoxModel';
import { OrderService } from 'src/Services/OrderService/OrderService';
import { ItemService } from 'src/Services/ItemService/ItemService';
import { OrderHistoryResponse } from 'src/Models/OrderHistoryResponse';
import { Router } from '@angular/router';
import { StorageService } from 'src/Services/StorageService/Storage_Service';
import { SortingOrderHistoryPipe } from 'src/pipes/sorting-orders.pipe';
import { LoadingSwitchService } from 'src/Services/LoadingSwitchService/LoadingSwitchService';
import { HoroScopeService } from 'src/Services/HoroScopeService/HoroScopeService';
import { interval, Subscription } from 'rxjs';
import { Services, OrderHistoryService } from 'src/Services/OrderHistoryService/OrderHistoryService';
import { LoginService } from 'src/Services/LoginService/LoginService';



@Component({
    selector: 'app-order-history',
    templateUrl: './order-history.component.html',
    styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {
    orderHistoryResponse: OrderHistoryResponse;
    path: string[] = ['OrderId'];
    order: number = 1; // 1 asc, -1 desc;
    services: Services[];
    fields: SelectBoxModel[] = [
        { Id: "OrderId", Text: 'Date' },
        { Id: "Amount", Text: 'Amount' },
        { Id: "StatusCode", Text: 'Status' },
        { Id: "ItName", Text: "Item" }
    ];
    sortorders: SelectBoxModel[] = [
        { Id: "A", Text: 'Ascending Order' },
        { Id: "D", Text: 'Descending Order' }
    ];

    fieldvalue: any;
    sortordervalue: string;
    fielddata: ArrayStore;
    sortorderdata: ArrayStore;
    buttonId: any;
    sub: Subscription;
    deleteConfirmPopUp: boolean;
    OrderId: string;
    ItActId: string;
    args: string[];
    constructor(public horoScopeService: HoroScopeService, public storageService: StorageService, public loadingSwitchService: LoadingSwitchService,
        public sortingOrderHistoryPipe: SortingOrderHistoryPipe, private router: Router, private itemService: ItemService, private loginService: LoginService,
        service: OrderHistoryService, private orderService: OrderService) {
            
        this.services = service.getServices();
        this.fielddata = new ArrayStore({
            data: this.fields,
            key: "Id"
        });
        this.sortorderdata = new ArrayStore({
            data: this.sortorders,
            key: "Id"
        });
        this.fieldvalue = this.fields[0].Id;
        this.sortordervalue = this.sortorders[1].Id;
    }

    ngOnInit() {
        this.loadingSwitchService.loading = true;
        this.ItActId = "#SH";
        var orderHistory = {
            PartyMastId: StorageService.GetItem('PartyMastId'),
            ItActId: "#SH"
        }
        this.orderService.OrderHistory(orderHistory).subscribe((data: any) => {
            this.orderHistoryResponse = data;
            this.args = ["-" +this.fieldvalue, "OrderId"];
            this.sortingOrderHistoryPipe.transform(this.orderHistoryResponse, this.args);
            this.loadingSwitchService.loading = false;
        });
    }

    fielddataSelection(event) {
        this.fieldvalue = event.value;
        if (this.sortordervalue == 'D') {
            this.args = ["-" + this.fieldvalue, "OrderId"];
        }
        else if (this.sortordervalue == 'A') {
            this.args = [this.fieldvalue, "OrderId"]
        }
        this.sortingOrderHistoryPipe.transform(this.orderHistoryResponse, this.args);
    }
    sortorderdataSelection(event) {
        this.sortordervalue = event.value;
        if (event.value == 'D') {
            // this.orderHistoryResponse=this.orderHistoryResponse*(-1);
            this.args = ["-" + this.fieldvalue, "OrderId"];
        }
        else if (event.value == 'A') {
            this.args = [this.fieldvalue, "OrderId"];
        }
        //this.sortTable(this.fieldvalue);
        this.sortingOrderHistoryPipe.transform(this.orderHistoryResponse, this.args);
    }
    sortTable(prop: string) {
        this.path = prop.split('.')
        this.order = this.order * (-1); // change order
        return false; // do not reload
    }

    onItemClick(event) {
        this.loadingSwitchService.loading = true;
        this.ItActId = event.itemData.ItActId
        var orderHistory = {
            PartyMastId: StorageService.GetItem('PartyMastId'),
            ItActId: event.itemData.ItActId
        }
        this.orderService.OrderHistory(orderHistory).subscribe((data: any) => {
            this.orderHistoryResponse = data;
            this.sortingOrderHistoryPipe.transform(this.orderHistoryResponse, this.args);
            this.loadingSwitchService.loading = false;
        });
    }
    onstatus_Click(item) {
        this.itemService.ItemAmount = item.Amount;
        this.orderService.orderResponse = {
            OrderId: item.OrderId,
            ItMastId: null,
            ItName: item.ItName
        };
        StorageService.SetItem('OrderId', item.OrderId)
        this.storageService.SetOrderResponse(JSON.stringify(this.orderService.orderResponse));
        if (item.StatusCode == 'AP') {
            this.router.navigate(["/purchase/deliveryAddress", { 'OrderId': item.OrderId }]);
        }
        else if (item.StatusCode == 'BP' || item.StatusCode == 'PP') {
            this.router.navigate(["/purchase/payment"]);
        }
        else if (item.StatusCode == 'RD') {
            //this.router.navigate(['/purchase/paymentProcessing']);
            this.loadingSwitchService.loading = true;
            this.orderService.CheckForResult(item.OrderId).subscribe((data) => {
                if (data.AstroReportId.length != 0) {
                    this.buttonId = data.AstroReportId[0].split('_')[0];
                    this.DownloadResult(this.buttonId);
                }
                else {
                    this.sub = interval(10000).subscribe((val) => {
                        this.orderService.CheckForResult(StorageService.GetItem('OrderId')).subscribe((data) => {
                            if (data.AstroReportId.length != 0) {
                                this.buttonId = data.AstroReportId[0].split('_')[0];
                                this.DownloadResult(this.buttonId);
                            }

                        });
                    });
                }
            });
        }
    }

    DownloadResult(buttonId) {
        this.horoScopeService.DownloadResult(buttonId).subscribe((data: any) => {
            var newBlob = new Blob([data], { type: "application/pdf" });
            const fileName: string = this.storageService.GetOrderResponse().ItName + '.pdf';
            const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;
            var url = window.URL.createObjectURL(newBlob);
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            this.loadingSwitchService.loading = false;
            //this.storageService.RemoveDataFromSession();
            if(this.sub!=undefined){
                this.sub.unsubscribe();
            }
        });
    }
    OnYes_click() {
        this.deleteConfirmPopUp = false;
        this.loadingSwitchService.loading = true;
        var deleteOrder = {
            PartyMastId: StorageService.GetItem('PartyMastId'),
            OrderId: this.OrderId
        }
        this.orderService.DeleteOrder(deleteOrder).subscribe((data: any) => {
            if (data == true) {
                var orderHistory = {
                    PartyMastId: StorageService.GetItem('PartyMastId'),
                    ItActId: this.ItActId
                }
                this.orderService.OrderHistory(orderHistory).subscribe((data: any) => {
                    this.orderHistoryResponse = data;
                    this.loadingSwitchService.loading = false;
                    if (this.sortordervalue == 'D') {
                        var args: string[] = ["-" + this.fieldvalue, "OrderId"];
                    }
                    else if (this.sortordervalue == 'A') {
                        var args: string[] = [this.fieldvalue, "OrderId"]
                    }
                    this.sortingOrderHistoryPipe.transform(this.orderHistoryResponse, args);
                });
            }
            else {
                this.loadingSwitchService.loading = false;
            }
        });
    }
    OnNo_click() {
        this.deleteConfirmPopUp = false;
    }
    ondelete_Click(item) {
        this.OrderId = item.OrderId;
        this.deleteConfirmPopUp = true;
    }
}

