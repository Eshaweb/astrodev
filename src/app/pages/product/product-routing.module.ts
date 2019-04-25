import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProductComponent } from './product/product.component';
import { AstrolitegoldsilverComponent } from './astrolitegoldsilver/astrolitegoldsilver.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import { AstroliteProfessionalComponent } from './astroliteprofessional/astroliteprofessional.component';
import { AuthGuard } from 'src/Services/auth/auth.guard';


const routes: Routes = [
    {
      path: '',
      component: ProductComponent,
    },
    {
      path: 'astrogoldsilver',
      component: AstrolitegoldsilverComponent, canActivate: [AuthGuard]
    },
    {
      path: 'astroprofessional',
      component: AstroliteProfessionalComponent, canActivate: [AuthGuard]
    },
    {
      path: 'paymentsuccess',
      component: PaymentSuccessComponent, canActivate: [AuthGuard]
    },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ProductRoutingModule { }