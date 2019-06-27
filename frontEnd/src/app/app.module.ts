import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatIconModule} from '@angular/material';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDividerModule} from '@angular/material/divider';
import { FooterComponent } from './components/footer/footer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NewTextsComponent } from './components/new-texts/new-texts.component';
import { MyTranslationsComponent } from './components/my-translations/my-translations.component';
import { MessagesComponent } from './components/messages/messages.component';
import { ModalModule, TooltipModule, PopoverModule, ButtonsModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconsModule } from 'angular-bootstrap-md';
import {MatTabsModule} from '@angular/material/tabs';
import { InputsModule, InputUtilitiesModule, WavesModule } from 'angular-bootstrap-md';
import { CustomerRegComponent } from './components/customer-reg/customer-reg.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';


const appRoutes: Routes = [
  {path:'',component: HomeComponent, data: {state: ''}}, 
  {path:'dashboard',component: DashboardComponent, data: {state: 'dashboard'}}, 
  {path:'new_texts',component: NewTextsComponent, data: {state: 'new_texts'}}, 
  {path:'my_translations',component: MyTranslationsComponent, data: {state: 'my_translations'}}, 
  {path:'messages',component: MessagesComponent, data: {state: 'messages'}}, 
  {path:'customer_reg',component: CustomerRegComponent, data: {state: 'customer_reg'}}, 


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
    CustomerRegComponent,
   
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
    ModalModule, 
    TooltipModule, 
    PopoverModule,
    ButtonsModule, 
    FormsModule, 
    ReactiveFormsModule,
    IconsModule,
    MatTabsModule,
    InputsModule, 
    InputUtilitiesModule, 
    WavesModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule   
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
