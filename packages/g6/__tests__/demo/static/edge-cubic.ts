import { Cubic } from '@/src/elements/edges';
import { createEdgeNode } from '@@/utils';
import type { StaticTestCase } from '../types';

export const edgeCubic: StaticTestCase = async (context) => {
  const { container } = context;

  const cubic1 = new Cubic({
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
      labelText: 'default cubic',
      labelFontSize: 12,
      labelOffsetY: -15,
      // end arrow
      endArrow: true,
    },
  });

  const cubic2 = new Cubic({
    style: {
      // key shape
      sourceNode: createEdgeNode([100, 150]),
      targetNode: createEdgeNode([300, 150]),
      controlPoints: [
        [200, 200],
        [200, 100],
      ],
      stroke: '#1890FF',
      lineWidth: 2,
      // label
      labelText: 'controlPoints=[[200, 200],[200,100]]',
      labelFontSize: 12,
      labelOffsetY: -15,
      // end arrow
      endArrow: true,
    },
  });

  const cubic3 = new Cubic({
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
      labelOffsetY: -15,
      // end arrow
      endArrow: true,
    },
  });

  const cubic4 = new Cubic({
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
      labelOffsetY: -15,
      // end arrow
      endArrow: true,
    },
  });

  container.appendChild(cubic1);
  container.appendChild(cubic2);
  container.appendChild(cubic3);
  container.appendChild(cubic4);
};
