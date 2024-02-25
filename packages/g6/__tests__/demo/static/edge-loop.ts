import { Cubic } from '@/src/elements/edges';
import { Circle, Star } from '@/src/elements/nodes';
import type { LoopEdgePosition } from '@/src/types';
import type { StaticTestCase } from '../types';

export const edgeLoop: StaticTestCase = async (context) => {
  const { canvas } = context;

  const node1 = canvas.appendChild(
    new Circle({
      id: 'node-1',
      style: {
        x: 100,
        y: 100,
        width: 50,
        height: 50,
        fill: '#f8f8f8',
        stroke: '#8b9baf',
        ports: [
          { key: 'left', position: [0, 0.5], r: 4, stroke: '#31d0c6', fill: '#fff' },
          { key: 'right', position: [1, 0.5], r: 4, fill: '#31d0c6' },
          { key: 'top', position: [0.5, 0], r: 4, fill: '#31d0c6' },
          { key: 'bottom', position: [0.5, 1], r: 4, stroke: '#31d0c6', fill: '#fff' },
        ],
      },
    }),
  );

  canvas.appendChild(
    new Cubic({
      style: {
        sourceNode: node1,
        targetNode: node1,
        sourcePort: 'top',
        targetPort: 'right',
        loopDist: 80,
        stroke: '#1890FF',
        lineWidth: 2,
        endArrow: true,
      },
    }),
  );

  const node2 = canvas.appendChild(
    new Circle({
      id: 'node-1',
      style: {
        x: 200,
        y: 100,
        width: 50,
        height: 50,
        fill: '#f8f8f8',
        stroke: '#8b9baf',
        ports: [
          { key: 'left', position: [0, 0.5], r: 4, stroke: '#31d0c6', fill: '#fff' },
          { key: 'right', position: [1, 0.5], r: 4, fill: '#31d0c6' },
          { key: 'top', position: [0.5, 0], r: 4, stroke: '#31d0c6', fill: '#fff' },
          { key: 'bottom', position: [0.5, 1], r: 4, stroke: '#31d0c6', fill: '#fff' },
        ],
      },
    }),
  );

  canvas.appendChild(
    new Cubic({
      style: {
        sourceNode: node2,
        targetNode: node2,
        sourcePort: 'right',
        stroke: '#1890FF',
        lineWidth: 2,
        endArrow: true,
      },
    }),
  );

  const node2_1 = canvas.appendChild(
    new Star({
      id: 'node-2-1',
      style: {
        x: 300,
        y: 100,
        width: 50,
        height: 50,
        fill: '#f8f8f8',
        stroke: '#8b9baf',
        ports: [{ key: 'right-bottom', position: 'right-bottom', r: 4, fill: '#31d0c6' }],
      },
    }),
  );

  canvas.appendChild(
    new Cubic({
      style: {
        sourceNode: node2_1,
        targetNode: node2_1,
        sourcePort: 'right-bottom',
        stroke: '#1890FF',
        lineWidth: 2,
        endArrow: true,
      },
    }),
  );

  const node3 = canvas.appendChild(
    new Circle({
      id: 'node-3',
      style: {
        x: 100,
        y: 250,
        width: 50,
        height: 50,
        fill: '#f8f8f8',
        stroke: '#8b9baf',
        labelText: `🔃`,
      },
    }),
  );

  ['top', 'right', 'bottom', 'left'].forEach((position) => {
    canvas.appendChild(
      new Cubic({
        style: {
          sourceNode: node3,
          targetNode: node3,
          curveOffset: 100,
          loopPosition: position as LoopEdgePosition,
          stroke: '#1890FF',
          lineWidth: 2,
          labelText: position,
          endArrow: true,
        },
      }),
    );
  });

  const node4 = canvas.appendChild(
    new Circle({
      id: 'node-2',
      style: {
        x: 250,
        y: 250,
        width: 50,
        height: 50,
        fill: '#f8f8f8',
        stroke: '#8b9baf',
        labelText: `🔃`,
      },
    }),
  );

  ['top-right', 'bottom-right', 'top-left', 'bottom-left'].forEach((position) => {
    canvas.appendChild(
      new Cubic({
        style: {
          sourceNode: node4,
          targetNode: node4,
          loopPosition: position as LoopEdgePosition,
          stroke: '#1890FF',
          lineWidth: 2,
          labelText: position,
          endArrow: true,
        },
      }),
    );
  });

  const node5 = canvas.appendChild(
    new Star({
      id: 'node-5',
      style: {
        x: 100,
        y: 400,
        width: 50,
        height: 50,
        fill: '#f8f8f8',
        stroke: '#8b9baf',
        labelText: `🔄`,
      },
    }),
  );

  ['top', 'right', 'bottom', 'left'].forEach((position) => {
    canvas.appendChild(
      new Cubic({
        style: {
          sourceNode: node5,
          targetNode: node5,
          loopPosition: position as LoopEdgePosition,
          loopClockwise: false,
          stroke: '#1890FF',
          lineWidth: 2,
          labelText: position,
          endArrow: true,
        },
      }),
    );
  });

  const node6 = canvas.appendChild(
    new Star({
      id: 'node-6',
      style: {
        x: 250,
        y: 400,
        width: 50,
        height: 50,
        fill: '#f8f8f8',
        stroke: '#8b9baf',
        labelText: `🔄`,
      },
    }),
  );

  ['top-right', 'bottom-right', 'top-left', 'bottom-left'].forEach((position) => {
    canvas.appendChild(
      new Cubic({
        style: {
          sourceNode: node6,
          targetNode: node6,
          loopPosition: position as LoopEdgePosition,
          loopClockwise: false,
          stroke: '#1890FF',
          lineWidth: 2,
          labelText: position,
          endArrow: true,
        },
      }),
    );
  });
};
