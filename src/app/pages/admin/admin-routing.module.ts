import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdminComponent } from './admin/admin.component';
import { BasePriceComponent } from './baseprice/baseprice.component';
import { PriceListComponent } from './pricelist/pricelist.component';
import { MasterDetailComponent } from './masterDetail/masterDetail.component';

const routes: Routes = [
    {
      path: '',
      component: AdminComponent,
    },
    {
      path: 'basePrice',
      component:BasePriceComponent
    },
    {
      path: 'priceList',
      component:PriceListComponent
    },
    {
      path: 'masterDetail',
      component:MasterDetailComponent
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class AdminRoutingModule { }