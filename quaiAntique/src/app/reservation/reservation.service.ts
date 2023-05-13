import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { reservation } from 'src/models/reservation.model';
import { reservationUser } from 'src/models/reservationUser.model';
import { AuthService } from '../auth/auth.service';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class reservationService {
  currentUser = this.authService.getUser();
  private reservationUpdate = new Subject<reservationUser[]>();
  private reservationList = new Subject<reservation[]>();
  constructor(private http: HttpClient, private authService: AuthService) {}

  getReservationUpdateSub() {
    return this.reservationUpdate.asObservable();
  }

  getReservationUser() {
    return this.http.get<{ reservations: reservationUser[] }>(
      environment.apiUrl + '/reservations/user/'
    );
  }
  getReservationSub() {
    return this.reservationList.asObservable();
  }

  getReservation() {
    return this.http.get<{ reservations: reservation[] }>(
      environment.apiUrl + '/reservations/'
    );
  }

  postUserReservation(reservation: reservation) {
    this.http
      .post<reservation>(
        environment.apiUrl + '/reservations/notregistered',
        reservation
      )
      .subscribe((response) => {
        console.log('reservation effectuée : ', response);
      });
  }
  postReservation(reservation: reservation) {
    this.http
      .post<reservation>(environment.apiUrl + '/reservations/', reservation)
      .subscribe((response) => {
        console.log('reservation effectuée : ', response);
      });
  }
}
