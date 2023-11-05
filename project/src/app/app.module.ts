import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { Text2audioComponent } from './text2audio/text2audio.component';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';


@NgModule({
  
  declarations: [
    AppComponent,
    Text2audioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [{ provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig }],
  bootstrap: [AppComponent]

})

export class AppModule { }
