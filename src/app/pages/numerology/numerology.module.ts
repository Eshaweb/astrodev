import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DxValidatorModule, DxButtonModule, DxValidationSummaryModule, DxDateBoxModule, DxSelectBoxModule, DxCheckBoxModule, DxTextBoxModule, DxRadioGroupModule, DxNumberBoxModule, DxPopupModule, DxValidationGroupModule } from 'devextreme-angular';
import { NumerologyRoutingModule } from './numerology-routing.module';
import { NumerologyComponent } from './numerology/numerology.component';
import { NumerologyFreeDataComponent } from './numerology-free-data/numerology-free-data.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        NumerologyRoutingModule,
        DxValidatorModule,DxButtonModule,DxValidationSummaryModule,
    DxDateBoxModule,DxSelectBoxModule,DxCheckBoxModule, DxPopupModule,
    DxTextBoxModule, DxRadioGroupModule, DxNumberBoxModule, DxValidationGroupModule
    ],

    declarations: [
        NumerologyComponent,
        NumerologyFreeDataComponent
    ]
})
export class NumerologyModule {
}
