import { INzColumn } from 'table';

export const dataSource = [
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号放大辣椒放垃圾分类看解放啦开始的减肥离开家撒地方',
  },
  {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
];

export const columns: INzColumn[] = [
  {
    title: '序号',
    key: 'number',
    fixed: 'left',
    showSort: true,
    sortFn: (a, b) => b.number - a.number,
  },
  {
    title: '姓名',
    key: 'name',
    fixed: 'left',
    showSort: true,
    sortFn: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: '年龄',
    key: 'age',
    align: 'center',
    format(text) {
      return `${text}岁`;
    },
  },
  {
    title: '住址',
    key: 'address',
    width: 100,
  },
  {
    title: '链接',
    key: 'link',
    type: 'link',
    // link: (text, record, index) => 'www.b.com', //可自定义link值
  },
  {
    title: '时间',
    key: 'time',
    type: 'date',
  },
  {
    title: 'column1',
    key: 'column',
  },
  {
    title: 'column1',
    key: 'column',
  },
  {
    title: 'column1',
    key: 'column',
  },
  {
    title: '操作',
    key: 'action',
    fixed: 'right',
    width: 100,
    ref: 'actionRef',
  },
];
