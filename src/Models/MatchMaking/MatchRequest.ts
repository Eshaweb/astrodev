export class MatchRequest {
    LangCode: string;
    UserOrSystem: string;
    ReportSize:string;
    Male: MatchDTO;
    Female: MatchDTO;
}
export class MatchDTO {
    Name: string;
    Date: string;
    Time: string;
    //Date:Date;
    //Time:Date;
    TimeFormat: string;
    LatDeg: number;
    LatMt: number;
    LongDeg: number;
    LongMt: number;
    NS: string;
    EW: string;
    ZH: number;
    ZM: number;
    PN: string;
    Gender: string;
}