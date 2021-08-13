import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { createLabelArr } from '../../utils';

/**
 * 使用ngTemplateOutlet来生成option时，group不显示所以不能用模板来生成
 *
 * 继承antd selectAPI
 * 新增queryOptions   搜索options函数，返回Observable<array>或数组
 */

@Component({
  selector: 'formly-field-nz-select',
  template: `
    <nz-select
      [formControl]="formControl"
      [formlyAttributes]="field"
      [nzId]="to.id"
      [nzAutoClearSearchValue]="to.autoClearSearchValue"
      [nzAllowClear]="to.allowClear"
      [nzBackdrop]="to.backdrop"
      [nzBorderless]="to.borderless"
      [nzOpen]="to.open"
      [nzAutoFocus]="to.autoFocus"
      [nzDisabled]="to.disabled"
      [nzDropdownClassName]="to.dropdownClassName"
      [nzDropdownStyle]="to.dropdownStyle"
      [nzServerSearch]="to.serverSearch || !!to.queryOptions"
      [nzFilterOption]="to.filterOption"
      [nzMaxMultipleCount]="to.maxMultipleCount"
      [nzMode]="to.multiple ? 'multiple' : to.mode"
      [nzPlaceHolder]="to.placeholder"
      [nzShowSearch]="to.showSearch || !!to.queryOptions"
      [nzSize]="to.size"
      [nzTokenSeparators]="to.tokenSeparators"
      [nzLoading]="to.loading"
      [nzOptionOverflowSize]="to.optionOverflowSize"
      [nzOptionHeightPx]="to.optionHeightPx"
      [nzOptionOverflowSize]="to.optionOverflowSize"
      (nzOpenChange)="to.openChange && to.openChange($event)"
      (nzScrollToBottom)="to.scrollToBottom && to.scrollToBottom($event)"
      (nzOnSearch)="onSearch($event)"
      (nzFocus)="to.focus && to.focus($event)"
      (nzBlur)="to.blur && to.blur($event)"
      (ngModelChange)="onChange($event)"
    >
      <ng-container *ngFor="let item of optionList">
        <nz-option-group *ngIf="!isLoading && item.children" [nzLabel]="item.label">
          <nz-option
            *ngFor="let subItem of item.children"
            [nzLabel]="subItem.label"
            [nzValue]="subItem.value"
            [nzDisabled]="subItem.disable"
            [nzHide]="item.hide"
          ></nz-option>
        </nz-option-group>
        <ng-container *ngIf="!isLoading && !item.children">
          <nz-option
            [nzLabel]="item.label"
            [nzValue]="item.value"
            [nzDisabled]="item.disable"
            [nzHide]="item.hide"
          ></nz-option>
        </ng-container>
      </ng-container>
      <nz-option *ngIf="isLoading" nzDisabled nzCustomContent>
        <i nz-icon nzType="loading" class="loading-icon"></i>
        搜索中...
      </nz-option>
    </nz-select>
  `,
})
export class FormlyFieldSelect extends FieldType implements OnInit {
  // 不传值会覆盖antd的默认值，所以这里给一个antd默认值
  defaultOptions = {
    templateOptions: {
      options: [],
      placeholder: '请选择',
      maxMultipleCount: Infinity,
      filterOption: (searchValue: string, item): boolean => {
        if (item && item.nzLabel) {
          return item.nzLabel.toString().toLowerCase().indexOf(searchValue.toLowerCase()) > -1;
        } else {
          return false;
        }
      },
      allowClear: true,
      utoClearSearchValue: true,
      tokenSeparators: [],
      mode: 'default',
      optionHeightPx: 32,
      optionOverflowSize: 8,
      showSearch: true,
    },
  };
  searchChange$: BehaviorSubject<string>;
  optionList: string[] = [];
  isLoading = false;
  emptySearch = false; //值为空时是否也发请求

  ngOnInit(): void {
    this.searchChange$ = new BehaviorSubject(this.model[this.field.key as string] || '');
    const optionList$: Observable<string[]> = this.searchChange$
      .asObservable()
      .pipe(debounceTime(500))
      .pipe(
        switchMap((v) => {
          if (this.to.queryOptions) {
            const res = this.to.queryOptions(v);
            return res instanceof Observable ? res : of(res);
          }
          return of(undefined);
        })
      );
    optionList$.subscribe((data) => {
      if (data) {
        this.optionList = createLabelArr(data);
      }
      this.isLoading = false;
    });

    if (Array.isArray(this.to.options)) {
      this.optionList = createLabelArr(this.to.options);
    } else if (this.to.options instanceof Observable) {
      this.to.options.subscribe((res) => {
        this.optionList = createLabelArr(res);
      });
    }
  }
  onSearch(value) {
    if (this.to.onSearch) {
      this.to.onSearch(value);
    }
    if (!value && !this.to.emptySearch) {
      return;
    }
    if (this.to.queryOptions) {
      this.isLoading = true;
      this.searchChange$.next(value);
    }
  }
  onChange(value) {
    if (this.to.onChange) {
      this.to.onChange(value, this.field);
    }
  }
}
