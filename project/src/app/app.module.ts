import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
<<<<<<< Updated upstream
import { environment } from '../environments/environment';


@NgModule({
  declarations: [],
  imports: [BrowserModule],
  bootstrap: [],
=======
import { Text2audioComponent } from './text2audio/text2audio.component';
import { AssemblyAI } from 'assemblyai';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/compat/auth/auth.module';

@NgModule({
  
  declarations: [
    AppComponent,
    Text2audioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent]

>>>>>>> Stashed changes
})
export class AppModule { }
