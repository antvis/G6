---
title: 自定义节点
order: 3
---

## 实现节点

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

## 注册节点

通过 G6 提供的 `register` 方法注册即可，详见[注册节点](/manual/core-concept/element#注册节点)

## 配置节点

可在`数据`或`节点样式映射`中使用并配置自定义节点，详见[配置节点](/manual/core-concept/element#配置节点)
