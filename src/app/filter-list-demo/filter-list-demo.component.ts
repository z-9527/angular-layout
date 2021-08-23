import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as config from './config';
import Mock from 'mockjs';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-filter-list-demo',
  templateUrl: './filter-list-demo.component.html',
  styleUrls: ['./filter-list-demo.component.less'],
})
export class FilterListDemoComponent implements OnInit {
  fields = config.fields;
  form = new FormGroup({});
  model: any = {};
  collapse = false;
  columns = config.columns;
  constructor() {}

  ngOnInit(): void {
    setTimeout(() => {
      this.model = {
        select2: 2,
        text: 333,
      };
      const field = this.fields.find((item) => item.key === 'select2');
      field.templateOptions.options = [{ label: 2, value: 2 }];
    }, 3000);
  }
  search(v) {
    console.log('v: ', v);
  }
  clear() {
    console.log(3123);
  }
  onTo() {
    this.collapse = !this.collapse;
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
}
