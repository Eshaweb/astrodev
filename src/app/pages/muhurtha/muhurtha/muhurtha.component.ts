import { Component, enableProdMode, NgZone, ChangeDetectorRef, ViewChild } from '@angular/core';
import { NavigationExtras, ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SelectBoxModel } from 'src/Models/SelectBoxModel';
import { PartyService } from 'src/Services/PartyService/PartyService';
import { LoadingSwitchService } from 'src/Services/LoadingSwitchService/LoadingSwitchService';
import { UIService } from 'src/Services/UIService/ui.service';
import { MapsAPILoader } from '@agm/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import ArrayStore from 'devextreme/data/array_store';
import { MuhurthaService, Star } from 'src/Services/MuhoorthaService/MuhoorthaService';
import { DxDataGridComponent, DxDateBoxComponent } from 'devextreme-angular';
import { MuhurthaRequest, RashiNak } from 'src/Models/Muhurtha/MuhurthaRequest';
import { StorageService } from 'src/Services/StorageService/Storage_Service';
import { LoginService } from 'src/Services/LoginService/LoginService';


@Component({
  templateUrl: './muhurtha.component.html',
  styleUrls: ['./muhurtha.component.css']
})

export class MuhurthaComponent {
  @ViewChild(DxDataGridComponent) public muhurtha: DxDataGridComponent;
  @ViewChild(DxDateBoxComponent) public todate: DxDateBoxComponent;
  muhurthaRequest: MuhurthaRequest;
  muhurthaaForm: FormGroup;
  dateRangeForm: FormGroup;

  public loading = false;
  intLongDeg: number;
  intLatDeg: number;
  fromdateinDateFormat: Date;
  todateinDateFormat: Date;
  birthTimeinDateFormat: Date;
  errorMessage: any;
  subscription: Subscription;
  latitude: number;
  longitude: number;
  timeZoneName: string;
  timeZoneId: any;
  long: number;
  lat: number;
  //rashiNak: RashiNak[];
  rashiNak: any[];
  muhurthasvalue: string;
  muhurthasdata: ArrayStore;
  timeformatdata: ArrayStore;
  languagedata: ArrayStore;
  yathradirectionsdata: ArrayStore;
  stardata: ArrayStore;
  rashidata: ArrayStore;
  reportSizedata: ArrayStore;

  timeformatvalue: string;
  languagevalue: string;
  yathradirectionsvalue: string;
  nakshathraValue: string;
  rashiValue: string;
  reportSizevalue: string;
  muhurthas: any;
  public checkBoxValue: boolean = false;
  vivahaSelected: boolean;
  upanayanaSelected: boolean;
  yathraSelected: boolean;
  abhijinCheckBoxValue: boolean=false;
  godhuliCheckBoxValue: boolean=false;
  endTimeCheckBoxValue: boolean=false;

  birthDateinDateFormat: Date;
  //dateinDateFormat: Date;
  maxdateinDateFormat: Date;
  dataSource: RashiNak[];
  languages: SelectBoxModel[] = [
    { Id: "ENG", Text: "English" },
    { Id: "HIN", Text: "हिन्दी" },
    { Id: "KAN", Text: "ಕನ್ನಡ" },
    { Id: "MAL", Text: "മലയാളം" },
    { Id: "TAM", Text: "தமிழ்" }];
  timeformats: SelectBoxModel[] = [
    { Id: "STANDARD", Text: 'Standard Time' },
    { Id: "SUMMER", Text: 'Daylight Saving Time' },
    { Id: "DOUBLE", Text: 'Double Summer Time' },
    { Id: "WAR", Text: 'War Time' }
  ];
  yathradirections: SelectBoxModel[] = [
    { Id: "STANDARD", Text: 'East' },
    { Id: "SUMMER", Text: 'South East' },
    { Id: "DOUBLE", Text: 'South' },
    { Id: "WAR", Text: 'South West' },
    { Id: "STANDARD", Text: 'West' },
    { Id: "SUMMER", Text: 'North West' },
    { Id: "DOUBLE", Text: 'North' },
    { Id: "WAR", Text: 'North East' }
  ];
  reportSizes: SelectBoxModel[] = [
    { Id: "A4", Text: "A4" },
    { Id: "A5", Text: "A5" }];
  //dataSource = [];
  // stars: SelectBoxModel[] = [
  //   { Id: "0", Text: "Unknown" },
  //   { Id: "1", Text: "Ashwini" },
  //   { Id: "2", Text: "Bharani" },
  //   { Id: "3", Text: "Krittika" },
  //   { Id: "4", Text: "Rohini" },
  //   { Id: "5", Text: "Mrigashira" },
  //   { Id: "6", Text: "Ardra" },
  //   { Id: "7", Text: "Punarvasu" },
  //   { Id: "8", Text: "Pushya" },
  //   { Id: "9", Text: "Ashlesha" },
  //   { Id: "10", Text: "Magha" },
  //   { Id: "11", Text: "Poorva(Hubba)" },
  //   { Id: "12", Text: "Uttara" },
  //   { Id: "13", Text: "Hasta" },
  //   { Id: "14", Text: "Chithra" },
  //   { Id: "15", Text: "Swathi" },
  //   { Id: "16", Text: "Vishakha" },
  //   { Id: "17", Text: "Anuradha" },
  //   { Id: "18", Text: "Jyeshta" },
  //   { Id: "19", Text: "Moola" },
  //   { Id: "20", Text: "Poorvashada" },
  //   { Id: "21", Text: "Uttarashada" },
  //   { Id: "22", Text: "Shravana" },
  //   { Id: "23", Text: "Dhanishta" },
  //   { Id: "24", Text: "Shatabhisha" },
  //   { Id: "25", Text: "Poorvabhadra" },
  //   { Id: "26", Text: "Uttarabhadra" },
  //   { Id: "27", Text: "Revathi" },
  // ];

  stars = [
    { "Id": "0", "Text": "Unknown" },
    { "Id": "1", "Text": "Ashwini" },
    { "Id": "2", "Text": "Bharani" },
    { "Id": "3", "Text": "Krittika" },
    { "Id": "4", "Text": "Rohini" },
    { "Id": "5", "Text": "Mrigashira" },
    { "Id": "6", "Text": "Ardra" },
    { "Id": "7", "Text": "Punarvasu" },
    { "Id": "8", "Text": "Pushya" },
    { "Id": "9", "Text": "Ashlesha" },
    { "Id": "10", "Text": "Magha" },
    { "Id": "11", "Text": "Poorva(Hubba)" },
    { "Id": "12", "Text": "Uttara" },
    { "Id": "13", "Text": "Hasta" },
    { "Id": "14", "Text": "Chithra" },
    { "Id": "15", "Text": "Swathi" },
    { "Id": "16", "Text": "Vishakha" },
    { "Id": "17", "Text": "Anuradha" },
    { "Id": "18", "Text": "Jyeshta" },
    { "Id": "19", "Text": "Moola" },
    { "Id": "20", "Text": "Poorvashada" },
    { "Id": "21", "Text": "Uttarashada" },
    { "Id": "22", "Text": "Shravana" },
    { "Id": "23", "Text": "Dhanishta" },
    { "Id": "24", "Text": "Shatabhisha" },
    { "Id": "25", "Text": "Poorvabhadra" },
    { "Id": "26", "Text": "Uttarabhadra" },
    { "Id": "27", "Text": "Revathi" },
  ];

  rashis = [
    { "Id": "0", "Text": "Unknown", "StarId": "0" },
    // { "Id": "1", "Text": "Mesha", "StarId":"0" },
    // { "Id": "2", "Text": "Vrishabha", "StarId":"0" },
    // { "Id": "3", "Text": "Mithuna", "StarId":"0" },
    // { "Id": "4", "Text": "Karkataka", "StarId":"0" },
    // { "Id": "5", "Text": "Simha", "StarId":"0" },
    // { "Id": "6", "Text": "Kanya", "StarId":"0" },
    // { "Id": "7", "Text": "Tula", "StarId":"0" },
    // { "Id": "8", "Text": "Vrishchika", "StarId":"0" },
    // { "Id": "9", "Text": "Dhanu", "StarId":"0"},
    // { "Id": "10", "Text": "Makara", "StarId":"0" },
    // { "Id": "11", "Text": "Kumbha", "StarId":"0" },
    // { "Id": "12", "Text": "Meena", "StarId":"0" },
    { "Id": "1", "Text": "Mesha", "StarId": "1" },
    { "Id": "1", "Text": "Mesha", "StarId": "2" },
    { "Id": "1", "Text": "Mesha", "StarId": "3" },
    { "Id": "2", "Text": "Vrishabha", "StarId": "3" },
    { "Id": "2", "Text": "Vrishabha", "StarId": "4" },
    { "Id": "2", "Text": "Vrishabha", "StarId": "5" },
    { "Id": "3", "Text": "Mithuna", "StarId": "5" },
    { "Id": "3", "Text": "Mithuna", "StarId": "6" },
    { "Id": "3", "Text": "Mithuna", "StarId": "7" },
    { "Id": "4", "Text": "Karkataka", "StarId": "7" },
    { "Id": "4", "Text": "Karkataka", "StarId": "8" },
    { "Id": "4", "Text": "Karkataka", "StarId": "9" },
    { "Id": "5", "Text": "Simha", "StarId": "10" },
    { "Id": "5", "Text": "Simha", "StarId": "11" },
    { "Id": "5", "Text": "Simha", "StarId": "12" },
    { "Id": "6", "Text": "Kanya", "StarId": "12" },
    { "Id": "6", "Text": "Kanya", "StarId": "13" },
    { "Id": "6", "Text": "Kanya", "StarId": "14" },
    { "Id": "7", "Text": "Tula", "StarId": "14" },
    { "Id": "7", "Text": "Tula", "StarId": "15" },
    { "Id": "7", "Text": "Tula", "StarId": "16" },
    { "Id": "8", "Text": "Vrishchika", "StarId": "16" },
    { "Id": "8", "Text": "Vrishchika", "StarId": "17" },
    { "Id": "8", "Text": "Vrishchika", "StarId": "18" },
    { "Id": "9", "Text": "Dhanu", "StarId": "19" },
    { "Id": "9", "Text": "Dhanu", "StarId": "20" },
    { "Id": "9", "Text": "Dhanu", "StarId": "21" },
    { "Id": "10", "Text": "Makara", "StarId": "21" },
    { "Id": "10", "Text": "Makara", "StarId": "22" },
    { "Id": "10", "Text": "Makara", "StarId": "23" },
    { "Id": "11", "Text": "Kumbha", "StarId": "23" },
    { "Id": "11", "Text": "Kumbha", "StarId": "24" },
    { "Id": "11", "Text": "Kumbha", "StarId": "25" },
    { "Id": "12", "Text": "Meena", "StarId": "25" },
    { "Id": "12", "Text": "Meena", "StarId": "26" },
    { "Id": "12", "Text": "Meena", "StarId": "27" }
  ];
  BrideGroomDetails: string[];
  semanthaSelected: boolean;
  annaPrashanaSelected: boolean;
  houseWarmingSelected: boolean;
  devaPrathistaSelected: boolean;
  showError: string;
  canEnterDateRange: boolean=true;
  rashiNakshatras:any[];
  mindateinDateFormat_To: Date;
  mindateinDateFormat_From: Date;
  
  constructor(public loginService:LoginService,public storageService:StorageService, public loadingSwitchService: LoadingSwitchService, public toastr: ToastrManager, public route: ActivatedRoute, private router: Router, public formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef, public partyService: PartyService, public muhurthaService: MuhurthaService, public uiService: UIService,
    private ngZone: NgZone, private mapsAPILoader: MapsAPILoader, public formbuilder: FormBuilder) {
    this.loginService.isHomePage=false;
    this.muhurthaaForm = this.formbuilder.group({
      Date: new Date(),
      //Date: [null, [Validators.required]],
      Place: ['', [Validators.required]],
      language: ['', []]
    });
    this.dateRangeForm = this.formbuilder.group({
      FromDate:new Date(),
      ToDate:new Date(),
    });
    // }, {validator: this.validateDateField('FromDate')});
    this.getFilteredRashis = this.getFilteredRashis.bind(this);
    const PlaceContrl = this.muhurthaaForm.get('Place');
    PlaceContrl.valueChanges.subscribe(value => this.setErrorMessage(PlaceContrl));
    const FromDateContrl = this.dateRangeForm.get('FromDate');
    FromDateContrl.valueChanges.subscribe(value => this.setErrorMessage(FromDateContrl));
    const ToDateContrl = this.dateRangeForm.get('ToDate');
    ToDateContrl.valueChanges.subscribe(value => this.setErrorMessage(ToDateContrl));
    //this.setStarValue("","1");
   // this.setRashiValue("","1");
    if (this.muhurthaService.muhurthaRequest != null) {
      this.muhurthaRequest = this.muhurthaService.muhurthaRequest;
      this.birthDateinDateFormat = this.muhurthaService.BirthDateinDateFormat;
      this.mindateinDateFormat_From = this.muhurthaService.DateinDateFormat_From;
      this.mindateinDateFormat_To = this.muhurthaService.DateinDateFormat_To;
      this.maxdateinDateFormat= this.muhurthaService.maxdateinDateFormat;
      this.fromdateinDateFormat = this.muhurthaService.FromDateinDateFormat;
      this.todateinDateFormat = this.muhurthaService.ToDateinDateFormat;
      this.birthTimeinDateFormat = this.muhurthaService.TimeinDateFormat;
      //this.dataSource=this.muhurthaService.muhurthaRequest.RashiNakshatras;
      this.dataSource=this.muhurthaService.RashiNak;
    }
    else {
      this.birthDateinDateFormat = this.muhurthaaForm.controls['Date'].value;
      this.mindateinDateFormat_From = new Date();
      this.mindateinDateFormat_To = new Date();
      this.maxdateinDateFormat = new Date();
      this.maxdateinDateFormat.setDate(this.mindateinDateFormat_From.getDate()+60);
      this.fromdateinDateFormat = this.dateRangeForm.controls['FromDate'].value;
      this.todateinDateFormat = this.dateRangeForm.controls['ToDate'].value;
      //this.todateinDateFormat.setMonth(this.todateinDateFormat.getMonth()+3);
      this.todateinDateFormat.setDate(this.todateinDateFormat.getDate()+15);
      this.dataSource = [{Rashi: "0", Nakshatra: "0"}];
      this.muhurthaRequest={
        MuhurthaType:null,
        FromDate:null,
        ToDate:null,
        TimeFormat:null,
        ReportSize:null,
        Place:null,
        LatDeg: null,
        LatMt: null,
        LongDeg: null,
        LongMt: null,
        NS:null,
        EW:null,
        ZH:null,
        ZM:null,
        PN:null,
        Godhuli:null,
        Abhijin:null,
        VatuDOB:null,
        Direction:null,
        EndTime:null,
        LangCode:null,
        RashiNakshatras:null,
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
     let f = group.controls['FromDate'];
      if (f.value > new Date(this.maxdateinDateFormat)||f.value < new Date()) {
       return {
         dates: "Date from should be less than Date to"
       };
     }
     return {};
    }
  }

  setToDateinDateFormat() {
    this.maxdateinDateFormat.setFullYear(this.dateRangeForm.controls['FromDate'].value.getFullYear());
    this.maxdateinDateFormat.setMonth(this.dateRangeForm.controls['FromDate'].value.getMonth());
    this.maxdateinDateFormat.setDate(this.dateRangeForm.controls['FromDate'].value.getDate()+60);
    this.mindateinDateFormat_To.setDate(this.dateRangeForm.controls['FromDate'].value.getDate());
    this.mindateinDateFormat_To.setMonth(this.dateRangeForm.controls['FromDate'].value.getMonth());
    this.mindateinDateFormat_To.setFullYear(this.dateRangeForm.controls['FromDate'].value.getFullYear());
    document.getElementById('err_ToDate').innerHTML = '';
    //this.todateinDateFormat.setDate(this.dateRangeForm.controls['FromDate'].value.getDate()+15);
  }
  ngOnInit() {
    this.loadingSwitchService.loading = true;
    this.muhurthaService.GetMuhurthaList().subscribe((data: any) => {
      this.muhurthas = data;
      this.muhurthasdata = new ArrayStore({
        data: this.muhurthas,
        key: "Id"
      });
      if(this.muhurthaService.muhurthaRequest != null){
        this.muhurthasvalue = this.muhurthaService.muhurthaRequest.MuhurthaType;
      }
      else{
        this.muhurthasvalue = this.muhurthas[0].Id;
        this.vivahaSelected = true;
      }
      this.loadingSwitchService.loading = false;
    });
    //this.stars=this.stars;
    this.stardata = new ArrayStore({
      data: this.stars,
      key: "Id"
    });
    this.rashidata = new ArrayStore({
      data: this.rashis,
      key: "Id"
    });
    this.timeformatdata = new ArrayStore({
      data: this.timeformats,
      key: "Id"
    });
    this.languagedata = new ArrayStore({
      data: this.languages,
      key: "Id"
    });
    this.reportSizedata = new ArrayStore({
      data: this.reportSizes,
      key: "Id"
    });
    this.yathradirectionsdata = new ArrayStore({
      data: this.yathradirections,
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
          this.muhurthaService.place = place.formatted_address;
          this.muhurthaService.placeShort = place.address_components[0].long_name
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.getTimezone(this.latitude, this.longitude);
        });
      });
    });
    // if(this.muhurtha.instance.hasEditData())
    // {
    //     this.loadingSwitchService.loading = true;
    //     this.muhurtha.instance.saveEditData();
    // }

  }

  ngAfterViewInit(): void {
    if (this.muhurthaService.muhurthaRequest != null) {
      this.timeformatvalue = this.muhurthaService.muhurthaRequest.TimeFormat;
      //this.muhurthasvalue = this.muhurthaService.panchangaRequest.LangCode;
      this.languagevalue = this.muhurthaService.muhurthaRequest.LangCode;
      this.reportSizevalue = this.muhurthaService.muhurthaRequest.ReportSize;
      this.timeZoneName = this.muhurthaService.timeZoneName;
      this.yathradirectionsvalue=this.muhurthaService.muhurthaRequest.Direction;
    }
    else {
      this.timeformatvalue = this.timeformats[0].Id;
      this.languagevalue = this.languages[2].Id;
      this.reportSizevalue = this.reportSizes[1].Id;
      //this.muhurthasvalue = this.muhurthas[0].Id;
      this.yathradirectionsvalue = this.yathradirections[0].Id;
    }

  }

  ngOnDestroy(): void {

  }

  onToolbarPreparing(e) {
    // if (this.muhurthaService.muhurthaRequest == null) {
    //   this.muhurtha.instance.addRow();
    // }
  //  this.muhurtha.instance.d
    var toolbarItems = e.toolbarOptions.items;
    toolbarItems.forEach(function (item) {
      item.visible = false;
    });
  }

  OnEnterStepToRashiNakshatra(event){
    var bdate: Date = this.muhurthaaForm.controls['Date'].value;
    if (bdate instanceof Date) {
      var dateinString = bdate.getFullYear().toString() + "-" + ("0" + ((bdate.getMonth()) + 1)).toString().slice(-2) + "-" + ("0" + bdate.getDate()).toString().slice(-2);
    }
    else {
      dateinString = bdate;
    }
    this.muhurthaService.DateinDateFormat = bdate;

  }

  OnContinue_click(){
    for(var i=0;i<this.muhurtha.instance.getVisibleRows().length;i++){
      if (i == 0) {
        if (this.muhurtha.instance.getVisibleRows()[i].data.Rashi != undefined && this.muhurtha.instance.getVisibleRows()[i].data.Nakshatra != undefined) {
          this.rashiNak = [{
            Rashi: this.muhurtha.instance.getVisibleRows()[i].data.Rashi,
            Nakshatra: this.muhurtha.instance.getVisibleRows()[i].data.Nakshatra,
            OfWhome:this.muhurtha.instance.getVisibleRows()[i].data.OfWhome
          }];
          this.canEnterDateRange = true;
        }
        else {
          this.showError = 'Please fill both Rashi and Nakshatra';
          document.getElementById('showError').innerHTML='Please fill both Rashi and Nakshatra';
          this.canEnterDateRange = false;
        }
      }
      else if (i > 0) {
        this.rashiNak.unshift({
          Rashi: this.muhurtha.instance.getVisibleRows()[i].data.Rashi,
          Nakshatra: this.muhurtha.instance.getVisibleRows()[i].data.Nakshatra,
          OfWhome:this.muhurtha.instance.getVisibleRows()[i].data.OfWhome
        });
      }
    }
    if(this.muhurthasvalue =="viha"){
      this.rashiNak.splice(0, 0, this.rashiNak.find(function (obj) { return obj.OfWhome === "Bridegroom" }));
       this.rashiNak.splice(2, 1);
    }
    else if(this.muhurthasvalue =="upny"){
      this.rashiNak.splice(0, 0, this.rashiNak.find(function (obj) { return obj.OfWhome === "Vatu" }));
       this.rashiNak.splice(2, 1);
    }
    else if(this.muhurthasvalue =="semt"){
      this.rashiNak.splice(0, 0, this.rashiNak.find(function (obj) { return obj.OfWhome === "Pregnant" }));
       this.rashiNak.splice(1, 1);
    }
    else if(this.muhurthasvalue =="anna"||this.muhurthasvalue =="krna"||this.muhurthasvalue =="chal"||this.muhurthasvalue =="tott"||this.muhurthasvalue =="name"||this.muhurthasvalue =="vida"){
      this.rashiNak.splice(0, 0, this.rashiNak.find(function (obj) { return obj.OfWhome === "Child" }));
       this.rashiNak.splice(1, 1);
    }
    else if(this.muhurthasvalue =="grpr"||this.muhurthasvalue =="grab"){
      this.rashiNak.splice(0, 0, this.rashiNak.find(function (obj) { return obj.OfWhome === "Owner" }));
       this.rashiNak.splice(1, 1);
    }
    else if(this.muhurthasvalue =="dvpr"){
      this.rashiNak.splice(0, 0, this.rashiNak.find(function (obj) { return obj.OfWhome === "God" }));
       this.rashiNak.splice(1, 1);
    }
    else if(this.muhurthasvalue =="dvpr"){
      this.rashiNak.splice(0, 0, this.rashiNak.find(function (obj) { return obj.OfWhome === "God" }));
       this.rashiNak.splice(1, 1);
    }
  }
  
  OnExitStepFromDateRange(event){
    var fromdate: Date = this.dateRangeForm.controls['FromDate'].value;
    var todate: Date = this.dateRangeForm.controls['ToDate'].value;
    if (fromdate instanceof Date) {
      var fromdateinString = fromdate.getFullYear().toString() + "-" + ("0" + ((fromdate.getMonth()) + 1)).toString().slice(-2) + "-" + ("0" + fromdate.getDate()).toString().slice(-2);
    }
    else {
      fromdateinString = fromdate;
    }
    if (todate instanceof Date) {
      var todateinString = todate.getFullYear().toString() + "-" + ("0" + ((todate.getMonth()) + 1)).toString().slice(-2) + "-" + ("0" + todate.getDate()).toString().slice(-2);
    }
    else {
      todateinString = todate;
    }
    this.muhurthaService.FromDateinDateFormat = fromdate;
    this.muhurthaService.ToDateinDateFormat = todate;
  }
  
  onRowRemoving(event) {

  }

  getTimezone(lat, long) {
    this.muhurthaRequest.LatDeg = Math.abs(parseInt(lat));
    this.muhurthaRequest.LongDeg = Math.abs(parseInt(long));
    this.intLatDeg = parseInt(lat);
    this.intLongDeg = parseInt(long);
    this.muhurthaRequest.LatMt = parseInt(Math.abs((lat - this.intLatDeg) * 60).toString());
    this.muhurthaRequest.LongMt = parseInt(Math.abs((long - this.intLongDeg) * 60).toString());
    if (lat < 0) {
      this.muhurthaRequest.NS = "S";
    }
    else {
      this.muhurthaRequest.NS = "N";
    }
    if (long < 0) {
      this.muhurthaRequest.EW = "W";
    }
    else {
      this.muhurthaRequest.EW = "E";
    }
    this.muhurthaService.getTimezone(lat, long).subscribe((data: any) => {
      this.muhurthaRequest.ZH = parseInt((Math.abs(data.rawOffset) / 3600.00).toString());
      this.muhurthaRequest.ZM = parseInt((((Math.abs(data.rawOffset) / 3600.00) - this.muhurthaRequest.ZH) * 60).toString());
      if (data.rawOffset < 0) {
        this.muhurthaRequest.PN = "-";
      }
      else {
        this.muhurthaRequest.PN = "+";
      }
      this.timeZoneName = data.timeZoneName;
      this.timeZoneId = data.timeZoneId;
      this.cdr.detectChanges();
    });
  }

  timeformatdataSelection(event) {
    this.timeformatvalue = event.value;
  }
  muhurthasdataSelection(event) {
    this.muhurthasvalue = event.value;
    if (event.value == "viha") {
      this.vivahaSelected = true;
      this.upanayanaSelected = false;
      this.yathraSelected = false;
      this.semanthaSelected=false;
      this.annaPrashanaSelected=false;
      this.houseWarmingSelected=false;
      this.devaPrathistaSelected=false;
      this.dataSource=[{Rashi: "0", Nakshatra: "0", OfWhome:'Bridegroom'},
      {Rashi: "0", Nakshatra: "0", OfWhome:'Bride'}];
    }
    else if (event.value == "upny") {
      this.upanayanaSelected = true;
      this.vivahaSelected = false;
      this.yathraSelected = false;
      this.semanthaSelected=false;
      this.annaPrashanaSelected=false;
      this.houseWarmingSelected=false;
      this.devaPrathistaSelected=false;
      this.dataSource=[{Rashi: "0", Nakshatra: "0", OfWhome:'Vatu'},
      {Rashi: "0", Nakshatra: "0", OfWhome:'Father'}];
    }
    else if(event.value == "semt"){
      this.semanthaSelected=true;
      this.vivahaSelected = false;
      this.upanayanaSelected = false;
      this.yathraSelected = false;
      this.annaPrashanaSelected=false;
      this.houseWarmingSelected=false;
      this.devaPrathistaSelected=false;
      this.dataSource=[{Rashi: "0", Nakshatra: "0", OfWhome:'Pregnant'}];
    }
    else if(event.value == "anna"||event.value =="krna"||event.value =="chal"||event.value =="tott"||event.value =="name"||event.value =="vida"){
      this.annaPrashanaSelected=true;
      this.semanthaSelected=false;
      this.vivahaSelected = false;
      this.upanayanaSelected = false;
      this.yathraSelected = false;
      this.houseWarmingSelected=false;
      this.devaPrathistaSelected=false;
      this.dataSource=[{Rashi: "0", Nakshatra: "0", OfWhome:'Child'}];
    }
    else if(event.value == "grpr"||event.value =="grab"){
      this.houseWarmingSelected=true;
      this.semanthaSelected=false;
      this.vivahaSelected = false;
      this.upanayanaSelected = false;
      this.yathraSelected = false;
      this.annaPrashanaSelected=false;
      this.devaPrathistaSelected=false;
      this.dataSource=[{Rashi: "0", Nakshatra: "0", OfWhome:'Owner'}];
    }
    else if (event.value == "dvpr") {
      this.devaPrathistaSelected=true;
      this.yathraSelected = false;
      this.semanthaSelected=false;
      this.vivahaSelected = false;
      this.upanayanaSelected = false;
      this.annaPrashanaSelected=false;
      this.houseWarmingSelected=false;
      this.dataSource=[{Rashi: "0", Nakshatra: "0", OfWhome:'God'}];
    }
    else if (event.value == "trvl") {
      this.yathraSelected = true;
      this.semanthaSelected=false;
      this.vivahaSelected = false;
      this.upanayanaSelected = false;
      this.annaPrashanaSelected=false;
      this.houseWarmingSelected=false;
      this.devaPrathistaSelected=false;
    }
    else {
      this.vivahaSelected = false;
      this.upanayanaSelected = false;
      this.yathraSelected = false;
      this.semanthaSelected=false;
      this.annaPrashanaSelected=false;
      this.houseWarmingSelected=false;
      this.devaPrathistaSelected=false;
    }
  }
  languagedataSelection(event) {
    this.languagevalue = event.value;
  }
  yathradirectionSelection(event) {
    this.yathradirectionsvalue = event.value;
  }
  reportSizedataSelection(event){
    this.reportSizevalue=event.value;
  }
  getFilteredRashis(options) {
    return {
      store: this.rashis,
      filter: options.data ? ["StarId", "=", options.data.Nakshatra] : null
    };
  }
  // onEditorPreparing(e) {
  //   if (e.parentType === "dataRow" && e.dataField === "StarId") {
  //     e.editorOptions.disabled = (typeof e.row.data.Rashi !== "number");
  //   }
  // }


  setStarValue(rowData: any, value: any): void {
    this.nakshathraValue= value;
    rowData.Nakshatra = null;
    (<any>this).defaultSetCellValue(rowData, value);
  }
  setRashiValue(rowData: any,value: any): void {
    this.canEnterDateRange = true;
    document.getElementById('showError').innerHTML='';
    this.rashiValue= value;
    (<any>this).defaultSetCellValue(rowData, value);
  }
  public date: Date = new Date(Date.now());
  OnAddNew(){
    this.muhurtha.instance.addRow();
    this.canEnterDateRange = false;
  }
  GodhuliCheckBoxValueChanged(event){
    this.godhuliCheckBoxValue=event.value;
  }
  AbhijinCheckBoxValueChanged(event){
    this.abhijinCheckBoxValue=event.value;
  }
  EndTimeCheckBoxValueChanged(event){
    this.endTimeCheckBoxValue=event.value;
  }
  
  OnSubmit_click() {
    this.loadingSwitchService.loading = true;
    for(var i=0;i<this.rashiNak.length;i++){
      if(i==0){
        this.rashiNakshatras=[{Rashi:this.rashiNak[0].Rashi,
        Nakshatra:this.rashiNak[0].Nakshatra}];
      }
      else{
        this.rashiNakshatras.push({
          Rashi: this.rashiNak[i].Rashi,
          Nakshatra: this.rashiNak[i].Nakshatra
        });
      }
    }
    this.muhurthaService.systemDate = ("0" + new Date().getDate()).toString().slice(-2) + "-" + ("0" + ((new Date().getMonth()) + 1)).toString().slice(-2) + "-" + new Date().getFullYear().toString();
    var fromdate: Date = this.dateRangeForm.controls['FromDate'].value;
    var todate: Date = this.dateRangeForm.controls['ToDate'].value;
    if (fromdate instanceof Date) {
      var fromdateinString = fromdate.getFullYear().toString() + "-" + ("0" + ((fromdate.getMonth()) + 1)).toString().slice(-2) + "-" + ("0" + fromdate.getDate()).toString().slice(-2);
    }
    else {
      fromdateinString = fromdate;
    }
    if (todate instanceof Date) {
      var todateinString = todate.getFullYear().toString() + "-" + ("0" + ((todate.getMonth()) + 1)).toString().slice(-2) + "-" + ("0" + todate.getDate()).toString().slice(-2);
    }
    else {
      todateinString = todate;
    }

    this.muhurthaRequest={
      MuhurthaType:this.muhurthasvalue,
      FromDate:fromdateinString,
      ToDate:todateinString,
      TimeFormat:this.timeformatvalue,
      ReportSize:this.reportSizevalue,
      Place:this.muhurthaService.placeShort,
      LatDeg: this.muhurthaRequest.LatDeg,
      LatMt: this.muhurthaRequest.LatMt,
      LongDeg: this.muhurthaRequest.LongDeg,
      LongMt: this.muhurthaRequest.LongMt,
      NS: this.muhurthaRequest.NS,
      EW: this.muhurthaRequest.EW,
      ZH: this.muhurthaRequest.ZH,
      ZM: this.muhurthaRequest.ZM,
      PN: this.muhurthaRequest.PN,
      Godhuli:this.godhuliCheckBoxValue,
      Abhijin:this.abhijinCheckBoxValue,
      VatuDOB:this.muhurthaaForm.controls['Date'].value,
      Direction:this.yathradirectionsvalue,
      EndTime:this.endTimeCheckBoxValue,
      LangCode:this.languagevalue,
      RashiNakshatras:this.rashiNakshatras,
      PartyMastId:StorageService.GetItem('PartyMastId')
    }

    this.muhurthaService.DateinDateFormat_From=this.mindateinDateFormat_From;
    this.muhurthaService.DateinDateFormat_To=this.mindateinDateFormat_To;
    this.muhurthaService.maxdateinDateFormat=this.maxdateinDateFormat;
    this.muhurthaService.FromDateinDateFormat = fromdate;
    this.muhurthaService.ToDateinDateFormat = todate;
    this.muhurthaService.muhurthaRequest = this.muhurthaRequest;
    this.muhurthaService.timeZoneName = this.timeZoneName;
    this.muhurthaService.RashiNak= this.rashiNak;
    this.storageService.SetHoroModel(JSON.stringify(this.muhurthaRequest));
    this.muhurthaService.GetFreeData(this.muhurthaRequest).subscribe((data: any) => {
      this.muhurthaService.muhurthaResponse = data;
      this.storageService.SetHoroResponse(JSON.stringify(data));
      this.loadingSwitchService.loading = false;
      this.router.navigate(["/muhurtha/getMuhurthaFreeData"]);
    });
  }

  public onDialogOKSelected(event) {
    event.dialog.close();
  }

}
