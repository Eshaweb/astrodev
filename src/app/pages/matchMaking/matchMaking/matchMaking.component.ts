import { Component, OnInit, OnDestroy, ViewChildren, ElementRef, AfterViewInit, NgZone, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MatchRequest } from 'src/Models/MatchMaking/MatchRequest';
import { MaleMatchMakingRequest } from 'src/Models/MatchMaking/MaleMatchMakingRequest';
import { FemaleMatchMakingRequest } from 'src/Models/MatchMaking/FemaleMatchMakingRequest';
import { SelectBoxModel } from 'src/Models/SelectBoxModel';
import { MatchMakingService } from 'src/Services/MatchMakingService/MatchMakingService';
import { MapsAPILoader } from '@agm/core';
import { UIService } from 'src/Services/UIService/ui.service';


@Component({
    templateUrl: './matchMaking.component.html',
    styleUrls: [ './matchMaking.component.css' ]
  })
  
  export class MatchMakingComponent {
   
    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
    matchRequest: MatchRequest;
    enabletoEdit_MaleBDetails: boolean = false;
    enabletoEdit_FemaleBDetails: boolean = false;

    ngAfterViewInit(): void {
    }

    ngOnDestroy(): void {

    }

    maleMatchMakingForm: FormGroup;
    femaleMatchMakingForm: FormGroup;
    longitude: number;
    latitude: number;
    maleMatchMakingRequest: MaleMatchMakingRequest;
    femaleMatchMakingRequest: FemaleMatchMakingRequest;
    timeZoneId_Male: any;
    timeZoneName_Male: any;
    timeZoneId_Female: any;
    timeZoneName_Female: any;
    checkBoxValue_Male: boolean = false;
    checkBoxValue_Female: boolean = false;
    LatDegMessage: string;
    LatMtMessage: string;
    ngOnInit() {
        this.mapsAPILoader.load().then(() => {
            let nativeHome1InputBox = document.getElementById('txtHome2').getElementsByTagName('input')[0];
            let autocomplete1 = new google.maps.places.Autocomplete(nativeHome1InputBox, {
                types: ["address"]
            });
            console.log(autocomplete1);
            autocomplete1.addListener("place_changed", () => {
                this.ngZone.run(() => {
                    let place: google.maps.places.PlaceResult = autocomplete1.getPlace();
                    this.latitude = place.geometry.location.lat();
                    this.longitude = place.geometry.location.lng();
                    this.getTimezone_Male(this.latitude, this.longitude);
                });
            });
            let nativeHome2InputBox = document.getElementById('txtHome1').getElementsByTagName('input')[0];
            let autocomplete2 = new google.maps.places.Autocomplete(nativeHome2InputBox, {
                types: ["address"]
            });
            console.log(autocomplete2);
            autocomplete2.addListener("place_changed", () => {
                this.ngZone.run(() => {
                    let place: google.maps.places.PlaceResult = autocomplete2.getPlace();
                    this.latitude = place.geometry.location.lat();
                    this.longitude = place.geometry.location.lng();
                    this.getTimezone_Female(this.latitude, this.longitude);
                });
            });
        });
    }

    opened(e) {
        e.component
            .content()
            .getElementsByClassName("dx-box-item")[0].style.display =
            "none";
        // e.component.content().getElementsByClassName("dx-toolbar-button")[0].style.padding =
        // "25px";
        e.component.content().style.width = "320px";
    }
    maletimeformats: SelectBoxModel[] = [
        { Id: "STANDARD", Text: 'Standard Time' },
        { Id: "SUMMER", Text: 'Summer Time' },
        { Id: "DOUBLE", Text: 'Double Summer Time' },
        { Id: "WAR", Text: 'War Time' }
    ];
    femaletimeformats: SelectBoxModel[] = [
        { Id: "STANDARD", Text: 'Standard Time' },
        { Id: "SUMMER", Text: 'Summer Time' },
        { Id: "DOUBLE", Text: 'Double Summer Time' },
        { Id: "WAR", Text: 'War Time' }
    ];
    languages: SelectBoxModel[] = [
        { Id: "ENG", Text: 'English' },
        { Id: "HIN", Text: 'Hindi' },
        { Id: "KAN", Text: 'Kannada' },
        { Id: "MAL", Text: 'Malayalam' }
    ];

    selecting = false;
    selectionChange(args) {
        // if (!this.selecting) {
        //     let removed = false;
        //     for (let i = 0; i < args.newSelection.length; i++) {
        //         for (let j = 0; j < args.oldSelection.length; j++) {
        //             if (args.oldSelection[j] === args.newSelection[i]) {
        //                 args.newSelection.splice(i, 1);
        //                 removed = true;
        //             }
        //         }
        //     }

        //     if (removed) {
        //         this.selecting = true;
        //         this.combo.deselectAllItems();
        //         this.combo.selectItems(args.newSelection);
        //         this.selecting = false;
        //     }
        // }
    }
    constructor(public route: ActivatedRoute, public router: Router, public cdr: ChangeDetectorRef,
        public matchMakingService: MatchMakingService, public ngZone: NgZone, public mapsAPILoader: MapsAPILoader,
        public uiService: UIService, public formbuilder: FormBuilder) {
        this.maleMatchMakingForm = this.formbuilder.group({
            maleName: ['Shamanth', [Validators.required, Validators.minLength(4)]],
            MaleBdate: ['', [Validators.required]],
            MaleBtime: ['', [Validators.required]],
            MaleBplace: ['', [Validators.required]],
            MaleTimeformat: ['', [Validators.required]],
            //language: ['', [Validators.required]],
            latitude: [''],
            longitude: [''],
            LatDeg: ['', [Validators.min(0), Validators.max(90)]],
            LongDeg: ['', [Validators.min(0), Validators.max(180)]],
            LatMt: ['', [Validators.min(0), Validators.max(59)]],
            LongMt: ['', [Validators.min(0), Validators.max(59)]],
            NS: ['', [Validators.required, Validators.pattern("^[NS]?$")]],
            EW: ['', [Validators.required, Validators.pattern("^[EW]?$")]],
            ZH: [null, [Validators.min(0), Validators.max(13)]],
            ZM: [null, [Validators.min(0), Validators.max(45)]],
            PN: ['', [Validators.required, Validators.pattern("^[+-]?$")]]
        });
        const maleNameContrl = this.maleMatchMakingForm.get('maleName');
        maleNameContrl.valueChanges.subscribe(value => this.setErrorMessage(maleNameContrl));
        const MaleBdateContrl = this.maleMatchMakingForm.get('MaleBdate');
        MaleBdateContrl.valueChanges.subscribe(value => this.setErrorMessage(MaleBdateContrl));
        const MaleBtimeContrl = this.maleMatchMakingForm.get('MaleBtime');
        MaleBtimeContrl.valueChanges.subscribe(value => this.setErrorMessage(MaleBtimeContrl));
        const MaleBplaceContrl = this.maleMatchMakingForm.get('MaleBplace');
        MaleBplaceContrl.valueChanges.subscribe(value => this.setErrorMessage(MaleBplaceContrl));
        this.maleMatchMakingRequest = {
            Name: this.maleMatchMakingForm.controls['maleName'].value,
            Father: null,
            Mother: null,
            Gothra: null,
            Date: null,
            Time: null,
            TimeFormat: null,
            LatDeg: this.maleMatchMakingForm.controls['LatDeg'].value,
            LatMt: this.maleMatchMakingForm.controls['LatMt'].value,
            LongDeg: this.maleMatchMakingForm.controls['LongDeg'].value,
            LongMt: this.maleMatchMakingForm.controls['LongMt'].value,
            NS: this.maleMatchMakingForm.controls['NS'].value,
            EW: this.maleMatchMakingForm.controls['EW'].value,
            ZH: null,
            ZM: null,
            PN: null,
            Gender: null,
        }
        this.femaleMatchMakingForm = this.formbuilder.group({
            femaleName: ['Vaasanthi', [Validators.required, Validators.minLength(4)]],
            FemaleBdate: ['', [Validators.required]],
            FemaleBtime: ['', [Validators.required]],
            FemaleBplace: ['', [Validators.required]],
            FemaleTimeformat: ['', [Validators.required]],
            //language: ['', [Validators.required]],
            latitude: [''],
            longitude: [''],
            LatDeg: ['', [Validators.min(0), Validators.max(90)]],
            LongDeg: ['', [Validators.min(0), Validators.max(180)]],
            LatMt: ['', [Validators.min(0), Validators.max(59)]],
            LongMt: ['', [Validators.min(0), Validators.max(59)]],
            NS: ['', [Validators.required, Validators.pattern("^[NS]?$")]],
            EW: ['', [Validators.required, Validators.pattern("^[EW]?$")]],
            ZH: [null, [Validators.min(0), Validators.max(13)]],
            ZM: [null, [Validators.min(0), Validators.max(45)]],
            PN: ['', [Validators.required, Validators.pattern("^[+-]?$")]]
        });
        const femaleNameContrl = this.femaleMatchMakingForm.get('femaleName');
        femaleNameContrl.valueChanges.subscribe(value => this.setErrorMessage(femaleNameContrl));
        const FemaleBdateContrl = this.femaleMatchMakingForm.get('FemaleBdate');
        FemaleBdateContrl.valueChanges.subscribe(value => this.setErrorMessage(FemaleBdateContrl));
        const FemaleBtimeContrl = this.femaleMatchMakingForm.get('FemaleBtime');
        FemaleBtimeContrl.valueChanges.subscribe(value => this.setErrorMessage(FemaleBtimeContrl));
        const FemaleBplaceContrl = this.femaleMatchMakingForm.get('FemaleBplace');
        FemaleBplaceContrl.valueChanges.subscribe(value => this.setErrorMessage(FemaleBplaceContrl));
        // const FemaleTimeformatContrl = this.maleMatchMakingForm.get('FemaleTimeformat');
        // FemaleTimeformatContrl.valueChanges.subscribe(value => this.setErrorMessage(FemaleTimeformatContrl));
        this.femaleMatchMakingRequest = {
            Name: this.femaleMatchMakingForm.controls['femaleName'].value,
            Father: null,
            Mother: null,
            Gothra: null,
            Date: null,
            Time: null,
            TimeFormat: null,
            LatDeg: this.femaleMatchMakingForm.controls['LatDeg'].value,
            LatMt: this.femaleMatchMakingForm.controls['LatMt'].value,
            LongDeg: this.femaleMatchMakingForm.controls['LongDeg'].value,
            LongMt: this.femaleMatchMakingForm.controls['LongMt'].value,
            NS: this.femaleMatchMakingForm.controls['NS'].value,
            EW: this.femaleMatchMakingForm.controls['EW'].value,
            ZH: null,
            ZM: null,
            PN: null,
            Gender: null,
        }
        this.matchRequest = {
            LangCode: null,
            Male: {
                Name: this.maleMatchMakingForm.controls['maleName'].value,
                Date: null,
                Time: null,
                TimeFormat: null,
                LatDeg: this.maleMatchMakingForm.controls['LatDeg'].value,
                LatMt: this.maleMatchMakingForm.controls['LatMt'].value,
                LongDeg: this.maleMatchMakingForm.controls['LongDeg'].value,
                LongMt: this.maleMatchMakingForm.controls['LongMt'].value,
                NS: this.maleMatchMakingForm.controls['NS'].value,
                EW: this.maleMatchMakingForm.controls['EW'].value,
                ZH: null,
                ZM: null,
                PN: null,
                Gender: null,
            },
            Female: {
                Name: this.femaleMatchMakingForm.controls['femaleName'].value,
                Date: null,
                Time: null,
                TimeFormat: null,
                LatDeg: this.femaleMatchMakingForm.controls['LatDeg'].value,
                LatMt: this.femaleMatchMakingForm.controls['LatMt'].value,
                LongDeg: this.femaleMatchMakingForm.controls['LongDeg'].value,
                LongMt: this.femaleMatchMakingForm.controls['LongMt'].value,
                NS: this.femaleMatchMakingForm.controls['NS'].value,
                EW: this.femaleMatchMakingForm.controls['EW'].value,
                ZH: null,
                ZM: null,
                PN: null,
                Gender: null,
            }

        }
    }
    setErrorMessage(c: AbstractControl): void {
        let control = this.uiService.getControlName(c);//gives the control name property from particular service.
        document.getElementById('err_' + control).innerHTML = '';//To not display the error message, if there is no error.
        if ((c.touched || c.dirty) && c.errors) {
            document.getElementById('err_' + control).innerHTML = Object.keys(c.errors).map(key => this.validationMessages[control + '_' + key]).join(' ');
            //maps the error message from validationMessages array. 
        }
    }
    private validationMessages = { //used in above method.
        maleName_required: '*Enter Male Name',
        maleName_minlength: '*Minimum length is 4',

        femaleName_required: '*Enter Female Name',
        femaleName_minlength: '*Minimum length is 4',

        MaleBdate_required: '*Select Birth Date of Male',

        FemaleBdate_required: '*Select Birth Date of Female',

        MaleBtime_required: '*Select Birth Time',

        FemaleBtime_required: '*Select Birth Time',

        MaleBplace_required: '*Enter Birth Place',

        FemaleBplace_required: '*Enter Birth Place',
        FemaleTimeformat_required: '*Enter Time Format',
        MaleTimeformat_required: '*Enter Time Format'

    };
    getTimezone_Male(lat, long) {
        this.matchRequest.Male.LatDeg = parseInt(lat);
        this.matchRequest.Male.LongDeg = parseInt(long);
        this.matchRequest.Male.LatMt = parseInt(Math.abs((lat - this.matchRequest.Male.LatDeg) * 60).toString());
        this.matchRequest.Male.LongMt = parseInt(Math.abs((long - this.matchRequest.Male.LongDeg) * 60).toString());
        if (lat < 0) {
            this.matchRequest.Male.NS = "S";
        }
        else {
            this.matchRequest.Male.NS = "N";
        }
        if (long < 0) {
            this.matchRequest.Male.EW = "W";
        }
        else {
            this.matchRequest.Male.EW = "W";
        }
        this.matchMakingService.getTimezone(lat, long).subscribe((data: any) => setTimeout(() => {
            this.matchRequest.Male.ZH = parseInt((Math.abs(data.rawOffset) / 3600.00).toString());
            this.matchRequest.Male.ZM = parseInt((((Math.abs(data.rawOffset) / 3600.00) - this.matchRequest.Male.ZH) * 60).toString());
            if (data.rawOffset < 0) {
                this.matchRequest.Male.PN = "-";
            }
            else {
                this.matchRequest.Male.PN = "+";
            }
            this.timeZoneName_Male = data.timeZoneName;
            this.timeZoneId_Male = data.timeZoneId;
            this.cdr.detectChanges();
        }));
    }
    getTimezone_Female(lat, long) {
        this.matchRequest.Female.LatDeg = parseInt(lat);
        this.matchRequest.Female.LongDeg = parseInt(long);
        this.matchRequest.Female.LatMt = parseInt(Math.abs((lat - this.matchRequest.Female.LatDeg) * 60).toString());
        this.matchRequest.Female.LongMt = parseInt(Math.abs((long - this.matchRequest.Female.LongDeg) * 60).toString());
        if (lat < 0) {
            this.matchRequest.Female.NS = "S";
        }
        else {
            this.matchRequest.Female.NS = "N";
        }
        if (long < 0) {
            this.matchRequest.Female.EW = "W";
        }
        else {
            this.matchRequest.Female.EW = "W";
        }
        this.matchMakingService.getTimezone(lat, long).subscribe((data: any) => setTimeout(() => {
            this.matchRequest.Female.ZH = parseInt((Math.abs(data.rawOffset) / 3600.00).toString());
            this.matchRequest.Female.ZM = parseInt((((Math.abs(data.rawOffset) / 3600.00) - this.matchRequest.Female.ZH) * 60).toString());
            if (data.rawOffset < 0) {
                this.matchRequest.Female.PN = "-";
            }
            else {
                this.matchRequest.Female.PN = "+";
            }
            this.timeZoneName_Female = data.timeZoneName;
            this.timeZoneId_Female = data.timeZoneId;
            this.cdr.detectChanges();
        }));
    }
    public date: Date = new Date(Date.now());
    private monthFormatter = new Intl.DateTimeFormat("en", { month: "long" });
    public formatter = (date: Date) => {
        return `${date.getDate()} ${this.monthFormatter.format(date)}, ${date.getFullYear()}`;
    }

    OnMouseUp_Male(event) {
        if (event == null) {
            this.timeZoneName_Male = null;
        }
    }
    OnMouseUp_Female(event) {
        if (event == null) {
            this.timeZoneName_Female = null;
        }
    }
    checkBoxStateChanged_Male() {
        if (this.checkBoxValue_Male == true) {
            this.enabletoEdit_MaleBDetails = true;
            this.checkBoxValue_Male = false;
        }
        else {
            this.enabletoEdit_MaleBDetails = false;
            this.checkBoxValue_Male = true;
        }
    }
    checkBoxStateChanged_Female() {
        if (this.checkBoxValue_Female == true) {
            this.enabletoEdit_FemaleBDetails = true;
            this.checkBoxValue_Female = false;
        }
        else {
            this.enabletoEdit_FemaleBDetails = false;
            this.checkBoxValue_Female = true;
        }
    }
    Matchmaking_Click() {
        var bdate_Male: Date = this.maleMatchMakingForm.controls['MaleBdate'].value;
        var btime_Male: Date = this.maleMatchMakingForm.controls['MaleBtime'].value;
        var bdate_Female: Date = this.femaleMatchMakingForm.controls['FemaleBdate'].value;
        var btime_Female: Date = this.femaleMatchMakingForm.controls['FemaleBtime'].value;
        var dateinString_Male = bdate_Male.getFullYear().toString() + "-" + ("0" + ((bdate_Male.getMonth()) + 1)).toString().slice(-2) + "-" + ("0" + bdate_Male.getDate()).toString().slice(-2);
        var timeinString_Male = ("0" + btime_Male.getHours()).toString().slice(-2) + ":" + ("0" + btime_Male.getMinutes()).toString().slice(-2) + ":" + btime_Male.getSeconds().toString() + "0";
        var dateinStringFemale = bdate_Female.getFullYear().toString() + "-" + ("0" + ((bdate_Female.getMonth()) + 1)).toString().slice(-2) + "-" + ("0" + bdate_Female.getDate()).toString().slice(-2);
        var timeinString_Female = ("0" + btime_Female.getHours()).toString().slice(-2) + ":" + ("0" + btime_Female.getMinutes()).toString().slice(-2) + ":" + btime_Female.getSeconds().toString() + "0";
        this.matchRequest = {
            LangCode: "KAN",
            Female: {
                Date: "2015-01-03",
                Time: "05:12:30",
                LatDeg: 13,
                LatMt: 0,
                LongDeg: 75,
                LongMt: 0,
                ZH: 5,
                ZM: 30,
                NS: "N",
                EW: "E",
                PN: "+",
                Gender: "F",
                TimeFormat: "STANDARD"
            },
            Male: {
                //DOB:"2011/01/03 05:12:30 PM",
                Date: "2015-01-03",
                Time: "05:12:30",
                LatDeg: 13,
                LatMt: 0,
                LongDeg: 75,
                LongMt: 0,
                ZH: 5,
                ZM: 30,
                NS: "N",
                EW: "E",
                PN: "+",
                Gender: "M",
                TimeFormat: "STANDARD"
            }
        }
        this.matchRequest = {
            LangCode: "KAN",
            Female: {
                Date: dateinStringFemale,
                Time: timeinString_Female,
                LatDeg: this.femaleMatchMakingForm.controls['LatDeg'].value,
                LatMt: this.femaleMatchMakingForm.controls['LatMt'].value,
                LongDeg: this.femaleMatchMakingForm.controls['LongDeg'].value,
                LongMt: this.femaleMatchMakingForm.controls['LongMt'].value,
                ZH: this.femaleMatchMakingForm.controls['ZH'].value,
                ZM: this.femaleMatchMakingForm.controls['ZM'].value,
                NS: this.femaleMatchMakingForm.controls['NS'].value,
                EW: this.femaleMatchMakingForm.controls['EW'].value,
                PN: this.femaleMatchMakingForm.controls['PN'].value,
                Gender: "F",
                TimeFormat: this.femaleMatchMakingForm.controls['FemaleTimeformat'].value[0].Id
            },
            Male: {
                Date: dateinString_Male,
                Time: timeinString_Male,
                LatDeg: this.maleMatchMakingForm.controls['LatDeg'].value,
                LatMt: this.maleMatchMakingForm.controls['LatMt'].value,
                LongDeg: this.maleMatchMakingForm.controls['LongDeg'].value,
                LongMt: this.maleMatchMakingForm.controls['LongMt'].value,
                ZH: this.maleMatchMakingForm.controls['ZH'].value,
                ZM: this.maleMatchMakingForm.controls['ZM'].value,
                NS: this.maleMatchMakingForm.controls['NS'].value,
                EW: this.maleMatchMakingForm.controls['EW'].value,
                PN: this.maleMatchMakingForm.controls['PN'].value,
                Gender: "M",
                TimeFormat: this.maleMatchMakingForm.controls['MaleTimeformat'].value[0].Id
            }
        }
        
        this.matchMakingService.GetFreeData(this.matchRequest, (data) => {
            this.matchMakingService.malematchRequest = this.maleMatchMakingRequest;
            this.router.navigate(["/services/matchFree"]);
        });
    }
  }