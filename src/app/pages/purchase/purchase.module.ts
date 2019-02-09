import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxLoadingModule } from 'ngx-loading';
import { PaidservicesComponent } from './paidservices/paidservices.component';
import { HoropaidComponent } from './horopaid/horopaid.component';
import { DxButtonModule, DxCheckBoxModule, DxTextBoxModule, DxSelectBoxModule } from 'devextreme-angular';
import { PurchaseRoutingModule } from './purchase-routing.module';
import { DeliveryAddressComponent } from './delivery-address/delivery-address.component';

@NgModule({
    imports: [
        NgxLoadingModule.forRoot({}),
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        PurchaseRoutingModule,
        DxCheckBoxModule,
        DxButtonModule,
        DxTextBoxModule,
        DxSelectBoxModule
    ],
    declarations: [
        PaidservicesComponent,
        HoropaidComponent,
        DeliveryAddressComponent
    ]
})
export class PurchaseModule{

}