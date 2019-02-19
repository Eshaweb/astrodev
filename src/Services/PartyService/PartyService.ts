import { Injectable } from "@angular/core";
import { Party } from "../../Models/Party/Party";
import { LoginService } from '../login/login.service';
import { HttpService } from '../Error/http.service';
import { Observable } from 'rxjs';



@Injectable()
export class PartyService {
    party: Party;
    Token:string=null;
    constructor(private loginService:LoginService, private httpService:HttpService){
        //this.party.Token="1234";

    }

    GetProfile(PartyMastId):Observable<any>{
        var endPoint = "Party/GetProfile?PartyMastId=" + PartyMastId;
        return this.httpService.Get(endPoint);
    }

    UpdateProfile(ProfileData):Observable<any> {
        var endPoint = "Party/UpdateProfile";
        return this.httpService.Post(endPoint,ProfileData);
    }
    ChangePassword(ChangePassword):Observable<any> {
        var endPoint = "Party/ChangePassword";
        return this.httpService.Post(endPoint,ChangePassword);
    }
    ForgotPassword(ForgotPassword):Observable<any> {
        var endPoint = "Party/ForgotPassword";
        return this.httpService.Post(endPoint,ForgotPassword);
    }
    ResetOTPValidate(ResetOTPValidate):Observable<any> {
        var endPoint = "Party/ResetOTPValidate";
        return this.httpService.Post(endPoint,ResetOTPValidate);
    }
    ResetPassword(ResetPassword):Observable<any> {
        var endPoint = "Party/ResetPassword";
        return this.httpService.Post(endPoint,ResetPassword);
    }
}
