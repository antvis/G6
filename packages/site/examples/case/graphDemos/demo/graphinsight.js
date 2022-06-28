const container = document.getElementById('container');

const iframe = document.createElement('iframe');
iframe.id = 'graphinsight-bank-demo';

iframe.src =
  'https://codesandbox.io/embed/condescending-platform-mt37im?fontsize=14&hidenavigation=1&theme=dark';
iframe.style =
  'width:100%; height:100%; min-height:500px; border:0; border-radius: 4px; overflow:hidden;';
iframe.allow =
  'accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking';
iframe.sandbox =
  'allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts';
iframe.title = 'condescending-graphinsight-bank';

const info = document.createElement('div');
info.innerHTML = `
<p>友情提示，如果CodeSandbox打开比较慢，可以访问 <a href='https://graphinsight.antgroup.com/#/workspace?type=case' target='_blank'>「GraphInsight」</a> 在线查看，
它是 AntV 团队基于 G6 研发的一款图分析应用低代码搭建工具与分析洞察产品，它既可以帮助用户在线实现关系数据的可视化，也可帮助开发者一键导出图画布SDK，极大提高研发效率
</p>
`;
container.appendChild(info);
container.appendChild(iframe);
