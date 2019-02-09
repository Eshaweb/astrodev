import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DepositWalletComponent } from './deposit-wallet/deposit-wallet.component';


const routes: Routes = [
    {
      path: 'depoToWallet',
      component: DepositWalletComponent,
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class WalletRoutingModule { }