import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DxValidatorModule, DxButtonModule, DxValidationSummaryModule, DxDateBoxModule, DxSelectBoxModule, DxCheckBoxModule, DxTextBoxModule, DxRadioGroupModule, DxNumberBoxModule, DxPopupModule, DxValidationGroupModule } from 'devextreme-angular';
import { ShraddhaMaasikaRoutingModule } from './shraddhaMaasika-routing.module';
import { ShraddhaMaasikaComponent } from './shraddhaMaasika/shraddhaMaasika.component';
import { ShraddhaMaasikaFreeDataComponent } from './shraddhaMaasika-free-data/shraddhaMaasika-free-data.component';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        ShraddhaMaasikaRoutingModule,
        DxValidatorModule,DxButtonModule,DxValidationSummaryModule,
    DxDateBoxModule,DxSelectBoxModule,DxCheckBoxModule, DxPopupModule,
    DxTextBoxModule, DxRadioGroupModule, DxNumberBoxModule, DxValidationGroupModule
    ],

    declarations: [
        ShraddhaMaasikaComponent,
        ShraddhaMaasikaFreeDataComponent
    ]
})
export class ShraddhaMaasikaModule {
}
