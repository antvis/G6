# React G Node

基于 @antv/react-g 的 G6 React Node 节点。

```jsx
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Button, Card, Col, Row, Statistic } from 'antd';
import { createReactGNode, Circle } from '@antv/g6-react-node';
import { Graph, extend } from '@antv/g6';
import { useEffect, useRef } from 'react';
import type { ReactNodeProps } from '@antv/g6-react-node';

const Node = ({ model }) => {
  return (
    <Circle
      cx={100}
      cy={200}
      r={10}
      fill="#1890FF"
      stroke="#F04864"
      lineWidth={4}
      onMouseenter={() => {
        setSize(100);
      }}
      onMouseleave={() => {
        setSize(50);
      }}
    />
  );
};

export default () => {
  const ref = useRef();
  const graphRef = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const container = ref.current;
    const width = container.scrollWidth;
    const height = container.scrollHeight || 500;

    const reactGNode = createReactGNode(Node);

    const ExtendGraph = extend(Graph, {
      nodes: {
        'react-g-node': reactGNode,
      },
    });

    graphRef.current = new ExtendGraph({
      container,
      width,
      height,
      modes: {
        default: [
          {
            type: 'drag-node',
            enableTransient: false,
          },
        ],
      },
      data: {
        nodes: [
          { id: 'node0', data: { size: [200, 100], value: 0 } },
          { id: 'node1', data: { size: [200, 100], value: 0.1128 } },
          { id: 'node2', data: { size: [200, 100], value: -0.093 } },
        ],
        edges: [
          { id: 'edge1', source: 'node0', target: 'node1', data: {} },
          { id: 'edge2', source: 'node0', target: 'node2', data: {} },
        ],
      },
      node: {
        type: 'react-g-node',
        otherShapes: {},
      },
    });
  }, []);

  return (
    <div style={{ width: '100%', height: 500 }}>
      <div>
        <Button
          onClick={() => {
            Array.from({ length: 3 }).forEach((_, i) => {
              graphRef.current.updateData('node', {
                id: `node${i}`,
                data: {
                  size: [200, 100],
                  value: Math.random() * 2 - 1,
                },
              });
            });
          }}
        >
          更新数据
        </Button>
      </div>
      <div ref={ref}></div>
    </div>
  );
};
```
