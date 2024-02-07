import { Cubic, Line } from '../../../../g6/src/elements/edges';
import { Circle, Star } from '../../../../g6/src/elements/nodes';
import type { StaticTestCase } from '../types';

export const edgeAnchor: StaticTestCase = async (context) => {
  const { canvas } = context;

  const node1 = canvas.appendChild(
    new Circle({
      id: 'node-1',
      style: {
        x: 50,
        y: 50,
        width: 50,
        height: 50,
        fill: '#f8f8f8',
        stroke: '#8b9baf',
      },
    }),
  );

  const node2 = canvas.appendChild(
    new Circle({
      id: 'node-2',
      style: {
        x: 200,
        y: 50,
        width: 50,
        height: 50,
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
        x: 50,
        y: 150,
        width: 50,
        height: 50,
        fill: '#f8f8f8',
        stroke: '#8b9baf',
        anchors: [
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
        x: 200,
        y: 150,
        width: 50,
        height: 50,
        fill: '#f8f8f8',
        stroke: '#8b9baf',
        anchors: [
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
        x: 50,
        y: 250,
        width: 50,
        height: 50,
        fill: '#f8f8f8',
        stroke: '#8b9baf',
        anchors: [
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
        x: 200,
        y: 250,
        width: 50,
        height: 50,
        fill: '#f8f8f8',
        stroke: '#8b9baf',
        anchors: [
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
        x: 50,
        y: 350,
        width: 50,
        height: 50,
        fill: '#f8f8f8',
        stroke: '#8b9baf',
        anchors: [
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
        x: 200,
        y: 350,
        width: 50,
        height: 50,
        fill: '#f8f8f8',
        stroke: '#8b9baf',
        anchors: [
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
        x: 50,
        y: 450,
        width: 50,
        height: 50,
        fill: '#f8f8f8',
        stroke: '#8b9baf',
        anchors: [
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
        x: 200,
        y: 450,
        width: 50,
        height: 50,
        fill: '#f8f8f8',
        stroke: '#8b9baf',
        anchors: [
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
        x: 300,
        y: 50,
        width: 50,
        height: 50,
        fill: '#f8f8f8',
        stroke: '#8b9baf',
      },
    }),
  );

  const node12 = canvas.appendChild(
    new Circle({
      id: 'node-12',
      style: {
        x: 450,
        y: 50,
        width: 50,
        height: 50,
        fill: '#f8f8f8',
        stroke: '#8b9baf',
        anchors: [
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
        x: 300,
        y: 150,
        width: 50,
        height: 50,
        fill: '#f8f8f8',
        stroke: '#8b9baf',
      },
    }),
  );

  const node14 = canvas.appendChild(
    new Circle({
      id: 'node-14',
      style: {
        x: 450,
        y: 150,
        width: 50,
        height: 50,
        fill: '#f8f8f8',
        stroke: '#8b9baf',
        anchors: [
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
        x: 300,
        y: 250,
        width: 50,
        height: 50,
        fill: '#f8f8f8',
        stroke: '#8b9baf',
        anchors: [
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
        x: 450,
        y: 250,
        width: 50,
        height: 50,
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
        x: 300,
        y: 350,
        width: 50,
        height: 50,
        fill: '#f8f8f8',
        stroke: '#8b9baf',
        anchors: [
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
        x: 450,
        y: 350,
        width: 50,
        height: 50,
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
        x: 300,
        y: 450,
        width: 50,
        height: 50,
        fill: '#f8f8f8',
        stroke: '#8b9baf',
        anchors: [
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
        width: 50,
        height: 50,
        innerR: 10,
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
