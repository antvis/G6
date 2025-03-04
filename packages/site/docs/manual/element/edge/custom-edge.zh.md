---
title: 自定义边
order: 10
---

## 自定义边

## 实现边

自定义边的方式和自定义节点类似，你可以继承现有边，也可以基于 G 图形进行全新的边开发。

这里给出一个继承 `BaseEdge` 的示例，实现一个自定义直线边：

```typescript
import { BaseEdge } from '@antv/g6';
import { Line } from '@antv/g';

import type { BaseEdgeStyleProps } from '@antv/g6';

class ExtendBaseEdge extends BaseEdge {
  // 重写 getKeyStyle 方法
  protected getKeyStyle(attributes: Required<BaseEdgeStyleProps>) {
    return { ...super.getKeyStyle(attributes), lineWidth: 2, stroke: '#000' };
  }

  // 实现 getKeyPath 方法
  protected getKeyPath(attributes) {
    const { sourceNode, targetNode } = this;
    const [x1, y1] = sourceNode.getPosition();
    const [x2, y2] = targetNode.getPosition();

    return [
      ['M', x1, y1],
      ['L', x2, y2],
    ];
  }
}
```

## 注册边

通过 G6 提供的 `register` 方法注册即可，详见[注册边](/manual/core-concept/element#注册边)

## 配置边

可在`数据`或`边样式映射`中使用并配置自定义边，详见[配置边](/manual/core-concept/element#配置边)
