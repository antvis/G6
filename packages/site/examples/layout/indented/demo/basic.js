import { Graph, treeToGraphData } from '@antv/g6';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/algorithm-category.json')
  .then((res) => res.json())
  .then((data) => {
    function createFindParent(tree) {
      const map = {};
      function buildMap(node, parent) {
        if (parent) map[node.id] = parent;
        node.children?.forEach((child) => buildMap(child, node));
      }
      buildMap(tree, null);
      return (nodeId) => map[nodeId] || null;
    }
    const findParent = createFindParent(data);

    const graph = new Graph({
      container: 'container',
      data: treeToGraphData(data),
      autoFit: 'view',
      node: {
        style: {
          labelText: (d) => d.id,
          labelPlacement: (d) => {
            const id = d.id;
            if (id === data.id) return 'top';
            const lefts = ['Regression', 'Classification'];
            if (lefts.includes(id) || lefts.includes(findParent(id).id)) return 'left';
            return 'right';
          },
          ports: [{ position: 'center' }],
        },
        animation: {
          enter: false,
        },
      },
      edge: {
        type: 'cubic-horizontal',
        animation: {
          enter: false,
        },
      },
      layout: {
        type: 'indented',
        direction: 'H',
        indent: 80,
        getHeight: () => {
          return 10;
        },
        getWidth: () => {
          return 10;
        },
        getSide: (d) => {
          if (d.id === 'Regression' || d.id === 'Classification') return 'left';
          return 'right';
        },
      },
      behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element', 'collapse-expand'],
    });

    graph.render();
  });
