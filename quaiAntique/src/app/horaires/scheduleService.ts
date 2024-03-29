import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { schedule } from 'src/models/schedule.model';
import { Subject, map } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

const BACKEND_URL = environment.apiUrl + '/horaires/';

@Injectable({ providedIn: 'root' })
export class scheduleService {
  constructor(private http: HttpClient, private router: Router) {}
  private ScheduleSub = new Subject<schedule[]>();
  private updatedSchedule: schedule[] = [];
  getUpdatedSchedule() {
    return this.updatedSchedule;
  }
  getScheduleSub() {
    return this.ScheduleSub.asObservable();
  }

  getSchedule() {
    this.http
      .get<{ schedule: any }>(BACKEND_URL)
      .pipe(
        map((scheduleData) => {
          return scheduleData.schedule.map((data: schedule) => {
            return {
              name: data.name,
              dayStartAM: data.dayStartAM,
              dayEndAM: data.dayEndAM,
              dayStartPM: data.dayStartPM,
              dayEndPM: data.dayEndPM,
            };
          });
        })
      )
      .subscribe((updatedData) => {
        this.updatedSchedule = updatedData;
        this.ScheduleSub.next([...this.updatedSchedule]);
      });
  }

  putSchedule(schedule: schedule) {
    const scheduleToUpdate = schedule;
    this.http.put(BACKEND_URL, scheduleToUpdate).subscribe((data) => {
      const newSchedule = [...this.updatedSchedule];
      const oldScheduleIndex = newSchedule.findIndex(
        (p) => p.name === scheduleToUpdate.name
      );
      newSchedule[oldScheduleIndex] = scheduleToUpdate;
      this.updatedSchedule = newSchedule;
      this.ScheduleSub.next(this.updatedSchedule);
      this.router.navigate(['/horairesUpdate']);
    });
  }
}
