# 简单卡片案例

> 这是一个简单的卡片案例

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
          这是一个卡片
        </Text>
        <Text style={{ fill: '#ccc', fontSize: 12, margin: [12, 24] }}>
          我是一段特别特别特别特别特别特别特别长的描述
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
          {
            ["我是", "很多个", "很多个的", "标签"].map(e => <Tag color="#66ccff" text={e} />)
          }
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
