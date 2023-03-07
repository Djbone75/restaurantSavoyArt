import { Component, OnInit } from '@angular/core';
import { reservationService } from '../reservation.service';
import { reservation } from 'src/models/reservation.model';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-reservationList',
  templateUrl: './reservationList.component.html',
  styleUrls: ['./reservationList.component.scss'],
})
export class ReservationListComponent implements OnInit {
  reservationList?: reservation[];
  reservationListAM?: reservation[];
  reservationListPM?: reservation[];

  accumulUserAM: number = 0;
  accumulUserPM: number = 0;

  private reservationListSub?: Subscription;
  constructor(public reservationService: reservationService) {
    this.reservationService.getReservation().subscribe(({ reservations }) => {
      this.reservationList = reservations;
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
