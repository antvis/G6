# Simple Card Example

> This is a simple card example

```jsx
import React from 'react';
import G6 from '@antv/g6';
import {
  Rect,
  Text,
  Circle,
  Image,
  Group,
  createNodeFromReact,
} from '@antv/g6-react-node';
import { G6MiniDemo } from '../ReactNode/demo';

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
    <Text style={{ fill: '#fff' }}>{text}</Text>
  </Rect>
);

const Card = () => {
  return (
    <Group>
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
          I'm a very very very very very very very long description.
        </Text>
        <Image
          style={{
            img:
              'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg',
            width: 200,
            height: 200,
            margin: [24, 'auto'],
          }}
        />
        <Rect style={{ width: 'auto', flexDirection: 'row', padding: [4, 12] }}>
          <Tag color="#66ccff" text="This" />
          <Tag color="#66ccff" text="is a card" />
          <Tag color="#66ccff" text="definitely" />
          <Tag color="#66ccff" text="Tag" />
        </Rect>
        <Circle
          style={{
            position: 'absolute',
            x: 380,
            y: 20,
            r: 5,
            fill: 'red',
            cursor: 'pointer',
          }}
        />
      </Rect>
    </Group>
  );
};

G6.registerNode('test', createNodeFromReact(Card));

export default () => <G6MiniDemo nodeType="test" count={1} height={400} />;
```
