import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdminComponent } from './admin/admin.component';
import { BasePriceComponent } from './baseprice/baseprice.component';
import { PriceListComponent } from './pricelist/pricelist.component';
import { MasterDetailComponent } from './masterDetail/masterDetail.component';
import { AssignPriceListComponent } from './assignPriceList/assignPriceList.component';
import { AssignNewPriceListComponent } from './assignNewPriceList/assignNewPriceList.component';
import { WelcomeOfferComponent } from './welcomeOffer/welcomeOffer.component';
import { PromoCodeComponent } from './promoCode/promoCode.component';
import { UnUsedPromoCodesComponent } from './unusedPromoCodes/unusedPromoCodes.component';
import { CreatePromoCodeComponent } from './createPromoCode/createPromoCode.component';
import { UsedPromoCodesComponent } from './usedPromoCodes/usedPromoCodes.component';
import { PendingtoDeliveryComponent } from './pendingtoDelivery/pendingtoDelivery.component';
import { DeliveredListComponent } from './deliveredList/deliveredList.component';

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
    },
    {
      path: 'assignPriceList',
      component:AssignPriceListComponent
    },
    {
      path: 'assignNewPriceList',
      component:AssignNewPriceListComponent
    },
    {
      path: 'welcomeOffer',
      component:WelcomeOfferComponent
    },
    {
      path: 'promoCode',
      component:PromoCodeComponent
    },
    {
      path: 'unusedPromoCodes',
      component:UnUsedPromoCodesComponent
    },
    {
      path: 'usedPromoCodes',
      component:UsedPromoCodesComponent
    },
    {
      path: 'createPromoCode',
      component:CreatePromoCodeComponent
    },
    {
      path: 'pendingtoDelivery',
      component:PendingtoDeliveryComponent
    },
    {
      path: 'deliveredList',
      component:DeliveredListComponent
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class AdminRoutingModule { }