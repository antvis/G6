import { Graph, iconfont } from '@antv/g6';

const style = document.createElement('style');
style.innerHTML = `@import url('${iconfont.css}');`;
document.head.appendChild(style);

fetch('https://assets.antv.antgroup.com/g6/element-nodes.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      data,
      node: {
        type: 'image',
        style: {
          size: 40,
          labelText: (d) => d.id,
          src: 'https://gw.alipayobjects.com/mdn/rms_6ae20b/afts/img/A*N4ZMS7gHsUIAAAAAAAAAAABkARQnAQ',
          haloStroke: '#227eff',
        },
        state: {
          inactive: {
            fillOpacity: 0.5,
          },
          disabled: {
            fillOpacity: 0.2,
          },
        },
      },
      layout: {
        type: 'grid',
      },
    });

    graph.render();
  });
