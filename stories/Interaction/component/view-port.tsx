import React, { useEffect } from 'react';
import G6 from '../../../src';
import { IGraph } from '../../../src/interface/graph';

let graph: IGraph = null;

const data = {
  nodes: [
    {
      id: 'node1',
      x: 150,
      y: 50,
      label: 'node1',
    },
    {
      id: 'node2',
      x: 200,
      y: 150,
      label: 'node2',
    },
    {
      id: 'node3',
      x: 100,
      y: 150,
      label: 'node3',
    },
  ],
  edges: [
    {
      source: 'node1',
      target: 'node2',
    },
    {
      source: 'node2',
      target: 'node3',
    },
    {
      source: 'node3',
      target: 'node1',
    },
  ],
};

const MoveViewPort = () => {
  const container = React.useRef();
  useEffect(() => {
    if (!graph) {
      graph = new G6.Graph({
        container: container.current as string | HTMLElement,
        width: 500,
        height: 500,
        fitView: false,
        defaultNode: {
          style: {
            fill: '#DEE9FF',
            stroke: '#5B8FF9',
          },
        },
        defaultEdge: {
          style: {
            stroke: '#b5b5b5',
          },
        },
        modes: {
          default: ['drag-canvas'],
        },
      });
      graph.data(data);
      graph.render();

      const handleNodeClick = (event) => {
        const item = event.item;
        // 聚焦当前点击的节点（把节点放到视口中心）

        const matrix = item.get('group').getMatrix();
        const point = {
          x: matrix[6],
          y: matrix[7],
        };
        const w = graph.get('width');
        const h = graph.get('height');
        // 找到视口中心
        const viewCenter = {
          x: w / 2,
          y: h / 2,
        };
        const modelCenter = graph.getPointByCanvas(viewCenter.x, viewCenter.y);
        let viewportMatrix = graph.get('group').getMatrix();
        if (!viewportMatrix) viewportMatrix = G6.Util.mat3.create();
        // 画布平移的目标位置，最终目标是graph.translate(dx, dy);
        const dx = (modelCenter.x - point.x) * viewportMatrix[0];
        const dy = (modelCenter.y - point.y) * viewportMatrix[4];
        let lastX = 0;
        let lastY = 0;
        let newX = void 0;
        let newY = void 0;
        // 动画每次平移一点，直到目标位置
        graph.get('canvas').animate(
          (ratio) => {
            newX = dx * ratio;
            newY = dy * ratio;
            graph.translate(newX - lastX, newY - lastY);
            lastX = newX;
            lastY = newY;
          },
          {
            duration: 300,
            easing: 'easeCubic',
          },
        );
      };

      // 监听节点上的click事件
      graph.on('node:click', handleNodeClick);
    }
  });
  return <div ref={container}></div>;
};

export default MoveViewPort;
