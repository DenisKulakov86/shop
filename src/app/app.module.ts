import { BrowserModule } from '@angular/platform-browser';
import {
  NgModule,
  PLATFORM_INITIALIZER,
  APP_INITIALIZER,
  APP_BOOTSTRAP_LISTENER,
  InjectionToken,
} from '@angular/core';

import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotfoundComponent } from './notfound.component';
import { environment } from 'src/environments/environment';

import { SharedModule } from './shared/shared.module';
import {
  NoopAnimationsModule,
  BrowserAnimationsModule,
} from '@angular/platform-browser/animations';
import { EntitiesState } from './store/state/entities.state';
import { ProductsState } from './store/state/products.state';
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
   

    NgxsModule.forRoot([ProductsState], {
      developmentMode: !environment.production,
      selectorOptions: {
        suppressErrors: false,
        injectContainerState: false,
      },
    }),
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
