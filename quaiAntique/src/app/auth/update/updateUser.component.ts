import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { allergies } from 'src/models/allergies.array';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { user } from 'src/models/user.model';
import { NgFor } from '@angular/common';

@Component({
  templateUrl: './updateUser.component.html',
  styleUrls: ['./updateUser.component.scss'],
})
export class updateUserComponent implements OnInit {
  allergies: string[] = allergies;
  currentUser?: user | null;
  private UserListenerSubs?: Subscription;
  totalGuests: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.currentUser = this.authService.getUser();
    this.UserListenerSubs = this.authService
      .getUserListener()
      .subscribe((user) => {
        this.currentUser = user;
      });
  }
  onSubmit(form: NgForm) {
    const updatedUser = form.value;
    this.authService.updateUser(updatedUser);
  }
}
