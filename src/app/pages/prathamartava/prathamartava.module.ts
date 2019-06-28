import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DxValidatorModule, DxButtonModule, DxValidationSummaryModule, DxDateBoxModule, DxSelectBoxModule, DxCheckBoxModule, DxTextBoxModule, DxRadioGroupModule, DxNumberBoxModule, DxPopupModule, DxValidationGroupModule } from 'devextreme-angular';
import { PrathamartavaRoutingModule } from './prathamartava-routing.module';
import { PrathamartavaFreeDataComponent } from './prathamartava-free-data/prathamartava-free-data.component';
import { PrathamartavaComponent } from './prathamartava/prathamartava.component';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        PrathamartavaRoutingModule,
        DxValidatorModule,DxButtonModule,DxValidationSummaryModule,
    DxDateBoxModule,DxSelectBoxModule,DxCheckBoxModule, DxPopupModule,
    DxTextBoxModule, DxRadioGroupModule, DxNumberBoxModule, DxValidationGroupModule
    ],

    declarations: [
        PrathamartavaComponent,
        PrathamartavaFreeDataComponent
    ]
})
export class PrathamartavaModule {
}
