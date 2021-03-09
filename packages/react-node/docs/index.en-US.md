# Register Node Using React

How about building your G6 node using React Component with correct type inference.

```jsx
import React from 'react';
import G6 from '@antv/g6';
import {
  Group,
  Rect,
  Text,
  Circle,
  Image,
  createNodeFromReact,
} from '@antv/g6-react-node';
import { G6MiniDemo } from '../src/ReactNode/demo';

const ReactNode = ({ cfg = {} }) => {
  const { description, meta = {}, label = 'label' } = cfg;
  return (
    <Group>
      <Rect>
        <Rect
          style={{
            width: 150,
            height: 20,
            fill: cfg.color,
            radius: [6, 6, 0, 0],
            cursor: 'move',
            stroke: cfg.color,
          }}
          draggable="true"
        >
          <Text
            style={{
              marginTop: 2,
              marginLeft: 75,
              textAlign: 'center',
              fontWeight: 'bold',
              fill: '#fff',
            }}
          >
            {label}
          </Text>
        </Rect>
        <Rect
          style={{
            width: 150,
            height: 55,
            stroke: cfg.color,
            fill: '#ffffff',
            radius: [0, 0, 6, 6],
          }}
        >
          <Text style={{ marginTop: 5, fill: '#333', marginLeft: 4 }}>
            Desc: {description}
          </Text>
          <Text style={{ marginTop: 10, fill: '#333', marginLeft: 4 }}>
            Creator: {meta.creatorName}
          </Text>
        </Rect>
      </Rect>
      <Circle
        style={{
          stroke: cfg.color,
          r: 10,
          fill: '#fff',
          marginLeft: 75,
          cursor: 'pointer',
        }}
        name="circle"
      >
        <Image
          style={{
            img:
              'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png',
            width: 12,
            height: 12,
            marginLeft: 69,
            marginTop: -5,
          }}
        />
      </Circle>
    </Group>
  );
};

G6.registerNode('test', createNodeFromReact(ReactNode));

export default () => <G6MiniDemo nodeType="test" count={2} />;
```

```jsx | pure
import {
  Group,
  Rect,
  Text,
  Circle,
  Image,
  createNodeFromReact,
} from '@antv/g6-react-node';

const ReactNode = ({ cfg = {} }) => {
  const { description, meta = {}, label = 'label' } = cfg;
  return (
    <Group>
      <Rect>
        <Rect
          style={{
            width: 150,
            height: 20,
            fill: cfg.color,
            radius: [6, 6, 0, 0],
            cursor: 'move',
            stroke: cfg.color,
          }}
          draggable="true"
        >
          <Text
            style={{
              marginTop: 2,
              marginLeft: 75,
              textAlign: 'center',
              fontWeight: 'bold',
              fill: '#fff',
            }}
          >
            {label}
          </Text>
        </Rect>
        <Rect
          style={{
            width: 150,
            height: 55,
            stroke: cfg.color,
            fill: '#ffffff',
            radius: [0, 0, 6, 6],
          }}
        >
          <Text style={{ marginTop: 5, fill: '#333', marginLeft: 4 }}>
            描述: {description}
          </Text>
          <Text style={{ marginTop: 10, fill: '#333', marginLeft: 4 }}>
            创建者: {meta.creatorName}
          </Text>
        </Rect>
      </Rect>
      <Circle
        style={{
          stroke: cfg.color,
          r: 10,
          fill: '#fff',
          marginLeft: 75,
          cursor: 'pointer',
        }}
        name="circle"
      >
        <Image
          style={{
            img:
              'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png',
            width: 12,
            height: 12,
            marginLeft: 69,
            marginTop: -5,
          }}
        />
      </Circle>
    </Group>
  );
};

G6.registerNode('yourNode', createNodeFromReact(ReactNode));
```
