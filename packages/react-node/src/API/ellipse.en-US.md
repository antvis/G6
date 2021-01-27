# Ellipse Style

```jsx
import React from 'react';
import G6 from '@antv/g6';
import { Group, Ellipse, createNodeFromReact } from 'g6-react-node';
import { G6MiniDemo } from '../ReactNode/demo';

const ReactNode = ({ cfg = {} }) => (
  <Group>
    <Ellipse
      style={{
        rx: 45,
        ry: 20,
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

<API src="./EllipseStyle.tsx" ></API>
