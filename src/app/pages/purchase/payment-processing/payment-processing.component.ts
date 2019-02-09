import { Component, OnInit, OnDestroy } from '@angular/core';
import { HoroScopeService } from 'src/Services/HoroScopeService/HoroScopeService';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { interval } from 'rxjs';
import { LoadingSwitchService } from 'src/Services/LoadingSwitchService/LoadingSwitchService';

@Component({
  selector: 'app-payment-processing',
  templateUrl: './payment-processing.component.html',
  styleUrls: ['./payment-processing.component.scss']
})
export class PaymentProcessingComponent implements OnInit, OnDestroy {
  ShowMessage: string;
  enableDownload: boolean;
  enableRefresh: boolean;
  buttonName: string;
  buttonId: any;
  loading: boolean;
  sub: any;
  showSuccess: boolean;

  constructor(private loadingSwitchService:LoadingSwitchService,public location: Location,public router: Router, public horoScopeService: HoroScopeService) {
    this.enableDownload = true;
    // if (this.horoScopeService.resultResponse.Refresh == true) {
    //   this.enableRefresh = true;
    //   this.enableDownload = false;
    //   this.buttonName = 'Click Refresh';
    // }
    // else {
    //   this.enableRefresh = false;
    //   this.enableDownload = true;
    //   this.buttonName = this.horoScopeService.resultResponse.AstroReportId[0];
    // }
  }
  Refresh_Click() {
    this.loading = true;
    //this.loadingSwitchService.loading=true;
    
  }
  ngOnInit() {
    this.loading = true;
    //this.loadingSwitchService.loading=true;
    this.horoScopeService.CheckForResult(this.horoScopeService.OrderId).subscribe((data) => {
      if (data.AstroReportId.length != 0) {
        this.enableRefresh = false;
        this.enableDownload = true;
        this.buttonName = data.AstroReportId[0].split('_')[1];
        this.buttonId = data.AstroReportId[0].split('_')[0];
        this.horoScopeService.DownloadResult(this.buttonId, (data) => {
          var newBlob = new Blob([data], { type: "application/pdf" });
          const fileName: string = 'FullHoroscope.pdf';
          const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;
          var url = window.URL.createObjectURL(newBlob);
          a.href = url;
          a.download = fileName;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          this.loading = false;
          //this.loadingSwitchService.loading=false;
          this.showSuccess=true;
          this.clearParameters();
        });
      }
      else {
        this.enableRefresh = true;
        this.enableDownload = false;
        this.buttonName = 'Click Refresh';
        this.sub=interval(10000).subscribe((val) =>{
          this.horoScopeService.CheckForResult(this.horoScopeService.OrderId).subscribe((data) => {
            if (data.AstroReportId.length != 0) {
              this.enableRefresh = false;
              this.enableDownload = true;
              this.buttonName = data.AstroReportId[0].split('_')[1];
              this.buttonId = data.AstroReportId[0].split('_')[0];
              this.horoScopeService.DownloadResult(this.buttonId, (data) => {
                var newBlob = new Blob([data], { type: "application/pdf" });
                const fileName: string = 'FullHoroscope.pdf';
                const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;
                var url = window.URL.createObjectURL(newBlob);
                a.href = url;
                a.download = fileName;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                this.loading = false;
                //this.loadingSwitchService.loading=false;
                this.showSuccess=true;
                this.clearParameters();
                this.sub.unsubscribe();
              });
            }
            else {
              this.enableRefresh = true;
              this.enableDownload = false;
              this.buttonName = 'Click Refresh';
            }
          });
        });
       
      }
    });
    this.horoScopeService.horoRequest =null;
  }
  public onDialogOKSelected(event) {
    event.dialog.close();
  }
  ngOnDestroy(): void {
    // window.location.pathname='/home';
    // Object.defineProperty(window.location, 'href', {
    //   writable: true,
    //   value: '/home'
    // });
  //   window.onpopstate= function(event) {
  //     history.pushState(null, null, '/home');
  //  }
  // this.router.events.filter(event => event instanceof NavigationEnd)
  // .subscribe(event => {
  //   if (event instanceof NavigationEnd) {        
      
  //   };
  // });
    //window.history.replaceState(null, null, '/home');
    this.router.navigate(['/home'], { replaceUrl: true });
    //window.history.go(-4);
    location.pathname = '/home';
    location.reload(true);
    //this.router.navigate(['/home']);
    //window.history.forward();
  }
  clearParameters(){
    this.horoScopeService.birthplace='';
    this.horoScopeService.OrderId=null;
  }
  Download_Click() {
    this.loading = true;
    //this.loadingSwitchService.loading=true;
    this.horoScopeService.DownloadResult(this.buttonId, (data) => {
      var newBlob = new Blob([data], { type: "application/pdf" });
      const fileName: string = 'FullHoroscope.pdf';
      const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;
      var url = window.URL.createObjectURL(newBlob);
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      this.loading = false;
      //this.loadingSwitchService.loading=false;
    });  
  }
}
