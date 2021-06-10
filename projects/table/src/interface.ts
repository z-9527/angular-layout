import { TemplateRef } from '@angular/core';

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
  fixed?: boolean;
}
