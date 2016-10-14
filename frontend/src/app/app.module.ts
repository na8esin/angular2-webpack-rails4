
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppComponent } from './app.component';
import { HighlightDirective } from './highlight/highlight.directive';

import { AstronautComponent } from       './mission/astronaut.Component';
import { MissionControlComponent } from  './mission/mission.Control.Component';

import { ModalComponent } from './modal2/modal.component';
import { ModalControlComponent } from           './modal2/modal.control.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  declarations: [
    AppComponent,
    HighlightDirective,
    AstronautComponent,
    MissionControlComponent,
    ModalComponent,
    ModalControlComponent
    
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
