import { Injectable } from '@angular/core';

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
    
}