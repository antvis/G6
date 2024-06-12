---
title: Custom Element
order: 0
---

## Overview

When the built-in elements of G6 do not meet the requirements, you can expand the G6 element library by customizing elements. Custom elements are an important feature of G6, allowing users to extend based on existing elements through secondary inheritance and encapsulation, or to develop new elements based on [G Graphics](https://g.antv.antgroup.com/en/api/basic/display-object).

## Element Base Class

Before starting to customize an element, you need to understand some important properties and methods of the G6 element base class:

### Properties

#### shapeMap

> Record<string, DisplayObject>

The mapping table of all graphics under the current element

#### animateMap

> Record<string, IAnimation>

The mapping table of all animations under the current element

### Methods

#### upsert(key, Ctor, style, container)

Create or update graphics, and automatically destroy the graphics when the element is destroyed

```typescript
upsert(key: string, Ctor: { new (...args: any[]): DisplayObject }, style: Record<string, any>, container: DisplayObject);
```

| Parameter | Type                                    | Description                                                                                                                                             |
| --------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| key       | string                                  | The key of the graphic, that is, the corresponding key in `shapeMap`. Built-in keys include `'key'`, `'label'`, `'halo'`, `'icon'`, `'port'`, `'badge'` |
| Ctor      | { new (...args: any[]): DisplayObject } | The constructor for the graphic class                                                                                                                   |
| style     | Record<string, any>                     | The style of the graphic                                                                                                                                |
| container | DisplayObject                           | The container where the graphic is mounted                                                                                                              |

#### render(style, container)

Draw the content of the element

```typescript
render(style: Record<string, any>, container: Group): void;
```

| Parameter | Type                | Description   |
| --------- | ------------------- | ------------- |
| style     | Record<string, any> | Element style |
| container | Group               | Container     |

### Hook

The element provides the following hook functions, which can be overridden as needed:

- `onCreate`: Triggered after the element is created and the entrance animation is complete.
- `onUpdate`: Triggered after the element is updated and the update animation is complete.
- `onDestroy`: Triggered after the element completes the exit animation and is destroyed.

### Element Convention

- **Use Conventional Attributes**

  The currently agreed-upon element attributes include:

  1. `size`: The size of the element

- **Use the `getXxxStyle` and `drawXxxShape` pairing method for graphic drawing**

  `getXxxStyle` is used to obtain the graphic style, and `drawXxxShape` is used for drawing the graphic. Graphics created in this way support automatic animation execution.

- **The Graph context can be accessed via `attributes.context`**

## Custom Node

### Implement Node

**Inherit from Existing Nodes**

To inherit from an existing node, you can either inherit from the base class for all nodes, `BaseNode`, or inherit from an existing node, such as `Circle`.

Below is an example of inheriting from `BaseNode` to implement a circular node:

```typescript
import { BaseNode } from '@antv/g6';
import { Circle } from '@antv/g';

import type { Group } from '@antv/g';
import type { BaseNodeStyleProps } from '@antv/g6';

interface ExtendBaseNode extends BaseNodeStyleProps {
  // Custom Properties
  radius: number;
}

class ExtendBaseNode extends BaseNode {
  protected getKeyStyle(attributes: Required<ExtendBaseNode>) {
    return { ...super.getKeyStyle(attributes), r: attributes.radius };
  }

  // Override Methods
  protected drawKeyShape(attributes: Required<ExtendBaseNode>, container: Group) {
    // Custom Drawing Logic, Create a G.Circle
    return this.upsert('key', Circle, this.getKeyStyle(attributes), container);
  }
}
```

Below is an example that inherits from `Circle`, adding a text segment to the circular node:

```typescript
import { Circle, subStyleProps } from '@antv/g6';
import { Text } from '@antv/g';

import type { Group } from '@antv/g';
import type { CircleStyleProps } from '@antv/g6';

interface ExtendCircleStyleProps extends CircleStyleProps {
  // Custom Properties
  paragraph: string;
}

class ExtendCircle extends Circle {
  protected getTextStyle(attributes: Required<ExtendCircleStyleProps>) {
    // Obtain style properties that start with 'paragraph', such as 'paragraphFontSize'
    const paragraphStyle = subStyleProps(attributes, 'paragraph');
    return { ...paragraphStyle, text: attributes.paragraph };
  }

  protected drawTextShape(attributes: Required<ExtendCircleStyleProps>, container: Group) {
    // Custom drawing logic, create a G.Text
    return this.upsert('text', Text, this.getTextStyle(attributes), container);
  }

  protected render(attrs: Required<ExtendCircleStyleProps>, container: Group) {
    super.render(attrs, container);
    // Invoke custom drawing logic
    this.drawTextShape(attrs, container);
  }
}
```

**New Development**

If you want to develop a new node based on the G graph, you can directly inherit from `G.Shape`.

:::warning{title=note}
To adopt a new development approach, you need to fully understand the implementation logic of G6 elements and manage the lifecycle, animations, and other aspects of the elements yourself.
The customization process is relatively complex, so it is recommended to first consider extending existing nodes.
:::

Here is a simple example of inheriting from` G.Shape` to implement a circular node:

<details> 
<summary>Example</summary>

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

To implement graphical animation, you need to override the `animate` method to perform the animation operations on the `CustomCircle` onto the `Circle` graphic:

```typescript
import type {} from '@antv/g';

class CustomCircle extends CustomElement {
  // ...Other logic.

  // Overriding the `animate` method.
  // Here, the animation of the `r` attribute on the `circle` is implemented
  animate(keyframes: Keyframe[], options?: number | KeyframeAnimationOptions): IAnimation | null {
    const circle = this.children[0] as Circle;
    const circleKeyframes = keyframes.map(({ radius }) => ({ r: radius }));
    circle.animate(circleKeyframes, options);
  }
}
```

</details>

### Register Node

You can register by using the `register` method provided by G6.For more details[Register Node](/en/manual/core-concept/element#注册节点)

### Configure Node

Custom nodes can be used and configured in `data` or `node style mapping`.For more details,[Configure Node](/en/manual/core-concept/element#配置节点)

## Customize Edge

### Implement Edge

Customizing edges is similar to customizing nodes. You can either inherit existing edges or develop a completely new edge based on the G graph.

Here is an example of implementing a custom straight-line edge by inheriting from `BaseEdge`:

```typescript
import { BaseEdge } from '@antv/g6';
import { Line } from '@antv/g';

import type { BaseNodeStyleProps } from '@antv/g6';

class ExtendBaseEdge extends BaseEdge {
  // Override the getKeyStyle method
  protected getKeyStyle(attributes: Required<BaseNodeStyleProps>) {
    return { ...super.getKeyStyle(attributes), lineWidth: 2, stroke: '#000' };
  }

  // Implement the getKeyPath method
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

### Register Edge

You can register by using the `register` method provided by G6. For more details, see [Register Edge](/en/manual/core-concept/element#register-edge).

### Configure Edge

Custom edges can be used and configured in `data` or `edge style mapping`. For more details, see [Configure Edge](/en/manual/core-concept/element#configure-edge).

## Custom Combo

Combo in G6 inherit from `BaseNode`, but there are certain differences: Combo have two states, namely expanded (`Expanded`) and collapsed (`Collapsed`), and thus the implementation is also different.

### Implement Combo

The way to customize Combo is similar to customizing nodes. You can either inherit from existing Combo or develop entirely new Combo based on G Graphics.

Here is an example that inherits from `BaseCombo` to implement a custom rectangular combo:

```typescript
import { BaseCombo } from '@antv/g6';
import { Rect } from '@antv/g';

import type { BaseComboStyleProps } from '@antv/g6';

class ExtendBaseCombo extends BaseCombo {
  protected getKeyStyle(attributes: Required<BaseComboStyleProps>) {
    const [width, height] = this.getKeySize(attributes);
    return { ...super.getKeyStyle(attributes), anchor: [0.5, 0.5], width, height };
  }

  // Implement the drawKeyShape method
  protected drawKeyShape(attributes: Required<BaseComboStyleProps>, container: Group) {
    return this.upsert('key', Rect, this.getKeyStyle(attributes), container);
  }
}
```

### Register Combo

You can register by using the `register` method provided by G6. For more details, see [Register Combo](/en/manual/core-concept/element#register-combo)

### Configure Combo

Custom Combo can be used and configured in `data` or `combo style mapping`. For more details, see [Configure Combo](/en/manual/core-concept/element#configure-combo)
