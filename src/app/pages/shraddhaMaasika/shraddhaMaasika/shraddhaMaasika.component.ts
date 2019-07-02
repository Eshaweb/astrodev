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
import { KaaliDrushtiRequest } from 'src/Models/KaaliDrushti/KaaliDrushtiRequest';
import { KaaliDrushtiService } from 'src/Services/KaaliDrushtiService/KaaliDrushtiService';
@Component({
  selector: 'app-shraddhaMaasika',
  templateUrl: './shraddhaMaasika.component.html',
  styleUrls: ['./shraddhaMaasika.component.scss']
})
export class ShraddhaMaasikaComponent implements OnInit {
  kaalidrushtiRequest: KaaliDrushtiRequest;
  shraddhaMaasikaForm: FormGroup;
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
    private cdr: ChangeDetectorRef, public partyService: PartyService, public kaaliDrushtiService: KaaliDrushtiService, public uiService: UIService,
    private ngZone: NgZone, private mapsAPILoader: MapsAPILoader, public formbuilder: FormBuilder) {
    this.mindateinDateFormat = new Date(1900, 0, 1);
    this.maxdateinDateFormat = new Date(2099, 11, 31);
    this.genders = [{ Id: "M", Text: "Male" }, { Id: "F", Text: "Female" }];
    this.loginService.isHomePage = false;
      this.shraddhaMaasikaForm = this.formbuilder.group({
      Date: new Date(),
      Time: new Date(),
      LangCode:['', [Validators.required]],
      Place: ['', [Validators.required]],
      Timeformat: ['', [Validators.required]]
    }, {validator: this.validateDateField('Date')});

    const PlaceContrl = this.shraddhaMaasikaForm.get('Place');
    PlaceContrl.valueChanges.subscribe(value => this.setErrorMessage(PlaceContrl));
    if (this.kaaliDrushtiService.kaaliDrushtiRequest!= null) {
      this.kaalidrushtiRequest = this.kaaliDrushtiService.kaaliDrushtiRequest;
      this.birthDateinDateFormat = this.kaaliDrushtiService.DateinDateFormat;
      this.birthTimeinDateFormat = this.kaaliDrushtiService.TimeinDateFormat;
    }
    else {
      this.birthDateinDateFormat = this.shraddhaMaasikaForm.controls['Date'].value;
      this.birthTimeinDateFormat = this.shraddhaMaasikaForm.controls['Time'].value;
      this.kaalidrushtiRequest = {
        LangCode:null,
        Date: this.shraddhaMaasikaForm.controls['Date'].value,
        Time: null,
        Gender:"M",
        Place: this.kaaliDrushtiService.place,
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

    Place_required: '*Enter Birth Place'

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
          this.kaaliDrushtiService.place = place.formatted_address;
          this.kaaliDrushtiService.placeShort = place.address_components[0].long_name
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.getTimezone(this.latitude, this.longitude);
        });
      });
    });
  }

  ngAfterViewInit(): void {
    if (this.kaaliDrushtiService.kaaliDrushtiRequest != null) {
      this.timeformatvalue = this.kaaliDrushtiService.kaaliDrushtiRequest.TimeFormat;
      this.genderValue = this.kaaliDrushtiService.kaaliDrushtiRequest.Gender;
      this.languagevalue = this.kaaliDrushtiService.kaaliDrushtiRequest.LangCode;
      this.timeZoneName = this.kaaliDrushtiService.timeZoneName;
    }
    else {
      this.timeformatvalue = this.timeformats[0].Id;
      this.genderValue = this.genders[0].Id;
      this.languagevalue = this.languages[2].Id;
    }
  }

  getTimezone(lat, long) {
    this.kaalidrushtiRequest.LatDeg = Math.abs(parseInt(lat));
    this.kaalidrushtiRequest.LongDeg = Math.abs(parseInt(long));
    this.intLatDeg = parseInt(lat);
    this.intLongDeg = parseInt(long);
    this.kaalidrushtiRequest.LatMt = parseInt(Math.abs((lat - this.intLatDeg) * 60).toString());
    this.kaalidrushtiRequest.LongMt = parseInt(Math.abs((long - this.intLongDeg) * 60).toString());
    if (lat < 0) {
      this.kaalidrushtiRequest.NS = "S";
    }
    else {
      this.kaalidrushtiRequest.NS = "N";
    }
    if (long < 0) {
      this.kaalidrushtiRequest.EW = "W";
    }
    else {
      this.kaalidrushtiRequest.EW = "E";
    }
    this.kaaliDrushtiService.getTimezone(lat, long).subscribe((data: any) => {
      this.kaalidrushtiRequest.ZH = parseInt((Math.abs(data.rawOffset) / 3600.00).toString());
      this.kaalidrushtiRequest.ZM = parseInt((((Math.abs(data.rawOffset) / 3600.00) - this.kaalidrushtiRequest.ZH) * 60).toString());
      if (data.rawOffset < 0) {
        this.kaalidrushtiRequest.PN = "-";
      }
      else {
        this.kaalidrushtiRequest.PN = "+";
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

  OnSubmit_click() {
    this.loadingSwitchService.loading = true;
    this.kaaliDrushtiService.systemDate = ("0" + new Date().getDate()).toString().slice(-2) + "-" + ("0" + ((new Date().getMonth()) + 1)).toString().slice(-2) + "-" + new Date().getFullYear().toString();
    var bdate: Date = this.shraddhaMaasikaForm.controls['Date'].value;
    var btime: Date = this.shraddhaMaasikaForm.controls['Date'].value;
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
    this.kaalidrushtiRequest = {
      LangCode:this.languagevalue,
      Date: dateinString,
      Time:timeinString,
      Gender:this.genderValue,
      Place: this.kaaliDrushtiService.placeShort,
      TimeFormat:this.timeformatvalue,
      LatDeg: this.kaalidrushtiRequest.LatDeg,
      LatMt: this.kaalidrushtiRequest.LatMt,
      LongDeg: this.kaalidrushtiRequest.LongDeg,
      LongMt: this.kaalidrushtiRequest.LongMt,
      NS: this.kaalidrushtiRequest.NS,
      EW: this.kaalidrushtiRequest.EW,
      ZH: this.kaalidrushtiRequest.ZH,
      ZM: this.kaalidrushtiRequest.ZM,
      PN: this.kaalidrushtiRequest.PN,
      PartyMastId:StorageService.GetItem('PartyMastId')
    }
    this.kaaliDrushtiService.kaaliDrushtiRequest = this.kaalidrushtiRequest;
    this.kaaliDrushtiService.DateinDateFormat = bdate;
    this.kaaliDrushtiService.TimeinDateFormat = btime;
    this.kaaliDrushtiService.timeZoneName = this.timeZoneName;
    this.storageService.SetHoroModel(JSON.stringify(this.kaalidrushtiRequest));
    this.kaaliDrushtiService.GetBabyNames(this.kaalidrushtiRequest).subscribe((data: any) => {
      this.kaaliDrushtiService.babyNamingResponse = data.BabyNames;
      this.storageService.SetHoroResponse(JSON.stringify(data.BabyNames));
      this.loadingSwitchService.loading = false;
      this.router.navigate(["/kaalidrushti/getKaalidrushtiFreeData"]);
    });
  }

  public onDialogOKSelected(event) {
    event.dialog.close();
  }
}
