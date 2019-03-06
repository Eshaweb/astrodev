import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { DxValidatorModule, DxButtonModule, DxValidationSummaryModule, DxDateBoxModule, DxSelectBoxModule, DxCheckBoxModule, DxTextBoxModule, DxRadioGroupModule, DxNumberBoxModule, DxTileViewModule, DxDataGridModule } from 'devextreme-angular';
import { ArchwizardModule } from 'angular-archwizard';
import { MuhurthaService } from 'src/Services/MuhoorthaService/MuhoorthaService';
import { MuhurthaRoutingModule } from './muhurtha-routing.module';
import { MuhurthaComponent } from './muhurtha/muhurtha.component';
import { MuhurthaFreeDataComponent } from './muhurtha-free-data/muhurtha-free-data.component';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule, DxDataGridModule,
        MuhurthaRoutingModule,ArchwizardModule,
        DxValidatorModule,DxButtonModule,DxValidationSummaryModule,
    DxDateBoxModule,DxSelectBoxModule,DxCheckBoxModule, DxTileViewModule,
    DxTextBoxModule, DxRadioGroupModule, DxNumberBoxModule,
    ],
providers:[MuhurthaService],
    declarations: [
        MuhurthaComponent, 
        MuhurthaFreeDataComponent
    ]
})
export class MuhurthaModule {
}
