import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
    constructor() {

    }
    static SetItem(param1, param2: any) {

        localStorage.setItem(param1, param2);
    }
    static GetItem(param) {

        return localStorage.getItem(param);

    }
    static RemoveItem(param) {

        localStorage.removeItem(param);
    }
    
}