import { Graph, extend } from '@antv/g6';
import { createReactNode } from '@antv/g6-react-node';
import { Alert } from 'antd';

const Node = ({ model }) => {
  const { data } = model;
  const { message, nodeType } = data;
  return <Alert message={message} type={nodeType} showIcon />;
};

const ReactNode = createReactNode(Node);

const ExtendGraph = extend(Graph, {
  nodes: {
    'react-node': ReactNode,
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
      { id: 'node1', data: { size: [120, 40], message: 'Success', nodeType: 'success' } },
      { id: 'node2', data: { size: [120, 40], message: 'Warning', nodeType: 'warning' } },
    ],
    edges: [
      {
        source: 'node1',
        target: 'node2',
      },
    ],
  },
  node: {
    type: 'react-node',
    otherShapes: {},
  },
});
