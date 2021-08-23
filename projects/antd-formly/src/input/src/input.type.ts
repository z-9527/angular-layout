import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

/**
 * 继承ng.ant的input API(去掉nz前缀)
 * 新增addOnAfterRef、addOnBeforeRef、prefixRef、suffixRef（string）通过在formState上传递templateRefs
 * showCount boolean 是否展示最大数量功能
 * maxLength number 最大输入字符数量
 * allowClear boolean 是否有移除图标
 */

@Component({
  selector: 'formly-field-nz-input',
  template: `
    <ng-container [ngSwitch]="to.type">
      <nz-input-number
        *ngSwitchCase="'number'"
        [formControl]="formControl"
        [formlyAttributes]="field"
        [style]="to.style"
        [nzAutoFocus]="to.autoFocus"
        [nzDisabled]="to.disabled"
        [nzMax]="to.max"
        [nzMin]="to.min"
        [nzPrecision]="to.precision"
        [nzPrecisionMode]="to.precisionMode"
        [nzSize]="to.size"
        [nzInputMode]="to.inputMode"
        [nzPlaceHolder]="to.placeholder"
        [nzId]="to.id"
        (nzFocus)="to.focus && to.focus($event)"
        (nzBlur)="to.blur && to.blur($event)"
        (ngModelChange)="onChange($event)"
      ></nz-input-number>

      <ng-container *ngSwitchCase="'textarea'">
        <nz-textarea-count *ngIf="to.showCount; else textareaRef" [nzMaxCharacterCount]="to.maxLength || 100">
          <textarea
            nz-input
            [formControl]="formControl"
            [formlyAttributes]="field"
            [rows]="to.rows"
            [maxLength]="to.maxLength || 100"
            (ngModelChange)="onChange($event)"
          ></textarea>
        </nz-textarea-count>
        <ng-template #textareaRef>
          <textarea
            nz-input
            [formControl]="formControl"
            [formlyAttributes]="field"
            [rows]="to.rows"
            (ngModelChange)="onChange($event)"
          ></textarea>
        </ng-template>
      </ng-container>

      <nz-input-group
        *ngSwitchDefault
        [nzAddOnAfter]="getRef(to.addOnAfterRef) || to.addOnAfter"
        [nzAddOnBefore]="getRef(to.addOnBeforeRef) || to.addOnBefore"
        [nzPrefix]="getRef(to.prefixRef) || to.prefix"
        [nzSuffix]="getRef(to.suffixRef) || to.suffix || (to.allowClear && clearRef)"
        [nzCompact]="to.compact"
        [nzSearch]="to.search"
        [nzSize]="to.size"
        [maxLength]="to.maxLength"
      >
        <input
          nz-input
          [type]="to.type || 'text'"
          [formControl]="formControl"
          [formlyAttributes]="field"
          [nzBorderless]="to.borderless"
          (ngModelChange)="onChange($event)"
        />
      </nz-input-group>
      <ng-template #clearRef>
        <i
          *ngIf="formControl.value"
          nz-icon
          nzTheme="fill"
          nzType="close-circle"
          class="ant-input-clear-icon"
          (click)="formControl.setValue(undefined)"
        ></i>
      </ng-template>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlyFieldInput extends FieldType {
  getRef(ref) {
    const { templateRefs = {} } = this.formState;
    return templateRefs[ref];
  }

  onChange(value) {
    if (this.to.onChange) {
      this.to.onChange(value, this.field);
    }
  }
}
