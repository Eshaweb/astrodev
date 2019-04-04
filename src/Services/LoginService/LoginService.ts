import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "../../../node_modules/@angular/common/http";
import { ErrorService } from '../Error/error.service';
import { HttpService } from '../Error/http.service';
import { Observable } from 'rxjs';
import { navigationBeforeLogin, navigationAfterLogin, } from 'src/app/app-navigation';
import { OrderHistoryResponse } from 'src/Models/OrderHistoryResponse';



@Injectable()
export class LoginService {
    oTPRef: any;
    Name: string;
    Token: any;
    PartyMastId: any;
    path: string;
    userProfileVisible: boolean;
    menuItems: any;
    isHomePage: boolean;
    serviceMenus: any;
    orderhistorypopupVisible: boolean;
    orderHistoryResponse: OrderHistoryResponse;
    serviceList: { Path: string; Name: string; }[];
    proceedDeliveryAddress: boolean;
    proceedPayment: boolean;
    AccessToken: any;
    refreshTokenNeeded: boolean;
    RefreshToken: any;
    constructor(private httpService: HttpService, private errorService: ErrorService, public http: HttpClient) {
        this.menuItems = navigationBeforeLogin;
        //this.serviceMenus=serviceMenus;
    }
    SetToken(Token: string) {
        this.AccessToken = Token;
        return "true";
    }
    
    GetToken(refreshToken: string, callback: (data) => void) {
        this.RefreshToken = refreshToken;
        // var url = this.uIHelperService.CallWebAPIUrl("/User/GetToken") + "?" + data;
        // return this.httpclient.get<Tenant>(url).pipe(tap((data: any) => {
        //     this.RefreshToken = data.RefreshToken;
        //     this.AccessToken = data.AccessToken;
        // })).catch(this.handleError);
        var RefreshToken = {
            RefreshToken: refreshToken
        }
        var endPoint = "Party/GetAccessToken";
        //let headers = new HttpHeaders();
        //headers = headers.append('No-Auth', 'True');
        //this.httpService.Post(endPoint, RefreshToken,{headers: headers}).subscribe((data: any) => {
        this.httpService.Post(endPoint, RefreshToken).subscribe((data: any) => {
        this.RefreshToken = data.RefreshToken;
            this.AccessToken = data.AccessToken;
            callback(data);
        //}, (err) => {

        });
    }
    GetOTP(GetOTP): Observable<any> {
        var endPoint = "Party/GetOTP";
        return this.httpService.Post(endPoint, GetOTP);
    }
    ValidateOTP(ValidateOTP): Observable<any> {
        var endPoint = "Party/ValidateOTP";
        return this.httpService.Post(endPoint, ValidateOTP);
    }
    ValidateUserByToken(UserToken, callback: (data) => void) {
        var endPoint = "Party/ValidateUserByToken";
        this.httpService.Post(endPoint, UserToken).subscribe((data: any) => {
            callback(data);
        });
    }
    // Login(loginModel, callback: (data) => void) {
    //     var endPoint = "Party/Login";
    //     this.httpService.Post(endPoint, loginModel).subscribe((data: any) => {
    //         this.Name = data.Name;
    //         this.Token = data.Token;
    //         this.PartyMastId = data.PartyMastId;
    //         localStorage.setItem('Name', this.Name);
    //         //this.events.publish('REFRESH_NAME');
    //         callback(data);
    //     }, (error) => {
    //         var errorMessage = {
    //             Error: error
    //         }
    //         callback(errorMessage);
    //     });
    // }

    Login(loginModel): Observable<any> {
        var endPoint = "Party/Login";
        return this.httpService.Post(endPoint, loginModel);
    }
    getPhoneNumberFromFacebookAccount() {
        //var ACCESS_TOKEN = 'AIzaSyD68pTd0CmqTXSqPHFpLrPWkiClqPBIpLQ'
        //var url = 'http://www.facebook.com/dialog/oauth?client_id=1123555431133200&&nbsp&nbsp&nbsp&nbsp redirect_uri=http://localhost:8100/#/home&scope=user_mobile_phone,user_address'
        var url = 'https://graph.facebook.com/me?access_token=ACCESS_TOKEN';
        return this.http.get(url);

    }
}


