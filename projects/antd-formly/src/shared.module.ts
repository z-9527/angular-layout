import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyFormFieldModule } from './form-field';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { IconDefinition } from '@ant-design/icons-angular';
import { CloseCircleFill } from '@ant-design/icons-angular/icons';

const icons: IconDefinition[] = [CloseCircleFill];

@NgModule({
  declarations: [],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NzIconModule.forChild(icons)],
  exports: [CommonModule, ReactiveFormsModule, FormlyFormFieldModule, FormsModule, NzIconModule],
})
export class SharedModule {}
