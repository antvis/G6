# 标记 (Marker) 样式属性

```jsx
import React from 'react';
import G6 from '@antv/g6';
import { Group, Marker, createNodeFromReact } from '@antv/g6-react-node';
import { G6MiniDemo } from '../ReactNode/demo';

const ReactNode = ({ cfg = {} }) => (
  <Group>
    <Marker
      style={{
        r: 40,
        symbol: function(x, y, r) {
          return [['M', x, y], ['L', x + r, y + r], ['L', x + r * 2, y], ['Z']];
        },
        fill: cfg.color,
        cursor: 'move',
        stroke: '#888',
      }}
      draggable
    />
  </Group>
);

G6.registerNode('test', createNodeFromReact(ReactNode));

export default () => <G6MiniDemo nodeType="test" count={2} />;
```

<API src="./MarkerStyle.tsx" ></API>
