import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PanchangaFreeDataComponent } from './panchanga-free-data/panchanga-free-data.component';
import { PanchangaComponent } from './panchanga/panchanga.component';

const routes: Routes = [
    {
      path: '',
      component: PanchangaComponent,
    },
    {
      path: 'getPanchangaFreeData',
      component: PanchangaFreeDataComponent
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class PanchangaRoutingModule { }