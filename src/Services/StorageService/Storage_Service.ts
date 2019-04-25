import { Injectable } from '@angular/core';
import { HoroResponse } from 'src/Models/HoroScope/HoroResponse';
import { HoroRequest } from 'src/Models/HoroScope/HoroRequest';
import { PrashnaFreeModel } from 'src/Models/Astamangala/prashnaFreeModel';
import { MatchResponse } from 'src/Models/MatchMaking/match';
import { MatchRequest } from 'src/Models/MatchMaking/MatchRequest';
import { NumerologyResponse } from 'src/Models/Numerology/numerologyResponse';
import { NumerologyRequest } from 'src/Models/Numerology/numerologyRequest';
import { PanchangaRequest } from 'src/Models/Panchanga/PanchangaRequest';
import { MuhurthaRequest } from 'src/Models/Muhurtha/MuhurthaRequest';
import { MuhurthaResponse } from 'src/Models/Muhurtha/MuhurthaResponse';
import { OrderResponse } from 'src/Models/OrderResponse';

@Injectable()
export class StorageService {
    constructor() {

    }
    static SetItem(param1, param2: any) {

        sessionStorage.setItem(param1, param2);
    }
    static GetItem(param):any {

        return sessionStorage.getItem(param);

    }
    static RemoveItem(param) {

        sessionStorage.removeItem(param);
    }

    SetHoroModel(param) {
        sessionStorage.setItem("HoroModel", param);
    }
    SetHoroResponse(param) {
        sessionStorage.setItem("HoroResponse", param);
    }
    SetOrderResponse(param) {
        sessionStorage.setItem("OrderResponse", param);
    }
    SetItemOrdered(param) {
        sessionStorage.setItem("ItemOrdered", param);
    }
    GetHoroRequest(ItActId): any {
        switch (ItActId) {
            case '#SH':
                return JSON.parse(sessionStorage.getItem("HoroModel")) as HoroRequest;
                break;
            case '#SA':
                return JSON.parse(sessionStorage.getItem("HoroModel")) as HoroRequest;
                break;
            case '#SM':
                return JSON.parse(sessionStorage.getItem("HoroModel")) as MatchRequest;
                break;
            case '#NM':
                return JSON.parse(sessionStorage.getItem("HoroModel")) as NumerologyRequest;
                break;
            case '#MU':
                return JSON.parse(sessionStorage.getItem("HoroModel")) as MuhurthaRequest;
                break;
            case '#PA':
                return JSON.parse(sessionStorage.getItem("HoroModel")) as PanchangaRequest;
                break;
            default:
                break;
        }
    }
    GetHoroResponse(ItActId): any {
        switch (ItActId) {
            case '#SH':
                return JSON.parse(sessionStorage.getItem("HoroResponse")) as HoroResponse;
                break;
            case '#SA':
                return JSON.parse(sessionStorage.getItem("HoroResponse")) as PrashnaFreeModel;
                break;
            case '#SM':
                return JSON.parse(sessionStorage.getItem("HoroResponse")) as MatchResponse;
                break;
            case '#NM':
                return JSON.parse(sessionStorage.getItem("HoroResponse")) as NumerologyResponse;
                break;
            case '#MU':
                return JSON.parse(sessionStorage.getItem("HoroResponse")) as MuhurthaResponse;
                break;
            case '#PA':
                return JSON.parse(sessionStorage.getItem("HoroResponse"));
                break;
            default:
                break;
        }

    }
    GetOrderResponse(): OrderResponse {
        return JSON.parse(sessionStorage.getItem("OrderResponse")) as OrderResponse;
    }
    GetItemOrdered(): any {
        return JSON.parse(sessionStorage.getItem("ItemOrdered"));
    }

    RemoveDataFromSession(){
        sessionStorage.removeItem('HoroModel');
        sessionStorage.removeItem('HoroResponse');
        sessionStorage.removeItem('OrderResponse');
        sessionStorage.removeItem('ItemOrdered');
        sessionStorage.removeItem('OrderId');
        sessionStorage.removeItem('ItActId');
        sessionStorage.removeItem('IsDeliverable');
        sessionStorage.removeItem('ItMastId');
        sessionStorage.removeItem('refreshToken');
        sessionStorage.removeItem('isAdmin');
    }

    // RemoveParticularDataFromSession(){
    //     sessionStorage.removeItem('OrderResponse');
    //     sessionStorage.removeItem('ItemOrdered');
    //     sessionStorage.removeItem('OrderId');
    //     sessionStorage.removeItem('ItActId');
    //     sessionStorage.removeItem('IsDeliverable');
    //     sessionStorage.removeItem('ItMastId');
    // }
}