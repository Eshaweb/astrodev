import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxLoadingModule } from 'ngx-loading';
import { PaidservicesComponent } from './paidservices/paidservices.component';
import { HoropaidComponent } from './horopaid/horopaid.component';
import { DxButtonModule, DxCheckBoxModule, DxTextBoxModule, DxSelectBoxModule } from 'devextreme-angular';
import { PurchaseRoutingModule } from './purchase-routing.module';
import { DeliveryAddressComponent } from './delivery-address/delivery-address.component';
import { PaymentComponent } from './payment/payment.component';
import { PaymentProcessingComponent } from './payment-processing/payment-processing.component';

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
        DeliveryAddressComponent,
        PaymentComponent,
        PaymentProcessingComponent
    ]
})
export class PurchaseModule{

}