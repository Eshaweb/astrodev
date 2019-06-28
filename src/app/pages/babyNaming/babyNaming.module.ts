import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DxValidatorModule, DxButtonModule, DxValidationSummaryModule, DxDateBoxModule, DxSelectBoxModule, DxCheckBoxModule, DxTextBoxModule, DxRadioGroupModule, DxNumberBoxModule, DxPopupModule, DxValidationGroupModule } from 'devextreme-angular';
import { BabyNamingComponent } from './babyNaming/babyNaming.component';
import { BabyNamingRoutingModule } from './babyNaming-routing.module';
import { BabyNamingFreeDataComponent } from './babyNaming-free-data/babyNaming-free-data.component';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        BabyNamingRoutingModule,
        DxValidatorModule,DxButtonModule,DxValidationSummaryModule,
    DxDateBoxModule,DxSelectBoxModule,DxCheckBoxModule, DxPopupModule,
    DxTextBoxModule, DxRadioGroupModule, DxNumberBoxModule, DxValidationGroupModule
    ],

    declarations: [
        BabyNamingComponent,
        BabyNamingFreeDataComponent
    ]
})
export class BabyNamingModule {
}
