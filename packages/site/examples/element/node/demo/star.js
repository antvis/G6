import { Graph } from '@antv/g6';

fetch('https://assets.antv.antgroup.com/g6/element-nodes.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      data,
      node: {
        type: 'star',
        style: {
          size: 40,
          labelText: (d) => d.id,
          iconSrc: 'https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg',
        },
      },
      layout: {
        type: 'grid',
      },
    });

    graph.render();
  });
