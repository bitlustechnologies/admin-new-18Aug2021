import { Message } from 'primeng/api';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/components/common/messageservice';
import { UserIdleService } from 'angular-user-idle';
import { UserService } from './services/user.service';
import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';
import { MessagingService } from './services/messaging.service';
import 'rxjs/add/observable/interval';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  msgs: Message[] = [];
  loading: any;
  message: any;
  sub: any;
  constructor(
    private userservice: UserService,
    private router: Router,
    private userIdle: UserIdleService,
    private messageservice: MessageService,
    private messagingService: MessagingService
  ) {}

  ngOnInit() {
    this.userservice.cast4.subscribe(loading => {
      this.loading = loading;
    });

    // Start watching when user idle is starting.
    this.userIdle.onTimerStart().subscribe(count => {});
    // Start watch when time is up.
    this.userIdle.onTimeout().subscribe(() => {
      if (this.userservice.isLoggedIn()) {
        localStorage.clear();
        localStorage.removeItem('tokentempAdmin')
        this.messageservice.add({ severity: 'error', summary: 'Error', detail: 'Your session has been expired, Please login again!' });
        setTimeout(() => {
          this.router.navigate(['/authentication/login']);
        }, 3000);
      }
    });

    // const userId = 'user001';
    // this.messagingService.requestPermission(userId);
    // this.messagingService.receiveMessage();
    // this.message = this.messagingService.currentMessage;

    // let time = 10000;
    // this.sub = Observable.interval(time).subscribe(val => {
    //   console.log('called');

    //   let e = {
    //     notification: {
    //       title: 'Hey there',
    //       body: 'push notification',
    //       sound: 'default',
    //       icon: '/firebase-logo.png'
    //     },
    //     to:
    //       'cyekqtMSrSKq7lPVvROvhQ:APA91bH1GOWVo1XK0Xm7CZAgSs8FsTcT2Ld2V5leAazQWlLimnHXcB_YS1L5oj3oVQ4clJzuMFR8KS27J0V3-C_GG1eo_mH4Ia83ufdoxcHL_D3hKZnEAS3L7josFTz0wz2J431jCx1N'
    //   };
    //   this.userservice.fireBaseNotificatons(e).subscribe(
    //     (res: any) => {
    //       console.log(res);
    //     },
    //     err => {
    //       console.log(err);
    //     }
    //   );
    // });
    // this.sub.unsubscribe();


    this.userIdle.startWatching();
  }
}
