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
@Component({
  selector: 'app-babyNaming',
  templateUrl: './babyNaming.component.html',
  styleUrls: ['./babyNaming.component.scss']
})
export class BabyNamingComponent implements OnInit {
  babyNamingRequest: BabyNamingRequest;
  babyNamingForm: FormGroup;
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
  mindateinDateFormat: Date;
  maxdateinDateFormat: Date;
  genders: SelectBoxModel[];
  genderValue: string;
  genderdata: ArrayStore;
  constructor(public loginService:LoginService,public storageService:StorageService, public loadingSwitchService: LoadingSwitchService, public toastr: ToastrManager, public route: ActivatedRoute, private router: Router, public formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef, public partyService: PartyService, public babyNamingService: BabyNamingService, public uiService: UIService,
    private ngZone: NgZone, private mapsAPILoader: MapsAPILoader, public formbuilder: FormBuilder) {
    this.mindateinDateFormat = new Date(1900, 0, 1);
    this.maxdateinDateFormat = new Date(2099, 11, 31);
    this.genders = [{ Id: "M", Text: "Male" }, { Id: "F", Text: "Female" }];
    this.loginService.isHomePage = false;
      this.babyNamingForm = this.formbuilder.group({
      Date: new Date(),
      Time: new Date(),
      Place: ['', [Validators.required]],
      Timeformat: ['', [Validators.required]]
    }, {validator: this.validateDateField('Date')});

    const PlaceContrl = this.babyNamingForm.get('Place');
    PlaceContrl.valueChanges.subscribe(value => this.setErrorMessage(PlaceContrl));
    if (this.babyNamingService.babyNamingRequest != null) {
      this.babyNamingRequest = this.babyNamingService.babyNamingRequest;
      this.birthDateinDateFormat = this.babyNamingService.DateinDateFormat;
      this.birthTimeinDateFormat = this.babyNamingService.TimeinDateFormat;
    }
    else {
      this.birthDateinDateFormat = this.babyNamingForm.controls['Date'].value;
      this.birthTimeinDateFormat = this.babyNamingForm.controls['Time'].value;
      this.babyNamingRequest = {
        Date: this.babyNamingForm.controls['Date'].value,
        Time: null,
        Gender:"M",
        Place: this.babyNamingService.place,
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

    Date_required: '*Select Date of Birth',

    Place_required: '*Enter Place',

    language_required: '*Select Language',

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
          this.babyNamingService.place = place.formatted_address;
          this.babyNamingService.placeShort = place.address_components[0].long_name
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.getTimezone(this.latitude, this.longitude);
        });
      });
    });
  }

  ngAfterViewInit(): void {
    if (this.babyNamingService.babyNamingRequest != null) {
      this.timeformatvalue = this.babyNamingService.babyNamingRequest.TimeFormat;
      this.genderValue = this.babyNamingService.babyNamingRequest.Gender;
      this.timeZoneName = this.babyNamingService.timeZoneName;
    }
    else {
      this.timeformatvalue = this.timeformats[0].Id;
      this.genderValue = this.genders[0].Id;
    }
  }

  getTimezone(lat, long) {
    this.babyNamingRequest.LatDeg = Math.abs(parseInt(lat));
    this.babyNamingRequest.LongDeg = Math.abs(parseInt(long));
    this.intLatDeg = parseInt(lat);
    this.intLongDeg = parseInt(long);
    this.babyNamingRequest.LatMt = parseInt(Math.abs((lat - this.intLatDeg) * 60).toString());
    this.babyNamingRequest.LongMt = parseInt(Math.abs((long - this.intLongDeg) * 60).toString());
    if (lat < 0) {
      this.babyNamingRequest.NS = "S";
    }
    else {
      this.babyNamingRequest.NS = "N";
    }
    if (long < 0) {
      this.babyNamingRequest.EW = "W";
    }
    else {
      this.babyNamingRequest.EW = "E";
    }
    this.babyNamingService.getTimezone(lat, long).subscribe((data: any) => {
      this.babyNamingRequest.ZH = parseInt((Math.abs(data.rawOffset) / 3600.00).toString());
      this.babyNamingRequest.ZM = parseInt((((Math.abs(data.rawOffset) / 3600.00) - this.babyNamingRequest.ZH) * 60).toString());
      if (data.rawOffset < 0) {
        this.babyNamingRequest.PN = "-";
      }
      else {
        this.babyNamingRequest.PN = "+";
      }
      this.timeZoneName = data.timeZoneName;
      this.timeZoneId = data.timeZoneId;
      this.cdr.detectChanges();
    });
  }

  timeformatdataSelection(event){
    this.timeformatvalue=event.value;
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
    this.babyNamingService.systemDate = ("0" + new Date().getDate()).toString().slice(-2) + "-" + ("0" + ((new Date().getMonth()) + 1)).toString().slice(-2) + "-" + new Date().getFullYear().toString();
    var bdate: Date = this.babyNamingForm.controls['Date'].value;
    var btime: Date = this.babyNamingForm.controls['Date'].value;
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
    this.babyNamingRequest = {
      Date: dateinString,
      Time:timeinString,
      Gender:this.genderValue,
      Place: this.babyNamingService.placeShort,
      TimeFormat:this.timeformatvalue,
      LatDeg: this.babyNamingRequest.LatDeg,
      LatMt: this.babyNamingRequest.LatMt,
      LongDeg: this.babyNamingRequest.LongDeg,
      LongMt: this.babyNamingRequest.LongMt,
      NS: this.babyNamingRequest.NS,
      EW: this.babyNamingRequest.EW,
      ZH: this.babyNamingRequest.ZH,
      ZM: this.babyNamingRequest.ZM,
      PN: this.babyNamingRequest.PN,
      PartyMastId:StorageService.GetItem('PartyMastId')
    }
    this.babyNamingService.babyNamingRequest = this.babyNamingRequest;
    this.babyNamingService.DateinDateFormat = bdate;
    this.babyNamingService.TimeinDateFormat = btime;
    this.babyNamingService.timeZoneName = this.timeZoneName;
    this.storageService.SetHoroModel(JSON.stringify(this.babyNamingRequest));
    this.babyNamingService.GetBabyNames(this.babyNamingRequest).subscribe((data: any) => {
      this.babyNamingService.babyNamingResponse = data.BabyNames;
      this.storageService.SetHoroResponse(JSON.stringify(data.BabyNames));
      this.loadingSwitchService.loading = false;
      this.router.navigate(["/babyNaming/getBabyNamingFreeData"]);
    });
  }

  public onDialogOKSelected(event) {
    event.dialog.close();
  }
}
