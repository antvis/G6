---
title: 自定义组合
order: 3
---

G6 中的组合继承自 `BaseNode`，但具有一定的差异：组合存在两种状态，即展开(`Expanded`)和收起(`Collapsed`)状态，因此实现上也有所不同。

## 实现组合

自定义组合的方式和自定义节点类似，你可以继承现有组合，也可以基于 G 图形进行全新的组合开发。

这里给出一个继承 `BaseCombo` 的示例，实现一个自定义矩形组合：

```typescript
import { BaseCombo } from '@antv/g6';
import { Rect } from '@antv/g';

import type { BaseComboStyleProps } from '@antv/g6';

class ExtendBaseCombo extends BaseCombo {
  protected getKeyStyle(attributes: Required<BaseComboStyleProps>) {
    const [width, height] = this.getKeySize(attributes);
    return { ...super.getKeyStyle(attributes), anchor: [0.5, 0.5], width, height };
  }

  // 实现 drawKeyShape 方法
  protected drawKeyShape(attributes: Required<BaseComboStyleProps>, container: Group) {
    return this.upsert('key', Rect, this.getKeyStyle(attributes), container);
  }
}
```

## 注册组合

通过 G6 提供的 `register` 方法注册即可，详见[注册组合](/manual/element/combo/overview#注册组合)

## 配置组合

可在`数据`或`组合样式映射`中使用并配置自定义组合，详见[配置组合](/manual/element/combo/overview#配置组合)
