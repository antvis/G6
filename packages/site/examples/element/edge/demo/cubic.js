import { Graph, iconfont } from '@antv/g6';

const style = document.createElement('style');
style.innerHTML = `@import url('${iconfont.css}');`;
document.head.appendChild(style);

fetch('https://assets.antv.antgroup.com/g6/element-edges.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      data,
      edge: {
        type: 'cubic',
        style: {
          labelText: (d) => d.id,
          labelBackground: true,
          endArrow: true,
          badge: true,
          badgeText: '\ue603',
          badgeFontFamily: 'iconfont',
          badgeBackgroundWidth: 12,
          badgeBackgroundHeight: 12,
        },
      },
      layout: {
        type: 'radial',
        unitRadius: 220,
        linkDistance: 220,
      },
    });

    graph.render();
  });
