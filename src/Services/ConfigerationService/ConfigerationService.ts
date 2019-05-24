import { Injectable } from '@angular/core';
import { Accordian, RadioSource, NumericRadioSource, ComboSource } from 'src/Models/inputdto2';
import { HttpService } from '../Error/http.service';
import { Observable } from 'rxjs';
import ArrayStore from 'devextreme/data/array_store';



@Injectable()
export class ConfigerationService {
    constructor(public httpService: HttpService) {

    }
    accordian: Accordian[] = [
        { id: "1", name: "Dasha Calculation Type" },
        { id: "2", name: "Dasha Start" },
        { id: "3", name: "Dasha Prediction" },

        { id: "4", name: "Ayanamsha" },
        { id: "5", name: "Astaka Varga Type" },

        { id: "6", name: "Bhava Phal" },
        { id: "7", name: "Match Making" },
        { id: "8", name: "Adhipathi Phal" },
        { id: "9", name: "Sadesathi Shani" },
        { id: "10", name: "SunRise/SunSet" },

        { id: "11", name: "Chart Type" },
        { id: "12", name: "Moudya Settings" },

    ];
    ayanamsha: RadioSource[] = [
        { id: "LH", name: "Lahari" },
        { id: "RN", name: "Raman" },
        { id: "UD", name: "User Defined" }]

    dashastart: RadioSource[] = [{ id: "SD", name: "System Date" },
    { id: "FA", name: "From Age" },


    ];
    dashatype: NumericRadioSource[] = [{ id: 365.25, name: "365.25 Days" },
    { id: 360, name: "360.00 Days" }];

    astakavarga: RadioSource[] = [{ id: "BJ", name: "Brihath Jathaka" },
    { id: "BP", name: "Brihath Parashara" }, { id: "JA", name: "Jathakaadesha" }]


    Bahvaphala: RadioSource[] = [{ id: "B", name: "Bhava Phala Based on Bhava Chakram" }, { id: "G", name: "Bhava Phala Based on Graha Chakram" }]

    Adipatathaphala: RadioSource[] = [{ id: "B", name: "Adhipathi Phala Based on Bhava Chakram" }, { id: "G", name: "Adhipathi Phala Based on Graha Chakram" }]
    sunriseset: NumericRadioSource[] = [{ id: 1, name: "Center" }, { id: 2, name: "Upper Limb" }]
    sunrisesetdata = new ArrayStore({
        data: this.sunriseset,
        key: "id"
      });
    charttypesource: ComboSource[] = [
        { id: "N", name: "North" },
        { id: "E", name: "East" },
        { id: "S", name: "South" },
    ]
    charttypedata = new ArrayStore({
        data: this.charttypesource,
        key: "Id"
      });
    UpdateMuhurthaConfig(partymuhurthaconfig):Observable<any> {
        var endPoint = "PartyConfig/UpdateMuhurthaConfig";
        return this.httpService.Post(endPoint, partymuhurthaconfig);
    }
    
    GetMuhurthaList():Observable<any>{
        var endPoint = "Muhurtha/GetMuhurthaList";
        return this.httpService.Get(endPoint);
    }

    GetMuhurthaconfig(PartyMastId):Observable<any> {
        var endPoint = "PartyConfig/GetMuhurthaconfig?PartyMastId=" + PartyMastId;
        return this.httpService.Get(endPoint);
    }

    GetGeneralconfig(PartyMastId):Observable<any> {
        var endPoint = "PartyConfig/GetGeneralconfig?PartyMastId=" + PartyMastId;
        return this.httpService.Get(endPoint);
    }
    
    UpdateGeneralconfig(partyGeneralConfig):Observable<any> {
        var endPoint = "PartyConfig/UpdateGeneralconfig";
        return this.httpService.Post(endPoint, partyGeneralConfig);
    }
   
    GetDefaultconfig():Observable<any>{
        var endPoint = "PartyConfig/GetDefaultconfig";
        return this.httpService.Get(endPoint);
    }
   
}
