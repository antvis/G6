// reactnode-idcard.jsx
import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Graph } from '@antv/g6';
import { ExtensionCategory, register } from '@antv/g6';
import { ReactNode } from '@antv/g6-extension-react';
import { Card, Typography, Button } from 'antd';

const { Title, Text } = Typography;

// 定义自定义节点组件
const IDCardNode = ({ id, data }) => {
  const { name, idNumber, address, expanded, graph } = data;
  const [isExpanded, setIsExpanded] = useState(expanded || false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    graph.updateNodeData([{
      id,
      data: {
        ...data,
        expanded: !isExpanded,
      },
    }]);
  };

  console.log('IDCardNode props:', id, data);

  return (
    <Card
      title={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <Title level={5} style={{ margin: 0 }}>
            {name}
          </Title>
          <Button type="link" onClick={toggleExpand} style={{ padding: 0 }}>
            {isExpanded ? 'fold' : 'expand'}
          </Button>
        </div>
      }
      style={{
        width: 250,
        padding: 10,
        borderColor: '#ddd',
      }}
    >
      {isExpanded ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <Text strong>ID Number:</Text>
          <Text>{idNumber}</Text>
          <Text strong>Address:</Text>
          <Text>{address}</Text>
        </div>
      ) : (
        <Text style={{ textAlign: 'center' }}>IDCard Information</Text>
      )}
    </Card>
  );
};

// 注册自定义节点
register(ExtensionCategory.NODE, 'id-card', ReactNode);

// 定义 Graph 数据
const data = {
  nodes: [
    {
      id: 'node1',
      data: {
        name: 'Alice',
        idNumber: 'IDUSAASD2131734',
        address: '1234 Broadway, Apt 5B, New York, NY 10001',
        expanded: false, // 初始状态为收缩
      },
      style: { x: 50, y: 50 },
    },
    {
      id: 'node2',
      data: {
        name: 'Bob',
        idNumber: 'IDUSAASD1431920',
        address: '3030 Chestnut St, Philadelphia, PA 19104',
        expanded: false, // 初始状态为收缩
      },
      style: { x: 500, y: 100 },
    },
  ],
  edges: [
    {
      source: 'node1',
      target: 'node2',
    },
  ],
};

export const ReactNodeDemo = () => {
  const containerRef = useRef();
  const graphRef = useRef(null);

  useEffect(() => {
    // 创建 Graph 实例
    const graph = new Graph({
      container: containerRef.current,
      width: 800,
      height: 600,
      data,
      node: {
        type: 'react',
        style: {
          size: [250, 120], // 调整大小以适应内容
          component: (data) => <IDCardNode id={data.id} data={{ ...data.data, graph: graph }} />,
        },
      },
      behaviors: ['drag-element', 'zoom-canvas', 'drag-canvas'],
    });

    // 渲染 Graph
    graph.render();

    // 保存 graph 实例
    graphRef.current = graph;

    return () => {
      graph.destroy();
    };
  }, []);

  return <div style={{ width: '100%', height: '100%' }} ref={containerRef}></div>;
};

// 渲染 React 组件到 DOM
const root = createRoot(document.getElementById('container'));
root.render(<ReactNodeDemo />);
