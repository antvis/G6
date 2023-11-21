### draw

:::info{title=提示}
大多数情况下并不需要覆写 draw 方法，更常用的做法是覆写 `drawKeyShape`、`drawLabelShape` 等方法，这些方法将在下文介绍。
:::

**类型**：`draw`

<details>

<summary style="color: #873bf4; cursor: pointer">draw</summary>

```typescript
type draw = (
  model: NodeDisplayModel | ComboDisplayModel,
  shapeMap: { [shapeId: string]: DisplayObject },
) => {
  keyShape: DisplayObject;
  labelShape?: DisplayObject;
  iconShape?: DisplayObject;
  [otherShapeId: string]: DisplayObject;
};
```

其中，相关的数据类型定义参考 [NodeDisplayModel 渲染数据](../../data/ComboDisplayModel.zh.md) 和 [ComboDisplayModel 渲染数据](../../data/ComboDisplayModel.zh.md)。

</details>

G5 5.0 移除了 `update` 和 `afterUpdate` 方法。现在只需要覆写 `draw` 方法和 `afterDraw` 方法，G6 将自动根据更新的属性增量更新图形。

draw 方法通过调用 `this.drawKeyShape` 等方法分别绘制节点各部分。

你可以参考 `circle-node` 类型节点的 [draw](https://github.com/antvis/G6/blob/6be8f9810ec3b9310371f37de1a2591f14db67f1/packages/g6/src/stdlib/item/node/circle.ts#L25) 方法进行覆写。

### afterDraw

**类型**：`afterDraw`

<details>

<summary style="color: #873bf4; cursor: pointer">afterDraw</summary>

```typescript
type afterDraw = (
  model: NodeDisplayModel | ComboDisplayModel,
  shapeMap: { [shapeId: string]: DisplayObject },
  shapesChanged?: string[],
) => { [otherShapeId: string]: DisplayObject };
```

其中，相关的数据类型定义参考 [NodeDisplayModel 渲染数据](../../data/ComboDisplayModel.zh.md) 和 [ComboDisplayModel 渲染数据](../../data/ComboDisplayModel.zh.md)。

</details>

绘制后执行其他绘图操作或添加自定义形状。在 `draw` 函数完成之后执行的逻辑，例如根据 `draw` 中已绘制的图形的包围盒大小，调整其他相关的图形。也可以用于绘制更多的图形，返回值和 `draw` 方法一致。

### drawKeyShape

**类型**：`drawKeyShape`

<details>

<summary style="color: #873bf4; cursor: pointer">drawKeyShape</summary>

```typescript
type drawKeyShape = (model: NodeDisplayModel, shapeMap: NodeShapeMap) => DisplayObject;
```

其中，相关的数据类型定义参考 [NodeDisplayModel 渲染数据](../../data/ComboDisplayModel.zh.md) 和 [ComboDisplayModel 渲染数据](../../data/ComboDisplayModel.zh.md)。

</details>

绘制主图形(`keyShape`)，该图形是必须的，例如圆形节点的主图形是一个圆形(`circle`)，矩形节点的主图形是一个矩形(`rect`)。

### drawLabelShape

**类型**：`drawLabelShape`

<details>

<summary style="color: #873bf4; cursor: pointer">drawLabelShape</summary>

```typescript
type drawLabelShape = (
  model: NodeDisplayModel | ComboDisplayModel,
  shapeMap: NodeShapeMap | ComboShapeMap,
) => DisplayObject;
```

其中，相关的数据类型定义参考 [NodeDisplayModel 渲染数据](../../data/ComboDisplayModel.zh.md) 和 [ComboDisplayModel 渲染数据](../../data/ComboDisplayModel.zh.md)。

</details>

绘制文本图形（`labelShape`）

若需要覆写，则可以参考 [BaseNode.drawLabelShape](https://github.com/antvis/G6/blob/fddf9a5c0f7933b4d704038a7474358cb47037d0/packages/g6/src/stdlib/item/node/base.ts#L277)。

### drawLabelBackgroundShape

**类型**：`drawLabelBackgroundShape`

<details>

<summary style="color: #873bf4; cursor: pointer">drawLabelBackgroundShape</summary>

```typescript
type drawLabelBackgroundShape = (
  model: NodeDisplayModel | ComboDisplayModel,
  shapeMap: NodeShapeMap | ComboShapeMap,
) => DisplayObject;
```

其中，相关的数据类型定义参考 [NodeDisplayModel 渲染数据](../../data/ComboDisplayModel.zh.md) 和 [ComboDisplayModel 渲染数据](../../data/ComboDisplayModel.zh.md)。

</details>

绘制文本图形的背景框图形（`labelBackgroundShape`）

若需要覆写，则可以参考 [BaseNode.drawLabelBackgroundShape](https://github.com/antvis/G6/blob/fddf9a5c0f7933b4d704038a7474358cb47037d0/packages/g6/src/stdlib/item/node/base.ts#L383)。

### drawIconShape

**类型**：`drawIconShape`

<details>

<summary style="color: #873bf4; cursor: pointer">drawIconShape</summary>

```typescript
type drawIconShape = (
  model: NodeDisplayModel | ComboDisplayModel,
  shapeMap: NodeShapeMap | ComboShapeMap,
) => DisplayObject;
```

其中，相关的数据类型定义参考 [NodeDisplayModel 渲染数据](../../data/ComboDisplayModel.zh.md) 和 [ComboDisplayModel 渲染数据](../../data/ComboDisplayModel.zh.md)。

</details>

绘制文本图形的图标图形（`iconShape`）的方法

若需要覆写，则可以参考 [BaseNode.drawLabelIconShape](https://github.com/antvis/G6/blob/fddf9a5c0f7933b4d704038a7474358cb47037d0/packages/g6/src/stdlib/item/node/base.ts#L440)

### drawHaloShape

**类型**：`drawHaloShape`

<details>

<summary style="color: #873bf4; cursor: pointer">drawHaloShape</summary>

```typescript
type drawHaloShape = (
  model: NodeDisplayModel | ComboDisplayModel,
  shapeMap: NodeShapeMap | ComboShapeMap,
) => DisplayObject;
```

其中，相关的数据类型定义参考 [NodeDisplayModel 渲染数据](../../data/ComboDisplayModel.zh.md) 和 [ComboDisplayModel 渲染数据](../../data/ComboDisplayModel.zh.md)。

</details>

绘制节点的光晕图形

### drawAnchorShapes

**类型**：`drawAnchorShapes`

<details>

<summary style="color: #873bf4; cursor: pointer">drawAnchorShapes</summary>

```typescript
type drawAnchorShapes = (
  model: NodeDisplayModel | ComboDisplayModel,
  shapeMap: NodeShapeMap | ComboShapeMap,
) => {
  [shapeId: string]: DisplayObject;
};
```

其中，相关的数据类型定义参考 [NodeDisplayModel 渲染数据](../../data/ComboDisplayModel.zh.md) 和 [ComboDisplayModel 渲染数据](../../data/ComboDisplayModel.zh.md)。

</details>

绘制连接桩图形（`anchorShapes`）的方法

若需要覆写，则可以参考 [BaseNode.drawAnchorShapes](https://github.com/antvis/G6/blob/fddf9a5c0f7933b4d704038a7474358cb47037d0/packages/g6/src/stdlib/item/node/base.ts#L531)

> ⚠️ 注意：`drawAnchorShapes` 返回一个图形 map，key 是图形的 id，value 是图形对象。

### drawBadgeShapes

**类型**：`drawBadgeShapes`

<details>

<summary style="color: #873bf4; cursor: pointer">drawBadgeShapes</summary>

```typescript
type drawBadgeShapes = (
  model: NodeDisplayModel | ComboDisplayModel,
  shapeMap: NodeShapeMap | ComboShapeMap,
) => {
  [shapeId: string]: DisplayObject;
};
```

其中，相关的数据类型定义参考 [NodeDisplayModel 渲染数据](../../data/ComboDisplayModel.zh.md) 和 [ComboDisplayModel 渲染数据](../../data/ComboDisplayModel.zh.md)。

</details>

绘制徽标图形（`badgeShapes`）的方法

若需要覆写，则可以参考 [BaseNode.drawBadgeShapes](https://github.com/antvis/G6/blob/fddf9a5c0f7933b4d704038a7474358cb47037d0/packages/g6/src/stdlib/item/node/base.ts#L629)

> ⚠️ 注意：`drawBadgeShapes` 返回一个图形 map，key 是图形的 id，value 是图形对象。

### drawOtherShapes

**类型**：`drawOtherShapes`

<details>

<summary style="color: #873bf4; cursor: pointer">drawOtherShapes</summary>

```typescript
type drawOtherShapes = (
  model: NodeDisplayModel | ComboDisplayModel,
  shapeMap: NodeShapeMap | ComboShapeMap,
) => { [id: string]: DisplayObject };
```

其中，相关的数据类型定义参考 [NodeDisplayModel 渲染数据](../../data/ComboDisplayModel.zh.md) 和 [ComboDisplayModel 渲染数据](../../data/ComboDisplayModel.zh.md)。

</details>

绘制上述部分之外的图形，可以在 `drawOtherShapes` 中完成

> ⚠️ 注意：`drawOtherShapes` 返回一个图形 map，key 是图形的 id，value 是图形对象。

### getMergedStyles

**类型**：`getMergedStyles`

<details>

<summary style="color: #873bf4; cursor: pointer">getMergedStyles</summary>

```typescript
type getMergedStyles = (model: NodeDisplayModel) => NodeDisplayModel;
```

其中，相关的数据类型定义参考 [NodeDisplayModel 渲染数据](../../data/ComboDisplayModel.zh.md)。

</details>

将 display model 数据中定义的样式与默认样式和主题样式合并
