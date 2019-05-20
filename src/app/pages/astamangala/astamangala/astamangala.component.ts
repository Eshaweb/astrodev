import { Component, NgZone, ChangeDetectorRef } from '@angular/core';
import notify from 'devextreme/ui/notify';
import { Service } from 'src/app/shared/services/app.service';
import { NavigationExtras, ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { from, Subscription } from 'rxjs';
import { SelectBoxModel } from 'src/Models/SelectBoxModel';
import { HoroRequest } from 'src/Models/HoroScope/HoroRequest';
import { PaymentInfo, ServiceInfo, SelectBoxModelNew } from 'src/Services/HoroScopeService/HoroScopeService';
import { PartyService } from 'src/Services/PartyService/PartyService';
import { LoadingSwitchService } from 'src/Services/LoadingSwitchService/LoadingSwitchService';
import { UIService } from 'src/Services/UIService/ui.service';
import { ErrorService } from 'src/Services/Error/error.service';
import { MapsAPILoader } from '@agm/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import ArrayStore from 'devextreme/data/array_store';
import { AstamangalaService } from 'src/Services/AstamanglaService/AstamanglaService';
import { StorageService } from 'src/Services/StorageService/Storage_Service';
import { LoginService } from 'src/Services/LoginService/LoginService';


@Component({
  templateUrl: './astamangala.component.html',
  styleUrls: ['./astamangala.component.css']
})

export class AstamangalaComponent {
  timeformats: SelectBoxModel[] = [
    { Id: "STANDARD", Text: 'Standard Time' },
    { Id: "SUMMER", Text: 'Summer Time' },
    { Id: "DOUBLE", Text: 'Double Summer Time' },
    { Id: "WAR", Text: 'War Time' }
  ];
  languages: SelectBoxModel[] = [
    { Id: "ENG", Text: "English" },
    { Id: "KAN", Text: "Kannada" },
    { Id: "MAL", Text: "Malayalam" }];
  reportSizes: SelectBoxModel[] = [
    { Id: "A4", Text: "A4" },
    { Id: "A5", Text: "A5" }];
  pruchakaStars: SelectBoxModel[] = [
    { Id: "1", Text: "Ashwini" },
    { Id: "2", Text: "Bharani" },
    { Id: "3", Text: "Krittika" },
    { Id: "4", Text: "Rohini" },
    { Id: "5", Text: "Mrigashira" },
    { Id: "6", Text: "Ardra" },
    { Id: "7", Text: "Punarvasu" },
    { Id: "8", Text: "Pushya" },
    { Id: "9", Text: "Ashlesha" },
    { Id: "10", Text: "Magha" },
    { Id: "11", Text: "Poorva(Hubba)" },
    { Id: "12", Text: "Uttara" },
    { Id: "13", Text: "Hasta" },
    { Id: "14", Text: "Chithra" },
    { Id: "15", Text: "Swathi" },
    { Id: "16", Text: "Vishakha" },
    { Id: "17", Text: "Anuradha" },
    { Id: "18", Text: "Jyeshta" },
    { Id: "19", Text: "Moola" },
    { Id: "20", Text: "Poorvashada" },
    { Id: "21", Text: "Uttarashada" },
    { Id: "22", Text: "Shravana" },
    { Id: "23", Text: "Dhanishta" },
    { Id: "24", Text: "Shatabhisha" },
    { Id: "25", Text: "Poorvabhadra" },
    { Id: "26", Text: "Uttarabhadra" },
    { Id: "27", Text: "Revathi" },
  ];

  pruchakaRashis: SelectBoxModel[] = [
    { Id: "1", Text: "Mesha" },
    { Id: "2", Text: "Vrishabha" },
    { Id: "3", Text: "Mithuna" },
    { Id: "4", Text: "Karkataka" },
    { Id: "5", Text: "Simha" },
    { Id: "6", Text: "Kanya" },
    { Id: "7", Text: "Tula" },
    { Id: "8", Text: "Vrishchika" },
    { Id: "9", Text: "Dhanu" },
    { Id: "10", Text: "Makara" },
    { Id: "11", Text: "Kumbha" },
    { Id: "12", Text: "Meena" }
  ];
  genders: SelectBoxModel[];
  public loading = false;
  intLongDeg: number;
  intLatDeg: number;
  birthDateinDateFormat: Date;
  birthTimeinDateFormat: Date;
  subscription: Subscription;
  astamangalaForm: FormGroup;
  latitude: number;
  longitude: number;
  timeZoneName: string;
  timeZoneId: any;
  public checkBoxValue: boolean = false;
  public enabletoEdit: boolean = false;
  horoRequest: HoroRequest;
  LatDegMessage: string;
  LatMtMessage: string;
  reportSizedata: ArrayStore;
  languagedata: ArrayStore;
  genderdata: ArrayStore;
  pruchakaStardata: ArrayStore;
  pruchakaRashidata: ArrayStore;
  timeformatdata: ArrayStore;
  timeformatvalue: string;
  reportSizevalue: string;
  languagevalue: string;
  genderValue: string;
  pruchakaStarvalue: any;
  pruchakaRashivalue: any;
  mindateinDateFormat: Date;
  maxdateinDateFormat: Date;

  constructor(public loginService: LoginService, public storageService: StorageService, service: Service, public loadingSwitchService: LoadingSwitchService, private errorService: ErrorService, public toastr: ToastrManager, public route: ActivatedRoute, private router: Router, public formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef, public partyService: PartyService, public astamangalaService: AstamangalaService, public uiService: UIService,
    private ngZone: NgZone, private mapsAPILoader: MapsAPILoader, public formbuilder: FormBuilder) {
    this.mindateinDateFormat = new Date(1900, 0, 1);
    this.maxdateinDateFormat = new Date();
    this.loginService.isHomePage = false;
    this.genders = [{ Id: "M", Text: "Male" }, { Id: "F", Text: "Female" }];
    this.astamangalaForm = this.formbuilder.group({
      Date: new Date(),
      Time: new Date(),
      TimeFormat: ['', []],
      ReportSize: ['', []],
      birthPlace: ['', [Validators.required]],
      language: ['', []],
      latitude: [''],
      longitude: [''],
      gender: ['M', []],
      LatDeg: [null, [Validators.required, Validators.min(0), Validators.max(90)]],
      LongDeg: [null, [Validators.required, Validators.min(0), Validators.max(180)]],
      LatMt: [null, [Validators.required, Validators.min(0), Validators.max(59)]],
      LongMt: [null, [Validators.required, Validators.min(0), Validators.max(59)]],
      NS: ['', [Validators.required, Validators.pattern("^[NS]?$")]],
      EW: ['', [Validators.required, Validators.pattern("^[EW]?$")]],
      ZH: [null, [Validators.required, Validators.min(0), Validators.max(13)]],
      ZM: [null, [Validators.required, Validators.min(0), Validators.max(45)]],
      PN: ['', [Validators.required, Validators.pattern("^[+-]?$")]],
      Swarna: [1, [Validators.required, Validators.min(1), Validators.max(12)]],
      Tambula: [1, [Validators.required, Validators.min(1), Validators.max(100)]],
      AshtaMangalaNo: [444, [Validators.required, Validators.pattern("^[1-8]{3}$")]],
      //Pruchaka: [1, [Validators.required, Validators.min(0), Validators.max(90)]],
      //JanmaRashi: [1, [Validators.required, Validators.min(0), Validators.max(90)]],
      Sprushtanga: [1, [Validators.required, Validators.min(1), Validators.max(12)]],
    });

    // const LatDegContrl = this.astamangalaForm.get('LatDeg');
    // LatDegContrl.valueChanges.subscribe(value => this.setErrorMessage(LatDegContrl));
    // const LatMtContrl = this.astamangalaForm.get('LatMt');
    // LatMtContrl.valueChanges.subscribe(value => this.setErrorMessage(LatMtContrl));
    // const NSContrl = this.astamangalaForm.get('NS');
    // NSContrl.valueChanges.subscribe(value => this.setErrorMessage(NSContrl));
    // const LongDegContrl = this.astamangalaForm.get('LongDeg');
    // LongDegContrl.valueChanges.subscribe(value => this.setErrorMessage(LongDegContrl));
    // const LongMtContrl = this.astamangalaForm.get('LongMt');
    // LongMtContrl.valueChanges.subscribe(value => this.setErrorMessage(LongMtContrl));
    // const EWContrl = this.astamangalaForm.get('EW');
    // EWContrl.valueChanges.subscribe(value => this.setErrorMessage(EWContrl));
    // const ZHContrl = this.astamangalaForm.get('ZH');
    // ZHContrl.valueChanges.subscribe(value => this.setErrorMessage(ZHContrl));
    // const ZMContrl = this.astamangalaForm.get('ZM');
    // ZMContrl.valueChanges.subscribe(value => this.setErrorMessage(ZMContrl));
    // const PNContrl = this.astamangalaForm.get('PN');
    // PNContrl.valueChanges.subscribe(value => this.setErrorMessage(PNContrl));
    const SwarnaContrl = this.astamangalaForm.get('Swarna');
    SwarnaContrl.valueChanges.subscribe(value => this.setErrorMessage(SwarnaContrl));
    const TambulaContrl = this.astamangalaForm.get('Tambula');
    TambulaContrl.valueChanges.subscribe(value => this.setErrorMessage(TambulaContrl));
    const AshtaMangalaNoContrl = this.astamangalaForm.get('AshtaMangalaNo');
    AshtaMangalaNoContrl.valueChanges.subscribe(value => this.setErrorMessage(AshtaMangalaNoContrl));
    // const PruchakaContrl = this.astamangalaForm.get('Pruchaka');
    // PruchakaContrl.valueChanges.subscribe(value => this.setErrorMessage(PruchakaContrl));
    // const JanmaRashiContrl = this.astamangalaForm.get('JanmaRashi');
    // JanmaRashiContrl.valueChanges.subscribe(value => this.setErrorMessage(JanmaRashiContrl));
    const SprushtangaContrl = this.astamangalaForm.get('Sprushtanga');
    SprushtangaContrl.valueChanges.subscribe(value => this.setErrorMessage(SprushtangaContrl));
    const birthPlaceContrl = this.astamangalaForm.get('birthPlace');
    birthPlaceContrl.valueChanges.subscribe(value => this.setErrorMessage(birthPlaceContrl));
    if (this.astamangalaService.horoRequest != null) {
      this.horoRequest = this.astamangalaService.horoRequest;
      this.birthDateinDateFormat = this.astamangalaService.DateinDateFormat;
      this.birthTimeinDateFormat = this.astamangalaService.TimeinDateFormat;
      this.timeZoneName = this.astamangalaService.timeZoneName;
    }
    else {
      this.birthDateinDateFormat = this.astamangalaForm.controls['Date'].value;
      this.birthTimeinDateFormat = this.astamangalaForm.controls['Time'].value;
      this.horoRequest = {
        Date: this.astamangalaForm.controls['Date'].value,
        Time: this.astamangalaForm.controls['Time'].value,
        TimeFormat: null,
        Place: this.astamangalaService.place,
        LatDeg: this.astamangalaForm.controls['LatDeg'].value,
        LatMt: this.astamangalaForm.controls['LatMt'].value,
        LongDeg: this.astamangalaForm.controls['LongDeg'].value,
        LongMt: this.astamangalaForm.controls['LongMt'].value,
        NS: this.astamangalaForm.controls['NS'].value,
        EW: this.astamangalaForm.controls['EW'].value,
        ZH: null,
        ZM: null,
        PN: null,
        Gender: this.astamangalaForm.controls['gender'].value,
        LangCode: null,
        ReportSize: null,
        ReportType: null,
        FormParameter: null,
        Swarna: this.astamangalaForm.controls['Swarna'].value,
        Pruchaka: this.pruchakaStarvalue,
        JanmaRashi: this.pruchakaRashivalue,
        AshtaMangalaNo: this.astamangalaForm.controls['AshtaMangalaNo'].value,
        Tambula: this.astamangalaForm.controls['Tambula'].value,
        Sprushtanga: this.astamangalaForm.controls['Sprushtanga'].value,
        IsMarried: true,
      }
    }
    
  }

  setErrorMessage(c: AbstractControl): void {
    let control = this.uiService.getControlName(c);//gives the control name property from particular service.
    document.getElementById('err_' + control).innerHTML = '';//To not display the error message, if there is no error.
    if ((c.touched || c.dirty) && c.errors) {
      document.getElementById('err_' + control).innerHTML = Object.keys(c.errors).map(key => this.validationMessages[control + '_' + key]).join(' ');
    }
    if (control == "AshtaMangalaNo") {
      var number = this.astamangalaForm.controls['AshtaMangalaNo'].value;
      var cast = number.toString(10).split('');
      var ANo=0;
      for (var i = 0, n = cast.length; i < n; i++) {
        ANo += +cast[i];
      }
      if (ANo == 4 || ANo == 8 || ANo == 12) {

      }
      else {
        document.getElementById('err_AshtaMangalaNo').innerHTML = 'Sum must be either 4,8 or 12';
      }
    }
  }
  private validationMessages = { //used in above method.
    LatDeg_required: '*Enter Latitude Degree',
    LatDeg_min: '*Minimum value is 0',
    LatDeg_max: '*Maximum value is 90',

    LatMt_required: '*Enter Latitude Minute',
    LatMt_min: '*Minimum value is 0',
    LatMt_max: '*Maximum value is 59',

    NS_required: '*Enter NS',
    NS_pattern: '*Only S or N is valid ',

    LongDeg_required: '*Enter Longitude Degree',
    LongDeg_min: '*Minimum value is 0',
    LongDeg_max: '*Maximum value is 90',

    LongMt_required: '*Enter Longitude Minute',
    LongMt_min: '*Minimum value is 0',
    LongMt_max: '*Maximum value is 59',

    EW_required: '*Enter EW',
    EW_pattern: '*Only E or W is valid ',

    ZH_required: '*Enter ZH',
    ZH_min: '*Minimum value is 0',
    ZH_max: '*Maximum value is 13',

    ZM_required: '*Enter ZM',
    ZM_min: '*Minimum value is 0',
    ZM_max: '*Maximum value is 45',

    PN_required: '*Enter PN',
    PN_pattern: '*Only + or - is valid ',

    Swarna_required: '*Enter Swarna',
    Swarna_min: '*Minimum value is 1',
    Swarna_max: '*Maximum value is 12',

    Tambula_required: '*Enter Tambula',
    Tambula_min: '*Minimum value is 1',
    Tambula_max: '*Maximum value is 100',

    AshtaMangalaNo_required: '*Enter AshtaMangala Number',
    AshtaMangalaNo_pattern: "*No's from 1-8 of 3 digits is only allowed",

    Sprushtanga_required: '*Enter Sprushtanga',
    Sprushtanga_min: '*Minimum value is 1',
    Sprushtanga_max: '*Maximum value is 12',

    Date_required: '*Select Date of Birth',

    gender_required: '*Select Date of Birth',

    birthPlace_required: '*Enter Birth Place',

    language_required: '*Select Language',

  };

  ngOnInit() {
    this.timeformatdata = new ArrayStore({
      data: this.timeformats,
      key: "Id"
    });
    this.reportSizedata = new ArrayStore({
      data: this.reportSizes,
      key: "Id"
    });
    this.languagedata = new ArrayStore({
      data: this.languages,
      key: "Id"
    });
    this.pruchakaStardata = new ArrayStore({
      data: this.pruchakaStars,
      key: "Id"
    });
    this.pruchakaRashidata = new ArrayStore({
      data: this.pruchakaRashis,
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
          this.astamangalaService.place = place.formatted_address;
          this.astamangalaService.placeShort = place.address_components[0].long_name
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.getTimezone(this.latitude, this.longitude);
        });
      });
    });
  }
  onGenderChanged(event) {
    if (event.value == 'M') {
      this.genderValue = 'M';
    }
    else {
      this.genderValue = 'F';
    }
  }
  ngAfterViewInit(): void {
    if (this.astamangalaService.horoRequest != null) {
      this.timeformatvalue = this.astamangalaService.horoRequest.TimeFormat;
      this.reportSizevalue = this.astamangalaService.horoRequest.ReportSize;
      this.languagevalue = this.astamangalaService.horoRequest.LangCode;
      this.genderValue = this.astamangalaService.horoRequest.Gender;
      //this.pruchakaStarvalue = 
    }
    else {
      this.timeformatvalue = this.timeformats[0].Id;
      this.reportSizevalue = this.reportSizes[1].Id;
      this.languagevalue = this.languages[1].Id;
      this.genderValue = this.genders[0].Id;
      this.pruchakaStarvalue = this.pruchakaStars[0].Id;
      this.pruchakaRashivalue = this.pruchakaRashis[0].Id;
    }

  }

  ngOnDestroy(): void {

  }

  getTimezone(lat, long) {
    this.horoRequest.LatDeg = Math.abs(parseInt(lat));
    this.horoRequest.LongDeg = Math.abs(parseInt(long));
    this.intLatDeg = parseInt(lat);
    this.intLongDeg = parseInt(long);
    this.horoRequest.LatMt = parseInt(Math.abs((lat - this.intLatDeg) * 60).toString());
    this.horoRequest.LongMt = parseInt(Math.abs((long - this.intLongDeg) * 60).toString());
    if (lat < 0) {
      this.horoRequest.NS = "S";
    }
    else {
      this.horoRequest.NS = "N";
    }
    if (long < 0) {
      this.horoRequest.EW = "W";
    }
    else {
      this.horoRequest.EW = "E";
    }
    this.astamangalaService.getTimezone(lat, long).subscribe((data: any) => {
      this.horoRequest.ZH = parseInt((Math.abs(data.rawOffset) / 3600.00).toString());
      this.horoRequest.ZM = parseInt((((Math.abs(data.rawOffset) / 3600.00) - this.horoRequest.ZH) * 60).toString());
      if (data.rawOffset < 0) {
        this.horoRequest.PN = "-";
      }
      else {
        this.horoRequest.PN = "+";
      }
      this.timeZoneName = data.timeZoneName;
      this.timeZoneId = data.timeZoneId;
      this.cdr.detectChanges();
    });
  }

  timeformatdataSelection(event) {
    this.timeformatvalue = event.value;
  }
  reportSizedataSelection(event) {
    this.reportSizevalue = event.value;
  }
  languagedataSelection(event) {
    this.languagevalue = event.value;
  }
  pruchakaStardataSelection(event) {
    this.pruchakaStarvalue = event.value;
    switch (event.value) {
      case "1":
        this.pruchakaRashis = [{ Id: '1', Text: 'Mesha' }];
        break;
      case "2":
        this.pruchakaRashis = [{ Id: '1', Text: 'Mesha' }];
        break;
      case "3":
        this.pruchakaRashis = [{ Id: '1', Text: 'Mesha' }, { Id: '2', Text: 'Vrishabha' }];
        break;
      case "4":
        this.pruchakaRashis = [{ Id: '2', Text: 'Vrishabha' }];
        break;
      case "5":
        this.pruchakaRashis = [{ Id: '2', Text: 'Vrishabha' }, { Id: '3', Text: 'Mithuna' }];
        break;
      case "6":
        this.pruchakaRashis = [{ Id: '3', Text: 'Mithuna' }];
        break;
      case "7":
        this.pruchakaRashis = [{ Id: '3', Text: 'Mithuna' }, { Id: '4', Text: 'Karkataka' }];
        break;
      case "8":
        this.pruchakaRashis = [{ Id: '4', Text: 'Karkataka' }];
        break;
      case "9":
        this.pruchakaRashis = [{ Id: '4', Text: 'Karkataka' }];
        break;
      case "10":
        this.pruchakaRashis = [{ Id: '5', Text: 'Simha' }];
        break;
      case "11":
        this.pruchakaRashis = [{ Id: '5', Text: 'Simha' }];
        break;
      case "12":
        this.pruchakaRashis = [{ Id: '5', Text: 'Simha' }, { Id: '6', Text: 'Kanya' }];
        break;
      case "13":
        this.pruchakaRashis = [{ Id: '6', Text: 'Kanya' }];
        break;
      case "14":
        this.pruchakaRashis = [{ Id: '6', Text: 'Kanya' }, { Id: '7', Text: 'Tula' }];
        break;
      case "15":
        this.pruchakaRashis = [{ Id: '7', Text: 'Tula' }];
        break;
      case "16":
        this.pruchakaRashis = [{ Id: '7', Text: 'Tula' }, { Id: '8', Text: 'Vrishchika' }];
        break;
      case "17":
        this.pruchakaRashis = [{ Id: '8', Text: 'Vrishchika' }];
        break;
      case "18":
        this.pruchakaRashis = [{ Id: '8', Text: 'Vrishchika' }];
        break;
      case "19":
        this.pruchakaRashis = [{ Id: '9', Text: 'Dhanu' }];
        break;
      case "20":
        this.pruchakaRashis = [{ Id: '9', Text: 'Dhanu' }];
        break;
      case "21":
        this.pruchakaRashis = [{ Id: '9', Text: 'Dhanu' }, { Id: '10', Text: 'Makara' }];
        break;
      case "22":
        this.pruchakaRashis = [{ Id: '10', Text: 'Makara' }];
        break;
      case "23":
        this.pruchakaRashis = [{ Id: '10', Text: 'Makara' }, { Id: '11', Text: 'Kumbha' }];
        break;
      case "24":
        this.pruchakaRashis = [{ Id: '11', Text: 'Kumbha' }];
        break;
      case "25":
        this.pruchakaRashis = [{ Id: '11', Text: 'Kumbha' }, { Id: '12', Text: 'Meena' }];
        break;
      case "26":
        this.pruchakaRashis = [{ Id: '12', Text: 'Meena' }];
        break;
      case "27":
        this.pruchakaRashis = [{ Id: '12', Text: 'Meena' }];
        break;
      default:
        this.pruchakaRashis = [
          { Id: "1", Text: "Mesha" },
          { Id: "2", Text: "Vrishabha" },
          { Id: "3", Text: "Mithuna" },
          { Id: "4", Text: "Karkataka" },
          { Id: "5", Text: "Simha" },
          { Id: "6", Text: "Kanya" },
          { Id: "7", Text: "Tula" },
          { Id: "8", Text: "Vrishchika" },
          { Id: "9", Text: "Dhanu" },
          { Id: "10", Text: "Makara" },
          { Id: "11", Text: "Kumbha" },
          { Id: "12", Text: "Meena" }
        ];
    }
    this.pruchakaRashidata = new ArrayStore({
      data: this.pruchakaRashis,
      key: "Id"
    });
    this.pruchakaRashivalue = this.pruchakaRashis[0].Id;
  }
  pruchakaRashidataSelection(event) {
    this.pruchakaRashivalue = event.value;
  }
  OnMouseUp(event) {
    if (event == null) {
      this.timeZoneName = null;
    }
  }
  checkBoxStateChanged() {
    if (this.checkBoxValue == true) {
      this.enabletoEdit = true;
      this.checkBoxValue = false;
    }
    else {
      this.enabletoEdit = false;
      this.checkBoxValue = true;
    }
  }


  OnSubmit_click() {
    //this.tick();
    //this.loading = true;
    this.loadingSwitchService.loading = true;
    this.astamangalaService.systemDate = ("0" + new Date().getDate()).toString().slice(-2) + "-" + ("0" + ((new Date().getMonth()) + 1)).toString().slice(-2) + "-" + new Date().getFullYear().toString();
    // if(typeof this.horoscopeForm.controls['Date'].value ==='string'){

    // }
    var bdate: Date = this.astamangalaForm.controls['Date'].value;
    var btime: Date = this.astamangalaForm.controls['Time'].value;
    if (bdate instanceof Date) {
      var dateinString = bdate.getFullYear().toString() + "-" + ("0" + ((bdate.getMonth()) + 1)).toString().slice(-2) + "-" + ("0" + bdate.getDate()).toString().slice(-2);
    }
    else {
      dateinString = bdate;
    }
    if (btime instanceof Date) {
      var timeinString = ("0" + btime.getHours()).toString().slice(-2) + ":" + ("0" + btime.getMinutes()).toString().slice(-2) + ":" + "00";
    }
  
    this.horoRequest = {
      //Date: "2018-12-28",
      //Time: "18:34:00",
      Date: dateinString,
      Time: timeinString,
      //DOB:this.horoscopeForm.controls['Bdate'].value.toISOString(),
      //TimeFormat: "STANDARD",
      Place: this.astamangalaService.placeShort,
      //TimeFormat: this.horoscopeForm.controls['TimeFormat'].value,
      TimeFormat: this.timeformatvalue,
      LatDeg: this.astamangalaForm.controls['LatDeg'].value,
      LatMt: this.astamangalaForm.controls['LatMt'].value,
      LongDeg: this.astamangalaForm.controls['LongDeg'].value,
      LongMt: this.astamangalaForm.controls['LongMt'].value,
      NS: this.astamangalaForm.controls['NS'].value,
      EW: this.astamangalaForm.controls['EW'].value,
      ZH: this.astamangalaForm.controls['ZH'].value,
      ZM: this.astamangalaForm.controls['ZM'].value,
      PN: this.astamangalaForm.controls['PN'].value,
      //Gender: this.horoscopeForm.controls['gender'].value,
      Gender: this.genderValue,
      //LangCode: this.horoscopeForm.controls['language'].value,
      LangCode: this.languagevalue,
      FormParameter: 'H',
      ReportType: '#HFH',
      //ReportSize: this.horoscopeForm.controls['ReportSize'].value,
      ReportSize: this.reportSizevalue,
      Swarna: this.astamangalaForm.controls['Swarna'].value,
      Pruchaka: this.pruchakaStarvalue,
      JanmaRashi: this.pruchakaRashivalue,
      AshtaMangalaNo: this.astamangalaForm.controls['AshtaMangalaNo'].value,
      Tambula: this.astamangalaForm.controls['Tambula'].value,
      Sprushtanga: this.astamangalaForm.controls['Sprushtanga'].value,
      IsMarried: true,
    }
    this.astamangalaService.horoRequest = this.horoRequest;
    this.astamangalaService.DateinDateFormat = bdate;
    this.astamangalaService.TimeinDateFormat = btime;
    this.astamangalaService.timeZoneName = this.timeZoneName;
    this.storageService.SetHoroModel(JSON.stringify(this.horoRequest));
    this.astamangalaService.GetFreeData(this.horoRequest).subscribe((data: any) => {
      this.astamangalaService.horoResponse = data;
      this.storageService.SetHoroResponse(JSON.stringify(data));
      this.loadingSwitchService.loading = false;
      this.router.navigate(["/astamangala/getAstamangalaFreeData"]);
    });
  }

  public onDialogOKSelected(event) {
    event.dialog.close();
  }

}
