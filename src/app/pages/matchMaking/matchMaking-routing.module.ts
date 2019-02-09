import { Routes, RouterModule } from '@angular/router';
import { MatchMakingComponent } from './matchMaking/matchMaking.component';
import { MatchMakingFreeDataComponent } from './matchMaking-free-data/matchMaking-free-data.component';
import { NgModule } from '@angular/core';


const routes: Routes = [
    {
      path: '',
      component: MatchMakingComponent,
    },
    {
      path: 'getMatchMakingFreeData',
      component: MatchMakingFreeDataComponent
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class MatchMakingRoutingModule { }