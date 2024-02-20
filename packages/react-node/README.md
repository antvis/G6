# G6 React Node

> Using React Component to custom your g6 node

## Docs

[https://dicegraph.github.io/](https://dicegraph.github.io/g6-react-node)

## Example

```jsx
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
          draggable
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
G6.registerNode('yourNode', createNodeFromReact(ReactNode));
```

## FAQ

### 注册节点时，如何拓展createNodeFromReact？

由于内置的 `createNodeFromReact` 方法目前只提供 `draw`  `update` `getAnchorPoints` 三个方法。当内置的方法不满足需求时，可自行实现 `createNodeFromReact` 方法。

```ts

// register.ts

import type {
  ICombo,
  IEdge,
  IGroup,
  INode,
  IShape,
  ModelConfig,
} from '@antv/g6';

import {
  diffTarget,
  getRealStructure,
  registerNodeReact,
  renderTarget,
} from '@antv/g6-react-node';

export function createNodeFromReact(
  Component: React.FC<{ cfg: ModelConfig }>,
): { [key: string]: any } {
  const compileXML = (cfg: ModelConfig) =>
    registerNodeReact(<Component cfg={cfg} />);

  return {
    draw(cfg: ModelConfig | undefined, fatherGroup: IGroup | undefined) {
      const resultTarget = compileXML(cfg || {});
      const keyshape: IShape = renderTarget(resultTarget, fatherGroup);
      return keyshape;
    },
    update(cfg: ModelConfig, node: INode | IEdge | ICombo | undefined) {
      const resultTarget = compileXML(cfg || {});
      // 更新节点信息时 更新节点的宽高
      cfg.width = resultTarget.boundaryBox?.width;
      cfg.height = resultTarget.boundaryBox?.height;
      if (node) {
        const nodeGroup = node.getContainer();
        const realTarget = getRealStructure(resultTarget);

        diffTarget(nodeGroup, realTarget);
      }
    },
    getAnchorPoints() {
      return [
        [0.5, 1],
        [0.5, 0],
      ];
    },
    ... other 
  };
}

// main.ts
import { createNodeFromReact } from './register';
G6.registerNode('yourNode', createNodeFromReact(ReactNode));
```
