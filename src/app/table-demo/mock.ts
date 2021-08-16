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
