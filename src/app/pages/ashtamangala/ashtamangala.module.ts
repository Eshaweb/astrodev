import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { DxValidatorModule, DxButtonModule, DxValidationSummaryModule, DxDateBoxModule, DxSelectBoxModule, DxCheckBoxModule, DxTextBoxModule, DxRadioGroupModule, DxNumberBoxModule } from 'devextreme-angular';
import { AshtamangalaFreeDataComponent } from './ashtamangala-free-data/ashtamangala-free-data.component';
import { AshtamangalaRoutingModule } from './ashtamangala-routing.module';
import { AshtamangalaComponent } from './ashtamangala/ashtamangala.component';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        AshtamangalaRoutingModule,
        DxValidatorModule,DxButtonModule,DxValidationSummaryModule,
    DxDateBoxModule,DxSelectBoxModule,DxCheckBoxModule,
    DxTextBoxModule, DxRadioGroupModule, DxNumberBoxModule
    ],

    declarations: [
        AshtamangalaComponent, 
        AshtamangalaFreeDataComponent
    ]
})
export class AshtamangalaModule {
}
