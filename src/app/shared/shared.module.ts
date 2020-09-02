import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { HoverDirective } from '../directives/hover.directive';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { SumPipe } from '../pipes/sum.pipe';
import { RandomPipe } from '../pipes/random.pipe';

const exports = [
  CommonModule,
  ReactiveFormsModule,
  FormsModule,
  HttpClientModule,
  NgbModule,
  //firebase
  AngularFireModule,
  // AngularFirestoreModule,
  AngularFireAuthModule,
  AngularFireDatabaseModule,
  // BrowserAnimationsModule,
  // NoopAnimationsModule,
  HoverDirective,
  SumPipe,
  RandomPipe,
];

@NgModule({
  declarations: [HoverDirective, SumPipe, RandomPipe],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    //firebase
    AngularFireModule.initializeApp(environment.firebaseConfig),
    // AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    // NoopAnimationsModule,
    // BrowserAnimationsModule,
    NgxsReduxDevtoolsPluginModule.forRoot(),
  ],
  exports: exports,
  //   providers: [DataBaseService],
})
export class SharedModule {}
