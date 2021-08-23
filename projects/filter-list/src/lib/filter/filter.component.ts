import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormArray, FormGroup, FormGroupDirective } from '@angular/forms';
import { FormlyFieldConfig, FormlyForm, FormlyFormOptions } from '@ngx-formly/core';

/**
 * 常规formly-form入参
 * foldRow折叠行，默认为1, 假值为不折叠
 * collapse boolean 是否折叠
 */

const DEFAULT_COLS = 6;

@Component({
  selector: 'lib-filter',
  template: `
    <div class="filter-wrapper">
      <form [formGroup]="form" #ngForm>
        <formly-form #formRef [form]="form" [model]="model" [fields]="_fields" [options]="options" [form]="form">
        </formly-form>
      </form>
    </div>
  `,
  styles: [
    `
      .filter-wrapper {
        background-color: #fff;
      }
    `,
  ],
})
export class FilterComponent implements OnInit, OnChanges {
  @ViewChild('formRef') formRef: FormlyForm;
  @ViewChild(FormGroupDirective) ngForm: FormGroupDirective;
  @Input() form: FormGroup | FormArray = new FormGroup({});
  @Input() model: any = {};
  @Input() options: FormlyFormOptions = { formState: { cols: DEFAULT_COLS } };
  @Input() fields: FormlyFieldConfig[];
  @Input() foldRow: number | boolean = 1;
  @Input() collapse: boolean = true;
  @Output() search: EventEmitter<any> = new EventEmitter();
  @Output() clear: EventEmitter<any> = new EventEmitter();

  _fields: FormlyFieldConfig[] = [];

  /**
   * 计算需要折叠的最小fields长度
   */
  get minCollapseLength() {
    const cols = this.options?.formState?.cols || 6;
    const row = Number(this.foldRow);
    return (24 / cols) * row;
  }

  /**
   * 计算是否需要折叠
   */
  get canCollapse() {
    if (!this.foldRow || this._fields.length <= this.minCollapseLength) {
      return false;
    }
    return true;
  }

  ngOnInit(): void {
    this.handleFields();
  }
  ngOnChanges(changes: SimpleChanges): void {
    for (const [key, obj] of Object.entries(changes)) {
      if (key === 'fields') {
        this._fields = obj.currentValue;
      }
      if (key === 'collapse') {
        this.handleFields();
      }
    }
  }
  onSearch() {
    if (this.form.valid) {
      this.search.emit(this.model);
    }
  }
  onClear() {
    this.clear.emit();
    this.model = {};
    this.formRef.options.resetModel();
  }
  handleFields() {
    let arr = this.fields.slice();
    arr = arr.filter((item) => item.key !== 'collapseField');
    arr = arr.map((item, index) => {
      const hide = index < this.minCollapseLength - 1 ? false : this.collapse;
      return {
        ...item,
        hideExpression: this.canCollapse ? hide : false,
      };
    });
    arr.push({
      key: 'collapseField',
      type: 'filter-footer',
      templateOptions: {
        collapse: this.collapse,
        canCollapse: this.canCollapse,
        search: () => this.onSearch(),
        clear: () => this.onClear(),
        toggleCollapse: (v) => {
          this.collapse = v;
          this.handleFields();
        },
      },
    });
    this._fields = arr;
  }
}
