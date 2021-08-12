import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

/**
 * 基础antd Radio API
 * type 'radio'|'button' 样式风格
 */

@Component({
  selector: 'formly-field-nz-radio',
  template: `
    <nz-radio-group
      [formControl]="formControl"
      [formlyAttributes]="field"
      [nzName]="to.name"
      [nzSize]="to.size"
      [nzButtonStyle]="to.buttonStyle"
      (ngModelChange)="onChange($event)"
    >
      <ng-container *ngIf="to.type === 'radio'">
        <label nz-radio [nzValue]="o.value" *ngFor="let o of to.options" [nzDisabled]="o.disabled">{{ o.label }}</label>
      </ng-container>
      <ng-container *ngIf="to.type === 'button'">
        <label nz-radio-button [nzValue]="o.value" *ngFor="let o of to.options" [nzDisabled]="o.disabled">{{
          o.label
        }}</label>
      </ng-container>
    </nz-radio-group>
  `,
})
export class FormlyFieldRadio extends FieldType {
  defaultOptions = {
    templateOptions: {
      options: [],
      type: 'radio',
    },
  };
  onChange(value) {
    if (this.to.onChange) {
      this.to.onChange(value, this.field);
    }
  }
}
