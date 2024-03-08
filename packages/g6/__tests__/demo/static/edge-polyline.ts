import { Polyline } from '@/src/elements/edges';
import type { RectStyleProps } from '@/src/elements/nodes';
import { Circle, Rect } from '@/src/elements/nodes';
import type { StaticTestCase } from '../types';

export const edgePolyline: StaticTestCase = async (context) => {
  const { container } = context;

  const commonNodeStyle: RectStyleProps = {
    size: [50, 20],
    fill: '#f8f8f8',
    stroke: '#8b9baf',
    labelPlacement: 'center',
    labelFill: '#8b9baf',
  };

  const commonCPStyle = {
    size: 4,
    fill: '#1890FF',
    zIndex: 5,
  };

  const node0 = container.appendChild(
    new Rect({
      id: 'node-0',
      style: {
        x: 50,
        y: 40,
        ...commonNodeStyle,
        labelText: 'Loop',
      },
    }),
  );

  container.appendChild(
    new Polyline({
      style: {
        sourceNode: node0,
        targetNode: node0,
        stroke: '#1890FF',
        loopPlacement: 'top',
      },
    }),
  );

  container.appendChild(
    new Polyline({
      style: {
        sourceNode: node0,
        targetNode: node0,
        stroke: '#1890FF',
        loopPlacement: 'bottom-right',
      },
    }),
  );

  const node01 = container.appendChild(
    new Rect({
      id: 'node-0-1',
      style: {
        x: 150,
        y: 40,
        ...commonNodeStyle,
        labelText: 'Loop',
        port: true,
        ports: [
          { key: 'top', placement: [0, 0.5], r: 2, fill: '#31d0c6' },
          {
            key: 'left',
            placement: [0.5, 0],
            r: 2,
            fill: '#31d0c6',
          },
        ],
      },
    }),
  );

  container.appendChild(
    new Polyline({
      style: {
        sourceNode: node01,
        targetNode: node01,
        sourcePort: 'top',
        targetPort: 'left',
        stroke: '#1890FF',
        loopPlacement: 'bottom-left',
      },
    }),
  );

  const node02 = container.appendChild(
    new Rect({
      id: 'node-0-2',
      style: {
        x: 250,
        y: 40,
        ...commonNodeStyle,
        labelText: 'Loop',
        port: true,
        ports: [{ key: 'top', placement: [0.5, 0], r: 2, fill: '#31d0c6' }],
      },
    }),
  );

  container.appendChild(
    new Polyline({
      style: {
        sourceNode: node02,
        targetNode: node02,
        sourcePort: 'top',
        stroke: '#1890FF',
      },
    }),
  );

  const node1 = container.appendChild(
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

  const node2 = container.appendChild(
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

  container.appendChild(
    new Polyline({
      style: {
        sourceNode: node1,
        targetNode: node2,
        stroke: '#1890FF',

        router: true,
      },
    }),
  );

  const node3 = container.appendChild(
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

  const node4 = container.appendChild(
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

  container.appendChild(
    new Circle({
      id: 'controlpoint-1',
      style: {
        x: 100,
        y: 175,
        size: 4,
        fill: '#1890FF',
        zIndex: 5,
      },
    }),
  );

  container.appendChild(
    new Polyline({
      style: {
        sourceNode: node3,
        targetNode: node4,
        stroke: '#1890FF',

        controlPoints: [[100, 175]],
        router: false,
      },
    }),
  );

  const node5 = container.appendChild(
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

  const node6 = container.appendChild(
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

  container.appendChild(
    new Circle({
      id: 'controlpoint-2',
      style: {
        x: 100,
        y: 300,
        ...commonCPStyle,
      },
    }),
  );

  container.appendChild(
    new Polyline({
      style: {
        sourceNode: node5,
        targetNode: node6,
        stroke: '#1890FF',

        controlPoints: [[100, 300]],
        router: true,
      },
    }),
  );

  const node7 = container.appendChild(
    new Rect({
      id: 'node-7',
      style: {
        x: 50,
        y: 420,
        labelText: '7',
        ...commonNodeStyle,
        ports: [{ key: 'top', placement: [0.3, 0], r: 2, fill: '#31d0c6' }],
      },
    }),
  );

  const node8 = container.appendChild(
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

  container.appendChild(
    new Polyline({
      style: {
        sourceNode: node7,
        targetNode: node8,
        stroke: '#1890FF',

        router: true,
      },
    }),
  );

  const node9 = container.appendChild(
    new Rect({
      id: 'node-9',
      style: {
        x: 250,
        y: 420,
        labelText: '9',
        ...commonNodeStyle,
      },
    }),
  );

  const node10 = container.appendChild(
    new Rect({
      id: 'node-10',
      style: {
        x: 350,
        y: 375,
        labelText: '10',
        ...commonNodeStyle,
        size: 50,
      },
    }),
  );

  container.appendChild(
    new Circle({
      id: 'controlpoint-2',
      style: {
        x: 340,
        y: 390,
        ...commonCPStyle,
      },
    }),
  );

  container.appendChild(
    new Polyline({
      style: {
        sourceNode: node9,
        targetNode: node10,
        controlPoints: [[340, 390]],
        stroke: '#1890FF',
        router: true,
      },
    }),
  );
};
