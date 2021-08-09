import { Component, Input } from '@angular/core';
import { NzCheckBoxOptionInterface } from 'ng-zorro-antd/checkbox';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

interface CheckBoxOptionInterface extends NzCheckBoxOptionInterface {
  span?: number;
}

@Component({
  selector: 'nz-checkbox-layout',
  template: `
    <nz-checkbox-wrapper style="width: 100%;" (nzOnChange)="onChange($event)">
      <div nz-row>
        <div *ngFor="let item of options" nz-col [nzSpan]="item.span">
          <label
            nz-checkbox
            [nzValue]="item.value"
            [ngModel]="_value?.includes(item.value)"
            [disabled]="_disabled || item.disabled"
            >{{ item.label }}</label
          >
        </div>
      </div>
    </nz-checkbox-wrapper>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: NzCheckboxLayoutComponent,
      multi: true,
    },
  ],
})
export class NzCheckboxLayoutComponent implements ControlValueAccessor {
  @Input() options: CheckBoxOptionInterface[] = [];
  _value: string[] = [];
  _onChange;
  _disabled = false;
  writeValue(v: string[]): void {
    this._value = v;
  }
  registerOnChange(fn: any): void {
    this._onChange = fn;
  }
  registerOnTouched(_fn: any): void {}
  setDisabledState(isDisabled: boolean): void {
    this._disabled = isDisabled;
  }

  onChange(v: string[]) {
    this._value = v;
    this._onChange(v);
  }
}
