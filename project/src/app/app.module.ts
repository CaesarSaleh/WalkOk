import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { TextanalysisComponent } from './textanalysis/textanalysis.component';



@NgModule({
  declarations: [AppComponent, TextanalysisComponent],
  imports: [
    TextanalysisComponent,
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  bootstrap: [AppComponent]

})
export class AppModule {}

