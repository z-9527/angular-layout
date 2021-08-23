import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { INzColumn, StringTemplateRef } from 'table';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Observable } from 'rxjs';
@Component({
  selector: 'lib-filter-list',
  template: `
    <div>
      <div style="padding: 24px 24px 0 24px;background:#fff">
        <lib-filter
          [form]="form"
          [fields]="fields"
          [model]="model"
          [options]="options"
          [foldRow]="foldRow"
          [collapse]="collapse"
        ></lib-filter>
      </div>

      <div style="padding:12px">
        <lib-table
          [nzColumns]="nzColumns"
          [nzScroll]="nzScroll"
          [nzTitle]="nzTitle"
          [nzQueryList]="nzQueryList"
        ></lib-table>
      </div>
    </div>
  `,
  styles: [],
})
export class FilterListComponent implements OnInit {
  @Input() form: FormGroup | FormArray = new FormGroup({});
  @Input() model: any = {};
  @Input() options: FormlyFormOptions = { formState: { cols: 6 } };
  @Input() fields: FormlyFieldConfig[];
  @Input() foldRow: number | boolean = 1;
  @Input() collapse: boolean = true;
  @Output() search: EventEmitter<any> = new EventEmitter();
  @Output() clear: EventEmitter<any> = new EventEmitter();

  @Input() nzColumns: INzColumn[] = [];
  @Input() nzTitle?: StringTemplateRef;
  @Input() nzScroll?: { x?: string; y?: string };
  @Input() nzQueryList?: (_param: NzTableQueryParams) => Observable<{ total: number; data: any[] }>;

  constructor() {}

  ngOnInit(): void {}
}
