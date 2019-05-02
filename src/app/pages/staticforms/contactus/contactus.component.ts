import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss']
})
export class ContactusComponent implements OnInit {
  contactusForm: FormGroup;

  constructor(public formbuilder: FormBuilder) {
    this.contactusForm = this.formbuilder.group({
      FullName: ['', [Validators.required, Validators.minLength(4)]],
      Email: ['', [Validators.required]],
      PhoneNo: ['', [Validators.required]],
      Message: ['', [Validators.required]]
    });
   }

  ngOnInit() {

  }
  OnSubmit_click(){
    var ff={

    }
    
  }
}
