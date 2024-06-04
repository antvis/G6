import { Graph } from '@antv/g6';

const style = document.createElement('style');
style.innerHTML = "@import url('//at.alicdn.com/t/a/font_470089_tmp5emp4d9.css');";
document.head.appendChild(style);

fetch('https://assets.antv.antgroup.com/g6/element-nodes.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      data,
      node: {
        type: 'circle',
        style: {
          size: 40,
          labelText: (d) => d.id,
          iconFontFamily: 'iconfont',
          iconText: '\ue602',
        },
      },
      layout: {
        type: 'grid',
      },
    });

    graph.render();
  });
