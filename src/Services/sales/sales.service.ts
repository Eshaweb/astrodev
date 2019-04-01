import { Injectable } from "@angular/core";
import { HttpService } from '../Error/http.service';

@Injectable()
export class SalesService {

    constructor(public httpService: HttpService) {

    }
}
