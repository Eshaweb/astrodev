import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PanchapakshiFreeDataComponent } from './panchapakshi-free-data/panchapakshi-free-data.component';
import { PanchaPakshiComponent } from './panchapakshi/panchapakshi.component';


const routes: Routes = [
    {
      path: '',
      component: PanchaPakshiComponent,
    },
    {
      path: 'getPanchabakshiFreeData',
      component: PanchapakshiFreeDataComponent
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class PanchapakshiRoutingModule { }