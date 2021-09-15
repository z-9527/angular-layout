import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { INzColumn, INzPagination, INzRowSelection, PageType, StringTemplateRef } from '../interface';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Observable } from 'rxjs';
import * as _ from 'lodash';
import * as dayjs from 'dayjs';

export type SizeType = 'middle' | 'small' | 'default';

@Component({
  selector: 'lib-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less'],
})
export class TableComponent implements OnInit, OnChanges {
  @ViewChild('basicTable') basicTable;
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
  @Input() showAction?: boolean = true;
  @Input() queryList?: (_param: NzTableQueryParams) => Observable<{ total: number; data: any[] }>; // 自定义请求的分页函数，必须返回Observable的对象
  @Output() queryParams?: EventEmitter<NzTableQueryParams> = new EventEmitter();

  _columns: INzColumn[] = [];
  _initColumns: INzColumn[] = [];
  _selectedRowKeys = new Set<number | string>();
  listOfCurrentPageData: any[] = [];
  checked = false;
  indeterminate = false;
  fullscreen = false;

  ngOnInit(): void {
    if (this.frontPagination) {
      this._queryList({
        pageIndex: this.pagination.pageIndex || 1,
        pageSize: this.pagination.pageSize || 10,
        sort: undefined,
        filter: undefined,
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const key in changes) {
      const field = changes[key];
      if (key === 'rowSelection' && field.currentValue.selectedRowKeys) {
        this._selectedRowKeys = new Set(field.currentValue.selectedRowKeys);
        this.refreshCheckedStatus();
      }
      if (key === 'columns' && field.currentValue) {
        const list = this.getInitColumns(_.cloneDeep(field.currentValue));
        this._columns = list;
        this._initColumns = list;
      }
    }
  }

  getInitColumns(arr) {
    const cachesColumns = JSON.parse(localStorage.getItem(this.tableKey));
    // 因为JSON没有函数类型值，所以从源columns中获取其它值
    if (Array.isArray(cachesColumns)) {
      return cachesColumns.map((item) => {
        const originColumn = arr.find((subItem) => subItem.key === item.key) || item;
        return {
          ...originColumn,
          show: item.show,
          fixed: item.fixed,
        };
      });
    }
    return arr.map((item) => ({ ...item, show: true }));
  }

  pageIndexChange(index) {
    this.pagination.pageIndexChange && this.pagination.pageIndexChange(index);
  }
  pageSizeChange(size) {
    this.pagination.pageSizeChange && this.pagination.pageSizeChange(size);
  }
  currentPageDataChange(currentData) {
    this.pagination.currentPageDataChange && this.pagination.currentPageDataChange(currentData);

    this.listOfCurrentPageData = currentData;
    this.refreshCheckedStatus();
  }

  getRowKeyValue(record = {}) {
    if (typeof this.rowKey === 'function') {
      return this.rowKey(record);
    }
    return record[this.rowKey];
  }

  onAllChecked(checked: boolean) {
    this.listOfCurrentPageData
      .filter(({ disabled }) => !disabled)
      .forEach((item) => {
        const rowKey = this.getRowKeyValue(item);
        this.updateCheckedSet(rowKey, checked);
      });
    this.refreshCheckedStatus();
    this.rowSelection.onChange && this.rowSelection.onChange(Array.from(this._selectedRowKeys));
  }

  updateCheckedSet(rowKey, checked: boolean): void {
    if (checked) {
      this._selectedRowKeys.add(rowKey);
    } else {
      this._selectedRowKeys.delete(rowKey);
    }
  }

  onItemChecked(rowKey, checked, data) {
    this.updateCheckedSet(rowKey, checked);
    this.refreshCheckedStatus();
    this.rowSelection.onSelect && this.rowSelection.onSelect(data, checked, Array.from(this._selectedRowKeys));
    this.rowSelection.onChange && this.rowSelection.onChange(Array.from(this._selectedRowKeys));
  }

  refreshCheckedStatus(): void {
    const listOfEnabledData = this.listOfCurrentPageData.filter(({ disabled }) => !disabled);
    this.checked =
      listOfEnabledData.every((item) => this._selectedRowKeys.has(this.getRowKeyValue(item))) &&
      listOfEnabledData.length > 0;
    this.indeterminate =
      listOfEnabledData.some((item) => this._selectedRowKeys.has(this.getRowKeyValue(item))) && !this.checked;
  }

  changeSize(size) {
    this.size = size;
  }
  toggleFullScreen(fullscreen) {
    this.fullscreen = fullscreen;
  }

  onQueryParams(params: NzTableQueryParams) {
    this.queryParams.emit(params);
    if (!this.frontPagination) {
      this._queryList(params);
    }
  }
  _queryList = (params: NzTableQueryParams) => {
    if (typeof this.queryList !== 'function') {
      return;
    }
    this.pagination = {
      ...this.pagination,
      ...params,
    };
    this.loading = true;
    this.queryList(params).subscribe({
      next: (res: any = {}) => {
        this.total = res?.total || 0;
        this.data = res?.data || [];
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  };
  // 刷新数据
  refresh(page?: PageType) {
    const { nzPageIndex, nzPageSize } = this.basicTable;
    this._queryList({
      pageIndex: page?.pageIndex ?? nzPageIndex,
      pageSize: page?.pageSize ?? nzPageSize,
      sort: undefined,
      filter: undefined,
    });
  }
  // 刷新数据并清空勾选（一般在勾选完成操作后调用）
  reload(page?: PageType) {
    this.refresh(page);
    this._selectedRowKeys.clear();
  }

  changeColumns(arr) {
    this._columns = _.cloneDeep(arr);
    this.cachesColumns(arr);
  }
  cachesColumns(arr) {
    if (this.tableKey) {
      localStorage.setItem(this.tableKey, JSON.stringify(arr));
    }
  }
  getColumnWidth(column) {
    const { width, type } = column;
    if (typeof width === 'number') {
      return `${width}px`;
    }
    if (typeof width === 'string') {
      return width;
    }
    if (type === 'date') {
      return '180px';
    }
  }
  getText(data, column, index) {
    const text = column.format ? column.format(data[column.key], data, index) : data[column.key];
    if (column.type === 'date') {
      return text && dayjs(text).format('YYYY-MM-DD HH:mm:ss');
    }
    return text;
  }

  getLink(data, column, index) {
    if (typeof column.link === 'function') {
      return column.link(data[column.key], data, index);
    }
    return data[column.key];
  }
}
