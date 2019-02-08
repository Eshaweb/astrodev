import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HoroscopeComponent } from '../horoscope/horoscope/horoscope.component';
import { HoroscopeRoutingModule } from './horoscope-routing.module';
import { DxValidatorModule, DxButtonModule, DxValidationSummaryModule, DxDateBoxModule, DxSelectBoxModule, DxCheckBoxModule, DxTextBoxModule, DxRadioGroupModule } from 'devextreme-angular';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        HoroscopeRoutingModule,
        DxValidatorModule,DxButtonModule,DxValidationSummaryModule,
    DxDateBoxModule,DxSelectBoxModule,DxCheckBoxModule,
    DxTextBoxModule, DxRadioGroupModule,
    ],

    declarations: [
        //HoroscopeComponent, 
        //FreeDataComponent
    ]
})
export class HoroscopeModule {
}
