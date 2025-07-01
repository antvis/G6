---
title: Define Nodes with React
order: 13
---

In G6, custom nodes typically require manipulating DOM or Canvas elements, but with the help of the `@antv/g6-extension-react` ecosystem library, you can directly use React components as node content, enhancing development efficiency and maintainability.

## Choosing a Custom Node Solution

### G6 Node

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*sEaLR7Q_hmoAAAAAAAAAAAAAemJ7AQ/fmt.avif" width="300" />

✅ **Recommended Scenarios:**

- Nodes are simple geometric shapes
- Scenarios requiring efficient rendering of more than 2,000 nodes
- Need to directly manipulate graphic instances for fine control

> For detailed information on how to customize nodes using Canvas graphics, please refer to the [Custom Node](/en/manual/element/node/custom-node) documentation

### React Node

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*9oz-R7bIkd0AAAAAAAAAAAAADmJ7AQ/original" width="350" />

✅ **Recommended Scenarios:**

- Business systems that need to integrate UI libraries like Ant Design
- Nodes contain interactive logic such as form input, state switching
- Scenarios where an existing React design system needs to be reused

## Quick Start

### Environment Preparation

Before starting, please ensure you have:

- **Installed a React project**: Ensure a React project is installed and created.
- **React version requirement**: Ensure the React version used is >=16.8.0.

### Install Dependencies

To use `@antv/g6-extension-react`, run the following command:

:::code-group

```bash [npm]
npm install @antv/g6-extension-react
```

```bash [yarn]
yarn add @antv/g6-extension-react
```

```bash [pnpm]
pnpm add @antv/g6-extension-react
```

:::

### Component Integration

#### 1. Register React Node Type

Register the React node type through the extension mechanism:

```jsx
import { ExtensionCategory, register } from '@antv/g6';
import { ReactNode } from '@antv/g6-extension-react';

register(ExtensionCategory.NODE, 'react-node', ReactNode);
```

The `register` method requires three parameters:

- Extension category: `ExtensionCategory.NODE` indicates this is a node type
- Type name: `react-node` is the name we give to this custom node, which will be used in the configuration later
- Class definition: ReactNode is the implementation class exported by `@antv/g6-extension-react`

#### 2. Define Business Component

Define a simple React component as the content of the node:

```jsx
const MyReactNode = () => {
  return <div>node</div>;
};
```

#### 3. Use the Component

Use the custom React node in the graph configuration. Specify the node type and style in the graph configuration to use the custom React component.

- `type`: Specify the node type as `react-node` (use the name given during registration)
- `style.component`: Define the React component content of the node

```jsx
const graph = new Graph({
  node: {
    type: 'react-node',
    style: {
      component: () => <MyReactNode />,
    },
  },
});

graph.render();
```

## Advanced Features

### State Management

In complex graph visualization scenarios, nodes need to dynamically respond to interaction states. We provide two complementary state management solutions:

#### Respond to Built-in Interaction States

G6 provides built-in interaction state management states, such as `hover-activate` and `click-select`. You can get the current node state through the `data.states` field in the node data and adjust the node style based on the state.

**Example**: Change the background color when the node is hovered.

```jsx
import { ExtensionCategory, register, Graph } from '@antv/g6';
import { ReactNode } from '@antv/g6-extension-react';

register(ExtensionCategory.NODE, 'react-node', ReactNode);

const StatefulNode = ({ data }) => {
  const isActive = data.states?.includes('active');

  return (
    <div
      style={{
        width: 100,
        padding: 5,
        border: '1px solid #eee',
        boxShadow: isActive ? '0 0 8px rgba(24,144,255,0.8)' : 'none',
        transform: `scale(${isActive ? 1.05 : 1})`,
      }}
    >
      {data.data.label}
    </div>
  );
};

const graph = new Graph({
  data: {
    nodes: [
      { id: 'node1', style: { x: 100, y: 200 }, data: { label: 'node1' } },
      { id: 'node2', style: { x: 300, y: 200 }, data: { label: 'node2' } },
    ],
  },
  node: {
    type: 'react-node',
    style: {
      component: (data) => <StatefulNode data={data} />,
    },
  },
  behaviors: ['hover-activate'],
});

graph.render();
```

#### Custom Business State

When you need to manage business-related states (such as approval status, risk level), you can extend node data to achieve this:

**Example**: Add a `selected` variable through data to achieve style changes for node selection and deselection.

```jsx
import { ExtensionCategory, register, Graph } from '@antv/g6';
import { ReactNode } from '@antv/g6-extension-react';

register(ExtensionCategory.NODE, 'react-node', ReactNode);

const MyReactNode = ({ data, graph }) => {
  const handleClick = () => {
    graph.updateNodeData([{ id: data.id, data: { selected: !data.data.selected } }]);
    graph.draw();
  };

  return (
    <div
      style={{
        width: 200,
        padding: 10,
        border: '1px solid red',
        borderColor: data.data.selected ? 'orange' : '#ddd', // Set border color based on selection state
        cursor: 'pointer', // Add mouse pointer style
      }}
      onClick={handleClick}
    >
      Node
    </div>
  );
};

const graph = new Graph({
  data: {
    nodes: [
      {
        id: 'node1',
        style: { x: 100, y: 100 },
        data: { selected: true },
      },
    ],
  },
  node: {
    type: 'react-node',
    style: {
      component: (data) => <MyReactNode data={data} graph={graph} />,
    },
  },
});

graph.render();
```

### Event Interaction

Achieve two-way communication between nodes and graph instances, allowing nodes and graph instances to update each other.

**Example**: Operate graph data through custom nodes and re-render the graph.

```jsx
const IDCardNode = ({ id, selected, graph }) => {
  const handleSelect = () => {
    graph.updateNodeData([{ id, data: { selected: true } }]);
    graph.draw();
  };

  return <Select onChange={handleSelect} style={{ background: selected ? 'orange' : '#eee' }} />;
};

const graph = new Graph({
  node: {
    type: 'react-node',
    style: {
      component: ({ id, data }) => <IDCardNode id={id} selected={data.selected} graph={graph} />,
    },
  },
});
```

## Real Cases

```js | ob { inject: true }
import { DatabaseFilled } from '@ant-design/icons';
import { ExtensionCategory, Graph, register } from '@antv/g6';
import { ReactNode } from '@antv/g6-extension-react';
import { Badge, Flex, Input, Tag, Typography } from 'antd';
import { useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';

const { Text } = Typography;

register(ExtensionCategory.NODE, 'react', ReactNode);

const Node = ({ data, onChange }) => {
  const { status, type } = data.data;

  return (
    <Flex
      style={{
        width: '100%',
        height: '100%',
        background: '#fff',
        padding: 10,
        borderRadius: 5,
        border: '1px solid gray',
      }}
      vertical
    >
      <Flex align="center" justify="space-between">
        <Text>
          <DatabaseFilled />
          Server
          <Tag>{type}</Tag>
        </Text>
        <Badge status={status} />
      </Flex>
      <Text type="secondary">{data.id}</Text>
      <Flex align="center">
        <Text style={{ flexShrink: 0 }}>
          <Text type="danger">*</Text>URL:
        </Text>
        <Input
          style={{ borderRadius: 0, borderBottom: '1px solid #d9d9d9' }}
          variant="borderless"
          value={data.data?.url}
          onChange={(event) => {
            const url = event.target.value;
            onChange?.(url);
          }}
        />
      </Flex>
    </Flex>
  );
};

export const ReactNodeDemo = () => {
  const containerRef = useRef();

  useEffect(() => {
    const graph = new Graph({
      container: containerRef.current,
      data: {
        nodes: [
          {
            id: 'local-server-1',
            data: { status: 'success', type: 'local', url: 'http://localhost:3000' },
            style: { x: 50, y: 50 },
          },
          {
            id: 'remote-server-1',
            data: { status: 'warning', type: 'remote' },
            style: { x: 350, y: 50 },
          },
        ],
        edges: [{ source: 'local-server-1', target: 'remote-server-1' }],
      },
      node: {
        type: 'react',
        style: {
          size: [240, 100],
          component: (data) => <Node data={data} />,
        },
      },
      behaviors: ['drag-element', 'zoom-canvas', 'drag-canvas'],
    });

    graph.render();
  }, []);

  return <div style={{ width: '100%', height: '100%' }} ref={containerRef}></div>;
};

const root = createRoot(document.getElementById('container'));
root.render(<ReactNodeDemo />);
```

<br/>

```js | ob { inject: true }
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
```
