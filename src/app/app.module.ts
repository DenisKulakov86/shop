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
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotfoundComponent } from './notfound.component';
import { environment } from 'src/environments/environment';

import { SharedModule } from './shared/shared.module';
import {
  NoopAnimationsModule,
  BrowserAnimationsModule,
} from '@angular/platform-browser/animations';
import { ProductsState } from './store/state/products.state';
import { FollowState } from './store/state/follow.state';
function platformInitialized() {
  console.log('PLATFORM_INITIALIZER', arguments, [].slice.apply(arguments));
  return () => {};
}

@NgModule({
  declarations: [AppComponent, NotfoundComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    NgxsReduxDevtoolsPluginModule.forRoot(),

    NgxsModule.forRoot([ProductsState, FollowState], {
      developmentMode: !environment.production,
      selectorOptions: {
        suppressErrors: false,
        injectContainerState: false,
      },
    }),

    NgxsStoragePluginModule.forRoot({ key: [ProductsState, FollowState] }),
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
