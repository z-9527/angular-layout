import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * 继承antd的Cascader API
 * 新增
 * district boolean 是否是地区组件（自动获取数据源）
 * areaCode string 指定区域code
 */

@Component({
  selector: 'formly-field-nz-cascader',
  template: `
    <nz-cascader
      [formControl]="formControl"
      [formlyAttributes]="field"
      [nzAllowClear]="to.allowClear"
      [nzAutoFocus]="to.autoFocus"
      [nzBackdrop]="to.backdrop"
      [nzChangeOn]="to.changeOn"
      [nzChangeOnSelect]="to.changeOnSelect"
      [nzColumnClassName]="to.columnClassName"
      [nzDisabled]="to.disabled"
      [nzExpandIcon]="to.expandIcon"
      [nzExpandTrigger]="to.expandTrigger"
      [nzLabelProperty]="to.labelProperty"
      [nzLabelRender]="to.labelRender"
      [nzLoadData]="loadData"
      [nzMenuClassName]="to.menuClassName"
      [nzMenuStyle]="to.menuStyle"
      [nzNotFoundContent]="to.notFoundContent"
      [nzOptionRender]="getRef(to.optionRenderRef) || to.optionRender"
      [nzOptions]="to.options"
      [nzPlaceHolder]="to.placeholder"
      [nzShowArrow]="to.showArrow"
      [nzShowInput]="to.showInput"
      [nzShowSearch]="to.showSearch"
      [nzSize]="to.size"
      [nzSuffixIcon]="to.suffixIcon"
      [nzValueProperty]="to.valueProperty"
      (nzClear)="to.clear && to.clear()"
      (nzVisibleChange)="to.visibleChange && to.visibleChange($event)"
      (nzSelectionChange)="to.selectionChange && to.selectionChange($event)"
      (ngModelChange)="onChange($event)"
    ></nz-cascader>
  `,
})
export class FormlyFieldCascader extends FieldType {
  defaultOptions = {
    templateOptions: {
      placeholder: '请选择',
      allowClear: true,
      expandTrigger: 'click',
      labelProperty: 'label',
      expandIcon: '',
      showArrow: true,
      showInput: true,
      valueProperty: 'value',
      suffixIcon: 'down',
      showSearch: true,
    },
  };
  constructor(private httpService: HttpClient) {
    super();
  }

  getRef(ref) {
    const { templateRefs = {} } = this.formState;
    return templateRefs[ref];
  }

  loadData = (node: any, index: number): PromiseLike<void> => {
    if (this.to.loadData) {
      return this.loadData(node, index);
    }
    if (this.to.district) {
      return new Promise((resolve) => {
        forkJoin({ list: this.getDistrictList(), code: this.getAreaCode() }).subscribe(
          ({ list, code }) => {
            this.to.options = this.filterByCode(list, code);
            resolve();
          },
          () => {
            resolve();
          }
        );
      });
    }
  };

  getDistrictList(): Observable<any> {
    return this.httpService.jsonp('https://mayon.gdapi.net/api/area/queryAreaRestApi', 'callback').pipe(
      map((res: any) => {
        const data = this.handleData(res?.data?.districts[0]?.districts);
        return data;
      })
    );
  }

  getAreaCode() {
    if (this.to.areaCode instanceof Observable) {
      return this.to.areaCode;
    }
    return of(this.to.areaCode);
  }

  handleData(arr) {
    if (!Array.isArray(arr)) {
      return [];
    }
    return arr.map((item) => {
      const children = this.handleData(item.districts);
      return {
        ...item,
        value: item.adcode,
        label: item.name,
        children,
        isLeaf: !children || children.length === 0,
      };
    });
  }

  filterByCode(arr, code) {
    if (!code || !Array.isArray(arr)) {
      return arr || [];
    }
    const startMap = {
      province: 0,
      city: 2,
      district: 4,
    };
    return arr.filter((item) => {
      item.children = this.filterByCode(item.children, code);
      if (item.adcode === '900000') {
        item.level = 'province';
      }
      const startNum = startMap[item.level];
      return (
        code.slice(startNum, startNum + 2) === '00' ||
        code.slice(startNum, startNum + 2) === item.adcode.slice(startNum, startNum + 2) ||
        item.adcode === code
      );
    });
  }
  onChange(value) {
    if (this.to.onChange) {
      this.to.onChange(value, this.field);
    }
  }
}
