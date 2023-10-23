## Antd React Node

```jsx
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Button, Card, Col, Row, Statistic } from 'antd';
import { createReactNode } from '@antv/g6-react-node';
import { Graph, extend } from '@antv/g6';
import { useEffect, useRef } from 'react';
import type { ReactNodeProps } from '@antv/g6-react-node';

const Statistics: React.FC<ReactNodeProps> = ({ model }) => {
  const { value } = model.data;
  return (
    <Row gutter={16}>
      <Col span={24}>
        <Card bordered={false}>
          <Statistic
            title="Active"
            value={value}
            precision={2}
            valueStyle={{ color: value > 0 ? '#3f8600' : '#cf1322' }}
            prefix={value > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            suffix="%"
          />
        </Card>
      </Col>
    </Row>
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

    const reactNode = createReactNode(Statistics);

    const ExtendGraph = extend(Graph, {
      nodes: {
        'react-node': reactNode,
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
        type: 'react-node',
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
