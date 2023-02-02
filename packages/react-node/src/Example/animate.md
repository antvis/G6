# 动画使用案例

> 这是一个简单的形状事件绑定案例, 点击右上角按钮展开节点

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
    <Text style={{ fill: '#fff', fontSize: 10 }}>{text}</Text>
  </Rect>
);

const Card = ({ cfg }) => {
  const { animated = false } = cfg;

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
        animation={
          animated && {
            animate: 'rubber',
            repeat: true,
            duration: 2000,
          }
        }
      >
        <Text
          style={{
            fill: '#000',
            margin: [0, 24],
            fontSize: 16,
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
          onClick={(evt, node, shape, graph) => {
            graph.updateItem(node, {
              animated: !animated,
            });
          }}
          animation={
            animated && {
              animate: 'flash',
              repeat: true,
              duration: 2000,
            }
          }
        >
          点我{animated ? '暂停' : '看'}动画
        </Text>
        <Text style={{ fill: '#ccc', fontSize: 12, margin: [12, 24] }}>
          我是一段特别特别特别特别特别特别特别长的描述
        </Text>
      </Rect>
    </Group>
  );
};

G6.registerNode('test', createNodeFromReact(Card));

export default () => <G6MiniDemo nodeType="test" count={1} height={400} />;
```
