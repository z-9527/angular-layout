import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'formly-field-nz-time',
  template: `
    <nz-time-picker
      style="width: 100%;"
      [formControl]="formControl"
      [formlyAttributes]="field"
      [nzAddOn]="to.addOn"
      [nzAllowEmpty]="to.allowEmpty"
      [nzAutoFocus]="to.autoFocus"
      [nzBackdrop]="to.backdrop"
      [nzClearText]="to.clearText"
      [nzNowText]="to.nowText"
      [nzOkText]="to.okText"
      [nzDefaultOpenValue]="to.defaultOpenValue"
      [nzDisabled]="to.disabled"
      [nzDisabledHours]="to.disabledHours"
      [nzDisabledMinutes]="to.disabledMinutes"
      [nzDisabledSeconds]="to.disabledSeconds"
      [nzFormat]="to.format"
      [nzHideDisabledOptions]="to.hideDisabledOptions"
      [nzHourStep]="to.hourStep"
      [nzMinuteStep]="to.minuteStep"
      [nzSecondStep]="to.secondStep"
      [nzOpen]="to.open"
      [nzPlaceHolder]="to.placeholder"
      [nzPopupClassName]="to.popupClassName"
      [nzUse12Hours]="to.use12Hours"
      [nzSuffixIcon]="to.suffixIcon"
      (nzOpenChange)="to.openChange && to.openChange($event)"
      (ngModelChange)="onChange($event)"
    ></nz-time-picker>
  `,
})
export class FormlyFieldTime extends FieldType {
  defaultOptions = {
    templateOptions: {
      placeholder: '请选择时间',
      allowEmpty: true,
      format: 'HH:mm:ss',
      hourStep: 1,
      minuteStep: 1,
      secondStep: 1,
    },
  };
  onChange(value) {
    if (this.to.onChange) {
      this.to.onChange(value, this.field);
    }
  }
}
