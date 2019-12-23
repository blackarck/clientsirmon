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
import { ProfileComponent } from './profile/profile.component';
import { ClientsnapComponent } from './clientsnap/clientsnap.component';


const appRoutes: Routes = [
  { path: 'loginscr', component: LoginscrComponent },
  { path: 'dashboard', component: DashboardComponent , 
  children:[
    {path: 'home', component: ClientsnapComponent},
    {path: 'profile', component : ProfileComponent},
    { path: '', redirectTo: '/dashboard/home', pathMatch:'full'}
  ]},
  { path: '', redirectTo: '/loginscr', pathMatch: 'full'  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginscrComponent,
    DashboardComponent,
    ProfileComponent,
    ClientsnapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
