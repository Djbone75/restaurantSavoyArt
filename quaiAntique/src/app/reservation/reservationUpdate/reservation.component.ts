import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { reservationService } from '..//reservation.service';
import { reservationUser } from 'src/models/reservationUser.model';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { allergies } from 'src/models/allergies.array';
import { user } from 'src/models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss'],
})
export class ReservationComponent implements OnInit, OnDestroy {
  constructor(
    private reservationService: reservationService,
    private authService: AuthService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.today = new Date();
    this.twoWeeks = new Date();
    this.twoWeeks.setDate(this.twoWeeks.getDate() + 14);
    this.reservationService.getReservationUser().subscribe((data) => {
      this.reservations = data.reservations;
    });
  }
  private reservationSub?: Subscription;
  private userSub?: Subscription;
  hour: number = 0;
  today: Date;
  twoWeeks: Date;
  currentUser = this.authService.getUser();
  reservations: Array<reservationUser> = [];
  @ViewChild('f', { static: false }) reservationForm?: NgForm;
  newDate?: Date;
  customDate: Date = new Date();
  customReservationAM: number = 20;
  customReservationPM: number = 20;
  theForm?: NgForm;
  totalGuests: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  hours: number[] = [11, 12, 13, 18, 19, 20, 21];
  minutes: number[] = [0, 15, 30, 45];
  date?: Date = new Date();

  onChange(customDate: Date) {
    let reservAM = this.reservations
      .filter((data) => {
        return new Date(data.day).getDate() === customDate.getDate();
      })
      .filter((customdates) => {
        return new Date(customdates.hour).getHours() <= 15;
      });

    if (reservAM.length > 0) {
      this.customReservationAM =
        20 -
        reservAM
          .map((customReservation) => {
            return customReservation.totalGuests;
          })
          .reduce((sum, curr) => {
            return (sum += curr);
          });
    } else {
      this.customReservationAM = 20;
    }
    let reservPM = this.reservations
      .filter((data) => {
        return new Date(data.day).getDate() === customDate.getDate();
      })
      .filter((customdates) => {
        return new Date(customdates.hour).getHours() >= 15;
      });
    if (reservPM.length > 0) {
      this.customReservationPM =
        20 -
        this.reservations
          .filter((data) => {
            return new Date(data.day).getDate() === customDate.getDate();
          })
          .filter((customdates) => {
            return new Date(customdates.hour).getHours() >= 15;
          })
          .map((customReservation) => {
            return customReservation.totalGuests;
          })
          .reduce((sum, curr) => {
            return (sum += curr);
          });
    } else {
      this.customReservationPM = 20;
    }

    this.date = customDate;
  }
  ngOnInit() {
    this.reservationSub = this.reservationService
      .getReservationUpdateSub()
      .subscribe((reservations: reservationUser[]) => {
        this.reservations = reservations;
      });
    this.userSub = this.authService.getUserListener().subscribe((user) => {
      this.currentUser = user;
    });
    this.reservationForm?.enabled == false;
  }
  ngOnDestroy() {
    this.reservationSub?.unsubscribe();
  }
  onSubmit(form: NgForm) {
    const newReservation = form.value;
    newReservation.hour = new Date(
      2022,
      1,
      1,
      form.value.hour,
      form.value.minute
    );
    if (this.currentUser) {
      this.reservationService.postReservation(newReservation);
      this.snackBar.open('reservation effectuée', '', { duration: 1000 });
      this.dialog.closeAll();
    } else {
      if (newReservation.allergies == null) {
        newReservation.allergies = undefined;
      }
      this.reservationService.postUserReservation(newReservation);
      this.snackBar.open('reservation effectuée', '', { duration: 1000 });
      this.dialog.closeAll();
    }
  }

  allergies: string[] = allergies;
}
