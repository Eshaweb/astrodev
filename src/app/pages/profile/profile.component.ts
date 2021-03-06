import { Component } from '@angular/core';
import { NavigationExtras, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SelectBoxModel } from 'src/Models/SelectBoxModel';
import { PartyService } from 'src/Services/PartyService/PartyService';
import { LoadingSwitchService } from 'src/Services/LoadingSwitchService/LoadingSwitchService';
import { ToastrManager } from 'ng6-toastr-notifications';
import ArrayStore from 'devextreme/data/array_store';
import { PanchangaService } from 'src/Services/PanchangaService/PanchangaService';
import { StorageService } from 'src/Services/StorageService/Storage_Service';
import { LoginService } from 'src/Services/LoginService/LoginService';


@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent {
  public loading = false;
  profileForm: FormGroup;
  statesOfIndia: SelectBoxModel[];
  statedata: ArrayStore;
  statevalue: string;
  Id: any;
  MobileNoDisabled: boolean=true;
  EMailDisabled: boolean=true;
  buttonName: string='Edit';
  fieldDisabled: boolean=true;
  constructor(public loadingSwitchService: LoadingSwitchService, public toastr: ToastrManager, 
    public partyService: PartyService, public panchangaService: PanchangaService, public route: ActivatedRoute, 
    public formbuilder: FormBuilder, public formBuilder: FormBuilder, public loginService:LoginService) {
      this.profileForm = this.formbuilder.group({
      Date: new Date(),
      Name: [''],
      language: ['', []],
      MobileNo: [''],
      EMail: [''],
      Address1: [''],
      Address2: [''],
      Address3: [''],
      PinCode: [''],
      ReferralCode:[''],
    });
    this.statesOfIndia = partyService.statesOfIndia;
      
  }
  statedataSelection(event) {
    this.statevalue = event.value;
  }
 
  ngOnInit() {
    this.statedata = new ArrayStore({
      data: this.statesOfIndia,
      key: "Id"
    });
    this.loadingSwitchService.loading = true;
    if (StorageService.GetItem('PartyMastId') != undefined) {
    this.partyService.GetProfile(StorageService.GetItem('PartyMastId')).subscribe((data: any) => {
      this.profileForm.controls['ReferralCode'].setValue(data.ReferralCode);
      this.Id = data.Id;
      this.profileForm.controls['Name'].setValue(data.Name);
      this.profileForm.controls['MobileNo'].setValue(data.Mobile);
      this.profileForm.controls['EMail'].setValue(data.EMail);
      this.profileForm.controls['Address1'].setValue(data.Address1);
      this.profileForm.controls['Address2'].setValue(data.Address2);
      this.profileForm.controls['Address3'].setValue(data.Address3);
      this.profileForm.controls['PinCode'].setValue(data.PinCode);
      this.statevalue=data.State;
      if (data.Mobile == null||data.Mobile == "") {
        this.MobileNoDisabled = false;
      }
      if (data.EMail == null||data.EMail == "") {
        this.EMailDisabled = false;
      }
      // this.loginService.shareButtonDescription='Join me on Astrolite, an accurate app for Horoscope, Matchmaking, Muhurtha, Ashtamangala, Nithya Panchanga and many more astrology related services. Enter Code '+data.ReferralCode+' to get some amount to your wallet!..ಜಾತಕ, ಮುಹೂರ್ತ, ವಿವಾಹ ಹೊಂದಾಣಿಕೆ, 200 ವರ್ಷದ ಪಂಚಾಂಗ, ಇತ್ಯಾದಿ ಅನೇಕ ಜ್ಯೋತಿಷ್ಯದ ವಿಚಾರಗಳು ಈ ಸಾಫ್ಟ್ವೇರ್ ನಲ್ಲಿ ಲಭ್ಯವಿದೆ. ಕೆಳಗಿನ Link ಅನ್ನು Click ಮಾಡಿ Register ಮಾಡಿಕೊಳ್ಳಿ. Register ಮಾಡಿಕೊಂಡಲ್ಲಿ ₹225/- ಪ್ರಾರಂಭಿಕ ವ್ಯಾಲೆಟ್ ಬ್ಯಾಲೆನ್ಸ್ ನಿಮ್ಮದಾಗುತ್ತದೆ ಹಾಗೂ ಇತರರಿಗೂ Share ಮಾಡಿ.';
      this.loginService.shareButtonDescription='Join me on Astrolite, an accurate app for Horoscope, Matchmaking, Muhurtha, Ashtamangala, Nithya Panchanga and many more astrology related services!..ಜಾತಕ, ಮುಹೂರ್ತ, ವಿವಾಹ ಹೊಂದಾಣಿಕೆ, 200 ವರ್ಷದ ಪಂಚಾಂಗ, ಇತ್ಯಾದಿ ಅನೇಕ ಜ್ಯೋತಿಷ್ಯದ ವಿಚಾರಗಳು ಈ ಸಾಫ್ಟ್ವೇರ್ ನಲ್ಲಿ ಲಭ್ಯವಿದೆ. ಕೆಳಗಿನ Link ಅನ್ನು Click ಮಾಡಿ Register ಮಾಡಿಕೊಳ್ಳಿ. Register ಮಾಡಿಕೊಂಡಲ್ಲಿ ₹225/- ಪ್ರಾರಂಭಿಕ ವ್ಯಾಲೆಟ್ ಬ್ಯಾಲೆನ್ಸ್ ನಿಮ್ಮದಾಗುತ್ತದೆ ಹಾಗೂ ಇತರರಿಗೂ Share ಮಾಡಿ.';
      this.loginService.RefCode = 'https://astrolite.in/registration/' + data.ReferralCode;
      this.loadingSwitchService.loading = false;
    });
  }
  }

  OnSave_click(buttonName) {
    this.loadingSwitchService.loading = true;
    if(buttonName=="Edit"){
      this.fieldDisabled=false;
      this.buttonName='Save';
      this.loadingSwitchService.loading = false;
    }
    else if(buttonName=="Save"){
      var ProfileData = {
        Id: this.Id,
        Name: this.profileForm.controls['Name'].value,
        Mobile: this.profileForm.controls['MobileNo'].value,
        EMail: this.profileForm.controls['EMail'].value,
        Address1: this.profileForm.controls['Address1'].value,
        Address2: this.profileForm.controls['Address2'].value,
        Address3: this.profileForm.controls['Address3'].value,
        State:this.statevalue,
        PinCode: this.profileForm.controls['PinCode'].value
      }
      this.partyService.UpdateProfile(ProfileData).subscribe((data: any) => {
        this.buttonName='Edit';
        this.fieldDisabled=true;
        this.loadingSwitchService.loading = false;
      });
    }
  }

  public onDialogOKSelected(event) {
    event.dialog.close();
  }
}
