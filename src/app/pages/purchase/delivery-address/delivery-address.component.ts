import { Component, OnInit, OnDestroy, AfterViewInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from "@angular/common";
import { ExistingAddress } from 'src/Models/ExistingAddress';
import { HoroScopeService } from 'src/Services/HoroScopeService/HoroScopeService';
import { UIService } from 'src/Services/UIService/ui.service';
import { LoginService } from 'src/Services/login/login.service';


@Component({
    selector: 'app-delivery-address',
    templateUrl: './delivery-address.component.html',
    styleUrls: ['./delivery-address.component.scss']
})
export class DeliveryAddressComponent implements OnInit, OnDestroy, AfterViewInit {
    ItName: string;
    ngOnInit() {

    }
    customerAddressForm: FormGroup;
    address1Message: string;
    address3Message: string;
    pincodeMessage: string;
    stateMessage: string;
    address2Message: string;
    OrderId: any;
    checkBoxValue: boolean = false;

    existingAddress: ExistingAddress[];
    showAddAddressForm: boolean = false;
    nameMessage: string;
    Id: any;
    customerEMailAddressForm: FormGroup;
    email: string;
    DeliveryAddressRequired: boolean;
    constructor(public _location: Location, public route: ActivatedRoute, public router: Router, public loginService: LoginService,
        public horoScopeService: HoroScopeService,
        public uiService: UIService, public formbuilder: FormBuilder) {
        this.DeliveryAddressRequired = this.horoScopeService.IsDeliverable
        this.OrderId = this.horoScopeService.OrderId;
        this.ItName=this.horoScopeService.orderResponse.ItName;
        this.customerEMailAddressForm = this.formbuilder.group({
            EMail: ['', [Validators.required, Validators.pattern("[^ @]*@[^ @]*"), Validators.minLength(6)]]
        });
        this.customerAddressForm = this.formbuilder.group({
            Name: ['Shailesh', [Validators.required, Validators.minLength(3)]],
            EMail: ['', [Validators.required, Validators.pattern("[^ @]*@[^ @]*"), Validators.minLength(6)]],
            Address1: ['Bappanadu', [Validators.required, Validators.minLength(3)]],
            Address2: ['Temple Street', [Validators.required, Validators.minLength(4)]],
            Address3: ['#4/5-2', [Validators.required, Validators.minLength(4)]],
            PinCode: ['574 154', [Validators.required, Validators.minLength(6)]],
            state: ['Karnataka', [Validators.required, Validators.minLength(4)]],
        });
        const EMailContrl_customerEMailAddressForm = this.customerEMailAddressForm.get('EMail');
        EMailContrl_customerEMailAddressForm.valueChanges.subscribe(value => this.setErrorMessage(EMailContrl_customerEMailAddressForm));
        const NameContrl = this.customerAddressForm.get('Name');
        NameContrl.valueChanges.subscribe(value => this.setErrorMessage(NameContrl));
        const EMailContrl = this.customerAddressForm.get('EMail');
        EMailContrl.valueChanges.subscribe(value => this.setErrorMessage(EMailContrl));
        const Address1Contrl = this.customerAddressForm.get('Address1');
        Address1Contrl.valueChanges.subscribe(value => this.setErrorMessage(Address1Contrl));
        const Address2Contrl = this.customerAddressForm.get('Address2');
        Address2Contrl.valueChanges.subscribe(value => this.setErrorMessage(Address2Contrl));
        const Address3Contrl = this.customerAddressForm.get('Address3');
        Address3Contrl.valueChanges.subscribe(value => this.setErrorMessage(Address3Contrl));
        const PinCodeContrl = this.customerAddressForm.get('PinCode');
        PinCodeContrl.valueChanges.subscribe(value => this.setErrorMessage(PinCodeContrl));
        const stateContrl = this.customerAddressForm.get('state');
        stateContrl.valueChanges.subscribe(value => this.setErrorMessage(stateContrl));
        // this.horoScopeService.GetEMailAddress(this.loginService.PartyMastId, (data) => {
        //     this.email = data.EMail;
        //     var PartyMastId = this.loginService.PartyMastId;
        //     this.horoScopeService.GetAllAddress(PartyMastId, (data) => {
        //         this.existingAddress = data;
        //         this.horoScopeService.GetDefaultAddress(PartyMastId, (data) => {
        //             this.Id = String(data);
        //         });
        //     });
        // });
        this.horoScopeService.GetEMailAddress(this.loginService.PartyMastId).subscribe((data:any) => {
            this.email = data.EMail;
            var PartyMastId = this.loginService.PartyMastId;
            this.horoScopeService.GetAllAddress(PartyMastId).subscribe((data:any) => {
                this.existingAddress = data;
                this.horoScopeService.GetDefaultAddress(PartyMastId).subscribe((data:any) => {
                    this.Id = String(data);
                });
            });
        });
    }
    setErrorMessage(c: AbstractControl): void {
        let control = this.uiService.getControlName(c);//gives the control name property from particular service.
        document.getElementById('err_' + control).innerHTML = '';//To not display the error message, if there is no error.
        if ((c.touched || c.dirty) && c.errors) {
            document.getElementById('err_' + control).innerHTML = Object.keys(c.errors).map(key => this.validationMessages[control + '_' + key]).join(' ');
        }
    }
    private validationMessages = { //used in above method.
        Address1_required: '*Enter City',
        Address1_minlength: '*Minimum length is 4',

        EMail_required: 'Enter EMail',
        EMail_minlength: 'Minimum length should be 6',
        EMail_pattern: 'Do not match with EMail pattern',

        Address2: '*Enter Area/Street Name',
        Address2_minlength: '*Minimum length is 4',

        Address3_required: '*Enter House No./ Building Name',
        Address3_minlength: '*Minimum length is 4',

        Name_required: '*Enter Name',
        Name_minlength: '*Minimum length is 4',

        PinCode_required: '*Enter Pin code',
        PinCode_minlength: '*Minimum length is 4',

        state_required: '*Enter State',
        state_minlength: '*Minimum length is 4',

    };
  
    OnChangeDefaultAddress(Id) {
        this.Id = Id;
    }
    ngAfterViewInit(): void {

    }

    ngOnDestroy(): void {
    }
    onAddressChanged(event) {

    }
    onAddAddress() {
        this.showAddAddressForm = true;
    }
    onRemoveAddress(Id) {
    
        var DeleteAddress = {
            PartyMastId: this.loginService.PartyMastId,
            AddressId: Id
        }
        this.horoScopeService.DeleteAddress(DeleteAddress).subscribe((data:any) => {
            if (data == true) {
                this.horoScopeService.GetAllAddress(this.loginService.PartyMastId).subscribe((data:any) => {
                    this.existingAddress = data;
                    this.horoScopeService.GetDefaultAddress(this.loginService.PartyMastId).subscribe((data:any) => {
                        this.Id = String(data);
                    });
                });
            }

        });
    }
    onCancel() {
        this.showAddAddressForm = !this.showAddAddressForm;
    }

    onSaveAddress() {
        var AddressModel = {
            EMail: this.customerAddressForm.controls['EMail'].value,
            OrderId: this.OrderId,
            PartyMastId: this.loginService.PartyMastId,
            Name: this.customerAddressForm.controls['Name'].value,
            Address1: this.customerAddressForm.controls['Address1'].value,
            Address2: this.customerAddressForm.controls['Address2'].value,
            Address3: this.customerAddressForm.controls['Address3'].value,
            PinCode: this.customerAddressForm.controls['PinCode'].value
        }
        this.horoScopeService.CreateAddress(AddressModel).subscribe((data:any) => {
            this.horoScopeService.GetAllAddress(this.loginService.PartyMastId).subscribe((data:any) => {
                this.existingAddress = data;
                this.showAddAddressForm = !this.showAddAddressForm;
                this.horoScopeService.GetDefaultAddress(this.loginService.PartyMastId).subscribe((data:any) => {
                    this.Id = String(data);
                });
            });
        });
    }
    backClicked() {
        this._location.back();
    }
    onPlaceOrder() {
        var orderAddress = {
            AddressId: this.Id,
            OrderId: this.OrderId
        }
        this.horoScopeService.UpdateAddressToOrder(orderAddress).subscribe((data:any) => {
            this.router.navigate(["/purchase/payment"]);
        });
    }

    trackByFn(index, item) {    
        return item.id; // unique id corresponding to the item
     }

}

