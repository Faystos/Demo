import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from "@angular/material/core";
import { MatPaginatorModule } from '@angular/material/paginator';

import { InfoComponent } from "./components/info-component/info.component";
import { LoadUserComponent } from "./components/load-user-component/load-user.component";
import { UserListComponent } from "./components/user-list-component/user-list.component";
import { CreateUserComponent } from "./components/create-user-component/create-user.component";

import { reducer } from "./store/state/app.reducer";
import { AppEffect } from "./store/state/app.effect";
import { MatSortModule } from "@angular/material/sort";
import { UserSortService } from "./services/user.sort.service";
import { FilterUserComponent } from "./components/filter-user-component/filter-user.component";

@NgModule({
  declarations: [
    AppComponent,
    InfoComponent,
    LoadUserComponent,
    UserListComponent,
    CreateUserComponent,
    FilterUserComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        NoopAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatTableModule,
        MatCheckboxModule,
        MatDialogModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatPaginatorModule,
        StoreModule.forRoot({'app-store': reducer}),
        EffectsModule.forRoot([AppEffect]),
        MatSortModule,
    ],
  providers: [
    MatDatepickerModule,
    { provide: MAT_DATE_LOCALE, useValue: 'RU' },
    UserSortService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
