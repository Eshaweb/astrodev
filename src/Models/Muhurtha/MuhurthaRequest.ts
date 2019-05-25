export class MuhurthaRequest{
    MuhurthaType:string;
    FromDate:string;
    ToDate:string;
    TimeFormat:string;
    Place:string;
    LatDeg:number;
    LatMt: number;
    LongDeg: number;
    LongMt: number;
    ZH: number;
    ZM: number;
    NS: string;
    EW: string;
    PN: string;
    Godhuli:boolean;
    Abhijin:boolean;
    VatuDOB:Date;
    Direction:string;
    EndTime:boolean;
    LangCode:string;
    ReportSize:string;
    RashiNakshatras:RashiNak[];
    PartyMastId:string;
  }
  export class RashiNak{
    Rashi:string;
    Nakshatra:string;
    OfWhome?:string;
    Id?:string;
  }