import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { MapComponent } from './map/map.component';
import { GptComponentComponent } from './gpt-component/gpt-component.component';

import { FIREBASE_OPTIONS, AngularFireModule } from '@angular/fire/compat';
import { Text2audioComponent } from './text2audio/text2audio.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  
  declarations: [
    AppComponent,
    Text2audioComponent,
    GptComponentComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [{ provide: FIREBASE_OPTIONS, useValue: environment.firebase }, GptComponentComponent],
  bootstrap: [AppComponent]

})

export class AppModule { }