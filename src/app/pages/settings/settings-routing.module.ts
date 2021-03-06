import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SettingsComponent } from './settings/settings.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { GeneralConfigComponent } from './generalConfig/generalConfig.component';
import { MuhurthaConfigComponent } from './muhurthaConfig/muhurthaConfig.component';
import { WalletStatementComponent } from './wallet-statement/wallet-statement.component';
import { AuthGuard } from 'src/Services/auth/auth.guard';

const routes: Routes = [
    {
      path: '',
      component: SettingsComponent, canActivate: [AuthGuard]
    },
    {
      path: 'orderHistory',
      component:OrderHistoryComponent
    },
    {
      path: 'changePassword',
      component:ChangePasswordComponent
    },
    {
      path: 'forgotPassword',
      component:ForgotPasswordComponent
    },
    {
      path: 'generalConfig',
      component:GeneralConfigComponent
    },
    {
      path: 'muhurthaConfig',
      component:MuhurthaConfigComponent
    },
    {
      path: 'walletStatement',
      component:WalletStatementComponent
    },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class SettingsRoutingModule { }