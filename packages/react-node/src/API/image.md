# 图片 (Image) 样式属性

```jsx
import React from 'react';
import G6 from '@antv/g6';
import { Group, Image, createNodeFromReact } from 'g6-react-node';
import { G6MiniDemo } from '../ReactNode/demo';

const ReactNode = ({ cfg = {} }) => (
  <Group>
    <Image
      style={{
        img: 'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png',
        width: 48,
        height: 48,
        cursor: 'move',
      }}
      draggable
    />
  </Group>
);

G6.registerNode('test', createNodeFromReact(ReactNode));

export default () => <G6MiniDemo nodeType="test" count={2} />;
```

<API src="./ImageStyle.tsx" ></API>
