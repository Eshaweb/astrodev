import { Component, OnInit, OnDestroy } from '@angular/core';
import { HoroScopeService } from 'src/Services/HoroScopeService/HoroScopeService';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { interval, Observable, timer } from 'rxjs';
import { LoadingSwitchService } from 'src/Services/LoadingSwitchService/LoadingSwitchService';
import { OrderService } from 'src/Services/OrderService/OrderService';
import { StorageService } from 'src/Services/StorageService/Storage_Service';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.scss']
})
export class PaymentSuccessComponent implements OnInit, OnDestroy {
  
  constructor(public horoScopeService: HoroScopeService, public router:Router) {

  }

  ngOnInit() {
    
  }
  
  clearParameters() {
    this.horoScopeService.birthplace = '';
    //this.orderService.orderResponse = null;
  }
  
  ngOnDestroy(): void {
      this.router.navigate(['/home'], { replaceUrl: true });
    //window.history.go(-4);
    location.pathname = '/home';
    location.reload(true);
    //this.router.navigate(['/home']);
    //window.history.forward();
  }
}
