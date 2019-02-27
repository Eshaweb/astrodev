import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxLoadingModule } from 'ngx-loading';
import { DxButtonModule, DxCheckBoxModule, DxTextBoxModule, DxSelectBoxModule, DxLoadPanelModule, DxResponsiveBoxModule, DxPopupModule, DxPopoverModule, DxAccordionModule, DxTemplateModule, DxSliderModule, DxTagBoxModule, DxDataGridModule, DxNumberBoxModule, DxDateBoxModule } from 'devextreme-angular';
import { DxiRowModule } from 'devextreme-angular/ui/nested/row-dxi';
import { AdminRoutingModule } from './admin-routing.module';
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

@NgModule({
    imports: [
        NgxLoadingModule.forRoot({}),
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        AdminRoutingModule,
        DxCheckBoxModule,
        DxButtonModule,
        DxTextBoxModule,
        DxDateBoxModule,
        DxNumberBoxModule,
        DxSelectBoxModule,DxAccordionModule,
        DxCheckBoxModule,
        DxSliderModule,
        DxTagBoxModule,
        DxTemplateModule,
        DxDataGridModule,
        DxLoadPanelModule,DxPopupModule, DxPopoverModule,
        DxResponsiveBoxModule,DxiRowModule
    ],
    declarations: [
        AdminComponent,
        BasePriceComponent,
        PriceListComponent,
        MasterDetailComponent,
        AssignPriceListComponent,
        AssignNewPriceListComponent,
        WelcomeOfferComponent,
        PromoCodeComponent,
        UnUsedPromoCodesComponent,
        UsedPromoCodesComponent,
        CreatePromoCodeComponent
    ],
})
export class AdminModule{

}