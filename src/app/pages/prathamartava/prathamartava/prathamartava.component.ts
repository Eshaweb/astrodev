import { Component, NgZone, ChangeDetectorRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { from, Subscription } from 'rxjs';
import { SelectBoxModel } from 'src/Models/SelectBoxModel';
import { PartyService } from 'src/Services/PartyService/PartyService';
import { LoadingSwitchService } from 'src/Services/LoadingSwitchService/LoadingSwitchService';
import { UIService } from 'src/Services/UIService/ui.service';
import { MapsAPILoader } from '@agm/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import ArrayStore from 'devextreme/data/array_store';
import { StorageService } from 'src/Services/StorageService/Storage_Service';
import { LoginService } from 'src/Services/LoginService/LoginService';
import { BabyNamingService } from 'src/Services/BabyNamingService/BabyNamingService';
import { BabyNamingRequest } from 'src/Models/BabyNaming/BabyNamingRequest';
import { PrathamartavaService } from '../../../../Services/PrathamartavaService/PrathamartavaService';
import { PrathamartavaRequest } from '../../../../Models/Prathamartava/PrathamartavaRequest';
@Component({
  selector: 'app-prathamartava',
  templateUrl: './prathamartava.component.html',
  styleUrls: ['./prathamartava.component.scss']
})
export class PrathamartavaComponent implements OnInit {
  prathamartavaRequest: PrathamartavaRequest;
  prathamartavaForm: FormGroup;
  timeformatdata: ArrayStore;
  timeformatvalue: string;
  public loading = false;
  intLongDeg: number;
  intLatDeg: number;
  birthDateinDateFormat: Date;
  birthTimeinDateFormat: Date;
  subscription: Subscription;
  latitude: number;
  longitude: number;
  timeZoneName: string;
  timeZoneId: any;
  simpleProducts: string[];
  timeformats: SelectBoxModel[] = [
    { Id: "STANDARD", Text: 'Standard Time' },
    { Id: "SUMMER", Text: 'Daylight Saving Time' },
    { Id: "DOUBLE", Text: 'Double Summer Time' },
    { Id: "WAR", Text: 'War Time' }
  ];
  languages: SelectBoxModel[] = [
    { Id: "ENG", Text: "English" },
    { Id: "HIN", Text: "हिन्दी" },
    { Id: "KAN", Text: "ಕನ್ನಡ" },
    { Id: "MAL", Text: "മലയാളം" },
    { Id: "TAM", Text: "தமிழ்" }];
  mindateinDateFormat: Date;
  maxdateinDateFormat: Date;
  genders: SelectBoxModel[];
  genderValue: string;
  genderdata: ArrayStore;
  languagevalue: any;
  languagedata: ArrayStore;
  constructor(public loginService:LoginService,public storageService:StorageService, public loadingSwitchService: LoadingSwitchService, public toastr: ToastrManager, public route: ActivatedRoute, private router: Router, public formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef, public partyService: PartyService, public prathamartavaService: PrathamartavaService, public uiService: UIService,
    private ngZone: NgZone, private mapsAPILoader: MapsAPILoader, public formbuilder: FormBuilder) {
    this.mindateinDateFormat = new Date(1900, 0, 1);
    this.maxdateinDateFormat = new Date(2099, 11, 31);
    this.genders = [{ Id: "M", Text: "Male" }, { Id: "F", Text: "Female" }];
    this.loginService.isHomePage = false;
      this.prathamartavaForm = this.formbuilder.group({
      Name: ['', [Validators.required, Validators.minLength(4)]],
      Date: new Date(),
      Time: new Date(),
      LangCode:['', [Validators.required]],
      Place: ['', [Validators.required]],
      Timeformat: ['', [Validators.required]]
    }, {validator: this.validateDateField('Date')});

    const PlaceContrl = this.prathamartavaForm.get('Place');
    PlaceContrl.valueChanges.subscribe(value => this.setErrorMessage(PlaceContrl));
    if (this.prathamartavaService.prathamartavaRequest != null) {
      this.prathamartavaRequest = this.prathamartavaService.prathamartavaRequest;
      this.birthDateinDateFormat = this.prathamartavaService.DateinDateFormat;
      this.birthTimeinDateFormat = this.prathamartavaService.TimeinDateFormat;
    }
    else {
      this.birthDateinDateFormat = this.prathamartavaForm.controls['Date'].value;
      this.birthTimeinDateFormat = this.prathamartavaForm.controls['Time'].value;
      this.prathamartavaRequest = {
        Name:null,
        LangCode:null,
        Date: this.prathamartavaForm.controls['Date'].value,
        Time: null,
        Gender:"M",
        Place: this.prathamartavaService.place,
        TimeFormat:this.timeformatvalue,
        LatDeg: null,
        LatMt: null,
        LongDeg: null,
        LongMt: null,
        NS:null,
        EW:null,
        ZH:null,
        ZM:null,
        PN:null,
        PartyMastId:StorageService.GetItem('PartyMastId')
      }
    }
  }

  setErrorMessage(c: AbstractControl): void {
    let control = this.uiService.getControlName(c);//gives the control name property from particular service.
    document.getElementById('err_' + control).innerHTML = '';//To not display the error message, if there is no error.
    if(control=="Place"){
      this.timeZoneName=null;
    }
    if ((c.touched || c.dirty) && c.errors) {
      document.getElementById('err_' + control).innerHTML = Object.keys(c.errors).map(key => this.validationMessages[control + '_' + key]).join(' ');
    }
  }

  private validationMessages = { //used in above method.
    Name_required: '*Enter Name',
    Name_minlength: '*Minimum length is 4',

    Date_required: '*Select Date of Birth',

    LangCode_required:'Select Language',

    Timeformat_required:'Select Timeformat',

    Place_required: '*Enter Place'

  };

  validateDateField(from: string) {
    return (group: FormGroup): {[key: string]: any} => {
     let f = group.controls['Date'];
      if (f.value > new Date(this.maxdateinDateFormat)||f.value < new Date(this.mindateinDateFormat)) {
       return {
         dates: "Date from should be less than Date to"
       };
     }
     return {};
    }
  }

  ngOnInit() {
    this.timeformatdata = new ArrayStore({
      data: this.timeformats,
      key: "Id"
    });
    this.languagedata = new ArrayStore({
      data: this.languages,
      key: "Id"
    });
    this.genderdata = new ArrayStore({
      data: this.genders,
      key: "Id"
    });
    this.mapsAPILoader.load().then(() => {
      let nativeHomeInputBox = document.getElementById('txtHome').getElementsByTagName('input')[0];
      let autocomplete = new google.maps.places.Autocomplete(nativeHomeInputBox, {
        //types: ["address"]
        types: ["geocode"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          this.prathamartavaService.place = place.formatted_address;
          this.prathamartavaService.placeShort = place.address_components[0].long_name
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.getTimezone(this.latitude, this.longitude);
        });
      });
    });
  }

  ngAfterViewInit(): void {
    if (this.prathamartavaService.prathamartavaRequest != null) {
      this.timeformatvalue = this.prathamartavaService.prathamartavaRequest.TimeFormat;
      this.genderValue = this.prathamartavaService.prathamartavaRequest.Gender;
      this.languagevalue = this.prathamartavaService.prathamartavaRequest.LangCode;
      this.timeZoneName = this.prathamartavaService.timeZoneName;
    }
    else {
      this.timeformatvalue = this.timeformats[0].Id;
      this.genderValue = this.genders[0].Id;
      this.languagevalue = this.languages[2].Id;
    }
  }

  getTimezone(lat, long) {
    this.prathamartavaRequest.LatDeg = Math.abs(parseInt(lat));
    this.prathamartavaRequest.LongDeg = Math.abs(parseInt(long));
    this.intLatDeg = parseInt(lat);
    this.intLongDeg = parseInt(long);
    this.prathamartavaRequest.LatMt = parseInt(Math.abs((lat - this.intLatDeg) * 60).toString());
    this.prathamartavaRequest.LongMt = parseInt(Math.abs((long - this.intLongDeg) * 60).toString());
    if (lat < 0) {
      this.prathamartavaRequest.NS = "S";
    }
    else {
      this.prathamartavaRequest.NS = "N";
    }
    if (long < 0) {
      this.prathamartavaRequest.EW = "W";
    }
    else {
      this.prathamartavaRequest.EW = "E";
    }
    this.prathamartavaService.getTimezone(lat, long).subscribe((data: any) => {
      this.prathamartavaRequest.ZH = parseInt((Math.abs(data.rawOffset) / 3600.00).toString());
      this.prathamartavaRequest.ZM = parseInt((((Math.abs(data.rawOffset) / 3600.00) - this.prathamartavaRequest.ZH) * 60).toString());
      if (data.rawOffset < 0) {
        this.prathamartavaRequest.PN = "-";
      }
      else {
        this.prathamartavaRequest.PN = "+";
      }
      this.timeZoneName = data.timeZoneName;
      this.timeZoneId = data.timeZoneId;
      this.cdr.detectChanges();
    });
  }

  timeformatdataSelection(event){
    this.timeformatvalue=event.value;
  }

  languagedataSelection(event) {
    this.languagevalue = event.value;
  }

  onGenderChanged(event) {
    if (event.value == 'M') {
      this.genderValue = 'M';
    }
    else {
      this.genderValue = 'F';
    }
  }

  OnSubmit_click() {
    this.loadingSwitchService.loading = true;
    this.prathamartavaService.systemDate = ("0" + new Date().getDate()).toString().slice(-2) + "-" + ("0" + ((new Date().getMonth()) + 1)).toString().slice(-2) + "-" + new Date().getFullYear().toString();
    var bdate: Date = this.prathamartavaForm.controls['Date'].value;
    var btime: Date = this.prathamartavaForm.controls['Date'].value;
    if (bdate instanceof Date) {
      var dateinString = bdate.getFullYear().toString() + "-" + ("0" + ((bdate.getMonth()) + 1)).toString().slice(-2) + "-" + ("0" + bdate.getDate()).toString().slice(-2);
    }
    else {
      dateinString = bdate;
    }
    if (btime instanceof Date) {
      var timeinString = ("0" + btime.getHours()).toString().slice(-2) + ":" + ("0" + btime.getMinutes()).toString().slice(-2) + ":" + "00";
    }
    else {
      timeinString = "00:00:00";
    }
    this.prathamartavaRequest = {
      Name:this.prathamartavaForm.controls['Name'].value,
      LangCode:this.languagevalue,
      Date: dateinString,
      Time:timeinString,
      Gender:this.genderValue,
      Place: this.prathamartavaService.placeShort,
      TimeFormat:this.timeformatvalue,
      LatDeg: this.prathamartavaRequest.LatDeg,
      LatMt: this.prathamartavaRequest.LatMt,
      LongDeg: this.prathamartavaRequest.LongDeg,
      LongMt: this.prathamartavaRequest.LongMt,
      NS: this.prathamartavaRequest.NS,
      EW: this.prathamartavaRequest.EW,
      ZH: this.prathamartavaRequest.ZH,
      ZM: this.prathamartavaRequest.ZM,
      PN: this.prathamartavaRequest.PN,
      PartyMastId:StorageService.GetItem('PartyMastId')
    }
    this.prathamartavaService.prathamartavaRequest = this.prathamartavaRequest;
    this.prathamartavaService.DateinDateFormat = bdate;
    this.prathamartavaService.TimeinDateFormat = btime;
    this.prathamartavaService.timeZoneName = this.timeZoneName;
    this.storageService.SetHoroModel(JSON.stringify(this.prathamartavaRequest));
    this.prathamartavaService.GetBabyNames(this.prathamartavaRequest).subscribe((data: any) => {
      this.prathamartavaService.babyNamingResponse = data.BabyNames;
      this.storageService.SetHoroResponse(JSON.stringify(data.BabyNames));
      this.loadingSwitchService.loading = false;
      this.router.navigate(["/prathamartava/getPrathamartavaFreeData"]);
    });
  }

  public onDialogOKSelected(event) {
    event.dialog.close();
  }
}
