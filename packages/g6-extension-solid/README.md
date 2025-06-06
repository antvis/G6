## SolidJS extension for G6

<img width="500" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*rWSiT6dnwfcAAAAAAAAAAAAADmJ7AQ/original" />

This extension allows you to define G6 node by SolidJS component and JSX syntax with fine-grained reactivity.

## Features

- **Familiar JSX syntax**: Write components using JSX just like React, but with SolidJS's reactive primitives
- **Fine-grained reactivity**: Unlike React's virtual DOM, SolidJS uses signals for surgical DOM updates
- **No re-renders**: Component props are reactive signals that update only the parts of the DOM that depend on them

## Usage

1. Install

```bash
npm install @antv/g6-extension-solid
```

2. Import and Register

```js
import { ExtensionCategory, register } from '@antv/g6';
import { SolidNode } from '@antv/g6-extension-solid';

register(ExtensionCategory.NODE, 'solid-node', SolidNode);
```

3. Define Node

SolidJS Node:

```jsx
const SolidNode = (props) => {
  return <div>node: {props.id}</div>;
};
```

G Node with SolidJS:

```jsx
import { Group, Rect, Text } from '@antv/g6-extension-solid';

const GNode = (props) => {
  return <Group>
    <Rect width={100} height={100}></Rect>
    <Text text={props.label || "node"} />
  </Group>
};
```

Reactive Node:

```jsx
import { createSignal } from 'solid-js';

const ReactiveNode = (props) => {
  const [count, setCount] = createSignal(0);
  
  return (
    <div onClick={() => setCount(count() + 1)}>
      Node {props.id}: {count()} clicks
    </div>
  );
};
```

4. Use

Use SolidNode:

```jsx
const graph = new Graph({
  // ... other options
  node: {
    type: 'solid-node',
    style: {
      component: SolidNode,
    },
  },
});
```

Use GNode:

```jsx
const graph = new Graph({
  // ... other options
  node: {
    type: 'solid-node',
    style: {
      component: GNode,
    },
  },
});
```

## Key Differences from React Extension

1. **Reactivity Model**: SolidJS uses signals instead of virtual DOM, providing automatic fine-grained updates
2. **Performance**: No re-renders - only the specific DOM nodes that depend on changed signals are updated
3. **Props Updates**: Node attributes are automatically reactive through signals, no manual re-rendering needed

## Q&A

1. Difference between SolidNode and GNode

SolidNode is a Solid JSX component that renders to regular DOM, while GNode supports JSX syntax but can only use G tag nodes for SVG/Canvas rendering.

2. How does reactivity work?

The extension automatically creates signals for node attributes. When attributes change in G6, the signals update, and SolidJS reactively updates only the parts of the DOM that depend on those signals.

## Resources

- [SolidJS Documentation](https://www.solidjs.com/)
- [G6 Custom Nodes](https://g6.antv.antgroup.com/examples/element/custom-node/)
