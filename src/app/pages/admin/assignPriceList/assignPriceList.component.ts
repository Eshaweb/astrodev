import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from 'src/Services/ItemService/ItemService';
import { LoadingSwitchService } from 'src/Services/LoadingSwitchService/LoadingSwitchService';



@Component({
    templateUrl: 'assignPriceList.component.html',
    styleUrls: [ './assignPriceList.component.scss' ]
  })
  
  export class AssignPriceListComponent {
    constructor(public itemService:ItemService, public loadingSwitchService:LoadingSwitchService) {
       
    }
    
  }