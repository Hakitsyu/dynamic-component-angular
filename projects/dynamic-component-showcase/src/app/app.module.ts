import { DynamicComponentModule } from './../../../dynamic-component/src/lib/dynamic-component.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DynamicComponentModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
