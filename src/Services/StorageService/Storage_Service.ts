import { Injectable } from '@angular/core';
import { HoroResponse } from 'src/Models/HoroScope/HoroResponse';
import { HoroRequest } from 'src/Models/HoroScope/HoroRequest';

@Injectable()
export class StorageService {
    constructor() {

    }
    static SetItem(param1, param2: any) {

        sessionStorage.setItem(param1, param2);
    }
    static GetItem(param) {

        return sessionStorage.getItem(param);

    }
    static RemoveItem(param) {

        sessionStorage.removeItem(param);
    }

    SetHoroModel(param) {
        localStorage.setItem("HoroModel", param);
    }
    SetHoroResponse(param) {
        localStorage.setItem("HoroResponse", param);
    }
    GetHoroRequest(): HoroRequest {
        return JSON.parse(localStorage.getItem("HoroModel")) as HoroRequest;
    }
    GetHoroResponse(): HoroResponse {
        return JSON.parse(localStorage.getItem("HoroResponse")) as HoroResponse;
    }
}