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
import { INzColumn, INzPagination, INzRowSelection, StringTemplateRef } from '../interface';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Observable } from 'rxjs';
import { cloneDeep } from 'lodash';
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
  @Input() nzColumns: INzColumn[] = [];
  @Input() nzData?: Record<string, any>[];
  @Input() nzSize?: SizeType;
  @Input() nzLoading?: boolean = false;
  @Input() nzTemplateRefs?: Record<string, TemplateRef<any>> = {};
  @Input() nzScroll?: { x?: string; y?: string };
  @Input() nzBordered?: boolean;
  @Input() nzOuterBordered?: boolean;
  @Input() nzTitle?: StringTemplateRef;
  @Input() nzFooter?: StringTemplateRef;
  @Input() nzNoResult?: StringTemplateRef;
  @Input() nzRowKey?: string | ((_record: any) => string) = 'id'; // 很重要，设置checkbox的值，默认为id
  @Input() nzTotal?: number;
  @Input() nzShowPagination?: boolean = true;
  @Input() nzFrontPagination?: boolean = false;
  @Input() nzPagination?: INzPagination = {};
  @Input() nzShowRowSelection?: boolean = true;
  @Input() nzRowSelection?: INzRowSelection = {};
  @Input() nzHeader?: StringTemplateRef;
  @Input() nzQueryList?: (_param: NzTableQueryParams) => Observable<{ total: number; data: any[] }>; // 自定义请求的分页函数，必须返回Observable的对象
  @Output() nzQueryParams?: EventEmitter<NzTableQueryParams> = new EventEmitter();

  _columns: INzColumn[] = [];
  _initColumns: INzColumn[] = [];
  _size: SizeType = 'default';
  _selectedRowKeys = new Set<number | string>();
  _total: number = 0;
  _data: Record<string, any>[] = [];
  _loading = false;
  listOfCurrentPageData: any[] = [];
  checked = false;
  indeterminate = false;
  fullscreen = false;

  ngOnInit(): void {
    this._queryList({
      pageIndex: this.nzPagination.pageIndex || 1,
      pageSize: this.nzPagination.pageSize || 10,
      sort: undefined,
      filter: undefined,
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const key in changes) {
      const field = changes[key];
      if (key === 'nzSize') {
        this._size = field.currentValue;
      }
      if (key === 'nzRowSelection' && field.currentValue.selectedRowKeys) {
        this._selectedRowKeys = new Set(field.currentValue.selectedRowKeys);
        this.refreshCheckedStatus();
      }
      if (key === 'nzData') {
        this._data = field.currentValue || [];
      }
      if (key === 'nzTotal') {
        this._total = field.currentValue;
      }
      if (key === 'nzLoading') {
        this._loading = field.currentValue;
      }
      if (key === 'nzColumns' && field.currentValue) {
        const list = this.getInitColumns(cloneDeep(field.currentValue));
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
        const originColumn = arr.find((subItem) => subItem.dataIndex === item.dataIndex) || item;
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
    this.nzPagination.pageIndexChange && this.nzPagination.pageIndexChange(index);
  }
  pageSizeChange(size) {
    this.nzPagination.pageSizeChange && this.nzPagination.pageSizeChange(size);
  }
  currentPageDataChange(currentData) {
    this.nzPagination.currentPageDataChange && this.nzPagination.currentPageDataChange(currentData);

    this.listOfCurrentPageData = currentData;
    this.refreshCheckedStatus();
  }

  getRowKeyValue(record = {}) {
    if (typeof this.nzRowKey === 'function') {
      return this.nzRowKey(record);
    }
    return record[this.nzRowKey];
  }

  onAllChecked(checked: boolean) {
    this.listOfCurrentPageData
      .filter(({ disabled }) => !disabled)
      .forEach((item) => {
        const rowKey = this.getRowKeyValue(item);
        this.updateCheckedSet(rowKey, checked);
      });
    this.refreshCheckedStatus();
    this.nzRowSelection.onChange && this.nzRowSelection.onChange(Array.from(this._selectedRowKeys));
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
    this.nzRowSelection.onSelect && this.nzRowSelection.onSelect(data, checked, Array.from(this._selectedRowKeys));
    this.nzRowSelection.onChange && this.nzRowSelection.onChange(Array.from(this._selectedRowKeys));
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
    this._size = size;
  }
  toggleFullScreen(fullscreen) {
    this.fullscreen = fullscreen;
  }

  onQueryParams(params: NzTableQueryParams) {
    this.nzQueryParams.emit(params);
    if (!this.nzFrontPagination) {
      this._queryList(params);
    }
  }
  _queryList = (params: NzTableQueryParams) => {
    if (typeof this.nzQueryList !== 'function') {
      return;
    }
    this._loading = true;
    this.nzQueryList(params).subscribe({
      next: (res) => {
        this._total = res.total;
        this._data = res.data;
        this._loading = false;
      },
      error: (_err) => {
        this._loading = false;
      },
    });
  };
  // 刷新数据
  refresh() {
    const { nzPageIndex, nzPageSize } = this.basicTable;
    this._queryList({
      pageIndex: nzPageIndex,
      pageSize: nzPageSize,
      sort: undefined,
      filter: undefined,
    });
  }
  // 刷新数据并清空勾选（一般在勾选完成操作后调用）
  reload() {
    this.refresh();
    this._selectedRowKeys.clear();
  }

  changeColumns(arr) {
    this._columns = cloneDeep(arr);
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
    const text = column.format ? column.format(data[column.dataIndex], data, index) : data[column.dataIndex];
    if (column.type === 'date') {
      return text && dayjs(text).format('YYYY-MM-DD HH:mm:ss');
    }
    return text;
  }

  getLink(data, column, index) {
    if (typeof column.link === 'function') {
      return column.link(data[column.dataIndex], data, index);
    }
    return data[column.dataIndex];
  }
}
