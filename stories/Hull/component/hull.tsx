import React, { useEffect } from 'react';
import { Graph } from '../../../src';

let graph = null;
const data = {
  nodes: [
    {
      id: '1',
      label: '公司1',
      group: 1
    },
    {
      id: '2',
      label: '公司2',
      group: 1
    },
    {
      id: '3',
      label: '公司3',
      group: 1
    },
    {
      id: '4',
      label: '公司4',
      group: 1
    },
    {
      id: '5',
      label: '公司5',
      group: 2
    },
    {
      id: '6',
      label: '公司6',
      group: 2
    },
    {
      id: '7',
      label: '公司7',
      group: 2
    },
    {
      id: '8',
      label: '公司8',
      group: 2
    },
    {
      id: '9',
      label: '公司9',
      group: 2
    },
  ],
  edges: [
    {
      source: '1',
      target: '1',
      type: 'loop'
    },
    {
      source: '2',
      target: '2',
      type: 'loop'
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
          default: ['drag-canvas', 'zoom-canvas', 'drag-node']
        },
      });
      graph.data(data);
      graph.render();

      let members = graph.getNodes().filter(node => node.getModel().group === 2);
      let nonMembers = graph.getNodes().filter(node => node.getModel().group === 1);

      const hull = graph.addHull({
        id: 'hull1',
        mode: 'convex',
        members: nonMembers,
      })
      const hull2 = graph.addHull({
        id: 'hull2',
        members,
        nonMembers,
        padding: 10,
        style: {
          fill: 'pink',
          stroke: 'red',
        },
        autoUpdate: true
      })

      graph.on('canvas:click', ev => {
        const item = graph.addItem('node', {
          x: ev.x,
          y: ev.y,
          id: Math.random(),
          group: 1
        })
        nonMembers.push(item)
        hull.addMember(item)
        hull2.addNonMember(item)
      })
      graph.on('canvas:contextmenu', ev => {
        ev.preventDefault()
        ev.stopPropagation();
        const item = graph.addItem('node', {
          x: ev.x,
          y: ev.y,
          id: Math.random(),
          group: 2
        })
        console.log(hull2.contain(item))
        members.push(item);
        hull.addNonMember(item)
        hull2.addMember(item)
        console.log(hull2.contain(item))
      })

      graph.on('dblclick', () => {
        hull2.destroy()
      })
    }
  })

  return <div ref={container}></div>;
}

export default HullDemo