
export const data = [
  { time: '2023-03-25', label: '参与人数', col: 100},
  { time: '2023-03-25', label: '触发人数', col: 200 },
  { time: '2023-03-26', label: '参与人数', col: 200 },
  { time: '2023-03-26', label: '触发人数', col: 300 },
  { time: '2023-03-27', label: '参与人数', col: 300 },
  { time: '2023-03-27', label: '触发人数', col: 200 },
  { time: '2023-03-28', label: '参与人数', col: 300 },
  { time: '2023-03-28', label: '触发人数', col: 200 },
  { time: '2023-03-29', label: '参与人数', col: 300 },
  { time: '2023-03-29', label: '触发人数', col: 200 },
  { time: '2023-03-30', label: '参与人数', col: 300 },
  { time: '2023-03-30', label: '触发人数', col: 200 },
  { time: '2023-03-25', label: '参与率(%)', lineValue: 0 },
  { time: '2023-03-25', label: '出发率(%)', lineValue: 70 },
  { time: '2023-03-26', label: '参与率(%)', lineValue: 40 },
  { time: '2023-03-26', label: '出发率(%)', lineValue: 60 },
  { time: '2023-03-27', label: '参与率(%)', lineValue: 60 },
  { time: '2023-03-27', label: '出发率(%)', lineValue: 20 },
  { time: '2023-03-28', label: '参与率(%)', lineValue: 60 },
  { time: '2023-03-28', label: '出发率(%)', lineValue: 20 },
  { time: '2023-03-29', label: '参与率(%)', lineValue: 60 },
  { time: '2023-03-29', label: '出发率(%)', lineValue: 20 },
  { time: '2023-03-30', label: '参与率(%)', lineValue: 60 },
  { time: '2023-03-30', label: '出发率(%)', lineValue: 20 },
];

// 横向滚动 demo 数据：60 个 x 类目，每天 2 条柱记录 + 2 条线记录，数据量超出容器宽度时自动出滚动条
const scrollDays = Array.from({ length: 60 }, (_, i) => {
  const d = new Date(2023, 2, 25 + i);
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${mm}-${dd}`;
});

export const scrollData = scrollDays.flatMap((time, i) => [
  { time, label: '参与人数', col: 100 + i },
  { time, label: '触发人数', col: 200 + i },
  { time, label: '参与率(%)', lineValue: 20 + (i % 30) },
  { time, label: '出发率(%)', lineValue: 40 + (i % 20) },
]);

export const updatedData = [
  { time: '2023-03-25', label: '参与人数', col: 100 },
  { time: '2023-03-25', label: '触发人数', col: 200 },
  { time: '2023-03-26', label: '参与人数', col: 200 },
  { time: '2023-03-26', label: '触发人数', col: 300 },
  { time: '2023-03-27', label: '参与人数', col: 300 },
  { time: '2023-03-27', label: '触发人数', col: 200 },
  { time: '2023-03-28', label: '参与人数', col: 300 },
  { time: '2023-03-28', label: '触发人数', col: 200 },
  { time: '2023-03-29', label: '参与人数', col: 50 },
  { time: '2023-03-29', label: '触发人数', col: 10 },
  { time: '2023-03-30', label: '参与人数', col: 300 },
  { time: '2023-03-30', label: '触发人数', col: 200 },

  { time: '2023-03-25', label: '参与率(%)', lineValue: 30 },
  { time: '2023-03-25', label: '出发率(%)', lineValue: 70 },
  { time: '2023-03-26', label: '参与率(%)', lineValue: 40 },
  { time: '2023-03-26', label: '出发率(%)', lineValue: 60 },
  { time: '2023-03-27', label: '参与率(%)', lineValue: 60 },
  { time: '2023-03-27', label: '出发率(%)', lineValue: 20 },
  { time: '2023-03-28', label: '参与率(%)', lineValue: 60 },
  { time: '2023-03-28', label: '出发率(%)', lineValue: 20 },
  { time: '2023-03-29', label: '参与率(%)', lineValue: 80 },
  { time: '2023-03-29', label: '出发率(%)', lineValue: 10 },
  { time: '2023-03-30', label: '参与率(%)', lineValue: 60 },
  { time: '2023-03-30', label: '出发率(%)', lineValue: 20 },
];
