import { BrowserModule } from '@angular/platform-browser';
import {
  NgModule,
  PLATFORM_INITIALIZER,
  APP_INITIALIZER,
  APP_BOOTSTRAP_LISTENER,
  InjectionToken,
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
import { HttpClientModule } from '@angular/common/http';
import { timer } from 'rxjs';
import { DataBaseService } from './service/database.service';
import { Product } from './model/product.model';
import { Router } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import {
  NoopAnimationsModule,
  BrowserAnimationsModule,
} from '@angular/platform-browser/animations';
function platformInitialized() {
  console.log('PLATFORM_INITIALIZER', arguments, [].slice.call(arguments));
  return () => {};
}

@NgModule({
  declarations: [AppComponent, NotfoundComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
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
