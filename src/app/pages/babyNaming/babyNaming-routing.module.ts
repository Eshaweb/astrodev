import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BabyNamingComponent } from './babyNaming/babyNaming.component';


const routes: Routes = [
    {
      path: '',
      component: BabyNamingComponent,
    },
    // {
    //   path: 'getNumerologyFreeData',
    //   component: NumerologyFreeDataComponent
    // }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class BabyNamingRoutingModule { }