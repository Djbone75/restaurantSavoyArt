import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { schedule } from 'src/models/schedule.model';
import { scheduleService } from '../scheduleService';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-horairesUpdate',
  templateUrl: './horairesUpdate.component.html',
  styleUrls: ['./horairesUpdate.component.scss'],
})
export class HorairesUpdateComponent implements OnInit, AfterViewInit {
  scheduleSub?: Subscription;
  updatedSchedule?: schedule[];
  constructor(public scheduleService: scheduleService) {}
  @ViewChild('f', { static: false }) scheduleForm?: NgForm;
  days?: schedule[];
  dayToUpdate?: schedule;
  dayStartAM?: Date;
  dayStartPM?: Date;
  dayEndAM?: Date;
  dayEndPM?: Date;

  selectedDay?: schedule;

  jours: string[] = [
    'lundi',
    'mardi',
    'mercredi',
    'jeudi',
    'vendredi',
    'samedi',
    'dimanche',
  ];
  hoursAM: number[] = [11, 12, 13, 14, 15, 16, 17];
  hoursPM: number[] = [0, 18, 19, 20, 21, 22, 23];
  minutes: number[] = [0, 15, 30, 45];

  selectItem(item: schedule) {
    this.selectedDay = item;

    this.scheduleForm?.form.patchValue({
      id: null,
      dayName: item.name,
      openOrClose: 'open',
      openHourAM: new Date(item.dayStartAM).getHours(),
      openMinuteAM: new Date(item.dayStartAM).getMinutes(),
      closeHourAM: new Date(item.dayEndAM).getHours(),
      closeMinuteAM: new Date(item.dayEndAM).getMinutes(),
      openHourPM: new Date(item.dayStartPM).getHours(),
      openMinutePM: new Date(item.dayStartPM).getMinutes(),
      closeHourPM: new Date(item.dayEndPM).getHours(),
      closeMinutePM: new Date(item.dayEndPM).getMinutes(),
    });
  }
  onSubmit(form: NgForm): void {
    this.dayToUpdate = {
      name: form.value.dayName,
      dayStartAM: new Date(
        1970,
        1,
        1,
        form.value.openHourAM,
        form.value.openMinuteAM
      ),
      dayEndAM: new Date(
        1970,
        1,
        1,
        form.value.closeHourAM,
        form.value.closeMinuteAM
      ),
      dayStartPM: new Date(
        1970,
        1,
        1,
        form.value.openHourPM,
        form.value.openMinutePM
      ),
      dayEndPM: new Date(
        1970,
        1,
        1,
        form.value.closeHourPM,
        form.value.closeMinutePM
      ),
    };
    this.scheduleService.putSchedule(this.dayToUpdate);
  }

  ngOnInit() {
    this.updatedSchedule = this.scheduleService.getUpdatedSchedule();
    this.scheduleService.getSchedule();
    this.scheduleSub = this.scheduleService
      .getScheduleSub()
      .subscribe((data) => {
        this.updatedSchedule = data;
      });
  }
  ngAfterViewInit() {}
}
