import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { Observable } from 'rxjs';

/**
 * 基础angtd autocompleteAPI
 * 新增options array 下拉数组
 * 新增queryOptions   搜索options函数，返回Observable
 */
@Component({
  selector: 'formly-field-nz-autocomplete',
  template: `
    <div>
      <input
        nz-input
        [formControl]="formControl"
        [formlyAttributes]="field"
        [nzAutocomplete]="auto"
        [placeholder]="to.placeholder"
        (input)="onInput($event)"
        (ngModelChange)="onChange($event)"
      />
      <nz-autocomplete
        #auto
        [nzBackfill]="to.backfill"
        [nzDefaultActiveFirstOption]="to.defaultActiveFirstOption"
        [nzWidth]="to.width"
        [nzOverlayClassName]="to.overlayClassName"
        [nzOverlayStyle]="to.overlayStyle"
        [compareWith]="to.compareWith"
      >
        <ng-container *ngIf="!isLoading">
          <nz-auto-option
            *ngFor="let option of to.options | formlySelectOptions | async"
            [nzValue]="option.value"
            [nzLabel]="option.label"
          >
            {{ option.label }}
          </nz-auto-option>
        </ng-container>
        <nz-auto-option *ngIf="isLoading" nzDisabled>
          <i nz-icon nzType="loading" class="loading-icon"></i>
          搜索中...
        </nz-auto-option>
      </nz-autocomplete>
    </div>
  `,
})
export class FormlyFieldAutocomplete extends FieldType implements OnInit {
  defaultOptions = {
    templateOptions: {
      options: [],
      placeholder: '请输入或选择',
      defaultActiveFirstOption: true,
      compareWith: (o1, o2) => o1 === o2,
    },
  };
  isLoading = false;

  ngOnInit(): void {
    this.getOptions(this.model[this.field.key as string] || '');
  }
  onInput(event) {
    const value = event.target.value;
    if (this.to.onInput) {
      this.to.onInput(value);
    }
    if (!value && !this.to.emptySearch) {
      return;
    }

    this.getOptions(value);
  }
  getOptions(value?) {
    if (typeof this.to.queryOptions !== 'function') {
      return;
    }
    const res = this.to.queryOptions(value);
    if (res instanceof Observable) {
      this.isLoading = true;
      res.subscribe((result) => {
        this.to.options = result;
        this.isLoading = false;
      });
    } else {
      this.to.options = res;
    }
  }
  onChange(value) {
    if (this.to.onChange) {
      this.to.onChange(value, this.field);
    }
  }
}
