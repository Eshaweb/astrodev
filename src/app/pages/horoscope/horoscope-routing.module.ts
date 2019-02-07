import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HoroscopeComponent } from '../horoscope/horoscope/horoscope.component';


const routes: Routes = [
    {
      path: '',
      component: HoroscopeComponent,
    },
    // {
    //   path: 'getFreeData',
    //   component: FreeDataComponent
    // }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class HoroscopeRoutingModule { }