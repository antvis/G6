import { Graph } from '@antv/g6';

fetch('https://assets.antv.antgroup.com/g6/element-nodes.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      data,
      node: {
        type: 'donut',
        style: {
          size: 80,
          fill: '#DB9D0D',
          innerR: 0.5,
          donuts: (_, index) => {
            if (index === 0) return [1, 2, 3];

            if (index === 1) {
              return [
                { value: 50, color: 'red' },
                { value: 150, color: 'green' },
                { value: 100, color: 'blue' },
              ];
            }

            if (index === 4) {
              return [
                { value: 150, fill: 'pink', stroke: '#fff', lineWidth: 1 },
                { value: 250, stroke: '#fff', lineWidth: 1 },
                { value: 200, stroke: '#fff', lineWidth: 1 },
              ];
            }

            return [100, 200, 100, 200];
          },
          labelText: (d) => d.id,
          iconHeight: 20,
          iconWidth: 20,
          iconSrc: 'https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg',
        },
      },
      layout: {
        type: 'grid',
      },
    });

    graph.render();
  });
