import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SettingsComponent } from './settings/settings.component';
import { OrderHistoryComponent } from './order-history/order-history.component';

const routes: Routes = [
    {
      path: '',
      component: SettingsComponent,
    },
    {
      path: 'orderHistory',
      component:OrderHistoryComponent
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class SettingsRoutingModule { }