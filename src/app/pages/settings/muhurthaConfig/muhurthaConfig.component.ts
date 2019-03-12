import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { PartyGeneralConfig, Config } from 'src/Models/inputdto2';
import { UIService } from 'src/Services/UIService/ui.service';
import { HttpService } from 'src/Services/Error/http.service';
import { InputService } from 'src/Services/input.service';

@Component({
  templateUrl: 'muhurthaConfig.component.html',
  styleUrls: ['./muhurthaConfig.component.scss']
})

export class MuhurthaConfigComponent {
  configform: FormGroup;
  partyGeneralConfig: PartyGeneralConfig;
  isvisibleayana: boolean;

  constructor(public uiService: UIService, public formbuilder: FormBuilder, private httpService: HttpService, private inputService: InputService) {
    this.configform = this.formbuilder.group({
      DashaStartFromAge: [''],
      DashaStarttoAge: [''],
      DashapredictfromAge: [''],
      DashapredicttoAge: [''],
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
  };


  ngOnInit() {

    this.partyGeneralConfig = new PartyGeneralConfig();
    this.partyGeneralConfig.Config = new Config();
    var endPoint = "PartyConfig/GetGeneralconfig?PartyMastId=1";

    this.httpService.Get(endPoint).subscribe((data: any) => {
      this.partyGeneralConfig.Config = data;
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

  Update() {
    var endPoint3 = "PartyConfig/UpdateGeneralconfig";
    this.httpService.Post(endPoint3, this.partyGeneralConfig).subscribe((data: any) => {
      alert(data);

    });
  }
  Deafult() {
    var endPoint = "PartyConfig/GetDefaultconfig";
    this.httpService.Get(endPoint).subscribe((data: any) => {
      this.partyGeneralConfig.Config = data;
    });
  }
  Back() {

  }

}