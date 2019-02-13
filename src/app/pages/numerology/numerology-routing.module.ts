import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HoroscopeComponent } from '../horoscope/horoscope/horoscope.component';
import { NumerologyFreeDataComponent } from './numerology-free-data/numerology-free-data.component';
import { NumerologyComponent } from './numerology/numerology.component';


const routes: Routes = [
    {
      path: '',
      component: NumerologyComponent,
    },
    {
      path: 'getNumerologyFreeData',
      component: NumerologyFreeDataComponent
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class NumerologyRoutingModule { }