import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'formly-field-nz-tree-select',
  template: `
    <nz-tree-select
      [formControl]="formControl"
      [formlyAttributes]="field"
      [nzAllowClear]="to.allowClear"
      [nzPlaceHolder]="to.placeholder"
      [nzDisabled]="to.disabled"
      [nzShowIcon]="to.showIcon"
      [nzShowSearch]="to.showSearch"
      [nzNotFoundContent]="to.notFoundContent"
      [nzDropdownMatchSelectWidth]="to.dropdownMatchSelectWidth"
      [nzDropdownStyle]="to.dropdownStyle"
      [nzDropdownClassName]="to.dropdownClassName"
      [nzMultiple]="to.multiple"
      [nzHideUnMatched]="to.hideUnMatched"
      [nzSize]="to.size"
      [nzCheckable]="to.checkable"
      [nzCheckStrictly]="to.checkStrictly"
      [nzShowExpand]="to.showExpand"
      [nzShowLine]="to.showLine"
      [nzAsyncData]="to.asyncData"
      [nzNodes]="to.nodes"
      [nzDefaultExpandAll]="to.defaultExpandAll"
      [nzExpandedKeys]="to.expandedKeys"
      [nzDisplayWith]="to.displayWith"
      [nzMaxTagCount]="to.maxTagCount"
      [nzVirtualHeight]="to.virtualHeight"
      [nzVirtualItemSize]="to.virtualItemSize"
      [nzVirtualMaxBufferPx]="to.virtualMaxBufferPx"
      [nzVirtualMinBufferPx]="to.virtualMinBufferPx"
      [nzBackdrop]="to.backdrop"
      (nzExpandChange)="to.expandChange && to.expandChange($event)"
      (ngModelChange)="onChange($event)"
    ></nz-tree-select>
  `,
})
export class FormlyFieldTreeSelect extends FieldType {
  defaultOptions = {
    templateOptions: {
      placeholder: '请选择',
      allowClear: true,
      dropdownMatchSelectWidth: true,
      showExpand: true,
      showSearch: true,
      showIcon: true,
      defaultExpandAll: true,
      displayWith: (node) => node.title,
      virtualItemSize: 28,
      virtualMaxBufferPx: 500,
      virtualMinBufferPx: 28,
      dropdownStyle: {
        'max-height': '350px',
        overflow: 'auto',
      },
    },
  };
  onChange(value) {
    if (this.to.onChange) {
      this.to.onChange(value, this.field);
    }
  }
}
