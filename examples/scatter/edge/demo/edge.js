import G6 from '@antv/g6';

const lineDash = [4, 2, 1, 2];
G6.registerEdge(
  'line-dash',
  {
    afterDraw(cfg, group) {
      // get the first shape in the group, it is the edge's path here=
      const shape = group.get('children')[0];
      let index = 0;
      // Define the animation
      shape.animate(
        () => {
          index++;
          if (index > 9) {
            index = 0;
          }
          const res = {
            lineDash,
            lineDashOffset: -index,
          };
          // returns the modified configurations here, lineDash and lineDashOffset here
          return res;
        },
        {
          repeat: true, // whether executes the animation repeatly
          duration: 3000, // the duration for executing once
        },
      );
    },
  },
  'cubic', // extend the built-in edge 'cubic'
);

const data = {
  nodes: [
    {
      id: 'node1',
      x: 100,
      y: 100,
      label: 'Node 1',
      labelCfg: {
        position: 'top',
      },
    },
    {
      id: 'node2',
      x: 300,
      y: 200,
      color: '#40a9ff',
      label: 'Node 2',
      labelCfg: {
        position: 'left',
        offset: 10,
      },
    },
  ],
  edges: [
    {
      source: 'node1',
      target: 'node2',
    },
  ],
};


const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;
const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  defaultEdge: {
    type: 'line-dash',
    style: {
      lineWidth: 2,
      stroke: '#bae7ff',
    },
  },
});
graph.data(data);
graph.render();

if (window && typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.get('destroyed')) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.changeSize(container.scrollWidth, container.scrollHeight);
  };