import { NgModule } from '@angular/core';
import { FormlyModule } from '@ngx-formly/core';
import { SharedModule } from '../../shared.module';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormlyFieldUpload } from './upload.type';
import { NzUploadBaseComponent } from './upload.base';
@NgModule({
  declarations: [FormlyFieldUpload, NzUploadBaseComponent],
  imports: [
    SharedModule,
    NzButtonModule,
    NzUploadModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'upload',
          component: FormlyFieldUpload,
          wrappers: ['form-field'],
        },
      ],
    }),
  ],
})
export class FormlyNzUploadModule {}
