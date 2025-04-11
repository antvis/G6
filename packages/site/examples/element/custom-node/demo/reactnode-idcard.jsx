// reactnode-idcard.jsx
import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Graph } from '@antv/g6';
import { ExtensionCategory, register } from '@antv/g6';
import { ReactNode } from '@antv/g6-extension-react';
import { Card, Typography, Button, Select, Descriptions, Avatar, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;

// 注册自定义节点
register(ExtensionCategory.NODE, 'react-node', ReactNode);

// 定义自定义节点组件
const IDCardNode = ({ id, data, onSelectChange }) => {
  const { name, idNumber, address, expanded, selected, graph } = data;
  console.log('IDCardNode data:', id, data);
  const [isExpanded, setIsExpanded] = useState(expanded || false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    graph.updateNodeData([{
      id,
      data: {
        //...data,
        expanded: !isExpanded,
      },
    }]);
    graph.render();
  };

  const handleSelect = (value) => {
    switch (value) {
      case 1: // 选择本节点
        {
          graph.updateNodeData([{
            id,
            data: {
              ...data,
              selected: true,
            },
          }]);
          onSelectChange(id, true, 1); // 调用回调方法，带回选择的选项序号
          graph.render();
        }
        break;
      case 2: // 选择相关联的节点
        {
          graph.updateNodeData([{
            id,
            data: {
              ...data,
              selected: true,
            },
          }]);
          onSelectChange(id, true, 2); // 调用回调方法，带回选择的选项序号

          // 获取与当前节点相连的所有节点
          const connectedNodes = graph.getNeighborNodesData(id);

          connectedNodes.forEach(node => {
            graph.updateNodeData([{
              id: node.id,
              data: {
                ...node.data,
                selected: true,
              },
            }]);
            onSelectChange(node.id, true, 2); // 调用回调方法，带回选择的选项序号
          });
          graph.render();
        }
        break;
      default: // 不选择
        graph.updateNodeData([{
          id,
          data: {
            ...data,
            selected: false,
          },
        }]);
        onSelectChange(id, false, 0); // 调用回调方法，带回选择的选项序号
        graph.render();
        break;
    }
  };

  console.log('IDCardNode props:', id, data);

  return (
    <Card
      size='small'
      title={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>

          <Space>
            <Avatar
              shape="square"
              size="small"
              icon={<UserOutlined />}
            />
            <Title level={5} style={{ margin: 0 }}>
              {name}
            </Title>

            <Select
              value={selected ? (data.selectedOption || 1) : 0}
              style={{ width: 150, marginRight: 8 }}
              onChange={handleSelect}
            >
              <Option value={0}>Don't Select</Option>
              <Option value={1}>Select this node</Option>
              <Option value={2}>Select related nodes</Option>
            </Select>

            <Button type="link" onClick={toggleExpand} style={{ padding: 0 }}>
              {isExpanded ? 'fold' : 'expand'}
            </Button>
          </Space>
        </div>
      }
      style={{
        width: 340,
        padding: 10,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: selected ? 'orange' : '#eee', // 根据选中状态设置边框颜色
        cursor: 'pointer', // 添加鼠标指针样式
      }}
      onClick={() => {
        if (!selected) {
          handleSelect(1); // 默认选择本节点
        }
      }} // 点击节点时切换选中状态
    >
      {isExpanded ? (
        <Descriptions
          bordered
          column={1}
          style={{ width: '100%', textAlign: 'center' }}
        >
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
    {
      source: 'node1',
      target: 'node2',
    },
    {
      source: 'node2',
      target: 'node3',
    },
    {
      source: 'node3',
      target: 'node4',
    },
    {
      source: 'node4',
      target: 'node5',
    },
  ],
};

export const ReactNodeDemo = () => {
  const containerRef = useRef();
  const graphRef = useRef(null);

  const handleSelectChange = (id, selected, option) => {
    console.log(`Node ${id} selected: ${selected}, Option: ${option}`);
    // 更新节点的 selected 属性和 selectedOption
    graphRef.current.updateNodeData([{
      id,
      data: {
        selected,
        selectedOption: option,
      },
    }]);

    console.log('Selected nodes:', graphRef.current.getNodeData());
  };

  useEffect(() => {
    // 创建 Graph 实例
    const graph = new Graph({
      autoFit: 'view',
      container: containerRef.current,
      width: 800,
      height: 600,
      data,
      node: {
        type: 'react',
        style: {
          size: [250, 120], // 调整大小以适应内容
          component: (data) => <IDCardNode id={data.id} data={{ ...data.data, graph: graph }} onSelectChange={handleSelectChange} />,
        },
      },
      behaviors: ['drag-element', 'zoom-canvas', 'drag-canvas'],
      plugins: [{
        type: 'minimap',
        style: {
          size: [200, 200],
          position: 'bottom-right',
        },
      }],
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
