

export class MatchRequest
{
    LangCode:string;
    Male:MatchModel;
    Female:MatchModel;
    


}

export class MatchModel
{

    Name:string;
    Date:string;
    Time:string;
    TimeFormat:string;
    LatDeg:number;
    LatMt:number;
    LongDeg:number;
    LongMt:number ;
    Ns:string;
    EW:string;
    ZH:number;
    ZM:number;
    PN:string;
    Gender:string;


}
export class Kuta
{

  Name:string;
  Value:string;


}
export class MatchResponse
{

   Left:Kuta[]=[];
   Right:Kuta[]=[];
Prediction:string;

}

