import { INzColumn } from 'table';

export const dataSource = [
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    address:
      '西湖区湖底公园1号放大辣椒放垃圾分类看解放啦开始的减肥离开家撒地方',
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
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    // ref: 'test',
    fixed: 'left',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
    width: '120px',
    align: 'center',
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '操作',
    dataIndex: 'action',
    fixed: 'right',
    // ref: 'action',
  },
];
