import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { WalletRoutingModule } from './wallet-routing.module';
import { SalesService } from 'src/Services/sales/sales.service';
import { DepositWalletComponent } from './deposit-wallet/deposit-wallet.component';
import { DxTextBoxModule, DxSelectBoxModule, DxButtonModule } from 'devextreme-angular';
@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        WalletRoutingModule,
        DxTextBoxModule,
        DxSelectBoxModule,
        DxButtonModule
    ],
    providers:[
        SalesService
    ],
    declarations: [
        DepositWalletComponent
    ],
})
export class WalletModule {
}
