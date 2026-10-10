---
title: "自定义节点"
description: "自定义节点"
language: "zh"
canonical: "https://g6.antv.antgroup.com/zh/manual/element/node/custom-node/"
version: "5.1.1"
---

G6 提供了一系列 [内置节点](/zh/manual/element/node/BaseNode/)，包含 [circle（圆形节点）](/zh/manual/element/node/Circle/)、[diamond（菱形节点）](/zh/manual/element/node/Diamond/)、[donut（甜甜圈节点）](/zh/manual/element/node/Donut/)、[ellipse（椭圆节点）](/zh/manual/element/node/Ellipse/)、[hexagon（六边形节点）](/zh/manual/element/node/Hexagon/)、[html（HTML节点）](/zh/manual/element/node/Html/)、[image（图片节点）](/zh/manual/element/node/Image/)、[rect（矩形节点）](/zh/manual/element/node/Rect/)、[star（星形节点）](/zh/manual/element/node/Star/) 和 [triangle（三角形节点）](/zh/manual/element/node/Triangle/)。这些内置节点能够满足大部分基础场景需求。

但在实际项目中，你可能会遇到这些基础节点无法满足的需求。这时，你需要创建自定义节点。别担心，这比你想象的要简单！

## 自定义节点的方式 **选择合适的方式**

创建自定义节点的方式主要有两种途径：

### 1. 继承现有节点类型 **推荐**

这是最常用的方式，你可以选择继承以下类型之一：

- [`BaseNode`](https://github.com/antvis/G6/blob/v5/packages/g6/src/elements/nodes/base-node.ts) - 最基础的节点类，提供节点的核心功能
- [`Circle`](https://github.com/antvis/G6/blob/v5/packages/g6/src/elements/nodes/circle.ts) - 圆形节点
- [`Rect`](https://github.com/antvis/G6/blob/v5/packages/g6/src/elements/nodes/rect.ts) - 矩形节点
- [`Ellipse`](https://github.com/antvis/G6/blob/v5/packages/g6/src/elements/nodes/ellipse.ts) - 椭圆节点
- [`Diamond`](https://github.com/antvis/G6/blob/v5/packages/g6/src/elements/nodes/diamond.ts) - 菱形节点
- [`Triangle`](https://github.com/antvis/G6/blob/v5/packages/g6/src/elements/nodes/triangle.ts) - 三角形节点
- [`Star`](https://github.com/antvis/G6/blob/v5/packages/g6/src/elements/nodes/star.ts) - 星形节点
- [`Image`](https://github.com/antvis/G6/blob/v5/packages/g6/src/elements/nodes/image.ts) - 图片节点
- [`Donut`](https://github.com/antvis/G6/blob/v5/packages/g6/src/elements/nodes/donut.ts) - 甜甜圈节点
- [`Hexagon`](https://github.com/antvis/G6/blob/v5/packages/g6/src/elements/nodes/hexagon.ts) - 六边形节点

**为什么选择这种方式？**

- 📌 **代码量少**：复用现有节点的属性和方法，只需专注于新增功能
- 📌 **开发迅速**：适合大多数项目需求，快速实现业务目标
- 📌 **易于维护**：代码结构清晰，继承关系明确

:::tip\{title=立即开始\}
如果你选择继承现有节点类型（推荐），可以直接跳到 [三步创建你的第一个自定义节点](#三步创建你的第一个自定义节点) 开始实践。大部分用户都会选择这种方式！
:::

### 2. 基于 G 图形系统从零开发 **高级用法**

如果现有节点类型都不满足需求，你可以基于 G 的底层图形系统从零创建节点。

**为什么选择这种方式？**

- 📌 **最大自由度**：完全控制节点的每个细节，实现任意复杂效果
- 📌 **特殊需求**：现有节点类型无法满足的高度定制场景
- 📌 **性能优化**：针对特定场景的性能优化

:::warning\{title=注意事项\}
从零开发的自定义节点需要自行处理所有细节，包括图形绘制、事件响应、状态变化等，开发难度较大。这里可以直接参考 [源码](https://github.com/antvis/G6/blob/v5/packages/g6/src/elements/nodes/base-node.ts) 进行实现。
:::

## 三步创建你的第一个自定义节点

让我们从一个简单的例子开始 - 创建一个 **带有主副标题的矩形节点**：



```ts

import { Graph, register, Rect, ExtensionCategory } from '@antv/g6';

// 第一步：创建自定义节点类
class DualLabelNode extends Rect {
  // 副标题样式
  getSubtitleStyle(attributes) {
    return {
      x: 0,
      y: 45, // 放在主标题下方
      text: attributes.subtitle || '',
      fontSize: 12,
      fill: '#666',
      textAlign: 'center',
      textBaseline: 'middle',
    };
  }

  // 绘制副标题
  drawSubtitleShape(attributes, container) {
    const subtitleStyle = this.getSubtitleStyle(attributes);
    this.upsert('subtitle', 'text', subtitleStyle, container);
  }

  // 渲染方法
  render(attributes = this.parsedAttributes, container) {
    // 1. 渲染基础矩形和主标题
    super.render(attributes, container);

    // 2. 添加副标题
    this.drawSubtitleShape(attributes, container);
  }
}

// 第二步：注册自定义节点
register(ExtensionCategory.NODE, 'dual-label-node', DualLabelNode);

// 第三步：使用自定义节点
const graph = new Graph({
  container: 'container',
  height: 200,
  data: {
    nodes: [
      {
        id: 'node1',
        style: { x: 100, y: 100 },
        data: {
          title: '节点 A', // 主标题
          subtitle: '你的第一个自定义节点', // 副标题
        },
      },
    ],
  },
  node: {
    type: 'dual-label-node',
    style: {
      fill: '#7FFFD4',
      stroke: '#5CACEE',
      lineWidth: 2,
      radius: 5,
      // 主标题样式
      labelText: (d) => d.data.title,
      labelFill: '#222',
      labelFontSize: 14,
      labelFontWeight: 500,
      // 副标题
      subtitle: (d) => d.data.subtitle,
    },
  },
});

graph.render();
```


### 第一步：编写自定义节点类

继承 G6 的 `Rect`（矩形节点），并添加一个副标题：

```js
import { Rect, register, Graph, ExtensionCategory } from '@antv/g6';

// 创建自定义节点，继承自 Rect
class DualLabelNode extends Rect {
  // 副标题样式
  getSubtitleStyle(attributes) {
    return {
      x: 0,
      y: 45, // 放在主标题下方
      text: attributes.subtitle || '',
      fontSize: 12,
      fill: '#666',
      textAlign: 'center',
      textBaseline: 'middle',
    };
  }

  // 绘制副标题
  drawSubtitleShape(attributes, container) {
    const subtitleStyle = this.getSubtitleStyle(attributes);
    this.upsert('subtitle', 'text', subtitleStyle, container);
  }

  // 渲染方法
  render(attributes = this.parsedAttributes, container) {
    // 1. 渲染基础矩形和主标题
    super.render(attributes, container);

    // 2. 添加副标题
    this.drawSubtitleShape(attributes, container);
  }
}
```

### 第二步：注册自定义节点

使用 `register` 方法注册节点类型，这样 G6 才能识别你的自定义节点：

```js
register(ExtensionCategory.NODE, 'dual-label-node', DualLabelNode);
```

`register` 方法需要三个参数：

- 扩展类别：`ExtensionCategory.NODE` 表示这是一个节点类型
- 类型名称：`dual-label-node` 是我们给这个自定义节点起的名字，后续会在配置中使用
- 类定义：`DualLabelNode` 是我们刚刚创建的节点类

### 第三步：应用自定义节点

在图配置中使用自定义节点：

```js
const graph = new Graph({
  data: {
    nodes: [
      {
        id: 'node1',
        style: { x: 100, y: 100 },
        data: {
          title: '节点 A', // 主标题
          subtitle: '你的第一个自定义节点', // 副标题
        },
      },
    ],
  },
  node: {
    type: 'dual-label-node',
    style: {
      fill: '#7FFFD4',
      stroke: '#5CACEE',
      lineWidth: 2,
      radius: 8,
      // 主标题样式
      labelText: (d) => d.data.title,
      labelFill: '#222',
      labelFontSize: 14,
      labelFontWeight: 500,
      // 副标题
      subtitle: (d) => d.data.subtitle,
    },
  },
});

graph.render();
```

🎉 恭喜！你已经创建了第一个自定义节点。它看起来很简单，但这个过程包含了自定义节点的核心思想：**继承一个基础节点类型**，然后 **重写 `render` 方法** 来添加自定义内容。

## 理解数据流：如何在自定义节点中获取数据

在创建复杂的自定义节点之前，理解数据如何流入自定义节点是非常重要的。G6 为自定义节点提供了多种数据获取方式：

### 方式一：通过 `attributes` 参数（推荐）

`render` 方法的第一个参数 `attributes` 包含了经过处理的样式属性，包括数据驱动的样式：

```js
class CustomNode extends Rect {
  render(attributes, container) {
    // attributes 包含了所有样式属性，包括数据驱动的样式
    console.log('当前节点的所有属性:', attributes);

    // 如果在 style 中定义了 customData: (d) => d.data.someValue
    // 那么可以通过 attributes.customData 获取
    const customValue = attributes.customData;

    super.render(attributes, container);
  }
}
```

### 方式二：通过 `this.context.graph` 获取原始数据

当你需要访问节点的原始数据时，可以通过图实例获取：

```js
class CustomNode extends Rect {
  // 便捷的数据获取方法
  get nodeData() {
    return this.context.graph.getNodeData(this.id);
  }

  get data() {
    return this.nodeData.data || {};
  }

  render(attributes, container) {
    // 获取节点的完整数据
    const nodeData = this.nodeData;
    console.log('节点完整数据:', nodeData);

    // 获取 data 字段中的业务数据
    const businessData = this.data;
    console.log('业务数据:', businessData);

    super.render(attributes, container);
  }
}
```

### 数据传递的完整流程

让我们通过一个具体例子来理解数据是如何从图数据传递到自定义节点的：



```ts

import { Graph, register, Rect, ExtensionCategory } from '@antv/g6';

class DataFlowNode extends Rect {
  // 方式二：通过 graph 获取原始数据
  get nodeData() {
    return this.context.graph.getNodeData(this.id);
  }

  get data() {
    return this.nodeData.data || {};
  }

  render(attributes, container) {
    // 方式一：从 attributes 获取处理后的样式
    console.log('从 attributes 获取:', {
      iconUrl: attributes.iconUrl,
      userName: attributes.userName,
    });

    // 方式二：从原始数据获取
    console.log('从原始数据获取:', {
      icon: this.data.icon,
      name: this.data.name,
      role: this.data.role,
    });

    // 渲染基础矩形
    super.render(attributes, container);

    // 使用数据渲染自定义内容
    if (attributes.iconUrl) {
      this.upsert(
        'icon',
        'image',
        {
          x: -25,
          y: -12,
          width: 20,
          height: 20,
          src: attributes.iconUrl,
        },
        container,
      );
    }

    if (attributes.userName) {
      this.upsert(
        'username',
        'text',
        {
          x: 10,
          y: 0,
          text: attributes.userName,
          fontSize: 10,
          fill: '#666',
          textAlign: 'center',
          textBaseline: 'middle',
        },
        container,
      );
    }
  }
}

register(ExtensionCategory.NODE, 'data-flow-node', DataFlowNode);

const graph = new Graph({
  container: 'container',
  height: 200,
  data: {
    nodes: [
      {
        id: 'user1',
        style: { x: 100, y: 100 },
        // 这里是节点的业务数据
        data: {
          name: '张三',
          role: '开发者',
          icon: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
        },
      },
    ],
  },
  node: {
    type: 'data-flow-node',
    style: {
      size: [80, 40],
      fill: '#f0f9ff',
      stroke: '#0ea5e9',
      lineWidth: 1,
      radius: 4,
      // 将 data 中的数据映射到样式属性
      iconUrl: (d) => d.data.icon, // 这会变成 attributes.iconUrl
      userName: (d) => d.data.name, // 这会变成 attributes.userName
      // 主标题使用角色信息
      labelText: (d) => d.data.role,
      labelFontSize: 12,
      labelFill: '#0369a1',
    },
  },
});

graph.render();
```


:::tip\{title=数据流总结\}

1. **图数据定义**：在 `data.nodes[].data` 中定义业务数据
2. **样式映射**：在 `node.style` 中使用函数将数据映射到样式属性
3. **节点获取**：在自定义节点中通过 `attributes` 或 `this.context.graph` 获取数据
4. **渲染使用**：使用获取到的数据渲染自定义图形
   :::

## 从简单到复杂：逐步构建功能丰富的节点

让我们通过实际例子，逐步增加节点的复杂度和功能。

### 示例一：带图标和徽章的用户卡片节点

这个例子展示如何创建一个包含头像、姓名、状态徽章的用户卡片节点：



```ts

import { Graph, register, Rect, ExtensionCategory } from '@antv/g6';

class UserCardNode extends Rect {
  get nodeData() {
    return this.context.graph.getNodeData(this.id);
  }

  get data() {
    return this.nodeData.data || {};
  }

  // 头像样式
  getAvatarStyle(attributes) {
    const [width, height] = this.getSize(attributes);
    return {
      x: -width / 2 + 20,
      y: -height / 2 + 15,
      width: 30,
      height: 30,
      src: attributes.avatarUrl || '',
      radius: 15, // 圆形头像
    };
  }

  drawAvatarShape(attributes, container) {
    if (!attributes.avatarUrl) return;

    const avatarStyle = this.getAvatarStyle(attributes);
    this.upsert('avatar', 'image', avatarStyle, container);
  }

  // 状态徽章样式
  getBadgeStyle(attributes) {
    const [width, height] = this.getSize(attributes);
    const status = this.data.status || 'offline';
    const colorMap = {
      online: '#52c41a',
      busy: '#faad14',
      offline: '#8c8c8c',
    };

    return {
      x: width / 2 - 8,
      y: -height / 2 + 8,
      r: 4,
      fill: colorMap[status],
      stroke: '#fff',
      lineWidth: 2,
    };
  }

  drawBadgeShape(attributes, container) {
    const badgeStyle = this.getBadgeStyle(attributes);
    this.upsert('badge', 'circle', badgeStyle, container);
  }

  // 用户名样式
  getUsernameStyle(attributes) {
    const [width, height] = this.getSize(attributes);
    return {
      x: -width / 2 + 55,
      y: -height / 2 + 20,
      text: attributes.username || '',
      fontSize: 14,
      fill: '#262626',
      fontWeight: 'bold',
      textAlign: 'left',
      textBaseline: 'middle',
    };
  }

  drawUsernameShape(attributes, container) {
    if (!attributes.username) return;

    const usernameStyle = this.getUsernameStyle(attributes);
    this.upsert('username', 'text', usernameStyle, container);
  }

  // 角色标签样式
  getRoleStyle(attributes) {
    const [width, height] = this.getSize(attributes);
    return {
      x: -width / 2 + 55,
      y: -height / 2 + 35,
      text: attributes.userRole || '',
      fontSize: 11,
      fill: '#8c8c8c',
      textAlign: 'left',
      textBaseline: 'middle',
    };
  }

  drawRoleShape(attributes, container) {
    if (!attributes.userRole) return;

    const roleStyle = this.getRoleStyle(attributes);
    this.upsert('role', 'text', roleStyle, container);
  }

  render(attributes, container) {
    // 渲染基础矩形
    super.render(attributes, container);

    // 添加各个组件
    this.drawAvatarShape(attributes, container);
    this.drawBadgeShape(attributes, container);
    this.drawUsernameShape(attributes, container);
    this.drawRoleShape(attributes, container);
  }
}

register(ExtensionCategory.NODE, 'user-card-node', UserCardNode);

const graph = new Graph({
  container: 'container',
  height: 200,
  data: {
    nodes: [
      {
        id: 'user1',
        style: { x: 100, y: 100 },
        data: {
          name: '张小明',
          role: '前端工程师',
          status: 'online',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zhang',
        },
      },
    ],
  },
  node: {
    type: 'user-card-node',
    style: {
      size: [140, 50],
      fill: '#ffffff',
      stroke: '#d9d9d9',
      lineWidth: 1,
      radius: 6,
      // 数据映射
      avatarUrl: (d) => d.data.avatar,
      username: (d) => d.data.name,
      userRole: (d) => d.data.role,
    },
  },
});

graph.render();
```


### 示例二：可点击操作按钮的节点

给节点加一个蓝色按钮，点击后触发事件（打印日志或执行回调）。



```ts

import { Graph, register, Rect, ExtensionCategory } from '@antv/g6';

class ClickableNode extends Rect {
  getButtonStyle(attributes) {
    return {
      x: 40,
      y: -10,
      width: 20,
      height: 20,
      radius: 10,
      fill: '#1890ff',
      cursor: 'pointer', // 鼠标指针变为手型
    };
  }

  drawButtonShape(attributes, container) {
    const btnStyle = this.getButtonStyle(attributes, container);
    const btn = this.upsert('button', 'rect', btnStyle, container);

    // 为按钮添加点击事件
    if (!btn.__clickBound) {
      btn.addEventListener('click', (e) => {
        // 阻止事件冒泡，避免触发节点的点击事件
        e.stopPropagation();

        // 执行业务逻辑
        console.log('Button clicked on node:', this.id);

        // 如果数据中有回调函数，则调用
        if (typeof attributes.onButtonClick === 'function') {
          attributes.onButtonClick(this.id, this.data);
        }
      });
      btn.__clickBound = true; // 标记已绑定事件，避免重复绑定
    }
  }

  render(attributes, container) {
    super.render(attributes, container);

    // 添加一个按钮
    this.drawButtonShape(attributes, container);
  }
}

register(ExtensionCategory.NODE, 'clickable-node', ClickableNode);

const graph = new Graph({
  container: 'container',
  height: 200,
  data: {
    nodes: [
      {
        id: 'node1',
        style: { x: 100, y: 100 },
      },
    ],
  },
  node: {
    type: 'clickable-node', // 指定使用我们的自定义节点
    style: {
      size: [60, 30],
      fill: '#7FFFD4',
      stroke: '#5CACEE',
      lineWidth: 2,
      radius: 5,
      onButtonClick: (id, data) => {},
    },
  },
});

graph.render();
```


### 示例三：响应状态变化的节点（点击变色）

常见的交互都需要节点和边通过样式变化做出反馈，例如鼠标移动到节点上、点击选中节点/边、通过交互激活边上的交互等，都需要改变节点和边的样式，有两种方式来实现这种效果：

1. 从 `data.states` 获取当前状态，在自定义节点类中处理状态变化；
2. 将交互状态同原始数据和绘制节点的逻辑分开，仅更新节点。

我们推荐用户使用第二种方式来实现节点的状态调整，可以通过以下方式来实现：

1. 实现自定义节点；
2. 在图配置项中配置节点状态样式；
3. 通过 `graph.setElementState()` 方法来设置节点状态。

基于 rect 扩展出一个 hole 图形，默认填充色为白色，当鼠标点击时变成橙色，实现这一效果的示例代码如下：



```ts

import { Rect, register, Graph, ExtensionCategory } from '@antv/g6';

// 1. 定义节点类
class SelectableNode extends Rect {
  getHoleStyle(attributes) {
    return {
      x: 20,
      y: -10,
      radius: 10,
      width: 20,
      height: 20,
      fill: attributes.holeFill,
    };
  }

  drawHoleShape(attributes, container) {
    const holeStyle = this.getHoleStyle(attributes, container);

    this.upsert('hole', 'rect', holeStyle, container);
  }

  render(attributes, container) {
    super.render(attributes, container);

    this.drawHoleShape(attributes, container);
  }
}

// 2. 注册节点
register(ExtensionCategory.NODE, 'selectable-node', SelectableNode, true);

// 3. 创建图实例
const graph = new Graph({
  container: 'container',
  height: 200,
  data: {
    nodes: [{ id: 'node-1', style: { x: 100, y: 100 } }],
  },
  node: {
    type: 'selectable-node',
    style: {
      size: [120, 60],
      radius: 6,
      fill: '#7FFFD4',
      stroke: '#5CACEE',
      lineWidth: 2,
      holeFill: '#fff',
    },
    state: {
      // 鼠标选中状态
      selected: {
        holeFill: 'orange',
      },
    },
  },
});

// 4. 添加节点交互
graph.on('node:click', (evt) => {
  const nodeId = evt.target.id;

  graph.setElementState(nodeId, ['selected']);
});

graph.render();
```
