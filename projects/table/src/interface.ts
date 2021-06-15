import { TemplateRef } from '@angular/core';
import {
  NzTableFilterFn,
  NzTableFilterList,
  NzTableFilterValue,
  NzTableSortFn,
  NzTableSortOrder,
} from 'ng-zorro-antd/table/src/table.types';

export type StringTemplateRef = string | TemplateRef<any>;

export interface INzColumn extends Record<string, any> {
  title?: StringTemplateRef;
  titleRef?: StringTemplateRef;
  dataIndex: string;
  ref?: StringTemplateRef;
  format?: (_text: string, _record: any, _index: number) => string | number;
  className?: string;
  width?: string;
  fixed?: 'right' | 'left';
  align?: 'right' | 'left' | 'center';

  showSort?: boolean;
  sortFn?: NzTableSortFn;
  sortDirections?: NzTableSortOrder[];
  nzSortOrder?: NzTableSortOrder;
  sortOrderChange?: (_order: NzTableSortOrder) => unknown;

  showFilter?: boolean;
  filterFn?: NzTableFilterFn;
  filters?: NzTableFilterList[];
  nzFilterMultiple?: boolean;
  nzFilterChange?: (_value: NzTableFilterValue) => unknown;
}

export interface INzPagination {
  pageIndex?: number;
  pageSize?: number;
  showQuickJumper?: boolean;
  showSizeChanger?: boolean;
  pageSizeOptions?: number[];
  pageIndexChange?: (_current: number) => unknown;
  pageSizeChange?: (_current: number) => unknown;
  currentPageDataChange?: (_currentData: any[]) => unknown;
}

export interface INzRowSelection {
  selectedRowKeys?: string[] | number[];
  fixed?: boolean;
  onChange?: (_selectedRowKeys: any[]) => unknown;
  onSelect?: (
    _record: any,
    _selected: boolean,
    _selectedRowKeys: any[]
  ) => unknown;
}
