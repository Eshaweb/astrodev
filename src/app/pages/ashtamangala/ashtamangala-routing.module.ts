import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AshtamangalaFreeDataComponent } from './ashtamangala-free-data/ashtamangala-free-data.component';
import { AshtamangalaComponent } from './ashtamangala/ashtamangala.component';

const routes: Routes = [
    {
      path: '',
      component: AshtamangalaComponent,
    },
    {
      path: 'getAshtamangalaFreeData',
      component: AshtamangalaFreeDataComponent
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class AshtamangalaRoutingModule { }