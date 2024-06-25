## React extension for G6

<img width="500" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*rWSiT6dnwfcAAAAAAAAAAAAADmJ7AQ/original" />

This extension allows you to define G6 node by React component and JSX syntax.

## Usage

1. Install

```bash
npm install @antv/g6-extension-react
```

2. Import and Register

```js
import { ExtensionCategory, register } from '@antv/g6';
import { ReactNode, GNode } from '@antv/g6-extension-react';

register(ExtensionCategory.NODE, 'react', ReactNode);
register(ExtensionCategory.NODE, 'g', GNode);
```

3. Define Node

React Node:

```jsx
const ReactNode = () => {
  return <div>node</div>;
};
```

G Node:

```jsx
import { Group, Rect, Text } from '@antv/g6-extension-react';

const GNode = () => {
  return <Group>
    <Rect width={100} height={100}></Rect>
    <Text text={"node"} />
  <Group>
};
```

4. Use

Use ReactNode:

```jsx
const graph = new Graph({
  // ... other options
  node: {
    type: 'react',
    style: {
      component: () => <GNode />,
    },
  },
});
```

Use GNode:

```jsx
const graph = new Graph({
  // ... other options
  node: {
    type: 'g',
    style: {
      component: () => <ReactNode />,
    },
  },
});
```

## Q&A

1. Difference between ReactNode and GNode

ReactNode is a React component, while GNode support jsx syntax but can only use G tag node.

## Resources

- [React node](https://g6-next.antv.antgroup.com/examples/element/custom-node/#react-node)
- [G node with JSX syntax](https://g6-next.antv.antgroup.com/en/examples/element/custom-node/#react-g)