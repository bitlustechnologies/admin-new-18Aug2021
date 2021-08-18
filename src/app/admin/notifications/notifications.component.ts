import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  NotificationData;
  constructor(private userservice: UserService) {}

  ngOnInit() {
    this.getNotification();
  }

  getNotification() {
    // interval(2 * 60 * 1000)
    // .pipe(
    //     flatMap(() => this.userservice.getNotifications())
    // )
    // .subscribe(data => console.log('notifi',data))

    
    this.userservice.getNotifications().subscribe((res: any) => {
      this.NotificationData = res.json().data;
    });
  }
  notificationClicked(e) {
    this.userservice.getNotificationStatus(false);

    this.userservice.notificationSeen(e).subscribe(
      (res: any) => {
        if (res) {
          this.getNotification();
          this.userservice.getNotificationStatus(true);
        }
      },
      error => {
        return false;
      }
    );
  }
}
