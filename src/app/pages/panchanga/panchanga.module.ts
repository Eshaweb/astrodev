import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { DxValidatorModule, DxButtonModule, DxValidationSummaryModule, DxDateBoxModule, DxSelectBoxModule, DxCheckBoxModule, DxTextBoxModule, DxRadioGroupModule, DxNumberBoxModule, DxTileViewModule } from 'devextreme-angular';
import { PanchangaFreeDataComponent } from './panchanga-free-data/panchanga-free-data.component';
import { PanchangaComponent } from './panchanga/panchanga.component';
import { PanchangaRoutingModule } from './panchanga-routing.module';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        PanchangaRoutingModule,
        DxValidatorModule,DxButtonModule,DxValidationSummaryModule,
    DxDateBoxModule,DxSelectBoxModule,DxCheckBoxModule, DxTileViewModule,
    DxTextBoxModule, DxRadioGroupModule, DxNumberBoxModule
    ],

    declarations: [
        PanchangaComponent, 
        PanchangaFreeDataComponent
    ]
})
export class PanchangaModule {
}
