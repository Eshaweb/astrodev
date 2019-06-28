import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BabyNamingComponent } from './babyNaming/babyNaming.component';
import { BabyNamingFreeDataComponent } from './babyNaming-free-data/babyNaming-free-data.component';


const routes: Routes = [
    {
      path: '',
      component: BabyNamingComponent,
    },
    {
      path: 'getBabyNamingFreeData',
      component: BabyNamingFreeDataComponent
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class BabyNamingRoutingModule { }