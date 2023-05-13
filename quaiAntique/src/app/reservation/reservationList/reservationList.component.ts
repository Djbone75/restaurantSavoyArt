import { Component, OnInit } from '@angular/core';
import { reservationService } from '../reservation.service';
import { reservation } from 'src/models/reservation.model';
import { Subscription } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';
@Component({
  selector: 'app-reservationList',
  templateUrl: './reservationList.component.html',
  styleUrls: ['./reservationList.component.scss'],
})
export class ReservationListComponent implements OnInit {
  reservationList?: reservation[];
  reservationListAM?: reservation[];
  reservationListPM?: reservation[];
  reservationListToday: reservation[] = [];
  accumulUserAM: number = 0;
  accumulUserPM: number = 0;
  today: Date = new Date();
  dataSource = this.reservationListToday;
  columnsToDisplay: string[] = [
    'username',
    'day',
    'hour',
    'totalGuests',
    'allergies',
  ];
  private reservationListSub?: Subscription;
  constructor(public reservationService: reservationService) {
    this.reservationService.getReservation().subscribe(({ reservations }) => {
      this.reservationList = reservations;

      this.reservationListToday = this.reservationList?.filter((data) => {
        return new Date(data.day) >= new Date();
      });

      this.reservationListAM = this.reservationList?.filter((data) => {
        return new Date(data.hour).getHours() < 15;
      });
      this.reservationListPM = this.reservationList?.filter((data) => {
        return new Date(data.hour).getHours() > 15;
      });

      this.accumulUserPM = this.reservationListPM

        ?.map((reservation) => {
          return reservation.totalGuests;
        })
        .reduce((sum, curr) => {
          return (sum += curr);
        });
      this.accumulUserAM = this.reservationListAM

        ?.map((reservation) => {
          return reservation.totalGuests;
        })
        .reduce((sum, curr) => {
          return (sum += curr);
        });
    });
  }
  ngOnInit() {
    this.reservationListSub = this.reservationService
      .getReservationSub()
      .subscribe((reservations: reservation[]) => {
        this.reservationList = reservations;
      });
  }
}
