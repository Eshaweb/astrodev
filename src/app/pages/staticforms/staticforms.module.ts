import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxLoadingModule } from 'ngx-loading';
import { DxButtonModule, DxCheckBoxModule, DxTextBoxModule, DxSelectBoxModule, DxLoadPanelModule, DxResponsiveBoxModule, DxPopupModule, DxPopoverModule, DxAccordionModule, DxTemplateModule, DxSliderModule, DxTagBoxModule, DxDataGridModule, DxNumberBoxModule, DxDateBoxModule, DxListModule, DxTextAreaModule } from 'devextreme-angular';
import { DxiRowModule } from 'devextreme-angular/ui/nested/row-dxi';
import { ArchwizardModule } from 'angular-archwizard';
import { StaticFormsRoutingModule } from './staticforms-routing.module';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { TermsandConditionsComponent } from './termsand-conditions/termsand-conditions.component';
import { NgxCaptchaModule } from 'ngx-captcha';
import { OfflinepaymentComponent } from './offline-payment/offline-payment.component';

@NgModule({
    imports: [
        NgxLoadingModule.forRoot({}),
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        StaticFormsRoutingModule,
        DxCheckBoxModule,
        DxButtonModule,
        DxTextBoxModule,
        DxDateBoxModule,
        DxNumberBoxModule,
        DxSelectBoxModule,DxAccordionModule,
        DxCheckBoxModule,
        DxSliderModule, NgxCaptchaModule,
        DxTagBoxModule, DxTextAreaModule,
        DxTemplateModule,ArchwizardModule,
        DxDataGridModule, DxListModule,
        DxLoadPanelModule,DxPopupModule, DxPopoverModule,
        DxResponsiveBoxModule,DxiRowModule
    ],
    declarations: [
       AboutusComponent,ContactusComponent,DisclaimerComponent, 
       PrivacyComponent, TermsandConditionsComponent, OfflinepaymentComponent
    ],
})
export class StaticFormsModule{

}