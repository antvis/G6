---
title: 自定义节点类型扩展
order: 1
---

G6 5.0 提供了内置、自定义统一的定义和注册逻辑。所有内置、自定义的节点类型，应当继承节点的基类 `BaseNode` 或已有的节点类型。根据需要，选择性复写以下函数：

## draw

相比于 v4 版本，v5 去除了 `update` 和 `afterUpdate` 方法，目标是减少用户对函数的理解成本和逻辑控制。在 v5，只需要复写 `draw` 方法和 `afterDraw` 方法，G6 将自动根据更新的属性增量更新图形。

draw 方法中，应当调用 `this.drawKeyShape` 以及 `this.drawXShape` 方法交由不同的方法绘制各个图形。G6 节点视觉规范中的图形有：

- keyShape: 主图形，每个节点必须有；
- haloShape: 主图形背后的光晕图形，一般形状和 keyShape 一致，在某些状态（如 selected，active 等）状态下显示；
- labelShape: label 文本图形；
- labelBackgroundShape: label 文本背景框图形；
- iconShape: 图标图形；
- anchorShapes: 若干个图形，表示节点的边连入位置上的圆形；
- badgeShapes: 若干个图形，表示徽标，每个徽标由一个文本和一个圆角矩形背景组成，全部平铺在 badgeShapes 中。

而不在上述列表中的图形，应当通过 `drawOtherShapes` 来绘制。当然你也可以定义自己的 `drawXShape(s)`，并在 `draw` 方法中调用，将返回的图形写入到一个 key 是图形 id，value 是图形的图形对象中，并作为 `draw` 方法的返回值。

下面是 `circle-node` 类型节点的 `draw` 方法，可参考进行复写：

```typescript
public draw(
  model: NodeDisplayModel,
  shapeMap: NodeShapeMap,
  diffData?: { previous: NodeModelData; current: NodeModelData },
  diffState?: { previous: State[]; current: State[] },
): NodeShapeMap {
  const { data = {} } = model;
  let shapes: NodeShapeMap = { keyShape: undefined };

  // 绘制 keyShape，并存储到图形的 map 中
  shapes.keyShape = this.drawKeyShape(model, shapeMap, diffData);

  // 若配置了 haloShape（keyShape 背后的光晕，一般在某些状态下显示）并有对应的绘制函数，绘制 haloShape 并存储到图形的 map 中
  if (data.haloShape && this.drawHaloShape) {
    shapes.haloShape = this.drawHaloShape(model, shapeMap, diffData);
  }

  // 若配置了 labelShape（节点的文本图形）并有对应的绘制函数，绘制 labelShape 并存储到图形的 map 中
  if (data.labelShape && this.drawLabelShape) {
    shapes.labelShape = this.drawLabelShape(model, shapeMap, diffData);
  }

  // 若配置了 labelBackgroundShape（节点文本图形的背景框）并有对应的绘制函数，绘制 labelBackgroundShape 并存储到图形的 map 中
  if (data.labelBackgroundShape && this.drawLabelBackgroundShape) {
    shapes.labelBackgroundShape = this.drawLabelBackgroundShape(
      model,
      shapeMap,
      diffData,
    );
  }

  // 若配置了 anchorShapes（节点的边连入位置上的圆形）并有对应的绘制函数，绘制 anchorShapes 并存储到图形的 map 中
  if (data.anchorShapes && this.drawAnchorShapes) {
    const anchorShapes = this.drawAnchorShapes(
      model,
      shapeMap,
      diffData,
      diffState,
    );
    // drawAnchorShapes 绘制并返回了多个图形，因此需要如下分别加入图形 map 中
    shapes = {
      ...shapes,
      ...anchorShapes,
    };
  }

  // 若配置了 iconShape（节点的图标图形）并有对应的绘制函数，绘制 iconShape 并存储到图形的 map 中
  if (data.iconShape && this.drawIconShape) {
    shapes.iconShape = this.drawIconShape(model, shapeMap, diffData);
  }

  // 若配置了 badgeShapes（节点的徽标图形）并有对应的绘制函数，绘制 badgeShapes 并存储到图形的 map 中
  if (data.badgeShapes && this.drawBadgeShapes) {
    const badgeShapes = this.drawBadgeShapes(
      model,
      shapeMap,
      diffData,
      diffState,
    );
    // drawBadgeShapes 绘制并返回了多个图形，因此需要如下分别加入图形 map 中
    shapes = {
      ...shapes,
      ...badgeShapes,
    };
  }

  // 若配置了 otherShapes（除了上述规范内的图形以外的其他图形）并有对应的绘制函数，绘制额外的图形并存储到图形的 map 中
  if (data.otherShapes && this.drawOtherShapes) {
    // drawOtherShapes 绘制并返回了多个图形，因此需要如下分别加入图形 map 中
    shapes = {
      ...shapes,
      ...this.drawOtherShapes(model, shapeMap, diffData),
    };
  }
  return shapes;
}
```

## afterDraw

在 `draw` 函数完成之后执行的逻辑，例如根据 `draw` 中已绘制的图形的包围盒大小，调整其他相关的图形。也可以用于绘制更多的图形，返回值如同 `draw` 方法，是新增图形的 map。在内置的节点类型中，没有对它进行实现。

```typescript
public afterDraw(
  model: NodeDisplayModel | ComboDisplayModel,
  shapeMap: { [shapeId: string]: DisplayObject },
  shapesChanged?: string[],
): { [otherShapeId: string]: DisplayObject } {
  // 返回新增图形的 map，key 是图形 id，value 是图形。
  return {};
}
```

## drawXShape(s)

绘制 X 图形的方法，例如 `drawKeyShape`、`drawAnchorShapes` 等，下面将举例。所有的 drawXShape(s) 应当调用 `this.upsertShape` 新增/修改图形，该方法将检测传入的 shapeMap 中是否已有对应 id 的图形，若不存在则新建，若存在则增量更新。

`this.upsertShape(shapeType, shapeId, style, shapeMap, model)` 的参数如下：

- `shapeType`：
  - 类型：`'rect' | 'circle' | 'ellipse' | 'polygon' | 'image' | 'polyline' | 'line' | 'path' | 'text'`；
  - 图形类型名称；
- `shapeId`：
  - 类型：`string`；
  - 图形 id，一般和 drawXShape(s) 中的 X 对应（小驼峰式），后续都将使用该 id 进行检索；
- `style`：
  - 类型：`ShapeStyle`；
  - 图形的样式，一般在 `drawXShape(s)` 中从其第一个参数渲染数据 `model` 中解析出来；
- `shapeMap`：
  - 类型：`object`；
  - key 为图形 id，value 为图形的 map 对象，即 `drawXShape(s)` 的第二个参数；
- `model`：
  - 类型：`NodeDisplayModel`；
  - 节点的渲染数据，即 `drawXShape(s)` 的第一个参数。

下面举例 `drawKeyShape`、`drawLabelShape`、`drawLabelBackgroundShape`、`drawOtherShapes`。

### 例 1: drawKeyShape

绘制主图形 keyShape 的方法，`circle-node` 的 `drawKeyShape` 实现如下，理论上在自定义节点中根据需要更改 upsertShape 的图形类型和对应配置即可：

```typescript
public drawKeyShape(
  model: NodeDisplayModel,
  shapeMap: NodeShapeMap,
  diffData?: { previous: NodeModelData; current: NodeModelData },
  diffState?: { previous: State[]; current: State[] },
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

### 例 2: drawLabelShape

绘制文本图形 labelShape 的方法，内置节点的 `drawLabelShape` 根据配置中的 `position` （文本相对于 keyShape 的位置）、`angle`（旋转角度）、`maxWidth`（文本的最长长度，超过则截断并显示 `…`，值相对于 keyShape 的百分比或绝对的像素值）等非直接图形样式的属性，进行了计算转换为图形样式，使用计算后的样式调用 `this.upsertShape` 绘制 `rect` 图形。若自定义节点中无需考虑这些配置，可以忽略并完全重新 `drawLabelShape`。若需要考虑，则可以参考 [`baseNode` 的实现](https://github.com/antvis/G6/blob/fddf9a5c0f7933b4d704038a7474358cb47037d0/packages/g6/src/stdlib/item/node/base.ts#L277)。

### 例 3: drawLabelBackgroundShape

绘制文本图形的背景框图形 labelBackgroundShape 的方法，内置的 `drawLabelBackgroundShape` 将根据 `labelShape` 的包围盒大小，计算背景框矩形的大小。这要求了调用本方法时，`labelShape` 应当已经被绘制。因此自定义的时候也应当注意在 `draw` 方法中先调用 `drawLabelShape` 再调用 `drawLabelBackgroundShape`。若其他图形之间存在包围盒大小计算的依赖，也应当参考这一逻辑，只有已经被绘制的图形才能从 `shapeMap` 中取得并使用 `shape.getRenderBounds()` 或 `shape.getLocalBounds()` 获得包围盒。

内置的 `drawLabelBackgroundShape` 根据配置和 `labelShape` 进行了样式的计算后，使用 `this.upsertShape` 绘制 `rect` 图形，可参考[`baseNode` 的实现](https://github.com/antvis/G6/blob/fddf9a5c0f7933b4d704038a7474358cb47037d0/packages/g6/src/stdlib/item/node/base.ts#L383)。

### 例 4: drawOtherShapes

keyShape、haloShape、labelShape、labelBackgroundShape、iconShape、badgeShapes、anchorShapes 都是 G6 v5 节点样式规范中的图形。若自定义节点中有规范之外的图形，可以在 `drawOtherShapes` 绘制，它们在渲染数据 `model` 中的配置也将被包在 `otherShapes` 字段下：

```typescrirpt
{
  id: ID,
  data: {
    keyShape: ShapeStyle,
    haloShape: ShapeStyle,
    // ... 其他规范内的图形
    // 额外的图形：
    otherShapes: {
      xxShape: ShapeStyle,
      yyShape: ShapeStyle,
      // ... 其他额外图形
    }
  }
}
```

从 `model` 中取出对应的字段，或根据自定义的逻辑，传给 `this.upsertShape` 必要的图形样式属性，增加图形，并返回新增图形的 map，例如：

```typescript
drawOtherShapes(model, shapeMap, diffData) {
  const { data } = model;
  const keyShapeBBox = shapeMap.keyShape.getLocalBounds();
  return {
    markerShape: this.upsertShape(
      'path',
      'markerShape',
      {
        cursor: 'pointer',
        stroke: '#666',
        lineWidth: 1,
        fill: '#fff',
        path: data.collapsed
          ? stdLib.markers.expand(keyShapeBBox.center[0], keyShapeBBox.max[1], 8)
          : stdLib.markers.collapse(keyShapeBBox.center[0], keyShapeBBox.max[1], 8),
      },
      shapeMap,
      model,
    ),
    // ... 其他额外的图形
  };
}
```

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

* [使用 G2 自定义的条形图节点](/zh/examples/item/customNode/#g2BarChart) 
* [使用 G2 自定义的点阵图节点](/zh/examples/item/customNode/#g2LatticeChart) 
* [使用 G2 自定义的活动图节点](/zh/examples/item/customNode/#g2ActiveChart)