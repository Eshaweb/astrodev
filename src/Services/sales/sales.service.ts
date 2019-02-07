import { Injectable } from "@angular/core";
import { SalesResponse } from "../../Models/Sales/SalesResponse";
import { HttpService } from '../Error/http.service';





@Injectable()
export class SalesService {
    salesResponse: SalesResponse;

    constructor(public httpService: HttpService) {

    }
    Sale(SalesModel) {
        var endPoint = "sales/Sale";
        this.httpService.Post(endPoint, SalesModel).subscribe((data: any) => {
            let yyy = data as SalesResponse;
            if (yyy == null) {
                console.log("ghfg");
            }
        });
    }
}
