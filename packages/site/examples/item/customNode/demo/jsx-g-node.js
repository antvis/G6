import { Graph, extend } from '@antv/g6';
import { createReactGNode, Rect, Text } from '@antv/g6-react-node';

const Node = ({ model }) => {
  const { data } = model;
  const {
    value,
    size: [width, height],
  } = data;

  return (
    <Rect width={width} height={height} fill="#f1f0ff">
      <Text text={`${(value * 100).toFixed(2)}%`}></Text>
      <Rect y={4} width={value * width} height={height - 8} fill="#6395fa" />
    </Rect>
  );
};

const ReactGNode = createReactGNode(Node);

const ExtendGraph = extend(Graph, {
  nodes: {
    'react-g-node': ReactGNode,
  },
});

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;

window.graph = new ExtendGraph({
  container: 'container',
  width,
  height,
  autoFit: 'center',
  modes: {
    default: [{ type: 'drag-node', enableTransient: false }],
  },
  data: {
    nodes: [
      { id: 'node1', data: { size: [100, 30], value: 0.5 } },
      { id: 'node2', data: { size: [100, 30], value: 0.8 } },
    ],
    edges: [
      {
        source: 'node1',
        target: 'node2',
      },
    ],
  },
  node: {
    type: 'react-g-node',
    otherShapes: {},
  },
});
