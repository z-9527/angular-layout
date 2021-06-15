/* eslint-disable no-unused-vars */
import { Component, OnInit, ViewChild } from '@angular/core';
import { INzColumn } from 'table';
import { columns, dataSource } from './mock';
import Mock from 'mockjs';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

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

  loading = false;
  total = 0;
  data2 = [];

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

  onQueryParamsChange(params): void {
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find((item) => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    this.loadDataFromServer({
      pageIndex,
      pageSize,
      sortField,
      sortOrder,
      filter,
    });
  }
  loadDataFromServer(
    param: {
      pageIndex?: number;
      pageSize?: number;
      sortField?: string | null;
      sortOrder?: string | null;
      filter?: Array<{ key: string; value: string[] }>;
    } = { pageSize: 10, pageIndex: 1 }
  ): void {
    const { pageSize, pageIndex } = param;
    this.loading = true;
    setTimeout(() => {
      const startIndex = (pageIndex - 1) * pageSize + 1;
      const res = Mock.mock({
        total: 200,
        [`data|${param.pageSize}`]: [
          {
            'id|+1': startIndex,
            name: '@name',
            'number|+1': startIndex,
          },
        ],
      });
      console.log('res222: ', res);
      this.loading = false;
      this.total = res.total;
      this.data2 = res.data;
    }, 1500);
  }

  queryList(param) {
    console.log('param: ', param);
    const { pageSize, pageIndex } = param;
    const startIndex = (pageIndex - 1) * pageSize + 1;
    const res = Mock.mock({
      total: 200,
      [`data|${param.pageSize}`]: [
        {
          'id|+1': startIndex,
          name: '@name',
          'number|+1': startIndex,
        },
      ],
    });
    return of(res).pipe(delay(1500));
  }
}
