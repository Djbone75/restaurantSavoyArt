import { Component, OnInit } from '@angular/core';
import { schedule } from 'src/models/schedule.model';
import { scheduleService } from '../scheduleService';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-horaires',
  templateUrl: './horaires.component.html',
  styleUrls: ['./horaires.component.scss'],
})
export class HorairesComponentTsComponent implements OnInit {
  days?: schedule[];
  constructor(public scheduleService: scheduleService) {}

  ngOnInit() {
   return this.scheduleService.getSchedule().subscribe((data)=>{

      this.days = data.schedule;
    });

  }
}
