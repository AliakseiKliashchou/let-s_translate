import {BrowserModule} from '@angular/platform-browser';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatIconModule} from '@angular/material';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDividerModule} from '@angular/material/divider';
import {ModalModule, TooltipModule, PopoverModule, ButtonsModule} from 'angular-bootstrap-md';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IconsModule} from 'angular-bootstrap-md';
import {MatTabsModule} from '@angular/material/tabs';
import {InputsModule, InputUtilitiesModule, WavesModule} from 'angular-bootstrap-md';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {AngularFireModule} from 'angularfire2';
import * as firebase from 'firebase/app';
import {environment} from '../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {HttpClientModule} from '@angular/common/http';
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {
  HeaderComponent,
  HomeComponent,
  FooterComponent,
  DashboardComponent,
  NewTextsComponent,
  MyTranslationsComponent,
  MessagesComponent,
  CustomerRegComponent,
  RegNewTranslatorComponent,
  UploadTaskComponent,
  LanguagesComponent
} from './components';
import {DropzoneDirective} from './_shared/directive/dropzone.directive';
import {AuthService} from './_shared/service/users/auth.service';
import { OrderService } from './_shared/service/order/order.service';

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
    RegNewTranslatorComponent,
    DropzoneDirective,
    UploadTaskComponent,
    LanguagesComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
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
    MatIconModule,
    MatSelectModule,
    MatSidenavModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    MatSnackBarModule,
    HttpClientModule,
    MatChipsModule,
    MatAutocompleteModule
  ],
  providers: [AuthService, OrderService],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {
}
