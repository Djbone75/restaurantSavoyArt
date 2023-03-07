import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { user } from 'src/models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { ReservationComponent } from '../reservation/reservationUpdate/reservation.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuthenticated?: boolean = false;
  user?: user | null;

  private authListenerSubs?: Subscription;
  private UserListenerSubs?: Subscription;

  constructor(private authService: AuthService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.user = this.authService.getUser();

    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
      });

    this.UserListenerSubs = this.authService
      .getUserListener()
      .subscribe((user) => {
        this.user = user;
      });
  }
  ngOnDestroy(): void {
    this.onLogout();
  }
  onLogout() {
    this.authService.logout();
  }
  onClick(): void {
    this.dialog.open(ReservationComponent, {
      minHeight: '420px',
    });
  }
}
