import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import {
  INzColumn,
  INzPagination,
  INzRowSelection,
  StringTemplateRef,
} from '../interface';

@Component({
  selector: 'lib-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less'],
})
export class TableComponent implements OnInit {
  @Input() nzColumns: INzColumn[] = [];
  @Input() nzData?: Record<string, any>[];
  @Input() nzTemplateRefs?: Record<string, TemplateRef<any>>;
  @Input() nzScroll?: { x?: string; y?: string };
  @Input() nzBordered?: boolean;
  @Input() nzOuterBordered?: boolean;
  @Input() nzTitle?: StringTemplateRef;
  @Input() nzFooter?: StringTemplateRef;
  @Input() nzNoResult?: StringTemplateRef;
  @Input() nzRowKey?: string | ((_record: any) => string) = 'key';
  @Input() nzTotal?: number;
  @Input() nzShowPagination?: boolean = true;
  @Input() nzFrontPagination?: boolean = true;
  @Input() nzPagination?: INzPagination = {};
  @Input() nzShowRowSelection?: boolean = true;
  @Input() nzRowSelection?: INzRowSelection = {};

  listOfCurrentPageData: any[] = [];
  checked = false;
  indeterminate = false;
  selectedRowKeys = new Set<number | string>();
  constructor() {}

  ngOnInit(): void {}

  pageIndexChange(index) {
    this.nzPagination.pageIndexChange &&
      this.nzPagination.pageIndexChange(index);
  }
  pageSizeChange(size) {
    this.nzPagination.pageSizeChange && this.nzPagination.pageSizeChange(size);
  }
  currentPageDataChange(currentData) {
    this.nzPagination.currentPageDataChange &&
      this.nzPagination.currentPageDataChange(currentData);

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
    this.nzRowSelection.onChange(Array.from(this.selectedRowKeys));
  }

  updateCheckedSet(rowKey, checked: boolean): void {
    if (checked) {
      this.selectedRowKeys.add(rowKey);
    } else {
      this.selectedRowKeys.delete(rowKey);
    }
  }

  onItemChecked(rowKey, checked, data) {
    this.updateCheckedSet(rowKey, checked);
    this.refreshCheckedStatus();
    this.nzRowSelection.onSelect &&
      this.nzRowSelection.onSelect(
        data,
        checked,
        Array.from(this.selectedRowKeys)
      );
  }

  refreshCheckedStatus(): void {
    const listOfEnabledData = this.listOfCurrentPageData.filter(
      ({ disabled }) => !disabled
    );
    this.checked = listOfEnabledData.every((item) =>
      this.selectedRowKeys.has(this.getRowKeyValue(item))
    );
    this.indeterminate =
      listOfEnabledData.some((item) =>
        this.selectedRowKeys.has(this.getRowKeyValue(item))
      ) && !this.checked;
  }
}
