import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ShraddhaMaasikaComponent } from './shraddhaMaasika/shraddhaMaasika.component';
import { ShraddhaMaasikaFreeDataComponent } from './shraddhaMaasika-free-data/shraddhaMaasika-free-data.component';


const routes: Routes = [
    {
      path: '',
      component: ShraddhaMaasikaComponent,
    },
    {
      path: 'getShraddhaMaasikaFreeData',
      component: ShraddhaMaasikaFreeDataComponent
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ShraddhaMaasikaRoutingModule { }