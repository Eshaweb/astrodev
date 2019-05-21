import { Injectable } from "@angular/core";
import { Party } from "../../Models/Party/Party";
import { HttpService } from '../Error/http.service';
import { Observable } from 'rxjs';
import { SelectBoxModel } from 'src/Models/SelectBoxModel';
import { LoginService } from '../LoginService/LoginService';



@Injectable()
export class PartyService {
    party: Party;
    Token:string=null;
    statesOfIndia: SelectBoxModel[];

    constructor(private loginService:LoginService, private httpService:HttpService){
        //this.party.Token="1234";
this.statesOfIndia = [
        { Id: "AP", Text: 'Andhra Pradesh' },
        { Id: "AR", Text: 'Arunachal Pradesh' },
        { Id: "AS", Text: 'Assam' },
        { Id: "BR", Text: 'Bihar' },
        { Id: "CH", Text: 'Chhattisgarh' },
        { Id: "GA", Text: 'Goa' },
        { Id: "GJ", Text: 'Gujarat' },
        { Id: "HR", Text: 'Haryana' },
        { Id: "HP", Text: 'Himachal Pradesh' },
        { Id: "JK", Text: 'Jammu & Kashmir' },
        { Id: "JH", Text: 'Jharkhand' },
        { Id: "KA", Text: 'Karnataka' },
        { Id: "KL", Text: 'Kerala' },
        { Id: "MP", Text: 'Madhya Pradesh' },
        { Id: "MH", Text: 'Maharashtra' },
        { Id: "MN", Text: 'Manipur' },
        { Id: "ML", Text: 'Meghalaya' },
        { Id: "MZ", Text: 'Mizoram' },
        { Id: "NL", Text: 'Nagaland' },
        { Id: "OD", Text: 'Odisha' },
        { Id: "PB", Text: 'Punjab' },
        { Id: "RJ", Text: 'Rajasthan' },
        { Id: "SK", Text: 'Sikkim' },
        { Id: "TN", Text: 'Tamil Nadu' },
        { Id: "TS", Text: 'Telangana' },
        { Id: "TR", Text: 'Tripura' },
        { Id: "UK", Text: 'Uttarakhand' },
        { Id: "UP", Text: 'Uttar Pradesh' },
        { Id: "WB", Text: 'West Bengal' }
      ];
    }
    IsAdmin(): Observable<any> {
        var endPoint = "Party/IsAdmin";
        return this.httpService.Get(endPoint);
    }
    GetAccessToken(RefreshToken): Observable<any> {
        var endPoint = "Party/GetAccessToken";
        return this.httpService.Post(endPoint, RefreshToken);
    }
    GetProfile(PartyMastId): Observable<any> {
        var endPoint = "Party/GetProfile?PartyMastId=" + PartyMastId;
        return this.httpService.Get(endPoint);
    }
    ExternalLogin(ExternalLogin):Observable<any> {
        var endPoint = "Party/ExternalLogin";
        return this.httpService.Post(endPoint,ExternalLogin);
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
    AddMessage(AddMessage):Observable<any> {
        var endPoint = "Contact/AddMessage";
        return this.httpService.Post(endPoint,AddMessage);
    }
    GetMessages(GetMessages):Observable<any> {
        var endPoint = "Contact/GetMessages";
        return this.httpService.Post(endPoint,GetMessages);
    }
    ResolveMessage(ResolveMessage):Observable<any> {
        var endPoint = "Contact/ResolveMessage";
        return this.httpService.Post(endPoint,ResolveMessage);
    }
    GetResolvedMessages(GetResolvedMessages):Observable<any> {
        var endPoint = "Contact/GetResolvedMessages";
        return this.httpService.Post(endPoint,GetResolvedMessages);
    }
    GetRefCode(PartyMastId){
        var endPoint = "Party/GetRefCode?PartyMastId=" + PartyMastId;
        return this.httpService.Get(endPoint);
    }
    GetContactDetails(PartyMastId){
        var endPoint = "Party/GetContactDetails?PartyMastId=" + PartyMastId;
        return this.httpService.Get(endPoint);
    }
}
