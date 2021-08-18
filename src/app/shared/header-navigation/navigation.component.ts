import { UserService } from './../../services/user.service';
import { Component, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbPanelChangeEvent, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements AfterViewInit {
  NotificationData: any =[];
  notificationLength:any=0
  @Output() toggleSidebar = new EventEmitter<void>();

  public config: PerfectScrollbarConfigInterface = {};
  constructor(private modalService: NgbModal, public userservice: UserService, private router: Router,
    private toastr: ToastrService,
    
    ) {
    this.getNotification();
  }

  url: any;

  public showSearch = false;

  // This is for Notifications
  notifications: Object[] = [
    {
      round: 'round-danger',
      icon: 'ti-link',
      title: 'Luanch Admin',
      subject: 'Just see the my new admin!',
      time: '9:30 AM'
    },
    {
      round: 'round-success',
      icon: 'ti-calendar',
      title: 'Event today',
      subject: 'Just a reminder that you have event',
      time: '9:10 AM'
    },
    {
      round: 'round-info',
      icon: 'ti-settings',
      title: 'Settings',
      subject: 'You can customize this template as you want',
      time: '9:08 AM'
    },
    {
      round: 'round-primary',
      icon: 'ti-user',
      title: 'Pavan kumar',
      subject: 'Just see the my admin!',
      time: '9:00 AM'
    }
  ];

  // This is for Mymessages
  mymessages: Object[] = [
    {
      useravatar: 'assets/images/users/1.jpg',
      status: 'online',
      from: 'Pavan kumar',
      subject: 'Just see the my admin!',
      time: '9:30 AM'
    },
    {
      useravatar: 'assets/images/users/2.jpg',
      status: 'busy',
      from: 'Sonu Nigam',
      subject: 'I have sung a song! See you at',
      time: '9:10 AM'
    },
    {
      useravatar: 'assets/images/users/2.jpg',
      status: 'away',
      from: 'Arijit Sinh',
      subject: 'I am a singer!',
      time: '9:08 AM'
    },
    {
      useravatar: 'assets/images/users/4.jpg',
      status: 'offline',
      from: 'Pavan kumar',
      subject: 'Just see the my admin!',
      time: '9:00 AM'
    }
  ];

  ngAfterViewInit() {
    this.userservice.NotificationCount.subscribe((res: any) => {
      if (res == true) {
        this.getNotification();
      }
    });

    this.userservice.casturl.subscribe(url => (this.url = url));
    this.userservice.getuserProfile().subscribe(
      response => {
        if (response.json().data.file_path != null) this.userservice.changeValueURL(response.json().data.file_path);
      },
      error => {}
    );

    // this.userservice.verifyJWTtoken().subscribe((res:any)=>{
    // })
  }
  getNotification() { 
    interval(30000)
    .pipe(   
        flatMap(() => this.userservice.getNotifications())
    )
    .subscribe((res:any) => {
    
      var audio = new Audio();
      if(this.notificationLength != 0 && this.notificationLength < res.json().meta.total){
        audio.src = "./assets/got-it-done-613.mp3";
        audio.load();
        audio.play();
        this.toastr.success('New Notification');

      }
      this.NotificationData = res.json().data.filter(val => val.view_status == 0);
      this.notificationLength = res.json().meta.total
  
      if (this.NotificationData.length > 5) {
        this.NotificationData = this.NotificationData.filter((val, i) => i < 5);
      }
    }
      )
    this.userservice.getNotifications().subscribe((res: any) => {
      this.NotificationData = res.json().data.filter(val => val.view_status == 0);
      if (res.json().data.length > 5) {
        this.NotificationData = this.NotificationData.filter((val, i) => i < 5);
      }
    });
  }

  viewDot(){
    if(this.NotificationData.length != 0){
      return 'noti'
    }
  }

  notificationClicked(e) {
    this.userservice.notificationSeen(e).subscribe(
      (res: any) => {
        if (res) {
          this.getNotification();
        }
      },
      error => {
        return false;
      }
    );
  }
}
