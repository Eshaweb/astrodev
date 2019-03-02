import { Component, OnInit } from '@angular/core';
import { OrderHistoryService, Company } from 'src/Services/order';
import ArrayStore from 'devextreme/data/array_store';
import { SelectBoxModel } from 'src/Models/SelectBoxModel';
import { OrderService } from 'src/Services/OrderService/OrderService';
import { LoginService } from 'src/Services/login/login.service';
import { ItemService } from 'src/Services/ItemService/ItemService';
import { OrderHistoryResponse } from 'src/Models/OrderHistoryResponse';
import { Router } from '@angular/router';
import { StorageService } from 'src/Services/StorageService/Storage_Service';
import { SortingOrderHistoryPipe } from 'src/pipes/sorting-orders.pipe';
import { LoadingSwitchService } from 'src/Services/LoadingSwitchService/LoadingSwitchService';



@Component({
    selector: 'app-order-history',
    templateUrl: './order-history.component.html',
    styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {
    orderHistoryResponse: OrderHistoryResponse;
    path: string[] = ['OrderId'];
    order: number = 1; // 1 asc, -1 desc;
    companies: Company[];
    fields: SelectBoxModel[] = [
        { Id: "OrderId", Text: 'Date' },
        { Id: "Amount", Text: 'Amount' },
        { Id: "StatusCode", Text: 'Status' },
        { Id: "ItName", Text: "Item"}
    ];
    sortorders: SelectBoxModel[] = [
        { Id: "A", Text: 'Ascending Order' },
        { Id: "D", Text: 'Descending Order' }
    ];
    
    fieldvalue: any;
    sortordervalue: string;
    fielddata: ArrayStore;
    sortorderdata: ArrayStore;

    constructor(public loadingSwitchService:LoadingSwitchService, public sortingOrderHistoryPipe:SortingOrderHistoryPipe,private router:Router,private itemService:ItemService,private loginService:LoginService,service: OrderHistoryService, private orderService:OrderService) {
        this.companies = service.getCompanies();
        this.fielddata = new ArrayStore({
            data: this.fields,
            key: "Id"
        });
        this.sortorderdata = new ArrayStore({
            data: this.sortorders,
            key: "Id"
        });
        
        this.fieldvalue = this.fields[0].Id;
        this.sortordervalue = this.sortorders[0].Id;
    }
    ngOnInit() {
        var orderHistory = {
            PartyMastId:StorageService.GetItem('PartyMastId'),
            ItActId:"#SH"
        }
        this.orderService.OrderHistory(orderHistory).subscribe((data: any) => {
        this.orderHistoryResponse=data;
        });
    }
    
    fielddataSelection(event) {
        this.fieldvalue = event.value;
        if(this.sortordervalue=='D'){
            var args:string[]=["-"+this.fieldvalue,"OrderId"];
        }
        else if(this.sortordervalue=='A'){
            var args:string[]=[this.fieldvalue,"OrderId"]
        }
        this.sortingOrderHistoryPipe.transform(this.orderHistoryResponse,args);
    }
    sortorderdataSelection(event) {
        this.sortordervalue = event.value;
        if(event.value=='D'){
           // this.orderHistoryResponse=this.orderHistoryResponse*(-1);
           var args:string[]=["-"+this.fieldvalue,"OrderId"];
        }
        else if(event.value=='A'){
            var args:string[]=[this.fieldvalue,"OrderId"];
        }
        //this.sortTable(this.fieldvalue);
        this.sortingOrderHistoryPipe.transform(this.orderHistoryResponse,args);
    }
    sortTable(prop: string) {
        this.path = prop.split('.')
        this.order = this.order * (-1); // change order
        return false; // do not reload
      }

      onItemClick(event){
        this.loadingSwitchService.loading = true;
        var orderHistory = {
            PartyMastId:StorageService.GetItem('PartyMastId'),
            ItActId:event.itemData.ItActId
        }
        this.orderService.OrderHistory(orderHistory).subscribe((data: any) => {
        this.orderHistoryResponse=data;
        this.loadingSwitchService.loading = false;
        });
    }
    onstatus_Click(item) {
        this.itemService.ItemAmount=item.Amount;
        this.orderService.orderResponse={
            OrderId:item.OrderId,
            ItMastId:null,
            ItName:item.ItName
        };
        if (item.StatusCode == 'AP') {
            this.router.navigate(["/purchase/deliveryAddress", { 'OrderId': item.OrderId }]);
        }
        else if (item.StatusCode == 'BP'||item.StatusCode == 'PP') {
            this.router.navigate(["/purchase/payment"]);
        }
        else if (item.StatusCode == 'RD') {
            this.router.navigate(['/purchase/paymentProcessing']);
        }
    }
}

