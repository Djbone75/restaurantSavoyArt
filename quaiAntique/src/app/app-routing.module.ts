import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { AdminGuard } from './auth/admin.guard ';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ReservationComponent } from './reservation/reservationUpdate/reservation.component';
import { HorairesUpdateComponent } from './horaires/horaires.update.ts/horairesUpdate.component';
import { HomeComponent } from './home/home.component';
import { updateUserComponent } from './auth/update/updateUser.component';
import { ReservationListComponent } from './reservation/reservationList/reservationList.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'reservation', component: ReservationComponent },
  { path: 'horairesUpdate', component: HorairesUpdateComponent },
  { path: 'updateUser', component: updateUserComponent },
  { path: 'reservationList', component: ReservationListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, AdminGuard],
})
export class AppRoutingModule {}
