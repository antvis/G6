import React, { useEffect } from 'react';
import { Graph } from '../../../src';

let graph = null;
const data = {
  nodes: [
    {
      id: '1',
      label: '公司1',
      group: 1,
    },
    {
      id: '2',
      label: '公司2',
      group: 1,
    },
    {
      id: '3',
      label: '公司3',
      group: 1,
    },
    {
      id: '4',
      label: '公司4',
      group: 1,
    },
    {
      id: '5',
      label: '公司5',
      group: 2,
    },
    {
      id: '6',
      label: '公司6',
      group: 2,
    },
    {
      id: '7',
      label: '公司7',
      group: 2,
    },
    {
      id: '8',
      label: '公司8',
      group: 2,
    },
    {
      id: '9',
      label: '公司9',
      group: 2,
    },
  ],
  edges: [
    {
      source: '1',
      target: '1',
      type: 'loop',
    },
    {
      source: '2',
      target: '2',
      type: 'loop',
    },
    {
      source: '1',
      target: '2',
      data: {
        type: 'A',
        amount: '100,000 元',
        date: '2019-08-03',
      },
    },
    {
      source: '1',
      target: '3',
      data: {
        type: 'B',
        amount: '100,000 元',
        date: '2019-08-03',
      },
    },
    {
      source: '2',
      target: '5',
      data: {
        type: 'C',
        amount: '100,000 元',
        date: '2019-08-03',
      },
    },
    {
      source: '5',
      target: '6',
      data: {
        type: 'B',
        amount: '100,000 元',
        date: '2019-08-03',
      },
    },
    {
      source: '3',
      target: '4',
      data: {
        type: 'C',
        amount: '100,000 元',
        date: '2019-08-03',
      },
    },
    {
      source: '4',
      target: '7',
      data: {
        type: 'B',
        amount: '100,000 元',
        date: '2019-08-03',
      },
    },
    {
      source: '1',
      target: '8',
      data: {
        type: 'B',
        amount: '100,000 元',
        date: '2019-08-03',
      },
    },
    {
      source: '1',
      target: '9',
      data: {
        type: 'C',
        amount: '100,000 元',
        date: '2019-08-03',
      },
    },
  ],
};

const HullDemo = () => {
  const container = React.useRef();
  useEffect(() => {
    if (!graph) {
      graph = new Graph({
        container: container.current as string | HTMLElement,
        width: 500,
        height: 500,
        modes: {
          default: ['drag-canvas', 'zoom-canvas', 'drag-node'],
        },
      });
      graph.data(data);
      graph.render();

      const hull1 = graph.createHull({
        id: 'hull1',
        type: 'smooth-convex',
        padding: 15,
        members: graph.getNodes().filter((node) => node.getModel().group === 1),
      });
      const hull2 = graph.createHull({
        id: 'hull2',
        members: graph.getNodes().filter((node) => node.getModel().group === 2),
        nonMembers: graph.getNodes().filter((node) => node.getModel().group === 1),
        padding: 15,
        type: 'bubble',
        style: {
          fill: 'pink',
          stroke: 'red',
        },
        update: 'drag',
      });

      graph.on('canvas:contextmenu', (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        const item = graph.addItem('node', {
          x: ev.x,
          y: ev.y,
          id: Math.random(),
          group: 2,
        });
        hull2.addMember(item);
      });

      graph.on('afterupdateitem', (e) => {
        if (hull1.members.indexOf(e.item) > -1 || hull1.nonMembers.indexOf(e.item) > -1) {
          hull1.updateData(hull1.members);
        }
      });

      graph.on('node:dragend', (e) => {
        const item = e.item;
        const memberIdx = hull2.members.indexOf(item);
        if (memberIdx > -1) {
          // 如果移出原hull范围，则去掉
          if (!hull2.contain(item)) {
            hull2.removeMember(item);
          } else {
            hull2.updateData(hull2.members);
          }
        } else {
          if (hull2.contain(item)) hull2.addMember(item);
        }
      });
    }
  });

  return <div ref={container}></div>;
};

export default HullDemo;
