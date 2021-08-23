import { FormlyFieldConfig } from '@ngx-formly/core';
import { of } from 'rxjs';

export const filterFields: FormlyFieldConfig[] = [
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
  // {
  //   key: 'textarea',
  //   type: 'textarea',
  //   templateOptions: {
  //     label: 'textarea',
  //     required: true,
  //     // showCount:true,
  //   },
  // },
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
    key: 'select2',
    type: 'select',
    templateOptions: {
      label: 'select2',
      options: [
        { label: '111', value: '111' },
        { label: '测试', children: [{ label: 'children', value: 'chidren' }] },
      ],
    },
  },
  {
    key: 'text',
    type: 'input',
    templateOptions: {
      label: 'text',
    },
  },
];
