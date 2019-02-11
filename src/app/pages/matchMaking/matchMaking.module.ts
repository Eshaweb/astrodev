import { NgModule } from '@angular/core';
import { MatchMakingComponent } from './matchMaking/matchMaking.component';
import { MatchMakingFreeDataComponent } from './matchMaking-free-data/matchMaking-free-data.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DxValidatorModule, DxButtonModule, DxValidationSummaryModule, DxDateBoxModule, DxSelectBoxModule, DxCheckBoxModule, DxTextBoxModule, DxRadioGroupModule } from 'devextreme-angular';
import { MatchMakingRoutingModule } from './matchMaking-routing.module';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        MatchMakingRoutingModule,
        DxValidatorModule,DxButtonModule,DxValidationSummaryModule,
    DxDateBoxModule,DxSelectBoxModule,DxCheckBoxModule,
    DxTextBoxModule, DxRadioGroupModule,
    ],

    declarations: [
        MatchMakingComponent, 
        MatchMakingFreeDataComponent
    ]
})
export class MatchMakingModule {
}