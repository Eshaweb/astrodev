import { Component, OnInit, OnDestroy } from '@angular/core';
import { HoroScopeService } from 'src/Services/HoroScopeService/HoroScopeService';
import { Router, NavigationEnd } from '@angular/router';

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
