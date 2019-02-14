import { Component, NgModule, enableProdMode, NgZone, ChangeDetectorRef } from '@angular/core';
import notify from 'devextreme/ui/notify';
import { Service } from 'src/app/shared/services/app.service';
import { NavigationExtras, ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { from, Subscription } from 'rxjs';
import { SelectBoxModel } from 'src/Models/SelectBoxModel';
import { HoroRequest } from 'src/Models/HoroScope/HoroRequest';
import { PaymentInfo, ServiceInfo, HoroScopeService, SelectBoxModelNew } from 'src/Services/HoroScopeService/HoroScopeService';
import { PartyService } from 'src/Services/PartyService/PartyService';
import { LoadingSwitchService } from 'src/Services/LoadingSwitchService/LoadingSwitchService';
import { UIService } from 'src/Services/UIService/ui.service';
import { ErrorService } from 'src/Services/Error/error.service';
import { MapsAPILoader } from '@agm/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import ArrayStore from 'devextreme/data/array_store';
import { AstamangalaService } from 'src/Services/AstamanglaService/AstamanglaService';
import { PanchangaService } from 'src/Services/PanchangaService/PanchangaService';
import { PanchangaRequest } from 'src/Models/Panchanga/PanchangaRequest';


@Component({
  templateUrl: './panchanga.component.html',
  styleUrls: ['./panchanga.component.css']
})

export class PanchangaComponent {
  languages: SelectBoxModel[] = [
    { Id: "ENG", Text: "English" },
    { Id: "HIN", Text: "Hindi" },
    { Id: "KAN", Text: "Kannada" },
    { Id: "MAL", Text: "Malayalam" },
    { Id: "TAM", Text: "Tamil" }];
  isLoading: boolean;
  public loading = false;
  intLongDeg: number;
  intLatDeg: number;
  birthDateinDateFormat: Date;
  birthTimeinDateFormat: Date;
  errorMessage: any;
  subscription: Subscription;
  panchangaForm: FormGroup;
  latitude: number;
  longitude: number;
  timeZoneName: string;
  timeZoneId: any;
  long: number;
  lat: number;
  panchangaRequest: PanchangaRequest;
  languagevalue: string;
  languagedata: ArrayStore;
  constructor(public loadingSwitchService: LoadingSwitchService, public toastr: ToastrManager, public route: ActivatedRoute, private router: Router, public formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef, public partyService: PartyService, public panchangaService: PanchangaService, public uiService: UIService,
    private ngZone: NgZone, private mapsAPILoader: MapsAPILoader, public formbuilder: FormBuilder) {
    this.maxDate = new Date(this.maxDate.setFullYear(this.maxDate.getFullYear() - 21));
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
        Place: this.panchangaService.place,
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
      this.languagevalue = this.panchangaService.panchangaRequest.LangCode;
    }
    else {
      this.languagevalue = this.languages[1].Id;
    }

  }

  ngOnDestroy(): void {

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

  languagedataSelection(event) {
    this.languagevalue = event.value;
  }

  public date: Date = new Date(Date.now());

  submit_click() {
    this.isLoading = true;
    //this.tick();
    //this.loading = true;
    this.loadingSwitchService.loading = true;
    this.panchangaService.systemDate = ("0" + new Date().getDate()).toString().slice(-2) + "-" + ("0" + ((new Date().getMonth()) + 1)).toString().slice(-2) + "-" + new Date().getFullYear().toString();
    // if(typeof this.horoscopeForm.controls['Date'].value ==='string'){

    // }
    var bdate: Date = this.panchangaForm.controls['Date'].value;
    if (bdate instanceof Date) {
      var dateinString = bdate.getFullYear().toString() + "-" + ("0" + ((bdate.getMonth()) + 1)).toString().slice(-2) + "-" + ("0" + bdate.getDate()).toString().slice(-2);
    }
    else {
      dateinString = bdate;
    }
    this.panchangaRequest = {
      Date: dateinString,
      Place: this.panchangaService.placeShort,
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
    this.panchangaService.panchangaRequest = this.panchangaRequest;
    this.panchangaService.DateinDateFormat = bdate;
    this.panchangaService.timeZoneName = this.timeZoneName;
    this.panchangaService.GetPanchanga(this.panchangaRequest).subscribe((data: any) => {
      this.panchangaService.panchangaResponse = data;
      this.loadingSwitchService.loading = false;
      this.router.navigate(["/panchanga/getPanchangaFreeData"]);
    });
  }

  public onDialogOKSelected(event) {
    event.dialog.close();
  }


  maxDate: Date = new Date();
  cityPattern = "^[^0-9]+$";
  namePattern: any = /^[^0-9]+$/;
  phonePattern: any = /^\+\s*1\s*\(\s*[02-9]\d{2}\)\s*\d{3}\s*-\s*\d{4}$/;
  countries: string[];
  phoneRules: any = {
    X: /[02-9]/
  }
  now: Date = new Date();

}
