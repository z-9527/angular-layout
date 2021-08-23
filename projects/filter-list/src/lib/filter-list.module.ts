import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilterListComponent } from './filter-list.component';
import { TableModule } from 'table';
import { FormlyNgZorroAntdModule } from 'antd-formly';
import { FilterComponent } from './filter/filter.component';
import { FormlyModule } from '@ngx-formly/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FilterFooterComponent } from './filter/filter-footer';

@NgModule({
  declarations: [FilterListComponent, FilterComponent, FilterFooterComponent],
  imports: [
    CommonModule,
    TableModule,
    FormlyNgZorroAntdModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'filter-footer',
          component: FilterFooterComponent,
          wrappers: ['form-field'],
        },
      ],
    }),
    ReactiveFormsModule,
    NzButtonModule,
    NzIconModule,
  ],
  exports: [FilterListComponent, FilterComponent],
})
export class FilterListModule {}
