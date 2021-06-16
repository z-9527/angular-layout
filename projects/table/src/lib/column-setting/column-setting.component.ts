import { Component, Input, OnInit } from '@angular/core';
import { INzColumn } from '../../interface';
@Component({
  selector: 'lib-column-setting',
  templateUrl: './column-setting.component.html',
  styleUrls: ['./column-setting.component.less'],
})
export class ColumnSettingComponent implements OnInit {
  @Input() columns: INzColumn[] = [];

  fixedLeftList: INzColumn[] = [];
  list: INzColumn[] = [];
  fixedRightList: INzColumn[] = [];
  constructor() {}
  ngOnInit(): void {
    console.log(111, this.columns);
  }

  handleColumns() {}
}
