import { Component, OnInit, ViewChildren } from '@angular/core';
import { ServiceInfo, HoroScopeService } from 'src/Services/HoroScopeService/HoroScopeService';
import { HoroRequest } from 'src/Models/HoroScope/HoroRequest';
import { ActivatedRoute, Router } from '@angular/router';
import { Platform } from '@angular/cdk/platform';
import { Location } from "@angular/common";
import { HoroResponse } from 'src/Models/HoroScope/HoroResponse';
import { CaptionDbService } from 'src/Services/CaptionService/captionDb.service';
import { Caption } from 'src/Models/Caption';

@Component({
  selector: 'app-panchapakshi-free-data',
  templateUrl: './panchapakshi-free-data.component.html',
  styleUrls: ['./panchapakshi-free-data.component.scss']
})
export class PanchapakshiFreeDataComponent implements OnInit {
  
  ngOnInit(): void {
    
  }
  constructor(public captionDbService:CaptionDbService, 
    public _location: Location, public route: ActivatedRoute, public router: Router, 
    public platform: Platform, public horoScopeService: HoroScopeService) {
    
    
  }

  ngAfterViewInit(): void {

  }

  ngOnDestroy(): void {

  }

}
