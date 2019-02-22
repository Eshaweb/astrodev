import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxLoadingModule } from 'ngx-loading';
import { DxButtonModule, DxCheckBoxModule, DxTextBoxModule, DxSelectBoxModule, DxLoadPanelModule, DxResponsiveBoxModule, DxPopupModule, DxPopoverModule, DxAccordionModule, DxTemplateModule, DxSliderModule, DxTagBoxModule, DxDataGridModule } from 'devextreme-angular';
import { DxiRowModule } from 'devextreme-angular/ui/nested/row-dxi';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';
import { BasePriceComponent } from './baseprice/baseprice.component';
import { PriceListComponent } from './pricelist/pricelist.component';

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
        PriceListComponent
    ],
})
export class AdminModule{

}