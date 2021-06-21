---
title: How to custom node with React Component
order: 5
---

Customing nodes has long been a problem, and even with the introduction of the jsx solution to simplify it, it's still difficult, so we've introduced `@antv/g6-react-node`, a package that makes it easier to define nodes. event animations, etc., to make it easier to use G6.

### How to use

First of all, after installing G6, you need to additionally install `@antv/g6-react-node`

```bash
npm install @antv/g6-react-node
// yarn add @antv/g6-react-node
```

As an example of a simple card with definitions, custom events, node data management, etc..

```jsx
import React from 'react';
import G6 from '@antv/g6';
import { Rect, Text, Circle, Image, Group, createNodeFromReact } from '@antv/g6-react-node';

const Tag = ({ text, color }) => (
  <Rect
    style={{
      fill: color,
      padding: [5, 10],
      width: 'auto',
      radius: [4],
      margin: [0, 8],
    }}
  >
    <Text style={{ fill: '#fff', fontSize: 10 }}>{text}</Text>
  </Rect>
);

const Card = ({ cfg }) => {
  const { collapsed = false } = cfg;

  return (
    <Group draggable>
      <Rect
        style={{
          width: 400,
          height: 'auto',
          fill: '#fff',
          stroke: '#ddd',
          shadowColor: '#eee',
          shadowBlur: 30,
          radius: [8],
          justifyContent: 'center',
          padding: [18, 0],
        }}
        draggable
      >
        <Text
          style={{
            fill: '#000',
            margin: [0, 24],
            fontSize: 16,
            fontWeight: 'bold',
          }}
        >
          This is a card
        </Text>
        <Text style={{ fill: '#ccc', fontSize: 12, margin: [12, 24] }}>
          I'm loooooooooooooooooooooooooooooooooog
        </Text>
        {collapsed && (
          <Group>
            <Image
              style={{
                img: 'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg',
                width: 200,
                height: 200,
                margin: [24, 'auto'],
              }}
            />
            <Rect style={{ width: 'auto', flexDirection: 'row', padding: [4, 12] }}>
              <Tag color="#66ccff" text="We" />
              <Tag color="#66ccff" text="are" />
              <Tag color="#66ccff" text="many" />
              <Tag color="#66ccff" text="tags" />
            </Rect>
          </Group>
        )}
        <Circle
          style={{
            position: 'absolute',
            x: 380,
            y: 20,
            r: 5,
            fill: collapsed ? 'blue' : 'green',
          }}
        >
          <Text
            style={{
              fill: '#fff',
              fontSize: 10,
              margin: [-6, -3, 0],
              cursor: 'pointer',
            }}
            onClick={(evt, node, shape, graph) => {
              graph.updateItem(node, {
                collapsed: !collapsed,
              });
            }}
          >
            {collapsed ? '-' : '+'}
          </Text>
        </Circle>
      </Rect>
    </Group>
  );
};

G6.registerNode('test', createNodeFromReact(Card));
```

It results in this

<img alt="card" width="400" src="https://gw.alipayobjects.com/zos/antfincdn/imZMZ8jYKJ/xiazai%252520%2815%29.png" />


### Using Guide

#### Shape React Component

When defining React component nodes, you cannot use any hook or asynchronous fetching logic as node drawing currently needs to be a synchronous process, and it is recommended to put all state as well as data information in the node itself DATA for easier management. In a React component node, all data flow should be: node data -> react component props(cfg) -> node content changes. The component itself needs to be free of any side effects and all changes to the node data should be based on updateItem.


#### React inner layouts

If you don't do any positioning or layout, all layouts will follow the normal document flow, top-down. To give you more freedom of layout, React also has internal support for flex layouts, which you can use by manipulating: `alignContent`,`alignItems`,`alignSelf`,`display`,`flex`,`flexBasis`,`flexGrow`,` flexShrink`, `flexDirection`, `flexWrap`, `height`, `width`, `justifyContent`, `margin`, `padding`, `maxHeight`, `maxWidth`, `minHeight`, ` minWidth` which control the internal layout of the node.


#### Event handling based on the React component Shape

To make it easier to control nodes, we support event binding to a graph inside a node (event bubbling will be supported in a later version), these event binding functions have uniform parameters: `(evt: the event of G6 itself, node: the node where the event occurs, shape: the Shape where the event occurs, graph: the graph where the event is emitted graph)`, we currently support most of the G6 events: `onClick`, `onDBClick`, `onMouseEnter`, `onMouseMove`, `onMouseOut`, `onMouseOver`, `onMouseLeave`, ` onMouseDown `,`onMouseUp `,`onDragStart `,`onDrag `,`onDragEnd `,`onDragEnter `,`onDragLeave `,`onDragOver `,`onDrop `,`onContextMenu `

⚠️ Note: After using the event, you need to mount the event on the performed pair of graphs using the function `appenAutoShapeListener(graph)`, which can be derived directly from the `@antv/g6-react-node` package.

#### Simple animations based on React component Shape (alpha)

In order to make it easier to add animations to nodes, we have built in some simple animations to use, hopefully to satisfy the effects of basic interaction. In the first phase we have only introduced six animations for now, the `animation` property is animated when it is set, and the property stops animating when it is empty.

For Example:

```jsx
<Rect
        style={{
          width: 400,
          // ...
        }}
        draggable
        animation={
          animated && {
            animate: 'rubber', // 同时支持 'spin','flash','pulse','tada','bounce'
            repeat: true,
            duration: 2000,
          }
        }
      >
```

<img alt="animate-show" src="https://gw.alipayobjects.com/zos/antfincdn/cXLES5%26w5x/ezgif.com-video-to-gif.gif" />

### More Help

[G6 React Node Docs](https://dicegraph.github.io/g6-react-node/)






