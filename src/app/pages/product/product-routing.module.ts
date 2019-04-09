import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProductComponent } from './product/product.component';
import { AstrolitegoldsilverComponent } from './astrolitegoldsilver/astrolitegoldsilver.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';


const routes: Routes = [
    {
      path: '',
      component: ProductComponent,
    },
    {
      path: 'astrogoldsilver',
      component: AstrolitegoldsilverComponent,
    },
    {
      path: 'paymentsuccess',
      component: PaymentSuccessComponent,
    },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ProductRoutingModule { }