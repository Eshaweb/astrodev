import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AstamangalaRoutingModule } from './astamangala-routing.module';
import { AstamangalaComponent } from './astamangala/astamangala.component';
import { NgModule } from '@angular/core';
import { DxValidatorModule, DxButtonModule, DxValidationSummaryModule, DxDateBoxModule, DxSelectBoxModule, DxCheckBoxModule, DxTextBoxModule, DxRadioGroupModule } from 'devextreme-angular';
import { AstamangalaFreeDataComponent } from './astamangala-free-data/astamangala-free-data.component';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        AstamangalaRoutingModule,
        DxValidatorModule,DxButtonModule,DxValidationSummaryModule,
    DxDateBoxModule,DxSelectBoxModule,DxCheckBoxModule,
    DxTextBoxModule, DxRadioGroupModule,
    ],

    declarations: [
        AstamangalaComponent, 
        AstamangalaFreeDataComponent
    ]
})
export class AstamangalaModule {
}
