import { Component } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

/**
 * formState:
 * cols
 * labelCol
 * wrapperCol
 * itemClassName
 * templateRefs
 * 以上选项同下，优先级为templateOptions的更高
 *
 * templateOptions:
 * cols 表单项所占列数 number
 * labelCol label所占列数 number
 * wrapperCol 表单元素所占列数 number
 * itemClassName 表单项类名 string
 * after 表单元素后面元素内容 string | TemplateRef<any>;
 * afterRef 表单元素后面内容ref索引key（通过在formState上传递templateRefs） string
 *
 */

const DEFAULT_COLS = 12;
const DEFAULT_LABEL_COL = 8;
const DEFAULT_WRAPPER_COL = 16;

@Component({
  selector: 'formly-wrapper-panel',
  styleUrls: ['./form-field.wrapper.less'],
  template: `
    <div nz-col [nzSpan]="cols" [ngClass]="itemClass">
      <nz-form-item>
        <ng-container *ngIf="to.label && to.hideLabel !== true">
          <nz-form-label
            [nzRequired]="to.required && to.hideRequiredMarker !== true"
            [nzSpan]="labelCol"
            [nzTooltipTitle]="to.tooltipTitle"
            [nzTooltipIcon]="to.tooltipIcon"
            >{{ to.label }}
          </nz-form-label>
        </ng-container>
        <nz-form-control [nzValidateStatus]="errorState" [nzErrorTip]="errorTpl" [nzSpan]="wrapperCol">
          <div nz-row>
            <div style="flex: 1;">
              <ng-container #fieldComponent></ng-container>
            </div>
            <div>
              <ng-container *nzStringTemplateOutlet="afterRef">
                {{ afterRef }}
              </ng-container>
            </div>
          </div>
          <ng-template #errorTpl let-control>
            <formly-validation-message [field]="field"></formly-validation-message>
          </ng-template>
        </nz-form-control>
      </nz-form-item>
    </div>
  `,
})
export class FormlyWrapperFormField extends FieldWrapper {
  get errorState() {
    return this.showError ? 'error' : '';
  }
  get cols() {
    return this.to.cols ?? this.formState.cols ?? DEFAULT_COLS;
  }
  get labelCol() {
    if (this.formState.vertical) {
      return 24;
    }
    return this.to.labelCol ?? this.formState.labelCol ?? DEFAULT_LABEL_COL;
  }
  get wrapperCol() {
    if (this.formState.vertical) {
      return 24;
    }
    return this.to.wrapperCol ?? this.formState.wrapperCol ?? DEFAULT_WRAPPER_COL;
  }

  get itemClass() {
    return {
      'item-wrap': true,
      'item-vertical': this.formState.vertical,
      [this.to.itemClassName]: this.to.itemClassName || this.formState.itemClassName,
    };
  }

  get afterRef() {
    const { templateRefs = {} } = this.formState;
    return templateRefs[this.to.afterRef] || this.to.after;
  }
}
