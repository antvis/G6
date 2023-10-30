# React G Node

基于 @antv/react-g 的 G6 React Node 节点。

```jsx
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Button, Card, Col, Row, Statistic } from 'antd';
import { createReactGNode, Circle, Rect, Text } from '@antv/g6-react-node';
import { Graph, extend, Extensions } from '@antv/g6';
import { useEffect, useRef, useState } from 'react';
import type { ReactNodeProps } from '@antv/g6-react-node';

const Node = ({ model }) => {
  const { data } = model;
  const { value } = data;
  const [showShadow, setShowShadow] = useState(false);
  return (
    <Rect
      width={50}
      height={50}
      shadowBlur={showShadow ? 10 : 0}
      shadowColor="#bebebe"
      lineWidth={showShadow}
      fill={'rgba(0, 255, 0, 0.5)'}
      onMouseenter={() => setShowShadow(true)}
      onMouseleave={() => setShowShadow(false)}
    >
      <Circle cx={25} cy={25} r={20 * value} fill="rgb(255, 255, 0, 0.9)" />
      <Text
        x={25}
        y={25}
        fill="red"
        text={value.toFixed(2)}
        textAlign="center"
        textBaseline="middle"
      />
    </Rect>
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
          { id: 'node0', data: { size: [50, 50], value: 0.5 } },
          { id: 'node1', data: { size: [50, 50], value: 0.9 } },
          { id: 'node2', data: { size: [50, 50], value: 0.7 } },
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
                  size: [50, 50],
                  value: Math.random() * 0.5 + 0.5,
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
