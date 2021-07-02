import { IField } from 'info-table';

export const config: IField[][] = [
  [
    {
      label: '当事人类型',
      key: 'litigantType',
      format: (data, key) => `${data[key]}（${data.age}岁）`,
    },
    {
      label: '注册号',
      key: 'code',
    },
  ],
  [{ label: '住所', key: 'address' }],
  [
    {
      label: '时间',
      key: 'date',
    },
  ],
  [
    { label: '当事人类型', key: 'litigantType1' },
    {
      label: '网址',
      key: 'link',
      link: true,
      // link:(data,key)=>'www.google.com'
    },
  ],
  [{ label: 'Content', key: 'content' }],
  [{ label: 'TEST', key: 'test', ref: 'testRef' }],
  [{ label: 'TESt2', key: 'content', ellipsis: false }],
];

export const data = {
  litigantType: '个人',
  code: '203925845028946826',
  address: '北京市通州区张家湾',
  litigantType1: '通州区张家湾',
  code2: '2039258',
  date: 1612162465000,
  test: 'abc',
  age: 22,
  link: 'www.baidu.com',
  content: `2021年2月的夜空中，最引人注目的是天狼星。它是全天最亮的恒星，天黑之后，在东南方天空中闪烁着蓝白色的光芒。它和北边的两颗亮星组成一个等边三角形，
    这就是著名的“冬季大三角”。其中西北角那颗略呈红色，名为参宿四，是猎户座的“左肩膀”。它的下方是猎户座的“腰部”，有另外3颗亮度几乎相同的亮星倾斜着一字排开，十分醒目，就算在北京这样的大城市，在满月之夜也能看到它们。在我国古代的星官体系中，
    猎户座所在天区属于“参宿”。“参”即是“三”，“腰带”上的3颗星就是参宿的标志，古时的天文学家称之为“衡石”。我国的民间，常常把它们视为代表福、禄、寿等吉祥寓意的三星。
    人们常说“三星高照，新年来到”，是指在天黑后不久，看到这3颗星位于正南方天空的时候，新的一年就来到了。2021年2月11日的除夕之夜，三星高照于正南的时间是在日落之后大约两个半小时。如果在北京观测，则是20时25分左右。`,
};
