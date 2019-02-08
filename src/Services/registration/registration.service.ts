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
    constructor(private loadingSwitchService:LoadingSwitchService,private httpService: HttpService, private errorService: ErrorService, public toastrService: ToastrManager) {
        // var bar = new RegisterResponse();
        // if(bar instanceof RegisterResponse){
        //     this.errorMessage = null;
        //     this.isLoading = true;
        // }
        this.registered = false;
    }
    RegisterParty(RegisterModel, callback: (data) => void) {
        var endPoint = "Party/RegisterParty";
        // this.smartHttpClient.Post(endPoint, RegisterModel).subscribe((data: any) => {
        //     let yyy = data as PartyResponse;
        //     //this.toastrService.successToastr('You Successfully registered.', 'Success!');
        //     if (data.Errors != undefined) {
        //         this.isLoading = false;
        //         this.errorMessage = data.Errors[0].ErrorString;
        //         callback(data);
        //     }
        //     else {
        //         this.errorMessage = null;
        //         this.isLoading = true;
        //         callback(data);
        //     }

        // }, (error) => {
        //     if (typeof error === 'string') {
        //         //this.toastrService.errorToastr('Registration Failed.', 'Error!');
        //         var errorMessage = {
        //             Error: error
        //         }
        //         callback(errorMessage);
        //     }

        // });

        this.httpService.Post(endPoint, RegisterModel).subscribe((data:any)=> {
            if (data.OTPType == undefined) {
                this.isLoading = false;
                this.errorMessage = data.Errors[0].ErrorString;
            }
            // else {
            //     this.errorMessage = null;
            //     this.isLoading = true;
            // }
            callback(data);
        }, (error) => {
            if (typeof error === 'string') {
                //this.toastrService.errorToastr('Registration Failed.', 'Error!');
                var errorMessage = {
                    Error: error
                }
                callback(errorMessage);
            }
            this.loadingSwitchService.loading = false;
        });
    }
}


