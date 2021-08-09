import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'nz-upload-base',
  template: ` <nz-upload
    nzAction="https://www.mocky.io/v2/5cc8019d300000980a055e76"
    [nzHeaders]="{ authorization: 'authorization-text' }"
    (nzChange)="handleChange($event)"
  >
    <button nz-button type="button">
      <i nz-icon nzType="upload"></i>
      {{ text }}
    </button>
  </nz-upload>`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: NzUploadBaseComponent,
      multi: true,
    },
  ],
})
export class NzUploadBaseComponent implements ControlValueAccessor {
  @Input() text: string = '上传';
  @Input() accept: string;
  @Input() action: string;
  @Input() directory: boolean = false;
  @Input() nzBeforeUpload: boolean = false;
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

  handleChange(v: string[]) {
    this._value = v;
    this._onChange(v);
  }
}
