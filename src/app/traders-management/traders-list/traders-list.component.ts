import { Component, OnInit ,ViewChild} from '@angular/core';

declare var require: any;
const data: any = require('./company.json');

@Component({
  selector: 'app-traders-list',
  templateUrl: './traders-list.component.html',
  styleUrls: ['./traders-list.component.css']
})
export class TradersListComponent implements OnInit {
 
  // constructor() { }

  editing = {};
  rows = [];
  temp = [...data];
  public isCollapsed = true;
  loadingIndicator = true;
  reorderable = true;

  columns = [{ name: 'SRNo' }, { prop: 'Email' }, { name: 'Name' }, { name: 'Address' }];
  // constructor() { }
  @ViewChild(TradersListComponent) table: TradersListComponent;
  constructor() {
    this.rows = data;
    this.temp = [...data];
    setTimeout(() => {
      this.loadingIndicator = false;
    }, 1500);
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function(d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table = data;
  }
  ngOnInit() {
  }

}
