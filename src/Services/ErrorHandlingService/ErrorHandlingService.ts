//import { ToastrService } from "ngx-toastr";
import { Injectable } from "@angular/core";



@Injectable()
export class ErrorHandlingService {
    constructor() {

    }
    ErrorHandler(controls, ErrorProperties) {
        for (const property in ErrorProperties) {
            for (const name in controls) {
                if (name == property) {
                    ErrorProperties[property].forEach((value: string) => {
                        document.getElementById('err_' + property).innerHTML = value;           
                    });
                }
            }
        }
    }
}