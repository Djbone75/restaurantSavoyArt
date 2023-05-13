import { Component, OnInit } from '@angular/core';
import { schedule } from 'src/models/schedule.model';
import { scheduleService } from '../scheduleService';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-horaires',
  templateUrl: './horaires.component.html',
  styleUrls: ['./horaires.component.scss'],
})
export class HorairesComponent implements OnInit {
  updatedSchedule?: schedule[] = this.scheduleService.getUpdatedSchedule();
  scheduleSub?: Subscription;

  days?: schedule[];
  constructor(public scheduleService: scheduleService) {}

  ngOnInit() {
    this.scheduleService.getSchedule();
    this.scheduleSub = this.scheduleService
      .getScheduleSub()
      .subscribe((schedule: schedule[]) => {
        this.updatedSchedule = schedule;
      });
  }
}
