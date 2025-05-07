---
title: Define Nodes with React
order: 5
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

<Playground path="element/custom-node/demo/react-node.jsx" rid="react-node-rid"></Playground>

<br/>

<Playground path="element/custom-node/demo/reactnode-idcard.jsx" rid="reactnode-idcard-rid"></Playground>
