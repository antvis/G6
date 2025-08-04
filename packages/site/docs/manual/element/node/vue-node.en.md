---
title: Define Nodes with Vue
order: 14
---

In G6, custom nodes typically require manipulating DOM or Canvas elements, but with the help of the [`g6-extension-vue`](https://github.com/Child-qjj/g6-extension-vue) ecosystem library, you can directly use Vue components as node content, enhancing development efficiency and maintainability.

## Choosing a Custom Node Solution

### G6 Node

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*sEaLR7Q_hmoAAAAAAAAAAAAAemJ7AQ/fmt.avif" width="300" />

✅ **Recommended Scenarios:**

- Nodes are simple geometric shapes
- Scenarios requiring efficient rendering of more than 2,000 nodes
- Need to directly manipulate graphic instances for fine control

> For detailed information on how to customize nodes using Canvas graphics, please refer to the [Custom Node](/en/manual/element/node/custom-node) documentation

### Vue Node

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*9oz-R7bIkd0AAAAAAAAAAAAADmJ7AQ/original" width="350" />

✅ **Recommended Scenarios:**

- Business systems that need to integrate UI libraries like Element Plus / Ant Design Vue
- Nodes contain interactive logic such as form input, state switching
- Scenarios where an existing Vue design system needs to be reused

## Quick Start

### Environment Preparation

Before starting, please ensure you have:

- **Installed a Vue project**: Ensure a Vue project is installed and created.
- **Vue version requirement**: Ensure the Vue version used is >=2.6.0. (Vue 3 is recommended)

### Install Dependencies

To use [`g6-extension-vue`](https://github.com/Child-qjj/g6-extension-vue), run the following command:

:::code-group

```bash [npm]
npm install g6-extension-vue
```

```bash [yarn]
yarn add g6-extension-vue
```

```bash [pnpm]
pnpm add g6-extension-vue
```

:::

### Component Integration

#### 1. Register Vue Node Type

Register the Vue node type through the extension mechanism:

```jsx
import { ExtensionCategory, register } from '@antv/g6';
import { VueNode } from 'g6-extension-vue';

register(ExtensionCategory.NODE, 'vue-node', VueNode);
```

The `register` method requires three parameters:

- Extension category: `ExtensionCategory.NODE` indicates this is a node type
- Type name: `vue-node` is the name we give to this custom node, which will be used in the configuration later
- Class definition: VueNode is the implementation class exported by `g6-extension-vue`

#### 2. Define Business Component

Define a simple Vue component as the content of the node:

```jsx
import { defineComponent, h } from 'vue';

const MyVueNode = defineComponent({
  setup(props, { attrs, slots, expose }) {
    return () => {
      return h('div', 'vue node');
    };
  },
});
```

#### 3. Use the Component

Use the custom Vue node in the graph configuration. Specify the node type and style in the graph configuration to use the custom Vue component.

- `type`: Specify the node type as `vue-node` (use the name given during registration)
- `style.component`: Define the Vue component content of the node

```jsx
const graph = new Graph({
  node: {
    type: 'vue-node',
    style: {
      component: () => <MyVueNode />,
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
import { VueNode } from 'g6-extension-vue';
import { computed, defineComponent } from 'vue';

register(ExtensionCategory.NODE, 'vue-node', VueNode);

const StatefulNode = defineComponent({
  setup(props, { attrs, slots, expose }) {
    const isActive = computed(() => props.data.states?.includes('active'));
    const label = computed(() => props.data.data?.label);

    return (
      <div
        style={{
          width: 100,
          padding: 5,
          border: '1px solid #eee',
          boxShadow: isActive.value ? '0 0 8px rgba(24,144,255,0.8)' : 'none',
          transform: `scale(${isActive.value ? 1.05 : 1})`,
        }}
      >
        {label.value}
      </div>
    );
  },
});

const graph = new Graph({
  data: {
    nodes: [
      { id: 'node1', style: { x: 100, y: 200 }, data: { label: 'node1' } },
      { id: 'node2', style: { x: 300, y: 200 }, data: { label: 'node2' } },
    ],
  },
  node: {
    type: 'vue-node',
    style: {
      component: (data) => <StatefulNode data={Object.assign({}, data)} />, // data is non-reactive, need to change reference to trigger Vue's props side effects
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
import { VueNode } from 'g6-extension-vue';
import { defineComponent, computed } from 'vue';

register(ExtensionCategory.NODE, 'vue-node', VueNode);

const MyVueNode = defineComponent({
  setup(props, { attrs, slots, expose }) {
    const isSelected = computed(() => props.data.data.selected);

    const handleClick = () => {
      graph.updateNodeData([{ id: props.data.id, data: { selected: !isSelected.value } }]);
      graph.draw();
    };

    return (
      <div
        style={{
          width: 200,
          padding: 10,
          border: '1px solid red',
          borderColor: isSelected.value ? 'orange' : '#ddd', // Set border color based on selection state
          cursor: 'pointer', // Add mouse pointer style
        }}
        onClick={handleClick}
      >
        Node
      </div>
    );
  },
});

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
    type: 'vue-node',
    style: {
      component: (data) => <MyVueNode data={Object.assign({}, data)} graph={graph} />, // data is non-reactive, need to change reference to trigger Vue's props side effects
    },
  },
});

graph.render();
```

### Event Interaction

Achieve two-way communication between nodes and graph instances, allowing nodes and graph instances to update each other.

**Example**: Operate graph data through custom nodes and re-render the graph.

```jsx
import { ExtensionCategory, register, Graph } from '@antv/g6';
import { VueNode } from 'g6-extension-vue';
import { defineComponent, computed } from 'vue';

register(ExtensionCategory.NODE, 'vue-node', VueNode);

const IDCardNode = defineComponent({
  setup(props, { attrs, slots, expose }) {
    const isSelected = computed(() => props.data.data.selected);

    const handleSelect = () => {
      graph.updateNodeData([{ id: props.data.id, data: { selected: true } }]);
      graph.draw();
    };

    return <Select onChange={handleSelect} style={{ background: isSelected.value ? 'orange' : '#eee' }} />;
  },
});

const graph = new Graph({
  node: {
    type: 'vue-node',
    style: {
      component: ({ id, data }) => <IDCardNode id={id} selected={isSelected.value} graph={graph} />,
    },
  },
});
```
