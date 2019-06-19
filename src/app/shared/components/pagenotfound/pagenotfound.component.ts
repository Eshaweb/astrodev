import { Component,OnInit } from "@angular/core";
import { Router } from '@angular/router';
@Component(
    {
        templateUrl: './pagenotfound.component.html',
        styleUrls: ['./pagenotfound.component.css']
    })
export class PageNotFoundComponent {
    constructor(public router: Router) {
        // window.location.reload();
        //this.router.navigate(["/home"]);
    }

}
