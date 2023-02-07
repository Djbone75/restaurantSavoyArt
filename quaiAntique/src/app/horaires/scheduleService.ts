import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { schedule } from "src/models/schedule.model";



@Injectable({ providedIn: 'root' })
export class scheduleService {

  constructor(private http: HttpClient) {}

  getSchedule() {
    return this.http.get<{schedule: schedule[]}>('http://localhost:3000/horaires');
  }

}
