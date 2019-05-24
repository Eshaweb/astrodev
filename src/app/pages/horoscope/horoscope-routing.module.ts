import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HoroscopeComponent } from '../horoscope/horoscope/horoscope.component';
import { HoroscopeFreeDataComponent } from './horoscope-free-data/horoscope-free-data.component';

const routes: Routes = [
    {
      path: '',
      component: HoroscopeComponent,
    },
    {
      path: 'getHoroscopeFreeData',
      component: HoroscopeFreeDataComponent
    }
  ];
  
  @NgModule({
     imports: [RouterModule.forChild(routes)],
    //imports: [RouterModule.forChild(routesnew)],
    exports: [RouterModule]
  })
  export class HoroscopeRoutingModule { }