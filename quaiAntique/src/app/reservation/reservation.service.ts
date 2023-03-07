import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { reservation } from 'src/models/reservation.model';
import { reservationUser } from 'src/models/reservationUser.model';
import { AuthService } from '../auth/auth.service';
import { Subject } from 'rxjs';
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
      'http://localhost:3000/reservations/user/'
    );
  }
  getReservationSub() {
    return this.reservationList.asObservable();
  }

  getReservation() {
    return this.http.get<{ reservations: reservation[] }>(
      'http://localhost:3000/reservations/'
    );
  }

  postUserReservation(reservation: reservation) {
    this.http
      .post<reservation>(
        'http://localhost:3000/reservations/notregistered',
        reservation
      )
      .subscribe((response) => {
        console.log('reservation effectuée : ', response);
      });
  }
  postReservation(reservation: reservation) {
    this.http
      .post<reservation>('http://localhost:3000/reservations/', reservation)
      .subscribe((response) => {
        console.log('reservation effectuée : ', response);
      });
  }
}
