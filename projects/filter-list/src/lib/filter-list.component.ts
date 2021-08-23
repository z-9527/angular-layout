import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'lib-filter-list',
  template: `
    <div>
      <lib-filter [fields]="filterFields"></lib-filter>
    </div>
  `,
  styles: [],
})
export class FilterListComponent implements OnInit {
  @Input() filterFields: FormlyFieldConfig[];
  constructor() {}

  ngOnInit(): void {}
}
