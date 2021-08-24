import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'formly-field-filter-footer',
  template: `
    <div class="filter-footer">
      <button nz-button nzType="primary" type="submit" (click)="to.search()">{{ to.searchText }}</button>
      <button nz-button type="button" (click)="to.clear()">{{ to.clearText }}</button>
      <button
        *ngIf="to.canCollapse"
        nz-button
        nzType="link"
        type="button"
        (click)="toggleCollapse()"
        style="margin: 0;padding-right:0"
      >
        高级筛选<i nz-icon [nzType]="this.to.collapse ? 'down' : 'up'"></i>
      </button>
    </div>
  `,
  styles: [
    `
      button {
        margin-left: 10px;
      }
    `,
  ],
})
export class FilterFooterComponent extends FieldType {
  defaultOptions = {
    templateOptions: {
      label: ' ',
      collapse: true,
      canCollapse: true,
      search: () => {},
      clear: () => {},
    },
  };
  toggleCollapse() {
    this.to.toggleCollapse(!this.to.collapse);
  }
}
