/* eslint-disable no-unused-vars */
import { Component, OnInit, ViewChild } from '@angular/core';
import { INzColumn } from 'table';
import { columns, dataSource } from './mock';
import Mock from 'mockjs';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-table-demo',
  templateUrl: './table-demo.component.html',
  styleUrls: ['./table-demo.component.less'],
})
export class TableDemoComponent implements OnInit {
  @ViewChild('tableRef') tableRef;
  columns: INzColumn[] = columns;
  selectedRowKeys = [];

  constructor() {}

  ngOnInit(): void {}

  queryListFront() {
    const res = Mock.mock({
      total: 200,
      [`data|200`]: [
        {
          'id|+1': '@id',
          name: '@name',
          'age|20-30': 22,
          address: `@county(true)`,
          link: 'www.baidu.com',
          column: 'column',
          time: Date.now(),
        },
      ],
    });
    return of(res).pipe(delay(1500));
  }

  queryList(param) {
    console.log('param: ', param);
    const { pageSize, pageIndex } = param;
    const startIndex = (pageIndex - 1) * pageSize + 1;
    const res = Mock.mock({
      total: 200,
      [`data|${pageSize}`]: [
        {
          'id|+1': startIndex,
          name: '@name',
          'number|+1': startIndex,
          'age|20-30': 22,
          address: `@county(true)`,
          link: 'www.baidu.com',
          column: 'column',
          time: Date.now(),
        },
      ],
    });
    return of(res).pipe(delay(1500));
  }

  onClear() {
    this.selectedRowKeys = [];
  }
  onSelectChange = (selectedRowKeys) => {
    this.selectedRowKeys = selectedRowKeys;
  };

  onTest(...rest) {
    console.log('rest33333: ', rest);
  }
}
