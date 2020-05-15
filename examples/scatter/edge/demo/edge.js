import G6 from '@antv/g6';

const lineDash = [4, 2, 1, 2];
G6.registerEdge(
  'line-dash',
  {
    afterDraw(cfg, group) {
      // 获得该边的第一个图形，这里是边的 path
      const shape = group.get('children')[0];
      let index = 0;
      // 边 path 图形的动画
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
          // 返回需要修改的参数集，这里修改了 lineDash,lineDashOffset
          return res;
        },
        {
          repeat: true, // 动画重复
          duration: 3000, // 一次动画的时长为 3000
        },
      );
    },
  },
  'cubic',
); // 该自定义边继承了内置三阶贝塞尔曲线边 cubic

const data = {
  nodes: [
    {
      id: 'node1',
      x: 100,
      y: 100,
      label: '节点1',
      labelCfg: {
        position: 'top',
      },
    },
    {
      id: 'node2',
      x: 300,
      y: 200,
      color: '#40a9ff',
      label: '节点2',
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

const width = document.getElementById('container').scrollWidth;
const height = document.getElementById('container').scrollHeight || 500;
const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  defaultNode: {
    size: 45,
    style: {
      fill: '#DEE9FF',
      stroke: '#5B8FF9',
    },
  },
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
