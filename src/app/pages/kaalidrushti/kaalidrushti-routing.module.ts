import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { KaalidrushtiComponent } from './kaalidrushti/kaalidrushti.component';
import { KaalidrushtiFreeDataComponent } from './kaalidrushti-free-data/kaalidrushti-free-data.component';


const routes: Routes = [
    {
      path: '',
      component: KaalidrushtiComponent,
    },
    {
      path: 'getKaalidrushtiFreeData',
      component: KaalidrushtiFreeDataComponent
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class KaalidrushtiRoutingModule { }