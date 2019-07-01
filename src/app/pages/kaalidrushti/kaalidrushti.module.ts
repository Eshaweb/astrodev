import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DxValidatorModule, DxButtonModule, DxValidationSummaryModule, DxDateBoxModule, DxSelectBoxModule, DxCheckBoxModule, DxTextBoxModule, DxRadioGroupModule, DxNumberBoxModule, DxPopupModule, DxValidationGroupModule } from 'devextreme-angular';
import { KaalidrushtiComponent } from './kaalidrushti/kaalidrushti.component';
import { KaalidrushtiFreeDataComponent } from './kaalidrushti-free-data/kaalidrushti-free-data.component';
import { KaalidrushtiRoutingModule } from './kaalidrushti-routing.module';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        KaalidrushtiRoutingModule,
        DxValidatorModule,DxButtonModule,DxValidationSummaryModule,
    DxDateBoxModule,DxSelectBoxModule,DxCheckBoxModule, DxPopupModule,
    DxTextBoxModule, DxRadioGroupModule, DxNumberBoxModule, DxValidationGroupModule
    ],

    declarations: [
        KaalidrushtiComponent,
        KaalidrushtiFreeDataComponent
    ]
})
export class KaalidrushtiModule {
}
