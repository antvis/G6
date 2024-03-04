import { Quadratic } from '@/src/elements/edges';
import { createEdgeNode } from '@@/utils';
import type { StaticTestCase } from '../types';

export const edgeQuadratic: StaticTestCase = async (context) => {
  const { container } = context;

  const quadratic1 = new Quadratic({
    style: {
      // key shape
      sourceNode: createEdgeNode([100, 50]),
      targetNode: createEdgeNode([300, 50]),
      stroke: '#1890FF',
      lineWidth: 2,
      // halo
      halo: true,
      haloOpacity: 0.25,
      haloLineWidth: 12,
      // label
      labelText: 'default quadratic',
      labelFontSize: 12,
      // end arrow
      endArrow: true,
    },
  });

  const quadratic2 = new Quadratic({
    style: {
      // key shape
      sourceNode: createEdgeNode([100, 150]),
      targetNode: createEdgeNode([300, 150]),
      controlPoint: [200, 200],
      stroke: '#1890FF',
      lineWidth: 2,
      // label
      labelText: 'controlPoint=[200, 200]',
      labelFontSize: 12,
      labelMaxLines: 2,
      labelWordWrap: true,
      labelWordWrapWidth: 78,
      // end arrow
      endArrow: true,
    },
  });

  const quadratic3 = new Quadratic({
    style: {
      // key shape
      sourceNode: createEdgeNode([100, 250]),
      targetNode: createEdgeNode([300, 250]),
      curveOffset: 50,
      curvePosition: 0.5,
      stroke: '#1890FF',
      lineWidth: 2,
      // label
      labelText: 'curveOffset=50, curvePosition:0.5',
      labelFontSize: 12,
      labelMaxLines: 2,
      labelWordWrap: true,
      labelWordWrapWidth: 100,
      // end arrow
      endArrow: true,
    },
  });

  const quadratic4 = new Quadratic({
    style: {
      // key shape
      sourceNode: createEdgeNode([100, 350]),
      targetNode: createEdgeNode([300, 350]),
      curveOffset: 50,
      curvePosition: 0.25,
      stroke: '#1890FF',
      lineWidth: 2,
      // label
      labelText: 'curveOffset=50, curvePosition:0.25',
      labelFontSize: 12,
      labelMaxLines: 2,
      labelWordWrap: true,
      labelWordWrapWidth: 110,
      // end arrow
      endArrow: true,
    },
  });

  container.appendChild(quadratic1);
  container.appendChild(quadratic2);
  container.appendChild(quadratic3);
  container.appendChild(quadratic4);
};
