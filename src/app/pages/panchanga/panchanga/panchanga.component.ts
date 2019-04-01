import { Component, NgZone, ChangeDetectorRef } from '@angular/core';
import { NavigationExtras, ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { from, Subscription } from 'rxjs';
import { SelectBoxModel } from 'src/Models/SelectBoxModel';
import { PartyService } from 'src/Services/PartyService/PartyService';
import { LoadingSwitchService } from 'src/Services/LoadingSwitchService/LoadingSwitchService';
import { UIService } from 'src/Services/UIService/ui.service';
import { MapsAPILoader } from '@agm/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import ArrayStore from 'devextreme/data/array_store';
import { PanchangaService } from 'src/Services/PanchangaService/PanchangaService';
import { PanchangaRequest } from 'src/Models/Panchanga/PanchangaRequest';
import { StorageService } from 'src/Services/StorageService/Storage_Service';
import { LoginService } from 'src/Services/LoginService/LoginService';


@Component({
  templateUrl: './panchanga.component.html',
  styleUrls: ['./panchanga.component.css']
})

export class PanchangaComponent {
  panchangaRequest: PanchangaRequest;
  panchangaForm: FormGroup;
  languagedata: ArrayStore;
  timeformatdata: ArrayStore;
  languagevalue: string;
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
  
  languages: SelectBoxModel[] = [
    { Id: "ENG", Text: "English" },
    { Id: "HIN", Text: "Hindi" },
    { Id: "KAN", Text: "Kannada" },
    { Id: "MAL", Text: "Malayalam" },
    { Id: "TAM", Text: "Tamil" }];
  timeformats: SelectBoxModel[] = [
    { Id: "STANDARD", Text: 'Standard Time' },
    { Id: "SUMMER", Text: 'Summer Time' },
    { Id: "DOUBLE", Text: 'Double Summer Time' },
    { Id: "WAR", Text: 'War Time' }
  ];
  constructor(public loginService:LoginService,public storageService:StorageService, public loadingSwitchService: LoadingSwitchService, public toastr: ToastrManager, public route: ActivatedRoute, private router: Router, public formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef, public partyService: PartyService, public panchangaService: PanchangaService, public uiService: UIService,
    private ngZone: NgZone, private mapsAPILoader: MapsAPILoader, public formbuilder: FormBuilder) {
      this.loginService.isHomePage=false;
      this.panchangaForm = this.formbuilder.group({
      Date: new Date(),
      birthPlace: ['', [Validators.required]],
      language: ['', []]
    });

    const birthPlaceContrl = this.panchangaForm.get('birthPlace');
    birthPlaceContrl.valueChanges.subscribe(value => this.setErrorMessage(birthPlaceContrl));
    if (this.panchangaService.panchangaRequest != null) {
      this.panchangaRequest = this.panchangaService.panchangaRequest;
      this.birthDateinDateFormat = this.panchangaService.DateinDateFormat;
      this.birthTimeinDateFormat = this.panchangaService.TimeinDateFormat;
      this.timeZoneName = this.panchangaService.timeZoneName;
    }
    else {
      this.birthDateinDateFormat = this.panchangaForm.controls['Date'].value;
      this.panchangaRequest = {
        Date: this.panchangaForm.controls['Date'].value,
        Time: null,
        Place: this.panchangaService.place,
        TimeFormat:this.timeformatvalue,
        LangCode: null,
        LatDeg: null,
        LatMt: null,
        LongDeg: null,
        LongMt: null,
        NS:null,
        EW:null,
        ZH:null,
        ZM:null,
        PN:null,
      }
    }
  }

  setErrorMessage(c: AbstractControl): void {
    let control = this.uiService.getControlName(c);//gives the control name property from particular service.
    document.getElementById('err_' + control).innerHTML = '';//To not display the error message, if there is no error.
    if ((c.touched || c.dirty) && c.errors) {
      document.getElementById('err_' + control).innerHTML = Object.keys(c.errors).map(key => this.validationMessages[control + '_' + key]).join(' ');
    }
  }
  private validationMessages = { //used in above method.

    Date_required: '*Select Date of Birth',

    birthPlace_required: '*Enter Birth Place',

    language_required: '*Select Language',

  };

  ngOnInit() {
    this.timeformatdata = new ArrayStore({
      data: this.timeformats,
      key: "Id"
    });
    this.languagedata = new ArrayStore({
      data: this.languages,
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
          this.panchangaService.place = place.formatted_address;
          this.panchangaService.placeShort = place.address_components[0].long_name
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.getTimezone(this.latitude, this.longitude);
        });
      });
    });
  }
  ngAfterViewInit(): void {
    if (this.panchangaService.panchangaRequest != null) {
      this.timeformatvalue = this.panchangaService.panchangaRequest.TimeFormat;
      this.languagevalue = this.panchangaService.panchangaRequest.LangCode;
    }
    else {
      this.timeformatvalue = this.timeformats[0].Id;
      this.languagevalue = this.languages[2].Id;
    }

  }

  getTimezone(lat, long) {
    this.panchangaRequest.LatDeg = Math.abs(parseInt(lat));
    this.panchangaRequest.LongDeg = Math.abs(parseInt(long));
    this.intLatDeg = parseInt(lat);
    this.intLongDeg = parseInt(long);
    this.panchangaRequest.LatMt = parseInt(Math.abs((lat - this.intLatDeg) * 60).toString());
    this.panchangaRequest.LongMt = parseInt(Math.abs((long - this.intLongDeg) * 60).toString());
    if (lat < 0) {
      this.panchangaRequest.NS = "S";
    }
    else {
      this.panchangaRequest.NS = "N";
    }
    if (long < 0) {
      this.panchangaRequest.EW = "W";
    }
    else {
      this.panchangaRequest.EW = "E";
    }
    this.panchangaService.getTimezone(lat, long).subscribe((data: any) => {
      this.panchangaRequest.ZH = parseInt((Math.abs(data.rawOffset) / 3600.00).toString());
      this.panchangaRequest.ZM = parseInt((((Math.abs(data.rawOffset) / 3600.00) - this.panchangaRequest.ZH) * 60).toString());
      if (data.rawOffset < 0) {
        this.panchangaRequest.PN = "-";
      }
      else {
        this.panchangaRequest.PN = "+";
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
    this.panchangaService.systemDate = ("0" + new Date().getDate()).toString().slice(-2) + "-" + ("0" + ((new Date().getMonth()) + 1)).toString().slice(-2) + "-" + new Date().getFullYear().toString();
    var bdate: Date = this.panchangaForm.controls['Date'].value;
    var btime: Date = this.panchangaForm.controls['Date'].value;
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
    this.panchangaRequest = {
      Date: dateinString,
      Time:timeinString,
      Place: this.panchangaService.placeShort,
      TimeFormat:this.timeformatvalue,
      LangCode: this.languagevalue,
      LatDeg: this.panchangaRequest.LatDeg,
      LatMt: this.panchangaRequest.LatMt,
      LongDeg: this.panchangaRequest.LongDeg,
      LongMt: this.panchangaRequest.LongMt,
      NS: this.panchangaRequest.NS,
      EW: this.panchangaRequest.EW,
      ZH: this.panchangaRequest.ZH,
      ZM: this.panchangaRequest.ZM,
      PN: this.panchangaRequest.PN,
    }
    // var getsputaModel={
    //   Date:dateinString,
    //   Time:timeinString,
    //   TimeFormat:this.timeformatvalue,
    //   LatDeg: this.panchangaRequest.LatDeg,
    //   LatMt: this.panchangaRequest.LatMt,
    //   LongDeg: this.panchangaRequest.LongDeg,
    //   LongMt: this.panchangaRequest.LongMt,
    //   NS: this.panchangaRequest.NS,
    //   EW: this.panchangaRequest.EW,
    //   ZH: this.panchangaRequest.ZH,
    //   ZM: this.panchangaRequest.ZM,
    //   PN: this.panchangaRequest.PN,
    //   Count:1,
    // }
    this.panchangaService.panchangaRequest = this.panchangaRequest;
    this.panchangaService.DateinDateFormat = bdate;
    this.panchangaService.timeZoneName = this.timeZoneName;
    this.storageService.SetHoroModel(JSON.stringify(this.panchangaRequest));
    this.panchangaService.GetPanchanga(this.panchangaRequest).subscribe((data: any) => {
      this.panchangaService.panchangaResponse = data;
      this.storageService.SetHoroResponse(JSON.stringify(data));
      this.loadingSwitchService.loading = false;
      this.router.navigate(["/panchanga/getPanchangaFreeData"]);
    });
  }

  public onDialogOKSelected(event) {
    event.dialog.close();
  }

}
