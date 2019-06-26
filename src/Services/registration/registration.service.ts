import { Injectable } from "@angular/core";
import { PartyResponse } from "../../Models/Party/PartyResponse";
import { ToastrManager } from 'ng6-toastr-notifications';
import { HttpService } from '../Error/http.service';
import { ErrorService } from '../Error/error.service';
import { LoadingSwitchService } from '../LoadingSwitchService/LoadingSwitchService';
import { RegisterModel } from 'src/Models/Register';

export class RegisterResponse{
    IsValid: boolean;
    OTPType: string;
}

@Injectable()
export class RegistrationService {
    errorMessage: any;
    isLoading: boolean;
    registerModel:RegisterModel;
    registered: boolean;
    UserName: any;
    constructor(private loadingSwitchService:LoadingSwitchService,private httpService: HttpService, private errorService: ErrorService, public toastrService: ToastrManager) {
        this.registered = false;
    }
    RegisterParty(RegisterModel, callback: (data) => void) {
        var endPoint = "Party/RegisterParty";
        this.httpService.Post(endPoint, RegisterModel).subscribe((data:any)=> {
            if (data.OTPType == undefined) {
                this.isLoading = false;
                this.errorMessage = data.Errors[0].ErrorString;
            }
            callback(data);
        }, (error) => {
            if (typeof error === 'string') {
                //this.toastrService.errorToastr('Registration Failed.', 'Error!');
                var errorMessage = {
                    Error: error
                }
                callback(errorMessage);
            }
            callback(error);
            this.loadingSwitchService.loading = false;
        });
    }

    ValidateUserByOTP(UserOTP) {
        var endPoint = "Party/ValidateUserByOTP";
        return this.httpService.Post(endPoint, UserOTP);
    }
    ResendUserOTP(UserName) {
        var endPoint = "Party/ResendUserOTP";
        return this.httpService.Post(endPoint, UserName);
    }
}


