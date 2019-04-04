import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "../../../node_modules/@angular/common/http";
import { ErrorService } from '../Error/error.service';
import { HttpService } from '../Error/http.service';
import { Observable } from 'rxjs';
import { navigationBeforeLogin, navigationAfterLogin, } from 'src/app/app-navigation';
import { OrderHistoryResponse } from 'src/Models/OrderHistoryResponse';
import { tap } from 'rxjs/operators';
import { StorageService } from '../StorageService/Storage_Service';



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
    
    refreshToken(): Observable<any> {
        /*
            The call that goes in here will use the existing refresh token to call
            a method on the oAuth server (usually called refreshToken) to get a new
            authorization token for the API calls.
        */

        var RefreshToken = {
            RefreshToken: StorageService.GetItem('refreshToken')
        }
        // Just to keep HttpClient from getting tree shaken.
        return this.http.post('https://astroliteapi.azurewebsites.net/api/Party/GetAccessToken', RefreshToken).pipe(tap(res => {
            this.AccessToken = res.AccessToken;
            StorageService.SetItem('refreshToken', res.RefreshToken)
        }));
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


