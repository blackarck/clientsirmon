import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { LoginscrComponent } from './loginscr/loginscr.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent, DialogOverviewExampleDialog } from './profile/profile.component';
import { ClientsnapComponent } from './clientsnap/clientsnap.component';
import { AdmindashComponent } from './admindash/admindash.component';
import { ClientdtlComponent } from './clientdtl/clientdtl.component';
import { UserdtlComponent } from './userdtl/userdtl.component';
import {Ceditdialog } from './clientdtl/ceditdialog'
import {Clientadd } from './clientdtl/clientadd'
import {Userdialog} from './userdtl/userdialog';
import {Useradd} from './userdtl/useradd';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { NgxLoadingModule } from 'ngx-loading';
import { ReviewpassComponent } from './reviewpass/reviewpass.component';
import { PwdrstsuccessComponent } from './pwdrstsuccess/pwdrstsuccess.component';


const appRoutes: Routes = [
  { path: 'loginscr', component: LoginscrComponent },
  { path: 'reviewpass', component: ReviewpassComponent },
  { path: 'pwdreset', component: PwdrstsuccessComponent },
  { path: 'dashboard', component: DashboardComponent, 
  children:[
    {path: 'home', component: ClientsnapComponent},
    {path: 'profile', component : ProfileComponent},
    {path: 'admin', component : AdmindashComponent ,
    children:[
      {path: 'clientdtl', component: ClientdtlComponent},
      {path: 'userdtl', component: UserdtlComponent},
    ]},
  //  { path: '', redirectTo: '/dashboard/home', pathMatch:'full'}
  ]},
  { path: '', redirectTo: '/loginscr', pathMatch: 'full'  }
];

@NgModule({
  declarations: [ 
    AppComponent,
    LoginscrComponent,
    DashboardComponent,
    ProfileComponent,
    ClientsnapComponent,
    AdmindashComponent,
    DialogOverviewExampleDialog,
    Ceditdialog,
    Clientadd,
    Userdialog,
    Useradd,
    ClientdtlComponent,
    UserdtlComponent,
    ReviewpassComponent,
    PwdrstsuccessComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    Ng4LoadingSpinnerModule.forRoot(),
    NgxLoadingModule.forRoot({}),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  exports:[
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  entryComponents: [
    DialogOverviewExampleDialog,
    Ceditdialog,
    Userdialog,
    Useradd,
    Clientadd,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
