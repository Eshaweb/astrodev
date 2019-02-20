import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SettingsComponent } from './settings/settings.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Routes = [
    {
      path: '',
      component: SettingsComponent,
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
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class SettingsRoutingModule { }