import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { PartyService } from 'src/Services/PartyService/PartyService';
import { UIService } from 'src/Services/UIService/ui.service';
import { LoadingSwitchService } from 'src/Services/LoadingSwitchService/LoadingSwitchService';
import { environment } from 'src/environments/environment';
import { LoginService } from '../../../../Services/LoginService/LoginService';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss']
})
export class ContactusComponent implements OnInit {
  contactusForm: FormGroup;
  contactSubmitted: boolean=false;
  siteKey: string;

  constructor(public formbuilder: FormBuilder, public partyService:PartyService, public uiService:UIService,
    public loadingSwitchService:LoadingSwitchService, public loginService:LoginService) {
      if (environment.production) {
        this.contactusForm = this.formbuilder.group({
          Name: ['', [Validators.required, Validators.minLength(4)]],
          Email: ['',[Validators.pattern("[^ @]*@[^ @]*"), Validators.minLength(6)]],
          Mobile: ['',[Validators.minLength(10)]],
          Message: ['', [Validators.required]],
          recaptcha: ['', Validators.required]
        });
      }
      else{
        // this.contactusForm = this.formbuilder.group({
        //   Name: ['Shailesh', [Validators.required, Validators.minLength(4)]],
        //   Email: ['shailesh@gmail.com', [Validators.pattern("[^ @]*@[^ @]*"), Validators.minLength(6)]],
        //   Mobile: ['8277033170',[Validators.minLength(10)]],
        //   Message: ['Hello', [Validators.required]],
        //   recaptcha: ['', Validators.required]
        // });
        this.contactusForm = this.formbuilder.group({
          Name: ['', [Validators.required, Validators.minLength(4)]],
          Email: ['', [Validators.pattern("[^ @]*@[^ @]*"), Validators.minLength(6)]],
          Mobile: ['',[Validators.minLength(10)]],
          Message: ['', [Validators.required]],
          recaptcha: ['', Validators.required]
        });
      }

    const NameContrl = this.contactusForm.get('Name');
    NameContrl.valueChanges.subscribe(value => this.setErrorMessage(NameContrl));
    const EmailContrl = this.contactusForm.get('Email');
    EmailContrl.valueChanges.subscribe(value => this.setErrorMessage(EmailContrl));
    const MobileContrl = this.contactusForm.get('Mobile');
    MobileContrl.valueChanges.subscribe(value => this.setErrorMessage(MobileContrl));
    const MessageContrl = this.contactusForm.get('Message');
    MessageContrl.valueChanges.subscribe(value => this.setErrorMessage(MessageContrl));
   }

   setErrorMessage(c: AbstractControl): void {
    let control = this.uiService.getControlName(c);//gives the control name property from particular service.
    document.getElementById('err_' + control).innerHTML = '';//To not display the error message, if there is no error.
    if ((c.touched || c.dirty) && c.errors) {
      document.getElementById('err_' + control).innerHTML = Object.keys(c.errors).map(key => this.validationMessages[control + '_' + key]).join(' ');
    }
  }

  private validationMessages = { //used in above method.
    Name_required: '*Enter Name',
    Name_minlength: '*Minimum length is 4',
    Name_pattern: 'Name should be character only',

   //Email_minlength: 'Minimum length should be 6',
    Email_pattern: 'Do not match with EMail pattern',

    Message_required: '*Select Date of Birth'
  };

  ngOnInit() {
    // if (environment.production) {
    //   //this.siteKey='xxxxx';
    //   this.siteKey='ccccc';
    // }
    // else{
    //   this.siteKey='vvvvv';
    // }
    this.siteKey="xxxx";
      //this.siteKey=LoginService.siteKey;
    
  }

  OnSubmit_click(){
    this.loadingSwitchService.loading=true;
    var AddMessage = {
      Name:this.contactusForm.controls['Name'].value,
      Email:this.contactusForm.controls['Email'].value,
      Mobile:this.contactusForm.controls['Mobile'].value,
      Message:this.contactusForm.controls['Message'].value
    }
    this.partyService.AddMessage(AddMessage).subscribe((data: any) => {
      if(data==true){
        this.contactSubmitted=true;
        this.loadingSwitchService.loading=false;
      }
    });

  }
}
