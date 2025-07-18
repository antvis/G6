---
title: 使用 React 定义节点
order: 13
---

在 G6 中，自定义节点通常需要操作 DOM 或 Canvas 元素，但借助 `@antv/g6-extension-react` 一方生态库，可以直接使用 React 组件作为节点内容，提升开发效率与可维护性。

## 自定义节点方案选择

### G6 节点

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*sEaLR7Q_hmoAAAAAAAAAAAAAemJ7AQ/fmt.avif" width="300" />

✅ **推荐场景：**

- 节点只是简单的几何图形
- 需要高效渲染超过 2,000 个节点的场景
- 需要直接操作图形实例进行精细控制

> 有关如何使用 Canvas 图形自定义节点的详细信息，请参阅 [自定义节点](/manual/element/node/custom-node) 文档

### React Node

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*9oz-R7bIkd0AAAAAAAAAAAAADmJ7AQ/original" width="350" />

✅ **推荐场景：**

- 需要集成 Ant Design 等 UI 库的业务系统
- 节点包含表单输入、状态切换等交互逻辑
- 已有 React 设计系统需要复用的场景

## 快速入门

### 环境准备

在开始之前，请确保您已经：

- **安装 React 项目**：确保已安装并创建 React 项目。
- **React 版本要求**：确保使用的 React 版本 >=16.8.0。

### 安装依赖

要使用 `@antv/g6-extension-react`，请运行以下命令：

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

### 组件集成

#### 1. 注册 React 节点类型

通过扩展机制注册 React 节点类型：

```jsx
import { ExtensionCategory, register } from '@antv/g6';
import { ReactNode } from '@antv/g6-extension-react';

register(ExtensionCategory.NODE, 'react-node', ReactNode);
```

`register` 方法需要三个参数：

- 扩展类别：`ExtensionCategory.NODE` 表示这是一个节点类型
- 类型名称：`react-node` 是我们给这个自定义节点起的名字，后续会在配置中使用
- 类定义：ReactNode 是 `@antv/g6-extension-react` 导出的实现类

#### 2. 定义业务组件

定义一个简单的 React 组件作为节点的内容：

```jsx
const MyReactNode = () => {
  return <div>node</div>;
};
```

#### 3. 使用组件

在图配置中使用自定义的 React 节点。通过在图配置中指定节点类型和样式，来使用自定义的 React 组件。

- `type`：指定节点类型为 `react-node` (使用与注册时起的名字)
- `style.component`：定义节点的 React 组件内容

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

## 高级功能

### 状态管理

在复杂图可视化场景中，节点需要动态响应交互状态。我们提供两种互补的状态管理方案：

#### 响应内置交互状态

G6 提供内置的交互状态管理状态，如 `hover-activate` 和 `click-select`。可以通过节点数据中的 `data.states` 字段获取当前节点状态，并根据状态调整节点样式。

**示例**：在节点被 hover 时改变背景颜色。

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

#### 自定义业务状态

当需要管理业务相关状态（如审批状态、风险等级）时，可通过扩展节点数据实现：

**示例**：通过 data 添加 `selected` 变量，实现节点选中和取消选中的样式变化。

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
        borderColor: data.data.selected ? 'orange' : '#ddd', // 根据选中状态设置边框颜色
        cursor: 'pointer', // 添加鼠标指针样式
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

### 事件交互

实现节点与图实例的双向通信，使节点和图实例可以相互更新。

**示例**：通过自定义节点操作图数据，并重新渲染图形。

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

## 实际案例

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
