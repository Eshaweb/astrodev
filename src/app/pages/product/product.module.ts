import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxLoadingModule } from 'ngx-loading';
import { DxButtonModule, DxCheckBoxModule, DxTextBoxModule, DxSelectBoxModule, DxLoadPanelModule, DxResponsiveBoxModule, DxPopupModule, DxNumberBoxModule } from 'devextreme-angular';
import { DxiRowModule } from 'devextreme-angular/ui/nested/row-dxi';
import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product/product.component';
import { AstrolitegoldsilverComponent } from './astrolitegoldsilver/astrolitegoldsilver.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';

@NgModule({
    imports: [
        NgxLoadingModule.forRoot({}),
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        ProductRoutingModule,
        DxCheckBoxModule,
        DxButtonModule,
        DxTextBoxModule,
        DxSelectBoxModule, DxNumberBoxModule,
        DxLoadPanelModule,DxPopupModule,
        DxResponsiveBoxModule,DxiRowModule
    ],
    declarations: [
        ProductComponent, AstrolitegoldsilverComponent,
        PaymentSuccessComponent
    ]
})
export class ProductModule{

}