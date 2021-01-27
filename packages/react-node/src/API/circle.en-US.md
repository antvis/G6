# Circle Style

```jsx
import React from 'react';
import G6 from '@antv/g6';
import { Group, Circle, createNodeFromReact } from 'g6-react-node';
import { G6MiniDemo } from '../ReactNode/demo';

const ReactNode = ({ cfg = {} }) => (
  <Group>
    <Circle
      style={{
        r: 45,
        fill: cfg.color,
        radius: [6, 6, 0, 0],
        cursor: 'move',
        stroke: '#eee',
      }}
    />
  </Group>
);

G6.registerNode('test', createNodeFromReact(ReactNode));

export default () => <G6MiniDemo nodeType="test" count={2} />;
```

<API src="./CircleStyle.tsx" ></API>
