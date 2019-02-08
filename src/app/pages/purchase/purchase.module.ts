import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxLoadingModule } from 'ngx-loading';
import { PaidservicesComponent } from './paidservices/paidservices.component';
import { HoropaidComponent } from './horopaid/horopaid.component';
import { DxButtonModule, DxCheckBoxModule } from 'devextreme-angular';
import { PurchaseRoutingModule } from './purchase-routing.module';

@NgModule({
    imports: [
        NgxLoadingModule.forRoot({}),
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        PurchaseRoutingModule,
        DxCheckBoxModule,
        DxButtonModule
    ],
    declarations: [
        PaidservicesComponent,
        HoropaidComponent
    ]
})
export class PurchaseModule{

}