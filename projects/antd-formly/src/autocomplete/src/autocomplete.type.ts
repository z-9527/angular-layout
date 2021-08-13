import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { createLabelArr } from '../../utils';

/**
 * 基础angtd autocompleteAPI
 * 新增options array 下拉数组
 * 新增queryOptions   搜索options函数，返回Observable<array>或数组
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
          <nz-auto-option *ngFor="let option of optionList" [nzValue]="option.value" [nzLabel]="option.label">
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
export class FormlyFieldAutocomplete extends FieldType {
  defaultOptions = {
    templateOptions: {
      options: [],
      placeholder: '请输入或选择',
      defaultActiveFirstOption: true,
      compareWith: (o1, o2) => o1 === o2,
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
  onInput(event) {
    const value = event.target.value;
    if (this.to.onInput) {
      this.to.onInput(value);
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
