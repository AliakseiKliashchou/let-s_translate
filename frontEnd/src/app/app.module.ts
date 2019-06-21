import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDividerModule} from '@angular/material/divider';
import { FooterComponent } from './components/footer/footer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NewTextsComponent } from './components/new-texts/new-texts.component';
import { MyTranslationsComponent } from './components/my-translations/my-translations.component';
import { MessagesComponent } from './components/messages/messages.component';




const appRoutes: Routes = [
  {path:'',component: HomeComponent}, 
  {path:'dashboard',component: DashboardComponent}, 
  {path:'new_texts',component: NewTextsComponent}, 
  {path:'my_translations',component: MyTranslationsComponent}, 
  {path:'messages',component: MessagesComponent}, 


];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    DashboardComponent,
    NewTextsComponent,
    MyTranslationsComponent,
    MessagesComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    MatButtonModule, 
    MatCheckboxModule,
    MatGridListModule,
    MatDividerModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
