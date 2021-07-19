import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
// eslint-disable-next-line no-unused-vars
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-formly-demo',
  templateUrl: './formly-demo.component.html',
  styleUrls: ['./formly-demo.component.less'],
})
export class FormlyDemoComponent implements OnInit {
  form = new FormGroup({});
  model: any = {};
  // options: FormlyFormOptions = {
  //   formState: {
  //     // cols: 8,
  //     vertical: true,
  //   },
  // };
  fields: FormlyFieldConfig[] = [];

  constructor() {}

  ngOnInit(): void {
    this.fields = [
      {
        key: 'input',
        type: 'input',
        templateOptions: {
          label: 'input',
          required: true,
          itemClassName: 'ttttt',
          tooltipTitle: '提示信息提示',
          afterRef: 'btnRef',
          // labelCol: 4,
          // cols: 12,
        },
      },
      {
        key: 'textarea',
        type: 'textarea',
        templateOptions: {
          label: 'textarea',
          required: true,
          showCount: true,
          maxLength: 100,
        },
      },
      {
        key: 'firstName3',
        type: 'input',
        templateOptions: {
          label: 'firstName3',
          suffixRef: 'search',
        },
      },
      {
        key: 'number',
        type: 'number',
        templateOptions: {
          label: 'number',
        },
      },
      {
        key: 'select',
        type: 'select',
        templateOptions: {
          label: 'select',
          options: [
            { label: '111', value: '111' },
            { label: '测试', children: [{ label: 'children', value: 'chidren' }] },
          ],
          showSearch: true,
        },
      },
      {
        key: 'm-select',
        type: 'select',
        templateOptions: {
          label: 'm-select',
          options: [
            { label: 'Option 1', value: '1' },
            { label: 'Option 2', value: '2' },
            { label: 'Option 3', value: '3' },
          ],
          mode: 'multiple',
        },
      },
      {
        key: 's-select',
        type: 'select',
        defaultValue: '0',
        templateOptions: {
          label: 's-select',
          // mode: 'multiple',
          options: [{ label: 'Option 0', value: '0' }],
          queryOptions: (v) => {
            console.log('v: ', v);
            return of([{ label: `Option ${v}`, value: v }]);
          },
        },
      },
      {
        key: 'cascader',
        type: 'cascader',
        templateOptions: {
          label: 'cascader',
          showSearch: true,
          optionRenderRef: 'renderTpl',
          options: [
            {
              value: 'zhejiang',
              label: 'Zhejiang',
              children: [
                {
                  value: 'hangzhou',
                  label: 'Hangzhou',
                  children: [
                    {
                      value: 'xihu',
                      label: 'West Lake',
                      isLeaf: true,
                    },
                  ],
                },
                {
                  value: 'ningbo',
                  label: 'Ningbo',
                  isLeaf: true,
                },
              ],
            },
            {
              value: 'jiangsu',
              label: 'Jiangsu',
              children: [
                {
                  value: 'nanjing',
                  label: 'Nanjing',
                  children: [
                    {
                      value: 'zhonghuamen',
                      label: 'Zhong Hua Men',
                      isLeaf: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      {
        key: 'district',
        type: 'district',
        templateOptions: {
          label: 'district',
          // areaCode: of('120100').pipe(delay(1500)),
        },
      },
    ];
  }
  submit() {
    if (this.form.valid) {
      console.log(JSON.stringify(this.model));
    }
  }
}
