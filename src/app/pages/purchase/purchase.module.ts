import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxLoadingModule } from 'ngx-loading';
import { PaidservicesComponent } from './paidservices/paidservices.component';
import { HoropaidComponent } from './horopaid/horopaid.component';
import { DxButtonModule, DxCheckBoxModule, DxTextBoxModule, DxSelectBoxModule, DxLoadPanelModule, DxResponsiveBoxModule, DxPopupModule, DxNumberBoxModule } from 'devextreme-angular';
import { PurchaseRoutingModule } from './purchase-routing.module';
import { DeliveryAddressComponent } from './delivery-address/delivery-address.component';
import { PaymentComponent } from './payment/payment.component';
import { PaymentProcessingComponent } from './payment-processing/payment-processing.component';
import { DxiRowModule } from 'devextreme-angular/ui/nested/row-dxi';

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
        DxSelectBoxModule, DxNumberBoxModule,
        DxLoadPanelModule,DxPopupModule,
        DxResponsiveBoxModule,DxiRowModule
    ],
    declarations: [
        PaidservicesComponent,
        HoropaidComponent,
        DeliveryAddressComponent,
        PaymentComponent,
        PaymentProcessingComponent,
    ]
})
export class PurchaseModule{

}