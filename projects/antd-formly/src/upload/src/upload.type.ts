import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'formly-field-nz-upload',
  template: ` <nz-upload-base></nz-upload-base>`,
})
export class FormlyFieldUpload extends FieldType {}
