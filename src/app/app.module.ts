import { BrowserModule } from '@angular/platform-browser';
import {
  NgModule,
  PLATFORM_INITIALIZER,
  APP_INITIALIZER,
  APP_BOOTSTRAP_LISTENER,
} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotfoundComponent } from './notfound.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

function platformInitialized() {
  console.log('PLATFORM_INITIALIZER', arguments);
  return () => {};
}
@NgModule({
  declarations: [AppComponent, NotfoundComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    //firebase
    AngularFireModule.initializeApp(environment.firebaseConfig),
    // AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,

    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: platformInitialized,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
