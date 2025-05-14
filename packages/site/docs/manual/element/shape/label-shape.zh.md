---
title: 复合 Shape 的设计与实现
order: 3
---

G6 提供了灵活的 Shape 机制，支持开发者自定义各种图形，并在节点、边、Combo 等元素中高效复用。本文将以 Label（标签）为例，讲解如何自定义 Shape、如何在元素中应用。

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*W3oqSYPZtWEAAAAAAAAAAAAAemJ7AQ/original" width="80" />

## 一、Shape 的自定义与封装

### 1. Shape 的基类设计

所有 Shape 都继承自 `BaseShape`，它统一管理了 Shape 的生命周期（创建、更新、销毁）、属性解析、动画、事件绑定等。你只需关注如何实现 `render` 方法即可。

**核心抽象：**

```js
import { CustomElement } from '@antv/g';

abstract class BaseShape extends CustomElement {
  // 生命周期管理、属性解析、动画等...
  public abstract render(attributes, container): void;
}
```

### 2. 复合 Shape 层级结构示意

一个节点通常包含多个子 Shape，例如：

```
节点（Node）
├── keyShape（主图形）
├── label（标签，辅助信息）
│   ├── text（文本）
│   └── rect（背景）
├── icon（图标）
│   ├── text（文本）
│   └── image（图片）
├── badge（徽标）
│   ├── text（文本）
│   └── rect（背景）
└── port（锚点）
│   ├── circle（圆形）
```

<img width="200" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*Ot4bSbBx97EAAAAAAAAAAAAADmJ7AQ/original" />

### 3. Label Shape 的实现

Label 是一个典型的复合 Shape，由文本（Text）和可选的背景（Rect）组成。其实现思路如下：

- **属性分离**：Label 的样式属性分为文本样式和背景样式，分别传递给 Text 和 Rect。
- **智能布局**：背景自动根据文本内容、内边距、圆角等动态调整尺寸和位置。
- **复用 upsert**：通过 `upsert` 方法自动管理子 Shape 的创建、更新、销毁。

**Label 主要代码片段：**

```js
import { Text, Rect } from '@antv/g'; // 引入原子图形

export class Label extends BaseShape {
  public render(attributes = this.parsedAttributes, container= this): void {
    this.upsert('text', Text, this.getTextStyle(attributes), container);
    this.upsert('background', Rect, this.getBackgroundStyle(attributes), container);
  }
  // ... 省略样式提取方法
}
```

- `getTextStyle`、`getBackgroundStyle` 分别提取文本和背景的样式属性，避免相互干扰。
- `upsert` 方法保证了 Shape 的自动增删改查，极大提升了复用性和健壮性。

### 4. 完整自定义 Shape 示例

下面以自定义一个带特殊装饰的标签为例，演示 Shape 的完整定义、注册与使用：

```js
import { BaseShape, ExtensionCategory, Circle } from 'g6';
import { Text, Rect, Circle } from '@antv/g';

class FancyLabel extends BaseShape {
  render(attributes = this.parsedAttributes, container = this) {
    // 主文本
    this.upsert('text', Text, this.getTextStyle(attributes), container);
    // 背景
    this.upsert('background', Rect, this.getBackgroundStyle(attributes), container);
    // 额外装饰：左侧小圆点
    this.upsert('dot', Circle, {
      x: -8, y: 0, r: 3, fill: '#faad14',
    }, container);
  }
  // ...实现 getTextStyle/getBackgroundStyle
}

// 注册自定义 Shape
register(ExtensionCategory.SHAPE, 'fancy-label-shape', FancyLabel);

// 定义自定义节点
class CustomCircle extends Circle {
  public drawFancyLabelShape(attributes, container) {
    this.upsert('fancy-label', 'fancy-label-shape', this.getFancyLabelStyle(attributes), container);
  }

  render(attributes = this.parsedAttributes, container) {
    super.render(attributes, container);

    this.drawFancyLabelShape(attributes, container);
  }
}

// 注册自定义节点
register(ExtensionCategory.Node, 'fancy-label-node', CustomCircle);
```

## 二、样式属性的前缀分离

G6 中节点、边、Combo 等元素往往包含多个子 Shape（如主图形、标签、徽标、锚点等）。为了让每个子 Shape 的样式互不干扰，G6 采用了**样式属性前缀分离**的设计。

### 1. 前缀分离的意义

- **解耦**：每个子 Shape 只关心属于自己的样式属性，避免样式污染。
- **易扩展**：新增子 Shape 只需定义新的前缀，无需修改原有逻辑。
- **配置直观**：用户在配置节点/边/Combo 时，可以一目了然地设置各部分样式。

### 2. 代码实现

以 Label 为例：

```ts
import { RectStyleProps, TextStyleProps } from '@antv/g';

type PrefixKey<P extends string = string, K extends string = string> = `${P}${Capitalize<K>}`;

type Prefix<P extends string, T extends object> = {
  [K in keyof T as K extends string ? PrefixKey<P, K> : never]?: T[K];
};

interface LabelStyleProps extends TextStyleProps, Prefix<'background', RectStyleProps> {
  background?: boolean;
}
```

- `Prefix<'background', RectStyleProps>` 表示所有以 `background` 开头的属性都属于标签背景样式。
- 在实际渲染时，通过 `subStyleProps`、`subObject` 等工具函数，自动提取带前缀的样式，传递给对应的 Shape。

**Label 背景样式提取示例**

```js
protected getBackgroundStyle(attributes: Required<LabelStyleProps>) {
  if (attributes.background === false) return false;
  const style = this.getGraphicStyle(attributes);
  const backgroundStyle = subStyleProps<RectStyleProps>(style, 'background');
// ...省略布局计算
  return backgroundStyle;
}
```

**样式配置示例**

```json
{
  "text": "label",
  "fontSize": 12,
  "fontFamily": "system-ui, sans-serif",
  "wordWrap": true,
  "maxLines": 1,
  "wordWrapWidth": 128,
  "textOverflow": "...",
  "textBaseline": "middle",
  "background": true,
  "backgroundOpacity": 0.75,
  "backgroundZIndex": -1,
  "backgroundLineWidth": 0
}
```

## 三、Label 与 keyShape 的关系

- **keyShape** 是节点/边/Combo 的主图形，决定交互拾取、包围盒、主样式等。
- **Label**、icon、badge、port 等通常作为辅助 Shape 存在，不会作为 keyShape。
- 你可以在自定义节点时通过 `drawKeyShape` 或类似方法指定 keyShape，Label 只负责展示文本信息，不影响节点的交互主控。

## 四、如何在元素中应用自定义 Shape

以节点为例，节点基类 `BaseNode` 已经内置了对多种子 Shape 的支持（keyShape、label、icon、badge、port、halo 等）。你只需专注于 keyShape 的绘制，其他子 Shape 可以通过配置和样式前缀自动管理。

### 1. 节点渲染流程

```js
protected drawLabelShape(attributes: Required<S>, container: Group): void {
  const style = this.getLabelStyle(attributes);
  this.upsert('label', Label, style, container);
}

public render(attributes = this.parsedAttributes, container: Group = this) {
  // 1. 绘制 keyShape（主图形）
  this._drawKeyShape(attributes, container);
  if (!this.getShape('key')) return;

  // 2. 绘制 halo
  this.drawHaloShape(attributes, container);

  // 3. 绘制 icon
  this.drawIconShape(attributes, container);

  // 4. 绘制 badges
  this.drawBadgeShapes(attributes, container);

  // 5. 绘制 label
  this.drawLabelShape(attributes, container);

  // 6. 绘制 ports
  this.drawPortShapes(attributes, container);
}
```

- 每个子 Shape 的样式都通过前缀分离自动提取，传递给对应的 Shape 实例。
- 你可以通过配置项灵活控制每个子 Shape 的显示与样式。

### 2. 应用 Label 的示例

假设你要为节点添加带背景的标签，只需在节点数据中配置 label 相关属性：

```js
{
  label: true,
  labelText: '我是标签',
  labelFill: '#333',
  labelFontSize: 14,
  labelBackground: true,
  labelBackgroundFill: '#fffbe6',
  labelBackgroundRadius: 6,
  labelPadding: [4, 8],
}
```

- `labelText`、`labelFill`、`labelFontSize` 等会被自动提取并传递给 Label 的文本部分。
- `labelBackground`、`labelBackgroundFill`、`labelBackgroundRadius`、`labelPadding` 等会被自动提取并传递给 Label 的背景部分。

你无需手动管理 Label 的创建、更新、销毁，G6 会自动完成。

## 五、常见问题与调试建议

### 1. 为什么 label 样式没有生效？

- 检查样式属性前缀是否正确（如 `labelFill`、`labelBackgroundFill`）。
- 确认节点/边/Combo 的 `label` 配置为 `true`，且 `labelText` 已设置。
- 检查是否被其他样式覆盖。

### 2. 如何调试自定义 Shape 的渲染？

- 使用浏览器控制台查看 `shapeMap`，确认各子 Shape 是否被正确创建。

### 3. 如何让 Label 响应节点状态（如 hover、selected）？

- 直接在图配置中设置节点状态样式（推荐）

```js
const graph = new Graph({
  node: {
    style: {
      label: false,
    },
    state: {
      hover: {
        label: true,
        labelText: 'show when hovered',
      },
    },
  },
});
```

- 或者在 Label 的实现中监听状态变化，动态调整样式。可以通过 data 获取到当前的状态值

---

如需更深入了解，建议阅读源码 [`base-shape.ts`](https://github.com/antvis/G6/blob/v5/packages/g6/src/elements/shapes/base-shape.ts)、[`base-node.ts`](https://github.com/antvis/G6/blob/v5/packages/g6/src/elements/shapes/base-node.ts)。
