import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppComponent } from './app.component';
import { ReservationComponent } from './reservation/reservationUpdate/reservation.component';
import { HeaderComponent } from './header/header.component';
import { HorairesComponent } from './horaires/horairesList/horaires.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { HorairesUpdateComponent } from './horaires/horairesUpdate/horairesUpdate.component';
import { HomeComponent } from './home/home.component';
import { updateUserComponent } from './auth/update/updateUser.component';
import { ReservationListComponent } from './reservation/reservationList/reservationList.component';
import { GalleryUpdateComponent } from './gallery/galleryUpdate/galleryUpdate.component';
import { GalleryListComponent } from './gallery/galleryList/galleryList.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HorairesComponent,
    LoginComponent,
    SignupComponent,
    ReservationComponent,
    HorairesUpdateComponent,
    HomeComponent,
    updateUserComponent,
    ReservationListComponent,
    GalleryUpdateComponent,
    GalleryListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    HttpClientModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    MatSelectModule,
    MatListModule,
    MatBadgeModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatPaginatorModule,
    MatTableModule,
    MatSnackBarModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
