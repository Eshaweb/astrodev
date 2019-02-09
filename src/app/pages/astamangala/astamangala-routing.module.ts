import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AstamangalaComponent } from './astamangala/astamangala.component';
import { AstamangalaFreeDataComponent } from './astamangala-free-data/astamangala-free-data.component';

const routes: Routes = [
    {
      path: '',
      component: AstamangalaComponent,
    },
    {
      path: 'getAstamangalaFreeData',
      component: AstamangalaFreeDataComponent
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class AstamangalaRoutingModule { }