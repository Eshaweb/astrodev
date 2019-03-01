import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxLoadingModule } from 'ngx-loading';
import { DxButtonModule, DxCheckBoxModule, DxTextBoxModule, DxSelectBoxModule, DxLoadPanelModule, DxResponsiveBoxModule, DxPopupModule, DxPopoverModule, DxAccordionModule, DxTemplateModule, DxSliderModule, DxTagBoxModule } from 'devextreme-angular';
import { DxiRowModule } from 'devextreme-angular/ui/nested/row-dxi';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings/settings.component';
import { OrderHistoryComponent} from './order-history/order-history.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SortingOrderHistoryPipe } from 'src/pipes/sorting-orders.pipe';

@NgModule({
    imports: [
        NgxLoadingModule.forRoot({}),
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        SettingsRoutingModule,
        DxCheckBoxModule,
        DxButtonModule,
        DxTextBoxModule,
        DxSelectBoxModule,DxAccordionModule,
        DxCheckBoxModule,
        DxSliderModule,
        DxTagBoxModule,
        DxTemplateModule,
        DxLoadPanelModule,DxPopupModule, DxPopoverModule,
        DxResponsiveBoxModule,DxiRowModule
    ],
    declarations: [
        SettingsComponent,
        OrderHistoryComponent,
        ChangePasswordComponent,
        ForgotPasswordComponent, SortingOrderHistoryPipe
    ],
})
export class SettingsModule{

}