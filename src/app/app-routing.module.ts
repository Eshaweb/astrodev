import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './shared/components';
import { AuthGuardService } from './shared/services';
import { HomeComponent } from './pages/home/home.component';
import { DxDataGridModule, DxFormModule, DxValidatorModule, DxButtonModule, DxValidationSummaryModule, DxDateBoxModule, DxSelectBoxModule, DxCheckBoxModule, DxTextBoxModule, DxRadioGroupModule } from 'devextreme-angular';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastrModule } from 'ng6-toastr-notifications';
import { AgmCoreModule } from '@agm/core';
import { NgxLoadingModule } from 'ngx-loading';
import { HoroscopeComponent } from './pages/horoscope/horoscope/horoscope.component';
import { FreeDataComponent } from './pages/horoscope/free-data/free-data.component';
//import { EventsModule } from 'angular4-events';

const routes: Routes = [
  {
    path: 'horoscope',
    //component: HoroscopeComponent,
    loadChildren: './pages/./horoscope/horoscope.module#HoroscopeModule'
  },
  
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'login-form',
    component: LoginFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: '**',
    redirectTo: 'home',
    canActivate: [ AuthGuardService ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), 
    NgxLoadingModule.forRoot({}),
    //EventsModule.forRoot(),
    ToastrModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC0nx6AjTNNb24ZEnah5hRBqL0ehgrZ3es',
      libraries: ['places']
    }),
    ReactiveFormsModule,
    FormsModule,
    DxDataGridModule, DxFormModule,
    DxValidatorModule,DxButtonModule,DxValidationSummaryModule,
    DxDateBoxModule,DxSelectBoxModule,DxCheckBoxModule,
    DxTextBoxModule, DxRadioGroupModule, 
  ],  
  providers: [AuthGuardService],
  exports: [RouterModule],
  declarations: [HomeComponent,  
   // HoroscopeComponent,
    //FreeDataComponent

  ]
})
export class AppRoutingModule { }
