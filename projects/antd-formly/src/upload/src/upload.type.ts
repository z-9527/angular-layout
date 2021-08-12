import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

/**
 * onChange 上传值变化时触发
 * nzChange 上传状态改变时触发
 */

@Component({
  selector: 'formly-field-nz-upload',
  template: ` <nz-upload-base
    [formControl]="formControl"
    [formlyAttributes]="field"
    [text]="to.text"
    [formatResponse]="to.formatResponse"
    [accept]="to.accept"
    [action]="to.action"
    [directory]="to.directory"
    [beforeUpload]="to.beforeUpload"
    [beforeUpload]="to.beforeUpload"
    [data]="to.data"
    [attr.disabled]="to.disabled"
    [fileList]="to.fileList"
    [limit]="to.limit"
    [size]="to.size"
    [fileType]="to.fileType"
    [filter]="to.filter"
    [headers]="to.headers"
    [listType]="to.listType"
    [multiple]="to.multiple"
    [name]="to.name"
    [showUploadList]="to.showUploadList"
    [showButton]="to.showButton"
    [withCredentials]="to.withCredentials"
    [openFileDialogOnClick]="to.openFileDialogOnClick"
    [preview]="to.preview"
    [previewFile]="to.previewFile"
    [previewIsImage]="to.previewIsImage"
    [remove]="to.remove"
    [download]="to.download"
    [transformFile]="to.transformFile"
    [iconRender]="to.iconRender"
    [fileListRender]="to.fileListRender"
    (ngModelChange)="onChange($event)"
    (nzChange)="to.nzChange && to.nzChange($event)"
  ></nz-upload-base>`,
})
export class FormlyFieldUpload extends FieldType {
  defaultOptions = {
    templateOptions: {
      text: '上传',
      showButton: true,
      filter: [],
      limit: 0,
      size: 0,
      listType: 'text',
      name: 'file',
      showUploadList: true,
      openFileDialogOnClick: true,
      formatResponse: (res) => res,
    },
  };
  onChange(value) {
    if (this.to.onChange) {
      this.to.onChange(value, this.field);
    }
  }
}
