import { Component, OnInit ,ViewChild} from '@angular/core';

declare var require: any;
const data: any = require('./company.json');

@Component({
  selector: 'app-manage-limit',
  templateUrl: './manage-limit.component.html',
  styleUrls: ['./manage-limit.component.css']
})
export class ManageLimitComponent implements OnInit {

  // constructor() { }

  editing = {};
  rows = [];
  temp = [...data];
  public isCollapsed = true;
  loadingIndicator = true;
  reorderable = true;

  columns = [{ name: 'Currency' }, { prop: 'minimumvalue' }, { name: 'Maximun Value' }, { name: 'Option' }, { name: 'LastUpdated' }];
  // constructor() { }
  @ViewChild(ManageLimitComponent) table: ManageLimitComponent;
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
