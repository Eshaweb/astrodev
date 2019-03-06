import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MuhurthaFreeDataComponent } from './muhurtha-free-data/muhurtha-free-data.component';
import { MuhurthaComponent } from './muhurtha/muhurtha.component';

const routes: Routes = [
    {
      path: '',
      component: MuhurthaComponent,
    },
    {
      path: 'getPanchangaFreeData',
      component: MuhurthaFreeDataComponent
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class MuhurthaRoutingModule { }