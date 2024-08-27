import { Graph, iconfont } from '@antv/g6';

const style = document.createElement('style');
style.innerHTML = `@import url('${iconfont.css}');`;
document.head.appendChild(style);

fetch('https://assets.antv.antgroup.com/g6/relations.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      autoFit: 'view',
      data,
      node: {
        style: {
          size: (datum) => datum.id.length * 2 + 10,
          label: false,
          labelText: (datum) => datum.id,
          labelBackground: true,
          icon: false,
          iconFontFamily: 'iconfont',
          iconText: '\ue6f6',
          iconFill: '#fff',
        },
        palette: {
          type: 'group',
          field: (datum) => datum.id,
          color: ['#1783FF', '#00C9C9', '#F08F56', '#D580FF'],
        },
      },
      edge: {
        style: {
          stroke: '#e2e2e2',
        },
      },
      plugins: [{ key: 'fisheye', type: 'fisheye', nodeStyle: { label: true, icon: true } }],
    });
    graph.render();
  });
