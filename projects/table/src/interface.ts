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
  key: string;
  ref?: StringTemplateRef;
  format?: (_text: string, _record: any, _index: number) => string | number;
  className?: string;
  width?: string | number;
  fixed?: 'right' | 'left';
  align?: 'right' | 'left' | 'center';
  type?: 'link' | 'date';
  link?: (_text: string, _record: any, _index: number) => string;

  showSort?: boolean;
  sortFn?: NzTableSortFn | boolean;
  sortDirections?: NzTableSortOrder[];
  sortOrder?: NzTableSortOrder;
  sortOrderChange?: (_order: NzTableSortOrder) => unknown;

  showFilter?: boolean;
  filterFn?: NzTableFilterFn;
  filters?: NzTableFilterList[];
  filterMultiple?: boolean;
  filterChange?: (_value: NzTableFilterValue) => unknown;
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
  onSelect?: (_record: any, _selected: boolean, _selectedRowKeys: any[]) => unknown;
}

export type PageType = {
  pageIndex?: number;
  pageSize?: number;
};
