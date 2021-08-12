import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'formly-field-nz-date',
  template: `
    <ng-container>
      <nz-date-picker
        *ngIf="!to.range"
        style="width:100%"
        [formControl]="formControl"
        [formlyAttributes]="field"
        [nzAllowClear]="to.allowClear"
        [nzAutoFocus]="to.autoFocus"
        [nzBackdrop]="to.backdrop"
        [nzDefaultPickerValue]="to.defaultPickerValue"
        [nzDisabled]="to.disabled"
        [nzDisabledDate]="to.disabledDate"
        [nzDropdownClassName]="to.dropdownClassName"
        [nzFormat]="to.format"
        [nzInputReadOnly]="to.inputReadOnly"
        [nzLocale]="to.locale"
        [nzMode]="to.mode"
        [nzPlaceHolder]="to.placeholder"
        [nzPopupStyle]="to.popupStyle"
        [nzRenderExtraFooter]="to.renderExtraFooter"
        [nzSize]="to.size"
        [nzSuffixIcon]="to.suffixIcon"
        [nzBorderless]="to.borderless"
        [nzInline]="to.inline"
        (nzOnOpenChange)="to.onOpenChange && to.onOpenChange($event)"
        [nzDateRender]="to.dateRender"
        [nzDisabledTime]="to.disabledTime"
        [nzShowTime]="to.showTime"
        [nzShowToday]="to.showToday"
        [nzShowNow]="to.showNow"
        (nzOnOk)="to.onOk && to.onOk($event)"
        (ngModelChange)="onChange($event)"
      ></nz-date-picker>
      <nz-range-picker
        *ngIf="to.range"
        style="width:100%"
        [formControl]="formControl"
        [formlyAttributes]="field"
        [nzAllowClear]="to.allowClear"
        [nzAutoFocus]="to.autoFocus"
        [nzBackdrop]="to.backdrop"
        [nzDefaultPickerValue]="to.defaultPickerValue"
        [nzDisabled]="to.disabled"
        [nzDisabledDate]="to.disabledDate"
        [nzDropdownClassName]="to.dropdownClassName"
        [nzFormat]="to.format"
        [nzInputReadOnly]="to.inputReadOnly"
        [nzLocale]="to.locale"
        [nzMode]="to.mode"
        [nzPlaceHolder]="to.placeholder"
        [nzPopupStyle]="to.popupStyle"
        [nzRenderExtraFooter]="to.renderExtraFooter"
        [nzSize]="to.size"
        [nzSuffixIcon]="to.suffixIcon"
        [nzBorderless]="to.borderless"
        [nzInline]="to.inline"
        (nzOnOpenChange)="to.onOpenChange && to.onOpenChange($event)"
        [nzRanges]="to.ranges"
        [nzSeparator]="to.separator"
        (nzOnCalendarChange)="to.onCalendarChange && to.onCalendarChange($event)"
        [nzShowTime]="to.showTime"
        [nzDisabledTime]="to.disabledTime"
        (nzOnOk)="to.onOk && to.onOk($event)"
        (ngModelChange)="onChange($event)"
      ></nz-range-picker>
    </ng-container>
  `,
})
export class FormlyFieldDate extends FieldType {
  defaultOptions = {
    templateOptions: {
      allowClear: true,
      mode: 'date',
      showToday: true,
      showNow: true,
    },
  };
  onChange(value) {
    if (this.to.onChange) {
      this.to.onChange(value, this.field);
    }
  }
}
