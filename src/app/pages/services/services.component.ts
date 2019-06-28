import { Component, NgModule, OnInit } from '@angular/core';
import { Router, Routes, RouterModule } from '@angular/router';
import { StorageService } from 'src/Services/StorageService/Storage_Service';
import { LoginService } from 'src/Services/LoginService/LoginService';
import { CommonModule } from '@angular/common';
import { DxButtonModule, DxCheckBoxModule, DxTextBoxModule, DxValidatorModule, DxValidationGroupModule, DxPopupModule, DxLoadPanelModule } from 'devextreme-angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthService } from 'angularx-social-login';
import { WalletService } from 'src/Services/Wallet/WalletService';

@Component({
  templateUrl: 'services.component.html',
  styleUrls: [ './services.component.scss' ]
})

export class ServicesComponent implements OnInit{
  walletBalanceAmount: any;
  items: { Id: number; Text: string; }[];
  defaultVisible: boolean;
  servicesMenu: any;
  contentFullHoroscope: boolean;
  contentFullAstamangala: boolean;
  contentFullMatchMaking: boolean;
  contentFullMuhurtha: boolean;
  contentFullPanchanga: boolean;
  contentFullNumerology: boolean;
  contentFullHanumanJyothisha: boolean;
  contentFullWallet: boolean;
  constructor(public walletService:WalletService, public loginService:LoginService,public router: Router) {
    this.defaultVisible = false;
    // history.pushState(null, null, location.href);
    // window.onpopstate = function () {       
    //   if (window.location.pathname == '/services') { 
    //     history.go(1);
    //   }
    // };
    this.servicesMenu=[{Path:'/ashtamangala',Name:'Ashtamangala'},
    {Path:'/horoscope',Name:'Horoscope'},
    {Path:'/matchMaking',Name:'Mela Meli'},
    {Path:'/muhurtha',Name:'Muhurtha'},
    {Path:'/panchanga',Name:'Panchanga'},
    {Path:'/numerology',Name:'Numerology'},
    {Path:'/wallet/depoToWallet',Name:'Wallet'}];  
  }
//   toggleDefault() {
//     this.defaultVisible = !this.defaultVisible;
// }
ngOnInit() {
  if (StorageService.GetItem('PartyMastId')!= undefined) {
    this.walletService.GetWalletBalance(StorageService.GetItem('PartyMastId')).subscribe((data) => {
      if (data.Errors == undefined) {
        //IsValid: true 
        this.walletBalanceAmount = data;
      }
    });
  }
}
onServiceClick(event){
  if (event.itemData.Path=="/wallet/depoToWallet"&&StorageService.GetItem('Token') != undefined) {
    this.router.navigate(['/wallet/depoToWallet']);
  }
  else if (event.itemData.Path=="/wallet/depoToWallet"&&StorageService.GetItem('Token') == undefined) {
    this.loginService.path = '/wallet/depoToWallet';
    this.router.navigate(['/login-form']);
  }
  else{
    this.router.navigate([event.itemData.Path]);
  }
}
  OnHoroScope_Click() {
    this.router.navigate(["/horoscope"]);
  }
  OnMatchMaking_Click() {
    this.router.navigate(["/matchMaking"]);
  }
  OnAstamangala_Click() {
    this.router.navigate(["/ashtamangala"]);
  }
  OnNumerology_Click() {
    this.router.navigate(["/numerology"]);
  }
  OnBabyNaming_Click() {
    this.router.navigate(["/babyNaming"]);
  }
  OnPrathamartava_Click(){
    this.router.navigate(["/prathamartava"]);
  }
  OnPanchanga_Click() {
    this.router.navigate(["/panchanga"]);
  }
  OnMuhurtha_Click(){
    this.router.navigate(["/muhurtha"]);
  }
  OnPanchaPakshi_Click(){
    this.router.navigate(["/panchapakshi"]);
  }
  OnComingSoon_Click(){
    this.router.navigate(["/staticpages/comingsoon"]);
  }
  OnWalletDeposit_Click(){
    if (StorageService.GetItem('refreshToken') != undefined) {
      this.router.navigate(['/wallet/depoToWallet']);
    }
    else {
      this.loginService.path = '/wallet/depoToWallet';
      this.router.navigate(['/login-form']);
    }
  }

  
}


const routes: Routes = [
  {
    path: '',
    component: ServicesComponent,
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
 exports: [RouterModule]
})
export class ServicesRoutingModule { }
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DxButtonModule,
    DxCheckBoxModule,
    DxTextBoxModule,
    DxValidatorModule,
    DxValidationGroupModule,
    DxPopupModule,
    ReactiveFormsModule, ServicesRoutingModule,
    FormsModule, DxLoadPanelModule
  ],
  providers: [AuthService],
  declarations: [ServicesComponent]
})
export class ServicesModule { }
