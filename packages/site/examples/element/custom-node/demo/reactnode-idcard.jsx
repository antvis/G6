// reactnode-idcard.jsx
import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Graph } from '@antv/g6';
import { ExtensionCategory, register } from '@antv/g6';
import { ReactNode } from '@antv/g6-extension-react';
import { Card, Typography, Button, Select, Descriptions } from 'antd';

const { Title, Text } = Typography;
const { Option } = Select;

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
        ...data,
        expanded: !isExpanded,
      },
    }]);
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
        break;
    }
  };

  console.log('IDCardNode props:', id, data);

  return (
    <Card
      title={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <Select
            value={selected ? (data.selectedOption || 1) : 0}
            style={{ width: 150, marginRight: 8 }}
            onChange={handleSelect}
          >
            <Option value={0}>None</Option>
            <Option value={1}>Select this node</Option>
            <Option value={2}>Select related nodes</Option>
          </Select>
          <Title level={5} style={{ margin: 0 }}>
            {name}
          </Title>
          <Button type="link" onClick={toggleExpand} style={{ padding: 0 }}>
            {isExpanded ? 'fold' : 'expand'}
          </Button>
        </div>
      }
      style={{
        width: 500,
        padding: 10,
        borderColor: selected ? 'orange' : '#ddd', // 根据选中状态设置边框颜色
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
        selected: true, // 初始状态为未选中
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
        selected: false,
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
    {
      id: 'node6',
      data: {
        name: 'Frank',
        idNumber: 'IDUSAASD1431924',
        address: '7070 Maple St, San Antonio, TX 78201',
        expanded: false,
        selected: false,
        selectedOption: 0,
      },
    },
    {
      id: 'node7',
      data: {
        name: 'Grace',
        idNumber: 'IDUSAASD1431925',
        address: '8080 Cedar St, San Diego, CA 92101',
        expanded: false,
        selected: false,
        selectedOption: 0,
      },
    },
    {
      id: 'node8',
      data: {
        name: 'Hannah',
        idNumber: 'IDUSAASD1431926',
        address: '9090 Walnut St, Dallas, TX 75201',
        expanded: false,
        selected: false,
        selectedOption: 0,
      },
    },
    {
      id: 'node9',
      data: {
        name: 'Ian',
        idNumber: 'IDUSAASD1431927',
        address: '1010 Birch St, San Jose, CA 95101',
        expanded: false,
        selected: false,
        selectedOption: 0,
      },
    },
    {
      id: 'node10',
      data: {
        name: 'Judy',
        idNumber: 'IDUSAASD1431928',
        address: '1111 Spruce St, Austin, TX 73301',
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
    {
      source: 'node5',
      target: 'node6',
    },
    {
      source: 'node6',
      target: 'node7',
    },
    {
      source: 'node7',
      target: 'node8',
    },
    {
      source: 'node8',
      target: 'node9',
    },
    {
      source: 'node9',
      target: 'node10',
    },
    {
      source: 'node10',
      target: 'node1',
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
        type: 'grid',
        align: 'left',
        nodesep: 50,
        nodeSize: [500, 220],
        ranksep: 50,
      },
    });

    // 渲染 Graph
    graph.render();
    graph.fitView();

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
