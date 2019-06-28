import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent,
  DashboardComponent, 
  NewTextsComponent,
  MyTranslationsComponent,
  MessagesComponent,
  CustomerRegComponent} from './components/index';

const appRoutes: Routes = [
  {path:'',component: HomeComponent, data: {state: ''}}, 
  {path:'dashboard',component: DashboardComponent, data: {state: 'dashboard'}}, 
  {path:'new_texts',component: NewTextsComponent, data: {state: 'new_texts'}}, 
  {path:'my_translations',component: MyTranslationsComponent, data: {state: 'my_translations'}}, 
  {path:'messages',component: MessagesComponent, data: {state: 'messages'}}, 
  {path:'customer_reg',component: CustomerRegComponent, data: {state: 'customer_reg'}}, 

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
