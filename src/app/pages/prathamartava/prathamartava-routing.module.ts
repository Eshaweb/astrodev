import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PrathamartavaComponent } from './prathamartava/prathamartava.component';
import { PrathamartavaFreeDataComponent } from './prathamartava-free-data/prathamartava-free-data.component';


const routes: Routes = [
    {
      path: '',
      component: PrathamartavaComponent,
    },
    {
      path: 'getPrathamartavaFreeData',
      component: PrathamartavaFreeDataComponent
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class PrathamartavaRoutingModule { }