// reactnode-idcard.js
import React from 'react';
import { useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
//import ReactDOM from 'react-dom';
import { Graph } from '@antv/g6';
import { ExtensionCategory, register } from '@antv/g6';
import { ReactNode } from '@antv/g6-extension-react';
import { Card, Typography } from 'antd';

const { Title, Text } = Typography;

// 定义自定义节点组件
const IDCardNode = ({ id, data }) => {
  const { name, idNumber, address } = data.data;

  console.log('IDCardNode props:', id, data);

  return (
    <Card
      title={`ID Card - ${name}`}
      style={{
        width: 250,
        padding: 10,
        borderColor: '#ddd',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Title level={5} style={{ margin: '10px 0' }}>
          {name}
        </Title>
        <Text strong>ID Number:</Text>
        <Text>{idNumber}</Text>
        <Text strong>Address:</Text>
        <Text>{address}</Text>
      </div>
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
        name: '张三',
        idNumber: '11010519491231002X',
        address: '北京市朝阳区',
      },
      style: { x: 50, y: 50 },
    },
    {
      id: 'node2',
      data: {
        name: '李四',
        idNumber: '11010519500101001X',
        address: '上海市浦东新区',
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
          size: [200, 80],
          component: (data) => <IDCardNode  data={data} />,
        },
      },
      behaviors: ['drag-element', 'zoom-canvas', 'drag-canvas'],
    });

    // 渲染 Graph
    graph.render();
  }, []);

  return <div style={{ width: '100%', height: '100%' }} ref={containerRef}></div>;
};


// 渲染 React 组件到 DOM
const root = createRoot(document.getElementById('container'));
root.render(<ReactNodeDemo />);
