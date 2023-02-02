# 多边形 (Polygon) 样式属性

```jsx
import React from 'react';
import G6 from '@antv/g6';
import { Group, Polygon, createNodeFromReact } from '@antv/g6-react-node';
import { G6MiniDemo } from '../ReactNode/demo';

const ReactNode = ({ cfg = {} }) => (
  <Group>
    <Polygon
      style={{
        points: [
          [0, 0],
          [10, 30],
          [50, 100],
          [30, 120],
          [-20, 80],
        ],
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

<API src="./PolygonStyle.tsx" ></API>
