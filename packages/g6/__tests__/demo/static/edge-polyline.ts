import { Polyline } from '../../../src/elements/edges';
import { Circle, Rect } from '../../../src/elements/nodes';
import type { StaticTestCase } from '../types';

export const edgePolyline: StaticTestCase = async (context) => {
  const { canvas } = context;

  const commonNodeStyle = {
    width: 50,
    height: 20,
    fill: '#f8f8f8',
    stroke: '#8b9baf',
    labelPosition: 'center',
    labelFill: '#8b9baf',
  };

  const commonCPStyle = {
    width: 4,
    height: 4,
    fill: '#1890FF',
    zIndex: 5,
  };

  const node0 = canvas.appendChild(
    new Rect({
      id: 'node-0',
      style: {
        x: 50,
        y: 40,
        ...commonNodeStyle,
        port: false,
        ports: [{ key: 'top', position: [0, 0.5], r: 2, stroke: '#31d0c6', fill: '#fff' }],
      },
    }),
  );

  canvas.appendChild(
    new Polyline({
      style: {
        sourceNode: node0,
        targetNode: node0,
        stroke: '#1890FF',
        loopPosition: 'bottom-left',
      },
    }),
  );

  const node1 = canvas.appendChild(
    new Rect({
      id: 'node-1',
      style: {
        x: 50,
        y: 120,
        labelText: '1',
        ...commonNodeStyle,
      },
    }),
  );

  const node2 = canvas.appendChild(
    new Rect({
      id: 'node-2',
      style: {
        x: 150,
        y: 75,
        labelText: '2',
        ...commonNodeStyle,
      },
    }),
  );

  canvas.appendChild(
    new Polyline({
      style: {
        sourceNode: node1,
        targetNode: node2,
        stroke: '#1890FF',
        radius: 0,
        router: true,
      },
    }),
  );

  const node3 = canvas.appendChild(
    new Rect({
      id: 'node-3',
      style: {
        x: 50,
        y: 220,
        labelText: '3',
        ...commonNodeStyle,
      },
    }),
  );

  const node4 = canvas.appendChild(
    new Rect({
      id: 'node-4',
      style: {
        x: 150,
        y: 175,
        labelText: '4',
        ...commonNodeStyle,
      },
    }),
  );

  canvas.appendChild(
    new Circle({
      id: 'controlpoint-1',
      style: {
        x: 100,
        y: 175,
        width: 4,
        height: 4,
        fill: '#1890FF',
        zIndex: 5,
      },
    }),
  );

  canvas.appendChild(
    new Polyline({
      style: {
        sourceNode: node3,
        targetNode: node4,
        stroke: '#1890FF',
        radius: 0,
        controlPoints: [[100, 175]],
        router: false,
      },
    }),
  );

  const node5 = canvas.appendChild(
    new Rect({
      id: 'node-5',
      style: {
        x: 50,
        y: 320,
        labelText: '5',
        ...commonNodeStyle,
      },
    }),
  );

  const node6 = canvas.appendChild(
    new Rect({
      id: 'node-6',
      style: {
        x: 150,
        y: 275,
        labelText: '6',
        ...commonNodeStyle,
      },
    }),
  );

  canvas.appendChild(
    new Circle({
      id: 'controlpoint-2',
      style: {
        x: 100,
        y: 300,
        ...commonCPStyle,
      },
    }),
  );

  canvas.appendChild(
    new Polyline({
      style: {
        sourceNode: node5,
        targetNode: node6,
        stroke: '#1890FF',
        radius: 0,
        controlPoints: [[100, 300]],
        router: true,
      },
    }),
  );

  const node7 = canvas.appendChild(
    new Rect({
      id: 'node-7',
      style: {
        x: 50,
        y: 420,
        labelText: '7',
        ...commonNodeStyle,
        ports: [{ key: 'top', position: [0.3, 0], r: 2, stroke: '#31d0c6', fill: '#fff' }],
      },
    }),
  );

  const node8 = canvas.appendChild(
    new Rect({
      id: 'node-8',
      style: {
        x: 150,
        y: 375,
        labelText: '8',
        ...commonNodeStyle,
      },
    }),
  );

  canvas.appendChild(
    new Polyline({
      style: {
        sourceNode: node7,
        targetNode: node8,
        stroke: '#1890FF',
        radius: 0,
        router: true,
      },
    }),
  );
  // const node3 = canvas.appendChild(
  //   new Circle({
  //     id: 'node-3',
  //     style: {
  //       x: 150,
  //       y: 150,
  //       width: 30,
  //       height: 30,
  //       fill: '#f8f8f8',
  //       stroke: '#8b9baf',
  //       labelText: '3',
  //       labelPosition: 'center',
  //       labelFill: '#8b9baf',
  //     },
  //   }),
  // );

  // const node4 = canvas.appendChild(
  //   new Circle({
  //     id: 'node-4',
  //     style: {
  //       x: 50,
  //       y: 200,
  //       width: 30,
  //       height: 30,
  //       fill: '#f8f8f8',
  //       stroke: '#8b9baf',
  //       labelText: '4',
  //       labelPosition: 'center',
  //       labelFill: '#8b9baf',
  //     },
  //   }),
  // );

  // canvas.appendChild(
  //   new Circle({
  //     style: {
  //       x: 100,
  //       y: 190,
  //       width: 4,
  //       height: 4,
  //       fill: '#1890FF',
  //       zIndex: 5,
  //     },
  //   }),
  // );

  // canvas.appendChild(
  //   new Circle({
  //     style: {
  //       x: 150,
  //       y: 220,
  //       width: 4,
  //       height: 4,
  //       fill: '#1890FF',
  //       zIndex: 5,
  //     },
  //   }),
  // );

  // canvas.appendChild(
  //   new Polyline({
  //     style: {
  //       sourceNode: node3,
  //       targetNode: node4,
  //       controlPoints: [
  //         [100, 190],
  //         [150, 220],
  //       ],
  //       stroke: '#1890FF',
  //     },
  //   }),
  // );
};
