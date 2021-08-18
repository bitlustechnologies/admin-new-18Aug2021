import { Component, OnInit , ViewChild} from '@angular/core';

declare var require: any;
const data: any = require('./company.json');

@Component({
  selector: 'app-fee-management',
  templateUrl: './fee-management.component.html',
  styleUrls: ['./fee-management.component.css']
})
export class FeeManagementComponent implements OnInit {

  editing = {};
  rows = [];
  temp = [...data];
  public isCollapsed = true;
  loadingIndicator = true;
  reorderable = true;

  columns = [{ name: 'Currency' }, { name: 'Fee' }];
  // constructor() { }
  @ViewChild(FeeManagementComponent) table: FeeManagementComponent;
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
