
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from 'src/shared/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StudentService } from './services/student.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ModalConfirmComponent } from 'src/shared/modal-confirm/modal-confirm.component';

@NgModule({
  declarations: [
    AppComponent,
	ModalConfirmComponent
  ],
  imports: [
    BrowserModule,
	ReactiveFormsModule,
    AppRoutingModule,
	BrowserAnimationsModule,
	HttpClientModule,
	MaterialModule
  ],
  providers: [StudentService, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
