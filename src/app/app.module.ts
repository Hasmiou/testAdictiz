import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdzHomeComponent } from './components/adz-home/adz-home.component';
import { AdzBooksService } from './services/adz-books.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AdzResultComponent } from './components/adz-result/adz-result.component';
import { AdzHeaderComponent } from './components/adz-header/adz-header.component';

const appRoutes: Routes = [
  { path: 'home', component: AdzHomeComponent },
  { path: 'result/:s', component: AdzResultComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  declarations: [
    AppComponent,
    AdzHomeComponent,
    AdzResultComponent,
    AdzHeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    AdzBooksService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
