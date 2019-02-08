import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxCheckBoxModule } from 'devextreme-angular/ui/check-box';
import { DxTextBoxModule } from 'devextreme-angular/ui/text-box';
import { DxValidatorModule } from 'devextreme-angular/ui/validator';
import { DxValidationGroupModule } from 'devextreme-angular/ui/validation-group';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthService } from 'angularx-social-login';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
@NgModule({
    imports: [
      CommonModule,
      RouterModule,
      DxButtonModule,
      DxCheckBoxModule,
      DxTextBoxModule,
      DxValidatorModule,
      DxValidationGroupModule,
      ReactiveFormsModule,
      FormsModule,
    ],
    providers:[AuthService],
    declarations: [ RegistrationFormComponent ],
    exports: [ RegistrationFormComponent ]
  })
  export class RegistrationFormModule { }
  