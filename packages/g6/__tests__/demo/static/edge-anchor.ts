import { Cubic, Line } from '../../../../g6/src/elements/edges';
import { Circle, Star } from '../../../../g6/src/elements/nodes';
import type { StaticTestCase } from '../types';

export const edgeAnchor: StaticTestCase = async (context) => {
  const { canvas } = context;

  const node1 = canvas.appendChild(
    new Circle({
      id: 'node-1',
      style: {
        cx: 50,
        cy: 50,
        r: 25,
        fill: '#f8f8f8',
        stroke: '#8b9baf',
      },
    }),
  );

  const node2 = canvas.appendChild(
    new Circle({
      id: 'node-2',
      style: {
        cx: 200,
        cy: 50,
        r: 25,
        fill: '#f8f8f8',
        stroke: '#8b9baf',
      },
    }),
  );

  canvas.appendChild(
    new Line({
      style: {
        sourceNode: node1,
        targetNode: node2,
        stroke: '#1890FF',
        lineWidth: 2,
        labelText: 'sourceAnchor❓ targetAnchor❓',
        labelFontSize: 12,
        labelMaxLines: 2,
        labelWordWrap: true,
        labelWordWrapWidth: 100,
        endArrow: true,
      },
    }),
  );

  const node3 = canvas.appendChild(
    new Circle({
      id: 'node-3',
      style: {
        cx: 50,
        cy: 150,
        r: 25,
        fill: '#f8f8f8',
        stroke: '#8b9baf',
        anchorOptions: [
          { key: 'left', position: [0, 0.5], r: 4, stroke: '#31d0c6', fill: '#fff' },
          { key: 'right', position: [1, 0.5], r: 4, fill: '#31d0c6' },
          { key: 'top', position: [0.5, 0], r: 4, stroke: '#31d0c6', fill: '#fff' },
          { key: 'bottom', position: [0.5, 1], r: 4, stroke: '#31d0c6', fill: '#fff' },
        ],
      },
    }),
  );

  const node4 = canvas.appendChild(
    new Circle({
      id: 'node-4',
      style: {
        cx: 200,
        cy: 150,
        r: 25,
        fill: '#f8f8f8',
        stroke: '#8b9baf',
        anchorOptions: [
          { key: 'left', position: [0, 0.5], r: 4, stroke: '#31d0c6', fill: '#fff' },
          { key: 'right', position: [1, 0.5], r: 4, stroke: '#31d0c6', fill: '#fff' },
          { key: 'top', position: [0.5, 0], r: 4, stroke: '#31d0c6', fill: '#fff' },
          { key: 'bottom', position: [0.5, 1], r: 4, fill: '#31d0c6' },
        ],
      },
    }),
  );

  canvas.appendChild(
    new Line({
      style: {
        sourceNode: node3,
        targetNode: node4,
        sourceAnchor: 'right',
        targetAnchor: 'bottom',
        lineWidth: 2,
        labelText: 'sourceAnchor✅ targetAnchor✅',
        labelFontSize: 12,
        labelMaxLines: 2,
        labelWordWrap: true,
        labelWordWrapWidth: 100,
        stroke: '#1890FF',
        endArrow: true,
      },
    }),
  );

  const node5 = canvas.appendChild(
    new Circle({
      id: 'node-5',
      style: {
        cx: 50,
        cy: 250,
        r: 25,
        fill: '#f8f8f8',
        stroke: '#8b9baf',
        anchorOptions: [
          { key: 'left', position: [0, 0.5], r: 4, stroke: '#31d0c6', fill: '#fff' },
          { key: 'right', position: [1, 0.5], r: 4, stroke: '#31d0c6', fill: '#fff' },
        ],
      },
    }),
  );

  const node6 = canvas.appendChild(
    new Circle({
      id: 'node-6',
      style: {
        cx: 200,
        cy: 250,
        r: 25,
        fill: '#f8f8f8',
        stroke: '#8b9baf',
        anchorOptions: [
          { key: 'top', position: [0.5, 0], r: 4, stroke: '#31d0c6', fill: '#fff' },
          { key: 'bottom', position: [0.5, 1], r: 4, stroke: '#31d0c6', fill: '#fff' },
        ],
      },
    }),
  );

  canvas.appendChild(
    new Line({
      style: {
        sourceNode: node5,
        targetNode: node6,
        lineWidth: 2,
        labelText: 'sourceAnchor✖️ targetAnchor✖️',
        labelFontSize: 12,
        labelMaxLines: 2,
        labelWordWrap: true,
        labelWordWrapWidth: 100,
        stroke: '#1890FF',
        endArrow: true,
      },
    }),
  );

  const node7 = canvas.appendChild(
    new Circle({
      id: 'node-7',
      style: {
        cx: 50,
        cy: 350,
        r: 25,
        fill: '#f8f8f8',
        stroke: '#8b9baf',
        anchorOptions: [
          { key: 'left', position: [0, 0.5], r: 4, stroke: '#31d0c6', fill: '#fff' },
          { key: 'right', position: [1, 0.5], r: 4, stroke: '#31d0c6', fill: '#fff' },
        ],
      },
    }),
  );

  const node8 = canvas.appendChild(
    new Circle({
      id: 'node-8',
      style: {
        cx: 200,
        cy: 350,
        r: 25,
        fill: '#f8f8f8',
        stroke: '#8b9baf',
        anchorOptions: [
          { key: 'top', position: [0.5, 0], r: 4, stroke: '#31d0c6', fill: '#fff' },
          { key: 'bottom', position: [0.5, 1], r: 4, fill: '#31d0c6' },
        ],
      },
    }),
  );

  canvas.appendChild(
    new Line({
      style: {
        sourceNode: node7,
        targetNode: node8,
        targetAnchor: 'bottom',
        lineWidth: 2,
        labelText: 'sourceAnchor✖️ targetAnchor✅',
        labelFontSize: 12,
        labelMaxLines: 2,
        labelWordWrap: true,
        labelWordWrapWidth: 100,
        stroke: '#1890FF',
        endArrow: true,
      },
    }),
  );

  const node9 = canvas.appendChild(
    new Circle({
      id: 'node-9',
      style: {
        cx: 50,
        cy: 450,
        r: 25,
        fill: '#f8f8f8',
        stroke: '#8b9baf',
        anchorOptions: [
          { key: 'left', position: [0, 0.5], r: 4, fill: '#31d0c6' },
          { key: 'right', position: [1, 0.5], r: 4, stroke: '#31d0c6', fill: '#fff' },
        ],
      },
    }),
  );

  const node10 = canvas.appendChild(
    new Circle({
      id: 'node-10',
      style: {
        cx: 200,
        cy: 450,
        r: 25,
        fill: '#f8f8f8',
        stroke: '#8b9baf',
        anchorOptions: [
          { key: 'top', position: [0.5, 0], r: 4, stroke: '#31d0c6', fill: '#fff' },
          { key: 'bottom', position: [0.5, 1], r: 4, stroke: '#31d0c6', fill: '#fff' },
        ],
      },
    }),
  );

  canvas.appendChild(
    new Line({
      style: {
        sourceNode: node9,
        targetNode: node10,
        sourceAnchor: 'left',
        lineWidth: 2,
        labelText: 'sourceAnchor✅ targetAnchor✖️',
        labelFontSize: 12,
        labelMaxLines: 2,
        labelWordWrap: true,
        labelWordWrapWidth: 100,
        stroke: '#1890FF',
        endArrow: true,
      },
    }),
  );

  const node11 = canvas.appendChild(
    new Circle({
      id: 'node-11',
      style: {
        cx: 300,
        cy: 50,
        r: 25,
        fill: '#f8f8f8',
        stroke: '#8b9baf',
      },
    }),
  );

  const node12 = canvas.appendChild(
    new Circle({
      id: 'node-12',
      style: {
        cx: 450,
        cy: 50,
        r: 25,
        fill: '#f8f8f8',
        stroke: '#8b9baf',
        anchorOptions: [
          { key: 'bottom', position: [0.5, 1], r: 4, stroke: '#31d0c6', fill: '#fff' },
          { key: 'right', position: [1, 0.5], r: 4, stroke: '#31d0c6', fill: '#fff' },
        ],
      },
    }),
  );

  canvas.appendChild(
    new Line({
      style: {
        sourceNode: node11,
        targetNode: node12,
        lineWidth: 2,
        labelText: 'sourceAnchor❓ targetAnchor✖️',
        labelFontSize: 12,
        labelMaxLines: 2,
        labelWordWrap: true,
        labelWordWrapWidth: 100,
        stroke: '#1890FF',
        endArrow: true,
      },
    }),
  );

  const node13 = canvas.appendChild(
    new Circle({
      id: 'node-13',
      style: {
        cx: 300,
        cy: 150,
        r: 25,
        fill: '#f8f8f8',
        stroke: '#8b9baf',
      },
    }),
  );

  const node14 = canvas.appendChild(
    new Circle({
      id: 'node-14',
      style: {
        cx: 450,
        cy: 150,
        r: 25,
        fill: '#f8f8f8',
        stroke: '#8b9baf',
        anchorOptions: [
          { key: 'bottom', position: [0.5, 1], r: 4, stroke: '#31d0c6', fill: '#fff' },
          { key: 'right', position: [1, 0.5], r: 4, fill: '#31d0c6' },
        ],
      },
    }),
  );

  canvas.appendChild(
    new Line({
      style: {
        sourceNode: node13,
        targetNode: node14,
        targetAnchor: 'right',
        lineWidth: 2,
        labelText: 'sourceAnchor❓ targetAnchor✅',
        labelFontSize: 12,
        labelMaxLines: 2,
        labelWordWrap: true,
        labelWordWrapWidth: 100,
        stroke: '#1890FF',
        endArrow: true,
      },
    }),
  );

  const node15 = canvas.appendChild(
    new Circle({
      id: 'node-15',
      style: {
        cx: 300,
        cy: 250,
        r: 25,
        fill: '#f8f8f8',
        stroke: '#8b9baf',
        anchorOptions: [
          { key: 'bottom', position: [0.5, 1], r: 4, stroke: '#31d0c6', fill: '#fff' },
          { key: 'right', position: [1, 0.5], r: 4, stroke: '#31d0c6', fill: '#fff' },
        ],
      },
    }),
  );

  const node16 = canvas.appendChild(
    new Circle({
      id: 'node-16',
      style: {
        cx: 450,
        cy: 250,
        r: 25,
        fill: '#f8f8f8',
        stroke: '#8b9baf',
      },
    }),
  );

  canvas.appendChild(
    new Line({
      style: {
        sourceNode: node15,
        targetNode: node16,
        lineWidth: 2,
        labelText: 'sourceAnchor✖️ targetAnchor❓',
        labelFontSize: 12,
        labelMaxLines: 2,
        labelWordWrap: true,
        labelWordWrapWidth: 100,
        stroke: '#1890FF',
        endArrow: true,
      },
    }),
  );

  const node17 = canvas.appendChild(
    new Circle({
      id: 'node-17',
      style: {
        cx: 300,
        cy: 350,
        r: 25,
        fill: '#f8f8f8',
        stroke: '#8b9baf',
        anchorOptions: [
          { key: 'bottom', position: [0.5, 1], r: 4, fill: '#31d0c6' },
          { key: 'right', position: [1, 0.5], r: 4, stroke: '#31d0c6', fill: '#fff' },
        ],
      },
    }),
  );

  const node18 = canvas.appendChild(
    new Circle({
      id: 'node-18',
      style: {
        cx: 450,
        cy: 350,
        r: 25,
        fill: '#f8f8f8',
        stroke: '#8b9baf',
      },
    }),
  );

  canvas.appendChild(
    new Line({
      style: {
        sourceNode: node17,
        targetNode: node18,
        sourceAnchor: 'bottom',
        lineWidth: 2,
        labelText: 'sourceAnchor✅ targetAnchor❓',
        labelFontSize: 12,
        labelMaxLines: 2,
        labelWordWrap: true,
        labelWordWrapWidth: 100,
        stroke: '#1890FF',
        endArrow: true,
      },
    }),
  );

  const node19 = canvas.appendChild(
    new Circle({
      id: 'node-19',
      style: {
        cx: 300,
        cy: 450,
        r: 25,
        fill: '#f8f8f8',
        stroke: '#8b9baf',
        anchorOptions: [
          { key: 'bottom', position: [0.5, 1], r: 4, fill: '#31d0c6' },
          { key: 'right', position: [1, 0.5], r: 4, stroke: '#31d0c6', fill: '#fff' },
        ],
      },
    }),
  );

  const node20 = canvas.appendChild(
    new Star({
      id: 'node-20',
      style: {
        x: 450,
        y: 450,
        outerR: 25,
        innerR: 16,
        fill: '#f8f8f8',
        stroke: '#8b9baf',
      },
    }),
  );

  canvas.appendChild(
    new Cubic({
      style: {
        sourceNode: node19,
        targetNode: node20,
        sourceAnchor: 'bottom',
        lineWidth: 2,
        labelText: 'sourceAnchor✅ targetAnchor❓',
        labelFontSize: 12,
        labelMaxLines: 2,
        labelWordWrap: true,
        labelWordWrapWidth: 100,
        stroke: '#1890FF',
        endArrow: true,
      },
    }),
  );
};
