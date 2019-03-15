export class Accordian
{
    id:string;
    name:string;
}

export class ComboSource
{
    id:string;
    name:string;
}
export class RadioSource
{
    id:string;
    name:string;
}
export class NumericRadioSource
{
    id:Number;
    name:string;
}


export class Config
{
    AyanaType:string;
    UserAyanaValue:number;
    SunSetting:number;
    AVType:string;
    YearValue:number;
    DashaStartValue:number;
    DashaEndValue:number;

    DashaStartType:string;
    AdhiPhal:string;
    BhavaPhal:string;
    IsKalatraReqd:boolean;
    isSadesathiReqd:boolean;
    PredStDt:number;
    PredEndDt:number;

    Mchandra:number;
    MKuja:number;
    MBudha:number;
    MGuru:number;
    Mshukra:number;
    MShani:number;
    ChartType:string;



   AyanaDeg :number;
   AyanaMt:number;
   AyanaSec:number;

  

}
export class PartyGeneralConfig
{
    PartyMastId:string;
    Config:Config;
}