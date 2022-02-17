import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import {
  INzColumn,
  INzPagination,
  INzRowSelection,
  PageType,
  SizeType,
  StringTemplateRef,
  TableComponent,
} from 'table';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'lib-filter-list',
  template: `
    <div>
      <div style="padding: 12px 24px;background:#fff">
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
        <lib-table
          #tableRef
          [tableKey]="tableKey"
          [columns]="columns"
          [data]="data"
          [size]="size"
          [loading]="loading"
          [templateRefs]="templateRefs"
          [scroll]="scroll"
          [bordered]="bordered"
          [outerBordered]="outerBordered"
          [title]="title"
          [footer]="footer"
          [noResult]="noResult"
          [rowKey]="rowKey"
          [total]="total"
          [showPagination]="showPagination"
          [frontPagination]="frontPagination"
          [pagination]="pagination"
          [showRowSelection]="showRowSelection"
          [rowSelection]="rowSelection"
          [header]="header"
          [queryList]="_queryList"
        ></lib-table>
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

  @Input() tableKey: string;
  @Input() columns: INzColumn[] = [];
  @Input() data?: Record<string, any>[];
  @Input() size?: SizeType = 'default';
  @Input() loading?: boolean = false;
  @Input() templateRefs?: Record<string, TemplateRef<any>> = {};
  @Input() scroll?: { x?: string; y?: string };
  @Input() bordered?: boolean;
  @Input() outerBordered?: boolean;
  @Input() title?: StringTemplateRef;
  @Input() footer?: StringTemplateRef;
  @Input() noResult?: StringTemplateRef;
  @Input() rowKey?: string | ((_record: any) => string) = 'id'; // 很重要，设置checkbox的值，默认为id
  @Input() total?: number;
  @Input() showPagination?: boolean = true;
  @Input() frontPagination?: boolean = false;
  @Input() pagination?: INzPagination = {};
  @Input() showRowSelection?: boolean = true;
  @Input() rowSelection?: INzRowSelection = {};
  @Input() header?: StringTemplateRef;
  @Input() queryList?: (_param: NzTableQueryParams) => Observable<{ total: number; data: any[] }>; // 自定义请求的分页函数，必须返回Observable的对象
  @Output() queryParams?: EventEmitter<NzTableQueryParams> = new EventEmitter();

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
