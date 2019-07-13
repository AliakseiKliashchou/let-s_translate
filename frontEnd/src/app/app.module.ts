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
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {TableModule} from 'angular-bootstrap-md';
import {ProgressbarModule} from 'ngx-bootstrap/progressbar';
import {MatBadgeModule} from '@angular/material/badge';
import {MatListModule} from '@angular/material/list';
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
  LanguagesComponent,
  TextDetailsComponent,
  CollectionsComponent,
  LngCheckboxesComponent
} from './components';
import {DropzoneDirective} from './_shared/directive/dropzone.directive';
import {AuthService} from './_shared/service/users/auth.service';
import {OrderService} from './_shared/service/order/order.service';
import {MessagesService} from './_shared/service/messages/messages.service';
import { CollectionsService } from './_shared/service/collections/collections.service';
import {TokenInterceptor} from './_shared/token.interceptor';
import {IConfig, NgxMaskModule} from 'ngx-mask';

export let options: Partial<IConfig> | (() => Partial<IConfig>);

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
    TextDetailsComponent,
    CollectionsComponent,
    LngCheckboxesComponent,

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
    MatAutocompleteModule,
    TableModule,
    ProgressbarModule.forRoot(),
    NgxMaskModule.forRoot(options),
    MatBadgeModule,
    MatListModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    AuthService,
    OrderService,
    MessagesService,
    CollectionsService],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {
}
