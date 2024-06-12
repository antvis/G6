---
title: 自定义元素
order: 0
---

## 概述

当 G6 的内置元素无法满足需求时，可以通过自定义元素来扩展 G6 的元素库。自定义元素是 G6 的一个重要特性，它允许用户基于现有元素进行二次继承封装，也可以基于 [G 图形](https://g.antv.antgroup.com/api/basic/display-object)进行全新的元素开发。

## 元素基类

开始自定义元素之前，你需要了解 G6 元素基类中的一些重要属性和方法：

### 属性

#### shapeMap

> Record<string, DisplayObject>

当前元素下所有图形的映射表

#### animateMap

> Record<string, IAnimation>

当前元素下所有动画的映射表

### 方法

#### upsert(key, Ctor, style, container)

创建或更新图形，并在元素销毁时自动销毁该图形

```typescript
upsert(key: string, Ctor: { new (...args: any[]): DisplayObject }, style: Record<string, any>, container: DisplayObject);
```

| 参数      | 类型                                    | 描述                                                                                                           |
| --------- | --------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| key       | string                                  | 图形的 key，即 `shapeMap` 中对应的 key。内置的 key 包括 `'key'` `'label'` `'halo'` `'icon'` `'port'` `'badge'` |
| Ctor      | { new (...args: any[]): DisplayObject } | 图形类                                                                                                         |
| style     | Record<string, any>                     | 图形样式                                                                                                       |
| container | DisplayObject                           | 挂载图形的容器                                                                                                 |

#### render(style, container)

绘制元素内容

```typescript
render(style: Record<string, any>, container: Group): void;
```

| 参数      | 类型                | 描述     |
| --------- | ------------------- | -------- |
| style     | Record<string, any> | 元素样式 |
| container | Group               | 容器     |

### Hook

元素提供以下钩子函数，可以按需进行重写：

- `onCreate` 当元素创建后并完成入场动画时触发
- `onUpdate` 当元素更新后并完成更新动画时触发
- `onDestroy` 当元素完成退场动画并销毁后触发

### 元素约定

- **使用约定属性**

目前约定的元素属性包括：

1. `size` 元素的尺寸

- **采用 `getXxxStyle` 和 `drawXxxShape` 配对的方式进行图形绘制**

`getXxxStyle` 用于获取图形样式，`drawXxxShape` 用于绘制图形。通过该方式创建的图形支持自动执行动画。

- **可通过 `attributes.context` 访问 Graph 上下文**

## 自定义节点

### 实现节点

**继承现有节点**

要从现有节点继承，可以通过继承所有节点的基类 `BaseNode`，也可以继承现有节点，例如 `Circle`。

下面是一个继承 `BaseNode` 的示例，实现一个圆形节点：

```typescript
import { BaseNode } from '@antv/g6';
import { Circle } from '@antv/g';

import type { Group } from '@antv/g';
import type { BaseNodeStyleProps } from '@antv/g6';

interface ExtendBaseNode extends BaseNodeStyleProps {
  // 自定义属性
  radius: number;
}

class ExtendBaseNode extends BaseNode {
  protected getKeyStyle(attributes: Required<ExtendBaseNode>) {
    return { ...super.getKeyStyle(attributes), r: attributes.radius };
  }

  // 重写方法
  protected drawKeyShape(attributes: Required<ExtendBaseNode>, container: Group) {
    // 自定义绘制逻辑，创建一个 G.Circle
    return this.upsert('key', Circle, this.getKeyStyle(attributes), container);
  }
}
```

下面是一个继承 `Circle` 的示例，在圆形节点的基础上添加一段文本：

```typescript
import { Circle, subStyleProps } from '@antv/g6';
import { Text } from '@antv/g';

import type { Group } from '@antv/g';
import type { CircleStyleProps } from '@antv/g6';

interface ExtendCircleStyleProps extends CircleStyleProps {
  // 自定义属性
  paragraph: string;
}

class ExtendCircle extends Circle {
  protected getTextStyle(attributes: Required<ExtendCircleStyleProps>) {
    // 获取以 paragraph 开头的样式属性，例如 paragraphFontSize
    const paragraphStyle = subStyleProps(attributes, 'paragraph');
    return { ...paragraphStyle, text: attributes.paragraph };
  }

  protected drawTextShape(attributes: Required<ExtendCircleStyleProps>, container: Group) {
    // 自定义绘制逻辑，创建一个 G.Text
    return this.upsert('text', Text, this.getTextStyle(attributes), container);
  }

  protected render(attrs: Required<ExtendCircleStyleProps>, container: Group) {
    super.render(attrs, container);
    // 调用自定义绘制逻辑
    this.drawTextShape(attrs, container);
  }
}
```

**全新开发**

如果要基于 G 图形进行全新的节点开发，可以直接继承 `G.Shape`。

:::warning{title=注意}
要采用全新开发的方式，你需要完全理解 G6 元素的实现逻辑，并自行处理元素的生命周期、动画等。
定制过程相对复杂，建议优先考虑继承现有节点。
:::

下面是一个继承 `G.Shape` 的简单示例，实现一个圆形节点：

<details>
<summary>示例</summary>

```typescript
import { CustomElement, Circle } from '@antv/g';

import type { BaseStyleProps, DisplayObjectConfig } from '@antv/g';

interface CustomCircleStyleProps extends BaseStyleProps {
  radius: number;
}

class CustomCircle extends CustomElement {
  constructor(options: DisplayObjectConfig<CustomCircleStyleProps>) {
    super(options);
    this.render();
  }

  protected render() {
    const { radius } = this.attributes;
    const circle = new Circle({
      style: {
        ...this.attributes,
        x: 0,
        y: 0,
        r: radius,
      },
    });
    this.appendChild(circle);
  }
}
```

如果要实现图形动画，需要重写 `animate` 方法，将对 `CustomCircle` 的动画操作执行到 `Circle` 图形上：

```typescript
import type {} from '@antv/g';

class CustomCircle extends CustomElement {
  // ...其他逻辑

  // 重写 animate 方法
  // 这里实现了 circle 上 r 属性的动画
  animate(keyframes: Keyframe[], options?: number | KeyframeAnimationOptions): IAnimation | null {
    const circle = this.children[0] as Circle;
    const circleKeyframes = keyframes.map(({ radius }) => ({ r: radius }));
    circle.animate(circleKeyframes, options);
  }
}
```

</details>

### 注册节点

通过 G6 提供的 `register` 方法注册即可，详见[注册节点](/manual/core-concept/element#注册节点)

### 配置节点

可在`数据`或`节点样式映射`中使用并配置自定义节点，详见[配置节点](/manual/core-concept/element#配置节点)

## 自定义边

### 实现边

自定义边的方式和自定义节点类似，你可以继承现有边，也可以基于 G 图形进行全新的边开发。

这里给出一个继承 `BaseEdge` 的示例，实现一个自定义直线边：

```typescript
import { BaseEdge } from '@antv/g6';
import { Line } from '@antv/g';

import type { BaseNodeStyleProps } from '@antv/g6';

class ExtendBaseEdge extends BaseEdge {
  // 重写 getKeyStyle 方法
  protected getKeyStyle(attributes: Required<BaseNodeStyleProps>) {
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

### 注册边

通过 G6 提供的 `register` 方法注册即可，详见[注册边](/manual/core-concept/element#注册边)

### 配置边

可在`数据`或`边样式映射`中使用并配置自定义边，详见[配置边](/manual/core-concept/element#配置边)

## 自定义组合

G6 中的组合继承自 `BaseNode`，但具有一定的差异：组合存在两种状态，即展开(`Expanded`)和收起(`Collapsed`)状态，因此实现上也有所不同。

### 实现组合

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

### 注册组合

通过 G6 提供的 `register` 方法注册即可，详见[注册组合](/manual/core-concept/element#注册组合)

### 配置组合

可在`数据`或`组合样式映射`中使用并配置自定义组合，详见[配置组合](/manual/core-concept/element#配置组合)
