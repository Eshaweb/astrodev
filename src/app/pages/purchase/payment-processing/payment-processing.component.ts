import { Component, OnInit, OnDestroy } from '@angular/core';
import { HoroScopeService } from 'src/Services/HoroScopeService/HoroScopeService';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { interval, Observable, timer } from 'rxjs';
import { LoadingSwitchService } from 'src/Services/LoadingSwitchService/LoadingSwitchService';
import { OrderService } from 'src/Services/OrderService/OrderService';
import { StorageService } from 'src/Services/StorageService/Storage_Service';

@Component({
  selector: 'app-payment-processing',
  templateUrl: './payment-processing.component.html',
  styleUrls: ['./payment-processing.component.scss']
})
export class PaymentProcessingComponent implements OnInit, OnDestroy {
  buttonId: any;
  sub: any;
  showSuccess: boolean;
  countDown;
  counter = 20;
  tick = 1000;
  timeExceeded: boolean = false;
  OrderId: string;
  subscribe: any;
  constructor(public storageService: StorageService, private orderService: OrderService, private loadingSwitchService: LoadingSwitchService,
    public location: Location, public router: Router, public horoScopeService: HoroScopeService) {
    this.OrderId = StorageService.GetItem('OrderId');
  }

  ngOnInit() {
    //this.loading = true;
    this.loadingSwitchService.loading = true;
    // this.orderService.CheckForResult(this.orderService.orderResponse.OrderId).subscribe((data) => {
    this.orderService.CheckForResult(StorageService.GetItem('OrderId')).subscribe((data) => {
      if (data.AstroReportId.length != 0) {
        this.loadingSwitchService.loading = false;
        this.buttonId = data.AstroReportId[0].split('_')[0];
        this.DownloadResult(this.buttonId);
      }
      else {
        const source = timer(1000, 1000);
        this.subscribe = source.subscribe(val => {
          if (val == 2) {
            this.loadingSwitchService.loading = false;
            this.sub.unsubscribe();
            this.subscribe.unsubscribe();
            this.timeExceeded = true;
          }
        });
        this.sub = interval(10000).subscribe((val) => {
          // this.orderService.CheckForResult(this.orderService.orderResponse.OrderId).subscribe((data) => {
          this.orderService.CheckForResult(StorageService.GetItem('OrderId')).subscribe((data) => {
            if (data.AstroReportId.length != 0) {
              this.loadingSwitchService.loading = false;
              this.buttonId = data.AstroReportId[0].split('_')[0];
              this.DownloadResult(this.buttonId);
            }
          });
        });
      }
    });
    this.horoScopeService.horoRequest = null;
  }
  DownloadResult(buttonId) {
    this.horoScopeService.DownloadResult(buttonId, (data) => {
      var newBlob = new Blob([data], { type: "application/pdf" });
      // const fileName: string = this.orderService.orderResponse.ItName+'.pdf';
      const fileName: string = this.storageService.GetOrderResponse().ItName + '.pdf';
      const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;
      var url = window.URL.createObjectURL(newBlob);
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      //this.loading = false;
      this.showSuccess = true;
      this.clearParameters();
      this.storageService.RemoveDataFromSession();
      this.sub.unsubscribe();
      this.subscribe.unsubscribe();
      console.clear();
    });
  }
  clearParameters() {
    this.horoScopeService.birthplace = '';
    this.orderService.orderResponse = null;
  }
  gotoOrderHistory() {
    this.router.navigate(['/settings/orderHistory']);
  }
  ngOnDestroy(): void {
    // window.location.pathname='/home';
    // Object.defineProperty(window.location, 'href', {
    //   writable: true,
    //   value: '/home'
    // });
    //   window.onpopstate= function(event) {
    //     history.pushState(null, null, '/home');
    //  }
    // this.router.events.filter(event => event instanceof NavigationEnd)
    // .subscribe(event => {
    //   if (event instanceof NavigationEnd) {        

    //   };
    // });
    //window.history.replaceState(null, null, '/home');
    if (this.timeExceeded != true) {
      this.router.navigate(['/home'], { replaceUrl: true });
    }
    //window.history.go(-4);
    location.pathname = '/home';
    location.reload(true);
    //this.router.navigate(['/home']);
    //window.history.forward();
  }
}
