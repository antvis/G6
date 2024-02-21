import { Line } from '../../../src/elements/edges';
import { Rect } from '../../../src/elements/nodes';
import type { StaticTestCase } from '../types';

export const nodeRect: StaticTestCase = async (context) => {
  const { canvas } = context;

  canvas.appendChild(
    new Rect({
      style: {
        x: 100,
        y: 50,
        fill: '#f8f8f8',
        stroke: '#8b9baf',
        width: 50,
        height: 50,
        labelText: 'simple',
        labelWordWrapWidth: 100,
        labelPosition: 'bottom',
      },
    }),
  );

  canvas.appendChild(
    new Rect({
      style: {
        x: 200,
        y: 50,
        fill: '#f8f8f8',
        stroke: '#8b9baf',
        width: 50,
        height: 20,
        iconText: 'Y',
        iconFontSize: 14,
        iconFill: '#5B8FF9',
        iconFontWeight: 800,
        labelText: 'this is a looooooooooooooooooooog label',
      },
    }),
  );

  canvas.appendChild(
    new Rect({
      style: {
        // key
        x: 300,
        y: 50,
        fill: '#f8f8f8',
        stroke: '#8b9baf',
        width: 50,
        height: 70,
        // label
        label: false,
        labelText: 'no-label',
        // halo
        halo: true,
        // ports
        ports: [{ position: 'left' }, { position: 'right' }, { position: 'top' }, { position: 'bottom' }],
        portStroke: '#31d0c6',
        portFill: '#fff',
        portR: 4,
        // icon
        iconSrc: 'https://gw.alipayobjects.com/mdn/rms_6ae20b/afts/img/A*N4ZMS7gHsUIAAAAAAAAAAABkARQnAQ',
        // badges
        badges: [
          { text: 'A', position: 'right-top', backgroundFill: '#8291b2', padding: [1, 4] },
          { text: 'Important', position: 'right', backgroundFill: '#e66c5b' },
          { text: 'Notice', position: 'right-bottom', backgroundFill: '#e5b95e' },
        ],
        badgeFill: '#fff',
        badgeFontSize: 10,
      },
    }),
  );

  const node1 = canvas.appendChild(
    new Rect({
      id: 'node1',
      style: {
        x: 100,
        y: 250,
        fill: '#f8f8f8',
        stroke: '#8b9baf',
        // ports
        ports: [
          { position: 'left', stroke: '#31d0c6', fill: '#fff' },
          { position: 'right', stroke: '#31d0c6', fill: '#fff' },
          { position: 'top', stroke: '#31d0c6', fill: '#fff' },
          { position: 'bottom', stroke: '#31d0c6', fill: '#fff' },
        ],
        portR: 4,
      },
    }),
  );

  const node2 = canvas.appendChild(
    new Rect({
      id: 'node2',
      style: {
        x: 200,
        y: 175,
        fill: '#f8f8f8',
        stroke: '#8b9baf',
        // ports
        ports: [
          { position: [0, 0.2], stroke: '#31d0c6', fill: '#fff' },
          { position: [0, 0.5], stroke: '#31d0c6', fill: '#fff' },
          { position: [0, 0.8], stroke: '#31d0c6', fill: '#fff' },
        ],
        portR: 4,
      },
    }),
  );

  canvas.appendChild(
    new Line({
      id: 'line',
      style: {
        sourceNode: node1,
        targetNode: node2,
        stroke: '#1890FF',
        endArrow: true,
      },
    }),
  );

  const node3 = canvas.appendChild(
    new Rect({
      id: 'node3',
      style: {
        x: 250,
        y: 250,
        fill: '#f8f8f8',
        stroke: '#8b9baf',
      },
    }),
  );

  const node4 = canvas.appendChild(
    new Rect({
      id: 'node4',
      style: {
        x: 350,
        y: 175,
        fill: '#f8f8f8',
        stroke: '#8b9baf',
      },
    }),
  );

  canvas.appendChild(
    new Line({
      id: 'line',
      style: {
        sourceNode: node3,
        targetNode: node4,
        stroke: '#1890FF',
        endArrow: true,
      },
    }),
  );
};
