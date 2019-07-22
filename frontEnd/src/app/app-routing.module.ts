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
  TextDetailsComponent,
  CollectionsComponent,
  AdminPanelComponent
} from './components';
import {AuthGuard} from './_shared/Guard/auth.guard';
import {CustomerRoleGuard} from './_shared/Guard/customer-role.guard';
import {TranslatorRoleGuard} from "./_shared/Guard/translator-role.guard";
import {AdminRoleGuard} from "./_shared/Guard/admin-role.guard";

const appRoutes: Routes = [
  {path: '', component: HomeComponent, data: {state: ''}},
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: {state: 'dashboard'}
  },
  {
    path: 'new_texts',
    component: NewTextsComponent,
    canActivate: [CustomerRoleGuard],
    data: {state: 'new_texts'}
  },
  {
    path: 'admin_panel',
    component: AdminPanelComponent,
    canActivate: [AdminRoleGuard],
    data: {state: 'admin_panel'}
  },
  {
    path: 'my_translations',
    component: MyTranslationsComponent,
    canActivate: [TranslatorRoleGuard],
    data: {state: 'my_translations'}
  },
  {
    path: 'messages',
    component: MessagesComponent,
    canActivate: [AuthGuard],
    data: {state: 'messages'}
  },
  {
    path: 'customerRegistration',
    component: CustomerRegComponent,
    data: {state: 'customerRegistration'}
  },
  {
    path: 'new_translator_reg',
    component: RegNewTranslatorComponent,
    data: {state: 'new_translator_reg'}
  },
  {
    path: 'text_details/:id',
    component: TextDetailsComponent,
    canActivate: [AuthGuard],
    data: {state: 'text_details'}
  },
  {
    path: 'collections',
    component: CollectionsComponent,
    canActivate: [CustomerRoleGuard],
    data: {state: 'collections'}
  },
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
