import { Line } from '../../../src/elements/edges';
import { Image } from '../../../src/elements/nodes';
import type { StaticTestCase } from '../types';

export const nodeImage: StaticTestCase = async (context) => {
  const { canvas } = context;

  canvas.appendChild(
    new Image({
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
        // image
        src: 'https://gw.alipayobjects.com/mdn/rms_6ae20b/afts/img/A*N4ZMS7gHsUIAAAAAAAAAAABkARQnAQ',
      },
    }),
  );

  canvas.appendChild(
    new Image({
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
        // image
        src: 'https://gw.alipayobjects.com/mdn/rms_6ae20b/afts/img/A*N4ZMS7gHsUIAAAAAAAAAAABkARQnAQ',
      },
    }),
  );

  canvas.appendChild(
    new Image({
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
        ports: [
          { position: 'left', stroke: '#31d0c6', fill: '#fff' },
          { position: 'right', stroke: '#31d0c6', fill: '#fff' },
          { position: 'top', stroke: '#31d0c6', fill: '#fff' },
          { position: 'bottom', stroke: '#31d0c6', fill: '#fff' },
        ],
        // badges
        badges: [
          { text: 'A', position: 'right-top', backgroundFill: '#8291b2', fill: '#fff', fontSize: 10, padding: [1, 4] },
          { text: 'Important', position: 'right', backgroundFill: '#e66c5b', fill: '#fff', fontSize: 10 },
          { text: 'Notice', position: 'right-bottom', backgroundFill: '#e5b95e', fill: '#fff', fontSize: 10 },
        ],
        // image
        src: 'https://gw.alipayobjects.com/mdn/rms_6ae20b/afts/img/A*N4ZMS7gHsUIAAAAAAAAAAABkARQnAQ',
      },
    }),
  );

  const node1 = canvas.appendChild(
    new Image({
      id: 'node1',
      style: {
        x: 100,
        y: 250,
        fill: '#f8f8f8',
        stroke: '#8b9baf',
        // image
        src: 'https://gw.alipayobjects.com/mdn/rms_6ae20b/afts/img/A*N4ZMS7gHsUIAAAAAAAAAAABkARQnAQ',
        // ports
        ports: [
          { position: 'left', stroke: '#31d0c6', fill: '#fff' },
          { position: 'right', stroke: '#31d0c6', fill: '#fff' },
          { position: 'top', stroke: '#31d0c6', fill: '#fff' },
          { position: 'bottom', stroke: '#31d0c6', fill: '#fff' },
        ],
      },
    }),
  );

  const node2 = canvas.appendChild(
    new Image({
      id: 'node2',
      style: {
        x: 200,
        y: 175,
        fill: '#f8f8f8',
        stroke: '#8b9baf',
        // image
        src: 'https://gw.alipayobjects.com/mdn/rms_6ae20b/afts/img/A*N4ZMS7gHsUIAAAAAAAAAAABkARQnAQ',
        // ports
        ports: [
          { position: [0, 0.2], stroke: '#31d0c6', fill: '#fff' },
          { position: [0, 0.5], stroke: '#31d0c6', fill: '#fff' },
          { position: [0, 0.8], stroke: '#31d0c6', fill: '#fff' },
        ],
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
    new Image({
      id: 'node3',
      style: {
        x: 250,
        y: 250,
        fill: '#f8f8f8',
        stroke: '#8b9baf',
        // image
        src: 'https://gw.alipayobjects.com/mdn/rms_6ae20b/afts/img/A*N4ZMS7gHsUIAAAAAAAAAAABkARQnAQ',
      },
    }),
  );

  const node4 = canvas.appendChild(
    new Image({
      id: 'node4',
      style: {
        x: 350,
        y: 175,
        fill: '#f8f8f8',
        stroke: '#8b9baf',
        // image
        src: 'https://gw.alipayobjects.com/mdn/rms_6ae20b/afts/img/A*N4ZMS7gHsUIAAAAAAAAAAABkARQnAQ',
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
