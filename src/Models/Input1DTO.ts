export class Combosource
{
    Name:string;
    Id:string;
}

export class  MuhurthaConfig
{
    MuhurthaType:string;
    AdhikaMasa:boolean;
    Ashada:boolean; 
    IsRaviInSapthama:boolean;
    IsKujaInSapthama:boolean; 
    IncludeSouraMonth:boolean;
    IsRikthaThithi:boolean; 
    IsRahuInSapthama:boolean;
    ChandraInAnishta:boolean; 
    IsShaniInSapthama:boolean;
    Kritika:boolean; 
    VedaDosha:boolean;
    DayTimeTithiNakshatra:boolean; 
    ShalakaVedha:boolean; 
    RahuKala:boolean;
    MoudyaMuhurtha:boolean; 
    KundalaYoga:boolean;
    Pushya:boolean; 
}

export class PartymuhurthaConfig
{
    PartyMastId:string;
    Config:MuhurthaConfig[]=[];
}