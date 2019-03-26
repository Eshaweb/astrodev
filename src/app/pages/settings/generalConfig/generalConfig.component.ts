import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { PartyGeneralConfig, Config } from 'src/Models/inputdto2';
import { UIService } from 'src/Services/UIService/ui.service';
import { HttpService } from 'src/Services/Error/http.service';
import { LoadingSwitchService } from 'src/Services/LoadingSwitchService/LoadingSwitchService';
import { ConfigerationService } from 'src/Services/ConfigerationService/ConfigerationService';
import { StorageService } from 'src/Services/StorageService/Storage_Service';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'generalConfig.component.html',
  styleUrls: ['./generalConfig.component.scss']
})

export class GeneralConfigComponent {
  configform: FormGroup;
  partyGeneralConfig: PartyGeneralConfig;
  isvisibleayana: boolean;
  fromAgeDisabled: boolean;

  constructor(public router:Router,public loadingSwitchService:LoadingSwitchService,public uiService: UIService, public formbuilder: FormBuilder, private httpService: HttpService, public configerationService: ConfigerationService) {
    this.configform = this.formbuilder.group({
      DashaStartFromAge: [''],
      DashaStarttoAge: ['',[Validators.min(0), Validators.max(100)]],
      DashapredictfromAge: [''],
      DashapredicttoAge: ['',[Validators.min(0), Validators.max(100)] ],
      Chandra: [''],
      Kuja: [''],
      Budha: [''],
      Guru: [''],
      Shukra: [''],
      Shani: [''],
      AyanaDeg: [''],
      AyanaMt: [''],
      AyanaSec: [''],

    });
    const DashaStartFromAgeContrl = this.configform.get('DashaStartFromAge');
    DashaStartFromAgeContrl.valueChanges.subscribe(value => this.setErrorMessage(DashaStartFromAgeContrl));

    const DashaStarttoAgeContrl = this.configform.get('DashaStarttoAge');
    DashaStarttoAgeContrl.valueChanges.subscribe(value => this.setErrorMessage(DashaStarttoAgeContrl));

    const DashapredictfromAgeContrl = this.configform.get('DashapredictfromAge');
    DashapredictfromAgeContrl.valueChanges.subscribe(value => this.setErrorMessage(DashapredictfromAgeContrl));
    const DashapredicttoAgeContrl = this.configform.get('DashapredicttoAge');
    DashapredicttoAgeContrl.valueChanges.subscribe(value => this.setErrorMessage(DashapredicttoAgeContrl));

    const ChandraContrl = this.configform.get('Chandra');
    ChandraContrl.valueChanges.subscribe(value => this.setErrorMessage(ChandraContrl));

    const KujaContrl = this.configform.get('Kuja');
    KujaContrl.valueChanges.subscribe(value => this.setErrorMessage(KujaContrl));
    const BudhaContrl = this.configform.get('Budha');
    BudhaContrl.valueChanges.subscribe(value => this.setErrorMessage(BudhaContrl));
    const GuruContrl = this.configform.get('Guru');
    GuruContrl.valueChanges.subscribe(value => this.setErrorMessage(GuruContrl));
    const ShukraContrl = this.configform.get('Shukra');
    ShukraContrl.valueChanges.subscribe(value => this.setErrorMessage(ShukraContrl));
    const ShaniContrl = this.configform.get('Shani');
    ShaniContrl.valueChanges.subscribe(value => this.setErrorMessage(ShaniContrl));

    const AyanaDegContrl = this.configform.get('AyanaDeg');
    AyanaDegContrl.valueChanges.subscribe(value => this.setErrorMessage(AyanaDegContrl));

    const AyanaMtContrl = this.configform.get('AyanaMt');
    AyanaMtContrl.valueChanges.subscribe(value => this.setErrorMessage(AyanaMtContrl));

    const AyanaSecContrl = this.configform.get('AyanaSec');
    AyanaSecContrl.valueChanges.subscribe(value => this.setErrorMessage(AyanaSecContrl));
  }

  setErrorMessage(c: AbstractControl): void {
    let control = this.uiService.getControlName(c);
    document.getElementById('err_' + control).innerHTML = '';//To not display the error message, if there is no error.
    if ((c.touched || c.dirty) && c.errors) {
      document.getElementById('err_' + control).innerHTML = Object.keys(c.errors).map(key => this.validationMessages[control + '_' + key]).join(' ');
    }
  }
  private validationMessages = {
    DashaStarttoAge_min: '*Minimum value is 0',
    DashaStarttoAge_max: '*Maximum value is 100',

    DashapredicttoAge_min: '*Minimum value is 0',
    DashapredicttoAge_max: '*Maximum value is 100',
  };


  ngOnInit() {

    this.partyGeneralConfig = new PartyGeneralConfig();
    this.partyGeneralConfig.Config = new Config();
    this.configerationService.GetGeneralconfig(StorageService.GetItem('PartyMastId')).subscribe((data: any) => {
      this.partyGeneralConfig.Config = data;
      if(this.partyGeneralConfig.Config.DashaStartType=='SD'){
         this.fromAgeDisabled=true;
      }
      else{
        this.fromAgeDisabled=false;
      }
    });
  }

  ayanaValueChanged(e) {
    if (e.value == 'UD') {
      this.isvisibleayana = true;
    }
    else {
      this.isvisibleayana = false;
    }
  }
  OndashastartChanged(event) {
    if (event.value == 'SD') {
      this.fromAgeDisabled = true;
    }
    else {
      this.fromAgeDisabled = false;
    }
  }
  SunSettingSelection(event){
    this.partyGeneralConfig.Config.SunSetting=event.value;
  }
charttypedataSelection(event){
  this.partyGeneralConfig.Config.ChartType=event.value;
}
  Update() {
    this.loadingSwitchService.loading = true;
    if(this.configform.get('DashapredicttoAge').value<=this.configform.get('DashaStarttoAge').value){
      this.partyGeneralConfig.PartyMastId=StorageService.GetItem('PartyMastId');
      this.configerationService.UpdateGeneralconfig(this.partyGeneralConfig).subscribe((data: any) => {
        this.loadingSwitchService.loading = false;
        this.router.navigate(["/settings"]);
        // this.loadingSwitchService.popupVisible = true;
        // this.loadingSwitchService.message = 'Configuration Updated Successfully';
      });
    }
    else{
      this.loadingSwitchService.loading = false;
      this.loadingSwitchService.title='Alert';
      this.loadingSwitchService.popupVisible=true;
      this.loadingSwitchService.message='Dasha Prediction To Age should be less than Dasha Start To Age';
    }
  }
  Deafult() {
    this.loadingSwitchService.loading = true;
    this.configerationService.GetDefaultconfig().subscribe((data: any) => {
      this.partyGeneralConfig.Config = data;
      this.loadingSwitchService.loading = false;
      this.router.navigate(["/settings"]);
      // this.loadingSwitchService.popupVisible = true;
      // this.loadingSwitchService.message = 'Default Configuration';
    });
  }
  Back() {

  }

}