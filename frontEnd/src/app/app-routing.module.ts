import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {
  HomeComponent,
  DashboardComponent,
  NewTextsComponent,
  MyTranslationsComponent,
  MessagesComponent,
  CustomerRegComponent,
  RegNewTranslatorComponent,
  TextDetailsComponent
} from './components';
import {AuthGuard} from './_shared/Guard/auth.guard';

const appRoutes: Routes = [
  {path: '', component: HomeComponent, data: {state: ''}},
  {path: 'dashboard', component: DashboardComponent, data: {state: 'dashboard'}, canActivate: [AuthGuard]},
  {path: 'new_texts', component: NewTextsComponent, data: {state: 'new_texts'}, canActivate: [AuthGuard]},
  {path: 'my_translations', component: MyTranslationsComponent, data: {state: 'my_translations'}, canActivate: [AuthGuard]},
  {path: 'messages', component: MessagesComponent, data: {state: 'messages'}, canActivate: [AuthGuard]},
  {path: 'customerRegistration', component: CustomerRegComponent, data: {state: 'customerRegistration'}},
  {path: 'new_translator_reg', component: RegNewTranslatorComponent, data: {state: 'new_translator_reg'}},
  {path: 'text_details/:id', component: TextDetailsComponent, data: {state: 'text_details'}}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
