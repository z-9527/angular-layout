import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { INzColumn, PageType, StringTemplateRef, TableComponent } from 'table';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Observable, of } from 'rxjs';

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
          (search)="onSearch()"
          (clear)="onClear()"
        ></lib-filter>
      </div>

      <div style="padding:12px">
        <lib-table #tableRef [columns]="columns" [scroll]="scroll" [title]="title" [queryList]="_queryList"></lib-table>
      </div>
    </div>
  `,
  styles: [],
})
export class FilterListComponent implements OnInit {
  @ViewChild('tableRef') tableRef: TableComponent;
  @Input() form: FormGroup | FormArray = new FormGroup({});
  @Input() model: any = {};
  @Input() options: FormlyFormOptions = { formState: { cols: 6 } };
  @Input() fields: FormlyFieldConfig[];
  @Input() foldRow: number | boolean = 1;
  @Input() collapse: boolean = true;
  @Input() searchText: string = '搜索';
  @Input() clearText: string = '清空';
  @Output() search: EventEmitter<any> = new EventEmitter();
  @Output() clear: EventEmitter<any> = new EventEmitter();

  @Input() columns: INzColumn[] = [];
  @Input() title?: StringTemplateRef;
  @Input() scroll?: { x?: string; y?: string };
  @Input() queryList?: (_param: NzTableQueryParams) => Observable<{ total: number; data: any[] }>;

  constructor() {}

  ngOnInit(): void {}

  onSearch() {
    this.search.emit(this.model);
    this.refresh({ pageIndex: 1 });
  }
  onClear() {
    this.clear.emit();
    setTimeout(() => {
      if (this.form.valid) {
        this.onSearch();
      }
    });
  }

  refresh(page?: PageType) {
    return this.tableRef.refresh(page);
  }

  _queryList = (page) => {
    if (this.form.valid) {
      return this.queryList({ page, ...this.model });
    } else {
      return of({});
    }
  };
}
