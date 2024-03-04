import { Line } from '@/src/elements/edges';
import { createEdgeNode } from '@@/utils';
import type { AnimationTestCase } from '../types';

export const edgeLine: AnimationTestCase = async (context) => {
  const { container } = context;

  const line = new Line({
    style: {
      sourceNode: createEdgeNode([100, 50]),
      targetNode: createEdgeNode([300, 50]),
      lineWidth: 2,
      lineDash: [10, 10],
      stroke: '#1890FF',
      halo: true,
      haloOpacity: 0.25,
      haloLineWidth: 12,
      label: true,
      labelText: 'line-edge',
      labelFontSize: 12,
      labelFill: '#000',
      labelPadding: 0,
      startArrow: true,
      startArrowType: 'circle',
      endArrow: true,
      endArrowFill: 'red',
    },
  });

  container.appendChild(line);

  const result = line.animate(
    [
      { sourceNode: createEdgeNode([100, 150]), targetNode: createEdgeNode([300, 200]), haloOpacity: 0 },
      { sourceNode: createEdgeNode([100, 150]), targetNode: createEdgeNode([450, 350]), haloOpacity: 0.25 },
    ],
    { duration: 1000, fill: 'both' },
  );

  return result;
};

edgeLine.times = [0, 500, 1000];
