# Path Style

```jsx
import React from 'react';
import G6 from '@antv/g6';
import { Group, Path, createNodeFromReact } from '@antv/g6-react-node';
import { G6MiniDemo } from '../ReactNode/demo';

const ReactNode = ({ cfg = {} }) => (
  <Group>
    <Path
      style={{
        path: [
          ['M', 0, 0],
          ['L', 20, -7.5],
          ['L', 13.33, 0],
          ['L', 20, 7.5],
          ['Z'],
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

<API src="./PathStyle.tsx" ></API>
