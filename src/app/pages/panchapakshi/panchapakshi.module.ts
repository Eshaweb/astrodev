import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DxValidatorModule, DxButtonModule, DxValidationSummaryModule, DxDateBoxModule, DxSelectBoxModule, DxCheckBoxModule, DxTextBoxModule, DxRadioGroupModule, DxNumberBoxModule } from 'devextreme-angular';
import { PanchapakshiRoutingModule } from './panchapakshi-routing.module';
import { PanchaPakshiComponent } from './panchapakshi/panchapakshi.component';
import { PanchapakshiFreeDataComponent } from './panchapakshi-free-data/panchapakshi-free-data.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        PanchapakshiRoutingModule,
        DxValidatorModule,DxButtonModule,DxValidationSummaryModule,
    DxDateBoxModule,DxSelectBoxModule,DxCheckBoxModule,
    DxTextBoxModule, DxRadioGroupModule, DxNumberBoxModule
    ],

    declarations: [
        PanchaPakshiComponent, 
        PanchapakshiFreeDataComponent
    ]
})
export class PanchapakshiModule {
}
