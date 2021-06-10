import { Component, OnInit } from '@angular/core';
import { INzColumn } from 'table';
import { columns, dataSource } from './mock';

@Component({
  selector: 'app-table-demo',
  templateUrl: './table-demo.component.html',
  styleUrls: ['./table-demo.component.less'],
})
export class TableDemoComponent implements OnInit {
  columns: INzColumn[] = columns;
  data = dataSource;
  constructor() {}

  ngOnInit(): void {}

  onTest(record, index) {
    console.log('index: ', index);
    console.log('record: ', record);
  }
}
