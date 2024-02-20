import { Polyline } from '../../../src/elements/edges';
import { Circle, Rect } from '../../../src/elements/nodes';
import type { StaticTestCase } from '../types';

export const edgePolyline: StaticTestCase = async (context) => {
  const { canvas } = context;

  const node0 = canvas.appendChild(
    new Rect({
      id: 'node-0',
      style: {
        x: 50,
        y: 40,
        width: 30,
        height: 30,
        fill: '#f8f8f8',
        stroke: '#8b9baf',
        labelText: '0',
        labelPosition: 'center',
        labelFill: '#8b9baf',
      },
    }),
  );

  canvas.appendChild(
    new Polyline({
      style: {
        sourceNode: node0,
        targetNode: node0,
        stroke: '#1890FF',
      },
    }),
  );

  const node1 = canvas.appendChild(
    new Rect({
      id: 'node-1',
      style: {
        x: 50,
        y: 120,
        width: 30,
        height: 30,
        fill: '#f8f8f8',
        stroke: '#8b9baf',
        labelText: '1',
        labelPosition: 'center',
        labelFill: '#8b9baf',
      },
    }),
  );

  const node2 = canvas.appendChild(
    new Rect({
      id: 'node-2',
      style: {
        x: 150,
        y: 75,
        width: 30,
        height: 30,
        fill: '#f8f8f8',
        stroke: '#8b9baf',
        labelText: '2',
        labelPosition: 'center',
        labelFill: '#8b9baf',
      },
    }),
  );

  canvas.appendChild(
    new Circle({
      id: 'controlpoint-1',
      style: {
        x: 150,
        y: 75,
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
        sourceNode: node1,
        targetNode: node2,
        controlPoints: [[150, 75]],
        stroke: '#1890FF',
        radius: 0,
      },
    }),
  );

  const node3 = canvas.appendChild(
    new Circle({
      id: 'node-3',
      style: {
        x: 150,
        y: 150,
        width: 30,
        height: 30,
        fill: '#f8f8f8',
        stroke: '#8b9baf',
        labelText: '3',
        labelPosition: 'center',
        labelFill: '#8b9baf',
      },
    }),
  );

  const node4 = canvas.appendChild(
    new Circle({
      id: 'node-4',
      style: {
        x: 50,
        y: 200,
        width: 30,
        height: 30,
        fill: '#f8f8f8',
        stroke: '#8b9baf',
        labelText: '4',
        labelPosition: 'center',
        labelFill: '#8b9baf',
      },
    }),
  );

  canvas.appendChild(
    new Circle({
      style: {
        x: 100,
        y: 190,
        width: 4,
        height: 4,
        fill: '#1890FF',
        zIndex: 5,
      },
    }),
  );

  canvas.appendChild(
    new Circle({
      style: {
        x: 150,
        y: 220,
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
        controlPoints: [
          [100, 190],
          [150, 220],
        ],
        stroke: '#1890FF',
      },
    }),
  );
};
