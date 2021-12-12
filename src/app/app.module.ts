import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NbThemeModule, NbLayoutModule, NbCardModule,
  NbButtonModule, NbTabsetModule, NbListModule, NbDialogModule,
  NbInputModule, NbAlertModule, NbToggleModule, NbToastrModule, NbGlobalPhysicalPosition
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { AddTaskModalComponent } from './components/add-task-modal/add-task-modal.component';
import { ListItemComponent } from './components/list-item/list-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const NEBULAR_MODULES = [
  NbThemeModule.forRoot({ name: 'default' }),
  NbLayoutModule,
  NbEvaIconsModule,
  NbCardModule,
  NbButtonModule,
  NbTabsetModule,
  NbListModule,
  NbDialogModule.forRoot(),
  NbInputModule,
  NbAlertModule,
  NbToggleModule,
  NbToastrModule.forRoot({
    duration: 2000,
    position: NbGlobalPhysicalPosition.BOTTOM_LEFT,
    hasIcon: false
  })
]
@NgModule({
  declarations: [
    AppComponent,
    AddTaskModalComponent,
    ListItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ...NEBULAR_MODULES
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
