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
  {path: '', component: HomeComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'new_texts', component: NewTextsComponent, canActivate: [AuthGuard]},
  {path: 'my_translations', component: MyTranslationsComponent, canActivate: [AuthGuard]},
  {path: 'messages', component: MessagesComponent, canActivate: [AuthGuard]},
  {path: 'customerRegistration', component: CustomerRegComponent},
  {path: 'new_translator_reg', component: RegNewTranslatorComponent},
  {path: 'text_details/:id', component: TextDetailsComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
