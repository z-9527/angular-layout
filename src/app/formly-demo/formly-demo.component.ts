import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
// eslint-disable-next-line no-unused-vars
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import * as dayjs from 'dayjs';

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
        },
      },
      {
        key: 'search-select',
        type: 'select',
        defaultValue: '0',
        templateOptions: {
          label: 'search-select',
          // mode: 'multiple',
          options: [{ label: 'Option 0', value: '0' }],
          queryOptions: (v) => of([{ label: `Option ${v}`, value: v }]),
        },
      },
      {
        key: 'cascader',
        type: 'cascader',
        templateOptions: {
          label: 'cascader',
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
        key: 'address',
        type: 'address',
        templateOptions: {
          label: 'address',
          // areaCode: of('120100').pipe(delay(1500)),
        },
      },
      {
        key: 'radio',
        type: 'radio',
        templateOptions: {
          label: 'radio',
          options: [
            { label: 'Apple', value: 'Apple' },
            { label: 'Pear', value: 'Pear' },
            { label: 'Orange', value: 'Orange', disabled: true },
          ],
        },
      },
      {
        key: 'checkbox',
        type: 'checkbox',
        templateOptions: {
          label: 'checkbox',
          options: [
            { label: 'Apple', value: 'Apple' },
            { label: 'Pear', value: 'Pear' },
            { label: 'Orange', value: 'Orange' },
          ],
        },
      },
      {
        key: 'switch',
        type: 'switch',
        templateOptions: {
          label: 'switch',
        },
      },
      {
        key: 'tree-select',
        type: 'tree-select',
        templateOptions: {
          label: 'tree-select',
          nodes: [
            {
              title: 'parent 1',
              key: '100',
              children: [
                {
                  title: 'parent 1-0',
                  key: '1001',
                  children: [
                    { title: 'leaf 1-0-0', key: '10010', isLeaf: true },
                    { title: 'leaf 1-0-1', key: '10011', isLeaf: true },
                  ],
                },
                {
                  title: 'parent 1-1',
                  key: '1002',
                  children: [{ title: 'leaf 1-1-0', key: '10020', isLeaf: true }],
                },
              ],
            },
            {
              title: 'parent 1',
              key: '200',
              children: [
                {
                  title: 'parent 1-0',
                  key: '2001',
                  children: [
                    { title: 'leaf 1-0-0', key: '20010', isLeaf: true },
                    { title: 'leaf 1-0-1', key: '20011', isLeaf: true },
                  ],
                },
                {
                  title: 'parent 1-1',
                  key: '2002',
                  children: [{ title: 'leaf 1-1-0', key: '20020', isLeaf: true }],
                },
              ],
            },
            {
              title: 'parent 1',
              key: '300',
              children: [
                {
                  title: 'parent 1-0',
                  key: '3001',
                  children: [
                    { title: 'leaf 1-0-0', key: '30010', isLeaf: true },
                    { title: 'leaf 1-0-1', key: '30011', isLeaf: true },
                  ],
                },
                {
                  title: 'parent 1-1',
                  key: '3002',
                  children: [{ title: 'leaf 1-1-0', key: '30020', isLeaf: true }],
                },
              ],
            },
          ],
        },
      },
      {
        key: 'upload',
        type: 'upload',
        templateOptions: {
          label: 'upload',
          action: '/upload',
          formatResponse: (res) => ({
            ...res,
            status: 'done',
            name: res.name || res.filename,
            uid: res.uid || res.url,
          }),
        },
      },
      {
        key: 'date',
        type: 'date',
        templateOptions: {
          label: 'date',
        },
      },
      {
        key: 'date-range',
        type: 'date',
        templateOptions: {
          label: 'date-range',
          range: true,
        },
      },
    ];
  }
  submit() {
    if (this.form.valid) {
      let params = { ...this.model };
      params.date = params.date && dayjs(params.date).format('YYYY-MM-DD HH:mm:ss');

      [params.startTime, params.endTime] = params['date-range'] || [];
      params.startTime = params.startTime && dayjs(params.startTime).format('YYYY-MM-DD HH:mm:ss');
      params.endTime = params.endTime && dayjs(params.endTime).format('YYYY-MM-DD HH:mm:ss');

      delete params['date-range'];
      console.log('params: ', params);
    }
  }
}
