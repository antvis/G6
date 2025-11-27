import { UserOutlined } from '@ant-design/icons';
import { ExtensionCategory, Graph, register } from '@antv/g6';
import { ReactNode } from '@antv/g6-extension-react';
import { Avatar, Button, Card, Descriptions, Select, Space, Typography } from 'antd';
import React, { useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';

const { Title, Text } = Typography;
const { Option } = Select;

register(ExtensionCategory.NODE, 'react-node', ReactNode);

const IDCardNode = ({ id, data }) => {
  const { name, idNumber, address, expanded, selected, graph } = data;

  const toggleExpand = (e) => {
    e.stopPropagation();
    graph.updateNodeData([
      {
        id,
        data: { expanded: !expanded },
      },
    ]);
    graph.render();
  };

  const handleSelect = (value) => {
    graph.updateNodeData([
      {
        id,
        data: { selected: value !== 0 },
      },
    ]);
    if (value === 2) {
      // 获取与当前节点相连的所有节点
      const connectedNodes = graph.getNeighborNodesData(id);

      connectedNodes.forEach((node) => {
        graph.updateNodeData([
          {
            id: node.id,
            data: { selected: true },
          },
        ]);
      });
    }
    graph.render();
  };

  const CardTitle = (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Space>
        <Avatar shape="square" size="small" icon={<UserOutlined />} />
        <Title level={5} style={{ margin: 0 }}>
          {name}
        </Title>

        <Select
          value={selected ? data.selectedOption || 1 : 0}
          style={{ width: 150, marginRight: 8 }}
          onChange={handleSelect}
        >
          <Option value={0}>None</Option>
          <Option value={1}>Node</Option>
          <Option value={2}>Connected</Option>
        </Select>
      </Space>
      <Button type="link" onClick={toggleExpand} style={{ padding: 0 }}>
        {expanded ? 'fold' : 'expand'}
      </Button>
    </div>
  );

  return (
    <Card
      size="small"
      title={CardTitle}
      style={{
        width: 340,
        padding: 10,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: selected ? 'orange' : '#eee', // 根据选中状态设置边框颜色
        cursor: 'pointer',
      }}
    >
      {expanded ? (
        <Descriptions bordered column={1} style={{ width: '100%', textAlign: 'center' }}>
          <Descriptions.Item label="ID Number">{idNumber}</Descriptions.Item>
          <Descriptions.Item label="Address">{address}</Descriptions.Item>
        </Descriptions>
      ) : (
        <Text style={{ textAlign: 'center' }}>IDCard Information</Text>
      )}
    </Card>
  );
};

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
        selected: false, // 初始状态为未选中
        selectedOption: 1, // 初始选择本节点
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
        selected: false, // 初始状态为未选中
        selectedOption: 0, // 初始不选择
      },
      style: { x: 700, y: 100 },
    },
    {
      id: 'node3',
      data: {
        name: 'Charlie',
        idNumber: 'IDUSAASD1431921',
        address: '4040 Elm St, Chicago, IL 60611',
        expanded: false,
        selected: true,
        selectedOption: 0,
      },
    },
    {
      id: 'node4',
      data: {
        name: 'David',
        idNumber: 'IDUSAASD1431922',
        address: '5050 Oak St, Houston, TX 77002',
        expanded: false,
        selected: false,
        selectedOption: 0,
      },
    },
    {
      id: 'node5',
      data: {
        name: 'Eve',
        idNumber: 'IDUSAASD1431923',
        address: '6060 Pine St, Phoenix, AZ 85001',
        expanded: false,
        selected: false,
        selectedOption: 0,
      },
    },
  ],
  edges: [
    { source: 'node1', target: 'node2' },
    { source: 'node2', target: 'node3' },
    { source: 'node3', target: 'node4' },
    { source: 'node4', target: 'node5' },
  ],
};

export const ReactNodeDemo = () => {
  const containerRef = useRef();
  const graphRef = useRef(null);

  useEffect(() => {
    // 创建 Graph 实例
    const graph = new Graph({
      autoFit: 'view',
      container: containerRef.current,
      data,
      node: {
        type: 'react-node',
        style: {
          size: (datum) => (datum.data.expanded ? [340, 236] : [340, 105]), // 调整大小以适应内容
          component: (data) => <IDCardNode id={data.id} data={{ ...data.data, graph: graph }} />,
        },
      },
      behaviors: ['drag-element', 'zoom-canvas', 'drag-canvas'],
      layout: {
        type: 'snake',
        cols: 2,
        rowGap: 100,
        colGap: 220,
      },
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
