import { Graph } from '../../../src/index';
import { TestCaseContext } from '../interface';

const defaultData = {
  nodes: [
    {
      id: 'node1',
      data: {
        x: 300,
        y: 100,
      },
    },
    {
      id: 'node2',
      data: { x: 100, y: 150 },
    },
  ],
  edges: [
    {
      id: 'edge1',
      source: 'node1',
      target: 'node2',
      data: {},
    },
  ],
};

export default (
  context: TestCaseContext,
  options: {
    anchorPoints?: number[][];
    showAnchorShapes?: boolean;
    edgeAnchors?: { sourceAnchor: number; targetAnchor: number };
  } = {},
) => {
  const {
    anchorPoints = [
      [0.5, 1],
      [1, 0.5],
      [0, 0.5],
      [0.5, 0],
    ],
    showAnchorShapes = true,
    edgeAnchors,
  } = options;
  const anchorShapes = showAnchorShapes
    ? anchorPoints.map((position) => ({
        position,
      }))
    : undefined;
  const graph = new Graph({
    ...context,
    data: defaultData,
    modes: {
      default: ['drag-node'],
    },
    node: {
      keyShape: {
        opacity: 0.1,
      },
      // @ts-ignore
      anchorPoints,
      anchorShapes,
    },
    // @ts-ignore
    edge: {
      ...edgeAnchors,
    },
  });

  return graph;
};
