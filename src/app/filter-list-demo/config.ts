import { FormlyFieldConfig } from '@ngx-formly/core';
import { of } from 'rxjs';
import { INzColumn } from 'table';

export const fields: FormlyFieldConfig[] = [
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

export const columns: INzColumn[] = [
  {
    title: '序号',
    dataIndex: 'number',
    fixed: 'left',
    showSort: true,
    sortFn: (a, b) => b.number - a.number,
  },
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
    showSort: true,
    sortFn: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: '年龄',
    dataIndex: 'age',
    align: 'center',
    format(text) {
      return `${text}岁`;
    },
  },
  {
    title: '住址',
    dataIndex: 'address',
    width: 100,
  },
  {
    title: '链接',
    dataIndex: 'link',
    type: 'link',
    // link: (text, record, index) => 'www.b.com', //可自定义link值
  },
  {
    title: '时间',
    dataIndex: 'time',
    type: 'date',
  },
  {
    title: 'column1',
    dataIndex: 'column',
  },
  {
    title: 'column1',
    dataIndex: 'column',
  },
  {
    title: 'column1',
    dataIndex: 'column',
  },
  {
    title: '操作',
    dataIndex: 'action',
    fixed: 'right',
    width: 100,
    ref: 'actionRef',
  },
];
