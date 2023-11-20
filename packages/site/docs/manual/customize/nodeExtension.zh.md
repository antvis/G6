---
title: 自定义节点
order: 1
---

## 示例

```js
import { Graph as BaseGraph, extend, Extensions } from '@antv/g6';

// 自定义节点类型，继承一个已有的节点类型或节点基类 Extensions.BaseNode
class CustomNode extends Extensions.CircleNode {
  // 覆写方法，可覆写的类方法见下文
}

const Graph = extend(BaseGraph, {
  // 注册自定义节点
  nodes: {
    'custom-node': CustomNode,
  },
});

const graph = new Graph({
  // ... 其他配置
  node: {
    type: 'custom-node', // 使用注册的节点
  },
});
```

## 覆写方法

### draw

:::info{title=提示}
大多数情况下并不需要覆写 draw 方法，更常用的做法是覆写 `drawKeyShape`、`drawLabelShape` 等方法，这些方法将在下文介绍。
:::

G5 5.0 移除了 `update` 和 `afterUpdate` 方法。现在只需要覆写 `draw` 方法和 `afterDraw` 方法，G6 将自动根据更新的属性增量更新图形。

draw 方法通过调用 `this.drawKeyShape` 等方法分别绘制节点各部分。

你可以参考 `circle-node` 类型节点的 [draw](https://github.com/antvis/G6/blob/6be8f9810ec3b9310371f37de1a2591f14db67f1/packages/g6/src/stdlib/item/node/circle.ts#L25) 方法进行覆写。

### afterDraw

在 `draw` 函数完成之后执行的逻辑，例如根据 `draw` 中已绘制的图形的包围盒大小，调整其他相关的图形。也可以用于绘制更多的图形，返回值和 `draw` 方法一致。

在内置的节点类型中，没有对它进行实现。

### drawKeyShape

绘制主图形(`keyShape`)，该图形是必须的，例如圆形节点的主图形是一个圆形(`circle`)，矩形节点的主图形是一个矩形(`rect`)。

覆写 `drawKeyShape` 方法的示例如下：

```typescript
public drawKeyShape(
  model: NodeDisplayModel,
  shapeMap: NodeShapeMap,
): DisplayObject {
  return this.upsertShape(
    'circle',
    'keyShape',
    this.mergedStyles.keyShape,
    shapeMap,
    model,
  );
}
```

### drawHaloShape

绘制主图形轮廓图形(`haloShape`)，通常在 `selected`, `active` 状态下显示。

若需要覆写，则可以参考 [BaseNode.drawHaloShape](https://github.com/antvis/G6/blob/fddf9a5c0f7933b4d704038a7474358cb47037d0/packages/g6/src/stdlib/item/node/base.ts#L491)

### drawLabelShape

绘制文本图形（`labelShape`）

若需要覆写，则可以参考 [BaseNode.drawLabelShape](https://github.com/antvis/G6/blob/fddf9a5c0f7933b4d704038a7474358cb47037d0/packages/g6/src/stdlib/item/node/base.ts#L277)。

### drawLabelBackgroundShape

绘制文本图形的背景框图形（`labelBackgroundShape`）

若需要覆写，则可以参考 [BaseNode.drawLabelBackgroundShape](https://github.com/antvis/G6/blob/fddf9a5c0f7933b4d704038a7474358cb47037d0/packages/g6/src/stdlib/item/node/base.ts#L383)。

### drawLabelIconShape

绘制文本图形的图标图形（`iconShape`）的方法

若需要覆写，则可以参考 [BaseNode.drawLabelIconShape](https://github.com/antvis/G6/blob/fddf9a5c0f7933b4d704038a7474358cb47037d0/packages/g6/src/stdlib/item/node/base.ts#L440)

### drawAnchorShapes

绘制连接桩图形（`anchorShapes`）的方法

若需要覆写，则可以参考 [BaseNode.drawAnchorShapes](https://github.com/antvis/G6/blob/fddf9a5c0f7933b4d704038a7474358cb47037d0/packages/g6/src/stdlib/item/node/base.ts#L531)

> ⚠️ 注意：`drawAnchorShapes` 返回一个图形 map，key 是图形的 id，value 是图形对象。

### drawBadgeShapes

绘制徽标图形（`badgeShapes`）的方法

若需要覆写，则可以参考 [BaseNode.drawBadgeShapes](https://github.com/antvis/G6/blob/fddf9a5c0f7933b4d704038a7474358cb47037d0/packages/g6/src/stdlib/item/node/base.ts#L629)

> ⚠️ 注意：`drawBadgeShapes` 返回一个图形 map，key 是图形的 id，value 是图形对象。

### drawOtherShapes

绘制上述部分之外的图形，可以在 `drawOtherShapes` 中完成

例如额外创建一个文本：

```typescript
drawOtherShapes(model, shapeMap) {
  const { data } = model;
  const text = data.otherShapes.text;
  return {
    textShape: this.upsertShape(
      'text',
      'other-text-shape',
      {
        text,
        fontSize: 12
      },
      shapeMap,
      model,
    ),
    // ... 其他额外的图形
  };
}
```

> ⚠️ 注意：`drawOtherShapes` 返回一个图形 map，key 是图形的 id，value 是图形对象。

#### 使用 G2 图表作为自定义节点

通过 `drawOtherShapes` 可以渲染许多自定义图形，这些图形底层都是基于 `@antv/g` 绘制的，因此可以将任何基于 `@antv/g` 构建的图形库的图形作为自定义节点的图形。例如，可以使用 `@antv/g2` 构建的图表作为自定义节点的图形，下面是一个简单的例子：

```typescript
import { stdlib, renderToMountedElement } from '@antv/g2';

/** stdlib 是 G2 的标准工具库 */
const G2Library = { ...stdlib() };

// 下面是自定义节点的 drawOtherShapes 方法
drawOtherShapes(model, shapeMap) {
  // 创建一个 group
  const group = this.upsertShape(
    'group',
    'g2-chart-group',
    {},
    shapeMap,
    model,
  );
  // 让 group 响应事件
  group.isMutationObserved = true;
  // 当 group 挂载到画布上时，渲染 G2 图表
  group.addEventListener('DOMNodeInsertedIntoDocument', () => {
    // 将 G2 图表渲染到 group 里
    renderToMountedElement(
      {
        // 这里填写 G2 的 Specification
      },
      {
        group,
        library: G2Library,
      },
    );
  });
  return {
    'g2-chart-group': group,
  };
}
```

更多的关于 G2 图表的使用，可以参考 [G2 官网](https://g2.antv.antgroup.com/)。

G6 5.0 也提供了相关案例：

- [使用 G2 自定义的条形图节点](/zh/examples/item/customNode/#g2BarChart)
- [使用 G2 自定义的点阵图节点](/zh/examples/item/customNode/#g2LatticeChart)
- [使用 G2 自定义的活动图节点](/zh/examples/item/customNode/#g2ActiveChart)

## 成员属性及方法

`BaseNode` 及其子类提供了一些成员属性和方法，用于方便地新增或更新图形。

<embed src="../../common/PluginMergedStyles.zh.md"></embed>

<embed src="../../common/PluginUpsertShape.zh.md"></embed>
