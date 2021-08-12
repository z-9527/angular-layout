/* eslint-disable no-unused-vars */
import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  NzIconRenderTemplate,
  NzUploadChangeParam,
  NzUploadFile,
  NzUploadListType,
  NzUploadTransformFileType,
  NzUploadXHRArgs,
  UploadFilter,
} from 'ng-zorro-antd/upload';
import { Observable, Subscription } from 'rxjs';

/**
 * 继承antd upload API
 *
 * text string 上传按钮文字
 * formatResponse function 格式化服务器返回的结果，主要是为了匹配antd upload的格式
 */

@Component({
  selector: 'nz-upload-base',
  template: ` <nz-upload
    [nzAccept]="accept"
    [nzAction]="action"
    [nzDirectory]="directory"
    [nzBeforeUpload]="beforeUpload"
    [nzCustomRequest]="customRequest"
    [nzData]="data"
    [nzDisabled]="_disabled"
    [nzFileList]="_value || fileList"
    [nzLimit]="limit"
    [nzSize]="size"
    [nzFileType]="fileType"
    [nzFilter]="filter"
    [nzHeaders]="headers"
    [nzListType]="listType"
    [nzMultiple]="multiple"
    [nzName]="name"
    [nzShowUploadList]="showUploadList"
    [nzShowButton]="showButton"
    [nzWithCredentials]="withCredentials"
    [nzOpenFileDialogOnClick]="openFileDialogOnClick"
    [nzPreview]="preview"
    [nzPreviewFile]="previewFile"
    [nzPreviewIsImage]="previewIsImage"
    [nzRemove]="remove"
    [nzDownload]="download"
    [nzTransformFile]="transformFile"
    [nzIconRender]="iconRender"
    [nzFileListRender]="fileListRender"
    (nzChange)="handleChange($event)"
  >
    <button *ngIf="listType !== 'picture-card'" nz-button type="button" [disabled]="_disabled">
      <i nz-icon nzType="upload"></i>
      {{ text }}
    </button>
    <div *ngIf="listType === 'picture-card'">
      <i nz-icon nzType="plus"></i>
      <div>{{ text }}</div>
    </div>
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
  @Input() text?: string = '上传';
  @Input() accept?: string;
  @Input() action?: string = '';
  @Input() directory?: boolean = false;
  @Input() beforeUpload: (file: NzUploadFile, fileList: NzUploadFile[]) => boolean | Observable<boolean>;
  @Input() customRequest?: (item: NzUploadXHRArgs) => Subscription;
  @Input() data?: {} | ((file: NzUploadFile) => {} | Observable<{}>);
  @Input() fileList?: NzUploadFile[] = [];
  @Input() limit? = 0;
  @Input() size? = 0;
  @Input() fileType?: string;
  @Input() filter?: UploadFilter[] = [];
  @Input() headers?: {} | ((file: NzUploadFile) => {} | Observable<{}>);
  @Input() listType?: NzUploadListType = 'text';
  @Input() multiple? = false;
  @Input() name? = 'file';
  @Input() showUploadList = true;
  @Input() showButton = true;
  @Input() withCredentials = false;
  @Input() openFileDialogOnClick = true;
  @Input() preview?: (file: NzUploadFile) => void;
  @Input() previewFile?: (file: NzUploadFile) => Observable<string>;
  @Input() previewIsImage?: (file: NzUploadFile) => boolean;
  @Input() remove?: (file: NzUploadFile) => boolean | Observable<boolean>;
  @Input() download?: (file: NzUploadFile) => void;
  @Input() transformFile?: (file: NzUploadFile) => NzUploadTransformFileType;
  @Input() iconRender: NzIconRenderTemplate | null = null;
  @Input() fileListRender: TemplateRef<void> | null = null;
  @Input() formatResponse?: (res: any) => NzUploadFile = (res) => res;
  @Output() readonly nzChange: EventEmitter<NzUploadChangeParam> = new EventEmitter<NzUploadChangeParam>();

  _value: NzUploadFile[] = [];
  _disabled = false;
  _onChange = (v: NzUploadFile[]) => {};
  writeValue(v: NzUploadFile[]): void {
    this._value = Array.isArray(v) ? v.map((item) => this.formatResponse(item)) : v;
  }
  registerOnChange(fn: any): void {
    this._onChange = fn;
  }
  registerOnTouched(_fn: any): void {}
  setDisabledState(isDisabled: boolean): void {
    this._disabled = isDisabled;
  }

  handleChange(event: NzUploadChangeParam) {
    this.nzChange.emit(event);
    if (event.type === 'success' || event.type === 'removed') {
      const arr: NzUploadFile[] = event.fileList.reduce((result: NzUploadFile[], cur: NzUploadFile) => {
        if (cur.status === 'done' || !cur.status) {
          const data = this.formatResponse(cur.response?.data || cur);
          result.push(data);
        }
        return result;
      }, []);
      this._value = arr;
      this._onChange(arr);
    }
  }
}
