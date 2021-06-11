import { Component, OnInit, ViewChild } from '@angular/core';
import { INzColumn } from 'table';
import { columns, dataSource } from './mock';

const data = new Array(100).fill(0).map((_, index) => {
  return {
    id: index,
    name: `Edward King ${index}`,
    age: 32,
    address: `London, Park Lane no. ${index}`,
    disabled: index % 2 === 0,
  };
});

@Component({
  selector: 'app-table-demo',
  templateUrl: './table-demo.component.html',
  styleUrls: ['./table-demo.component.less'],
})
export class TableDemoComponent implements OnInit {
  @ViewChild('myTable') myTable;
  window = window;
  columns: INzColumn[] = columns;
  data: any = dataSource;
  selectedRowKeys = [];

  constructor() {}

  ngOnInit(): void {
    this.data = data;
  }

  onSelectChange = (selectedRowKeys) => {
    this.selectedRowKeys = selectedRowKeys;
  };
  onClear() {
    this.selectedRowKeys = [];
  }
}
