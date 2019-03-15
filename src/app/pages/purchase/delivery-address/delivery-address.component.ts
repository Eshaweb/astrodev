import { Component, OnInit, OnDestroy, AfterViewInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from "@angular/common";
import { ExistingAddress } from 'src/Models/ExistingAddress';
import { HoroScopeService } from 'src/Services/HoroScopeService/HoroScopeService';
import { UIService } from 'src/Services/UIService/ui.service';
import { LoginService } from 'src/Services/login/login.service';
import { SelectBoxModel } from 'src/Models/SelectBoxModel';
import ArrayStore from 'devextreme/data/array_store';
import { OrderService } from 'src/Services/OrderService/OrderService';
import { StorageService } from 'src/Services/StorageService/Storage_Service';
import { LoadingSwitchService } from 'src/Services/LoadingSwitchService/LoadingSwitchService';


@Component({
    selector: 'app-delivery-address',
    templateUrl: './delivery-address.component.html',
    styleUrls: ['./delivery-address.component.scss']
})
export class DeliveryAddressComponent implements OnInit, OnDestroy, AfterViewInit {
    ItName: string;

    // statesOfIndia: SelectBoxModel[] = [
    //     { Id: "Andhra Pradesh", Text: 'Andhra Pradesh' },
    //     { Id: "Arunachal Pradesh", Text: 'Arunachal Pradesh' },
    //     { Id: "Assam", Text: 'Assam' },
    //     { Id: "Bihar", Text: 'Bihar' },
    //     { Id: "Chhattisgarh", Text: 'Chhattisgarh' },
    //     { Id: "Goa", Text: 'Goa' },
    //     { Id: "Gujarat", Text: 'Gujarat' },
    //     { Id: "Haryana", Text: 'Haryana' },
    //     { Id: "Himachal Pradesh", Text: 'Himachal Pradesh' },
    //     { Id: "Jammu & Kashmir", Text: 'Jammu & Kashmir' },
    //     { Id: "Jharkhand", Text: 'Jharkhand' },
    //     { Id: "Karnataka", Text: 'Karnataka' },
    //     { Id: "Kerala", Text: 'Kerala' },
    //     { Id: "Madhya Pradesh", Text: 'Madhya Pradesh' },
    //     { Id: "Maharashtra", Text: 'Maharashtra' },
    //     { Id: "Manipur", Text: 'Manipur' },
    //     { Id: "Meghalaya", Text: 'Meghalaya' },
    //     { Id: "Mizoram", Text: 'Mizoram' },
    //     { Id: "Nagaland", Text: 'Nagaland' },
    //     { Id: "Odisha", Text: 'Odisha' },
    //     { Id: "Punjab", Text: 'Punjab' },
    //     { Id: "Rajasthan", Text: 'Rajasthan' },
    //     { Id: "Sikkim", Text: 'Sikkim' },
    //     { Id: "Tamil Nadu", Text: 'Tamil Nadu' },
    //     { Id: "Telangana", Text: 'Telangana' },
    //     { Id: "Tripura", Text: 'Tripura' },
    //     { Id: "Uttarakhand", Text: 'Uttarakhand' },
    //     { Id: "Uttar Pradesh", Text: 'Uttar Pradesh' },
    //     { Id: "West Bengal", Text: 'West Bengal' }
    //   ];
    statedata: ArrayStore;
    statevalue: any;
    statesOfIndia: string[];
    ngOnInit() {
        // this.statedata = new ArrayStore({
        //     data: this.statesOfIndia,
        //     key: "Id"
        //   });
        this.statesOfIndia=['Andhra Pradesh','Arunachal Pradesh',
        'Assam','Bihar', 'Chhattisgarh','Goa','Gujarat','Haryana',
        'Himachal Pradesh','Jammu & Kashmir','Jharkhand','Karnataka',
        'Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya',
        'Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim',
        'Tamil Nadu','Telangana','Tripura','Uttarakhand','Uttar Pradesh',
        'West Bengal'];
    }
    statedataSelection(event){
        this.statevalue=event.value;
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
    constructor(public storageService:StorageService,public _location: Location, public route: ActivatedRoute, public router: Router, public loginService: LoginService,
        public horoScopeService: HoroScopeService, private orderService:OrderService,
        public uiService: UIService, public formbuilder: FormBuilder, public loadingSwitchService:LoadingSwitchService) {
        this.DeliveryAddressRequired = this.horoScopeService.IsDeliverable
        this.loadingSwitchService.loading=true;
        //this.OrderId = this.orderService.orderResponse.OrderId;
        this.OrderId = StorageService.GetItem('OrderId');
        // if(this.orderService.orderResponse.ItName!=undefined){
        //     this.ItName=this.orderService.orderResponse.ItName;
        // }
        if(this.storageService.GetOrderResponse().ItName!=undefined){
            this.ItName=this.storageService.GetOrderResponse().ItName;
        }
        this.customerEMailAddressForm = this.formbuilder.group({
            EMail: ['', [Validators.required, Validators.pattern("[^ @]*@[^ @]*"), Validators.minLength(6)]]
        });
        this.customerAddressForm = this.formbuilder.group({
            Name: ['Shailesh', [Validators.required, Validators.minLength(3)]],
            //EMail: ['', [Validators.required, Validators.pattern("[^ @]*@[^ @]*"), Validators.minLength(6)]],
            MobileNo:[8277033170,[Validators.required]],
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
        // const EMailContrl = this.customerAddressForm.get('EMail');
        // EMailContrl.valueChanges.subscribe(value => this.setErrorMessage(EMailContrl));
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
        var PartyMastId = StorageService.GetItem('PartyMastId');
        this.horoScopeService.GetEMailAddress(PartyMastId).subscribe((data:any) => {
            this.email = data.EMail;
            this.horoScopeService.GetAllAddress(PartyMastId).subscribe((data:any) => {
                this.existingAddress = data;
                this.horoScopeService.GetDefaultAddress(PartyMastId).subscribe((data:any) => {
                    this.Id = String(data);
                    this.loadingSwitchService.loading=false;
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
        this.loadingSwitchService.loading=true;
        // var DeleteAddress = {
        //     PartyMastId: this.loginService.PartyMastId,
        //     AddressId: Id
        // }
        var DeleteAddress = {
            PartyMastId: StorageService.GetItem('PartyMastId'),
            AddressId: Id
        }
        this.horoScopeService.DeleteAddress(DeleteAddress).subscribe((data:any) => {
            if (data == true) {
                this.horoScopeService.GetAllAddress(this.loginService.PartyMastId).subscribe((data:any) => {
                    this.existingAddress = data;
                    this.horoScopeService.GetDefaultAddress(this.loginService.PartyMastId).subscribe((data:any) => {
                        this.Id = String(data);
                        this.loadingSwitchService.loading=false;
                    });
                });
            }

        });
    }
    onCancel() {
        this.showAddAddressForm = !this.showAddAddressForm;
    }

    onSaveAddress() {
        this.loadingSwitchService.loading=true;
        var AddressModel = {
            //EMail: this.customerAddressForm.controls['EMail'].value,
            OrderId: this.OrderId,
            PartyMastId: this.loginService.PartyMastId,
            Name: this.customerAddressForm.controls['Name'].value,
            MobileNo:this.customerAddressForm.controls['MobileNo'].value,
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
                    this.loadingSwitchService.loading=false;
                });
            });
        });
    }
    backClicked() {
        this._location.back();
    }
    onPlaceOrder() {
        this.loadingSwitchService.loading=true;
        var orderAddress = {
            EMail:this.customerEMailAddressForm.controls['EMail'].value,
            AddressId: this.Id,
            OrderId: this.OrderId
        }
        this.orderService.UpdateAddressToOrder(orderAddress).subscribe((data:any) => {
            this.loadingSwitchService.loading=false;
            this.router.navigate(["/purchase/payment"]);
        });
    }

    trackByFn(index, item) {    
        return item.id; // unique id corresponding to the item
     }

}

