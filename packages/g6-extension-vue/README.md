## React extension for G6

<img width="500" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*rWSiT6dnwfcAAAAAAAAAAAAADmJ7AQ/original" />

This extension allows you to define G6 node by React component and JSX syntax.

## Usage

1. Install

```bash
npm install @antv/g6-extension-vue
```

2. Import and Register

```js
import { ExtensionCategory, register } from '@antv/g6';
import { VueNode } from '@antv/g6-extension-vue';

register(ExtensionCategory.NODE, 'vue', VueNode);
```

3. Define Node

React Node:

```jsx
const VueNode = () => {
  return <div>node</div>;
};
```

4. Use

Use VueNode:

```jsx
const graph = new Graph({
  // ... other options
  node: {
    type: 'vue',
    style: {
      component: (node:Datum) => <VueNode data={node.data}/>,// data is not reactivity
    },
  },
});
```

## Q&A

1. Reactivity

VueNode is a Vue component, so it can use Vue reactivity. but the component element can not be changed by reactivity.

## Resources

- [Vue node](https://g6.antv.antgroup.com/examples/element/custom-node/#vue-node)
