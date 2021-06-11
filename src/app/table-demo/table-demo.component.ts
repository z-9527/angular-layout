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
  data: any = dataSource;
  size = 'small';
  nzRowSelection = {
    onChange: (...a) => {
      console.log('onChange', a);
    },
    onSelect: (...a) => {
      console.log('onSelect', a);
    },
  };
  constructor() {}

  ngOnInit(): void {
    fetch('/api/list2')
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log('res: ', res);
      });
    this.data = new Array(100).fill(0).map((_, index) => {
      return {
        id: index,
        name: `Edward King ${index}`,
        age: 32,
        address: `London, Park Lane no. ${index}`,
        disabled: index % 2 === 0,
      };
    });
  }

  onTest(record, index) {
    console.log('index: ', index);
    console.log('record: ', record);
  }
}
