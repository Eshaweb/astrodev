import { Component } from '@angular/core';
import { CaptionDbService } from 'src/Services/CaptionService/captionDb.service';
import { Router } from '@angular/router';
import { ItemService } from 'src/Services/ItemService/ItemService';
import { PanchangaService } from 'src/Services/PanchangaService/PanchangaService';
import { StorageService } from 'src/Services/StorageService/Storage_Service';
import { LoginService } from 'src/Services/LoginService/LoginService';
import { BabyNamingRequest } from 'src/Models/BabyNaming/BabyNamingRequest';
import { BabyNamingResponse } from 'src/Models/BabyNaming/BabyNamingResponse';
import { HoroScopeService } from 'src/Services/HoroScopeService/HoroScopeService';
import { LoadingSwitchService } from 'src/Services/LoadingSwitchService/LoadingSwitchService';
import { OrderService } from 'src/Services/OrderService/OrderService';
import { interval, Observable, timer, Subscription } from 'rxjs';


@Component({
  selector: 'app-babyNaming-free-data',
  templateUrl: './babyNaming-free-data.component.html',
  styleUrls: ['./babyNaming-free-data.component.scss']
})

export class BabyNamingFreeDataComponent {
  babyNamingRequest: BabyNamingRequest;
  babyNamingResponse: any[];
  slideshowDelay = 2000;
  isMobileResolution: boolean;
  direction: string;
  secondPreference: BabyNamingResponse[];
  firstPreference: BabyNamingResponse[];
  ItName: string;
  buttonId: string;
  subscribe: Subscription;
  sub: Subscription;
  timeExceeded: boolean = false;
  showSuccess: boolean;
  
  constructor(public storageService: StorageService, private itemService: ItemService, public router: Router, public loginService: LoginService,
    public captionDbService: CaptionDbService, public panchangaService: PanchangaService, public horoScopeService:HoroScopeService,
    public loadingSwitchService:LoadingSwitchService, public orderService:OrderService) {
    this.babyNamingResponse = this.storageService.GetHoroResponse('#BN');
    for (var i = 0; i < this.babyNamingResponse.length; i++) {
      if (this.babyNamingResponse[i].Pref == 2) {
        if(this.secondPreference==undefined){
          this.secondPreference=[{Name:this.babyNamingResponse[i].Name,Meaning:this.babyNamingResponse[i].Meaning,Pref:this.babyNamingResponse[i].Pref}];
        }
        else{
          this.secondPreference.push(this.babyNamingResponse[i]);
        }
      }
      else if (this.babyNamingResponse[i].Pref == 1) {
        if(this.firstPreference==undefined){
          this.firstPreference=[{Name:this.babyNamingResponse[i].Name,Meaning:this.babyNamingResponse[i].Meaning,Pref:this.babyNamingResponse[i].Pref}];
        }
        else{
          this.firstPreference.push(this.babyNamingResponse[i]);
        }
      }
    }
  }

  ngOnInit(): void {
    this.babyNamingRequest = this.storageService.GetHoroRequest('#BN');
    if (window.innerWidth < 768) {
      this.isMobileResolution = true;
      this.direction = "vertical";
    } else {
      this.isMobileResolution = false;
      this.direction = "horizontal";
    }
    this.itemService.ItActId = '#BN';
    StorageService.SetItem('ItActId', '#BN');
    this.itemService.DownloadButtonVisible = true;
    //this.itemService.ItemName = 'Baby Naming';
  }

  ngAfterViewInit(): void {
    if(this.itemService.DownloadClickedOnce==true){
      this.loadingSwitchService.loading=true;
      this.itemService.DownloadClickedOnce=false;
      var FreeReport = {
        OrderId:null,
        PartyMastId:StorageService.GetItem('PartyMastId'),
        JSONData:JSON.stringify(this.storageService.GetHoroRequest('#BN')),
        ItActId:StorageService.GetItem('ItActId'),
        ItMastId:"#BNF"
      }
      this.orderService.OrderFreeReport(FreeReport).subscribe((data: any) => {
        var OrderId = data.OrderId;
        this.orderService.CheckForResult(data.OrderId).subscribe((data) => {
          if (data.AstroReportId.length != 0) {
            this.buttonId = data.AstroReportId[0].split('_')[0];
            this.ItName=data.AstroReportId[0].split('_')[1];
            this.DownloadResult(this.buttonId);
          }
          else {
            const source = timer(1000, 1000);
            this.subscribe = source.subscribe(val => {
              if (val == 30) {
                //this.loadPanel.visible = false;
                this.loadingSwitchService.loading= false;
                this.sub.unsubscribe();
                this.subscribe.unsubscribe();
                this.timeExceeded = true;
              }
            });
            this.sub = interval(10000).subscribe((val) => {
              // this.orderService.CheckForResult(this.orderService.orderResponse.OrderId).subscribe((data) => {
              this.orderService.CheckForResult(OrderId).subscribe((data) => {
                if (data.AstroReportId.length != 0) {
                  this.buttonId = data.AstroReportId[0].split('_')[0];
                  this.ItName=data.AstroReportId[0].split('_')[1];
                  this.DownloadResult(this.buttonId);
                }
              });
            });
          }
        });
      });
    }
  }

  DownloadResult(buttonId) {
    this.horoScopeService.DownloadResult(buttonId).subscribe((data:any)=> {
      var newBlob = new Blob([data], { type: "application/pdf" });
      const fileName: string = this.ItName + '.pdf';
      const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;
      var url = window.URL.createObjectURL(newBlob);
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      this.showSuccess = true;
      this.loadingSwitchService.loading= false;
      this.sub.unsubscribe();
      this.subscribe.unsubscribe();
      console.clear();
    });
  }

  ngOnDestroy(): void {
    this.itemService.DownloadButtonVisible = false;
    if (StorageService.GetItem('refreshToken') != undefined) {
    this.storageService.RemoveDataFromSession();
    }
  }
}
