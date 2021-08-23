import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as config from './config';
@Component({
  selector: 'app-filter-list-demo',
  templateUrl: './filter-list-demo.component.html',
  styleUrls: ['./filter-list-demo.component.less'],
})
export class FilterListDemoComponent implements OnInit {
  filterFields = config.filterFields;
  form = new FormGroup({});
  test = false;
  model: any = {};
  collapse = false;
  constructor() {}

  ngOnInit(): void {
    setTimeout(() => {
      this.model = {
        select2: 2,
        text: 333,
      };
      const field = this.filterFields.find((item) => item.key === 'select2');
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
}
