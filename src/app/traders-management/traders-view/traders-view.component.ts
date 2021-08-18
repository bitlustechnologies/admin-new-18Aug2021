import { Component, OnInit } from '@angular/core';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-traders-view',
  templateUrl: './traders-view.component.html',
  styleUrls: ['./traders-view.component.css']
})
export class TradersViewComponent implements OnInit {

  // constructor() { }

  ngOnInit() {
  }

  public beforeChange($event: NgbTabChangeEvent) {
    if ($event.nextId === 'tab-preventchange2') {
      $event.preventDefault();
    }
  }
}
