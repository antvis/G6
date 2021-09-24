---
title: 使用 React 定义节点
order: 5
---

长期以来，定义节点一直是一个比较让大家烦恼的问题，即使推出了 jsx 方案来简化，也依然有一定难度，于是我们推出了 `@antv/g6-react-node` 这一个包，让大家可以更简单的定义节点，这个包支持 ts 提示，并且包含了高阶的基于 shape 的事件动画等，让大家可以更方便的使用 G6。

### 怎么使用

首先在安装完 G6 后，你需要额外安装 `@antv/g6-react-node`

```bash
npm install @antv/g6-react-node
// yarn add @antv/g6-react-node
```

以一个简单的卡片为例子，它包含了定义，自定义事件，节点数据管理等的示例：

```jsx
import React from 'react';
import G6 from '@antv/g6';
import { Rect, Text, Circle, Image, Group, createNodeFromReact } from '@antv/g6-react-node';

const Tag = ({ text, color }) => (
  <Rect
    style={{
      fill: color,
      padding: [5, 10],
      width: 'auto',
      radius: [4],
      margin: [0, 8],
    }}
  >
    <Text style={{ fill: '#fff', fontSize: 10 }}>{text}</Text>
  </Rect>
);

const Card = ({ cfg }) => {
  const { collapsed = false } = cfg;

  return (
    <Group draggable>
      <Rect
        style={{
          width: 400,
          height: 'auto',
          fill: '#fff',
          stroke: '#ddd',
          shadowColor: '#eee',
          shadowBlur: 30,
          radius: [8],
          justifyContent: 'center',
          padding: [18, 0],
        }}
        draggable
      >
        <Text
          style={{
            fill: '#000',
            margin: [0, 24],
            fontSize: 16,
            fontWeight: 'bold',
          }}
        >
          这是一个卡片
        </Text>
        <Text style={{ fill: '#ccc', fontSize: 12, margin: [12, 24] }}>
          我是一段特别特别特别特别特别特别特别长的描述
        </Text>
        {collapsed && (
          <Group>
            <Image
              style={{
                img: 'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg',
                width: 200,
                height: 200,
                margin: [24, 'auto'],
              }}
            />
            <Rect style={{ width: 'auto', flexDirection: 'row', padding: [4, 12] }}>
              <Tag color="#66ccff" text="我是" />
              <Tag color="#66ccff" text="很多个" />
              <Tag color="#66ccff" text="很多个的" />
              <Tag color="#66ccff" text="标签" />
            </Rect>
          </Group>
        )}
        <Circle
          style={{
            position: 'absolute',
            x: 380,
            y: 20,
            r: 5,
            fill: collapsed ? 'blue' : 'green',
          }}
        >
          <Text
            style={{
              fill: '#fff',
              fontSize: 10,
              margin: [-6, -3, 0],
              cursor: 'pointer',
            }}
            onClick={(evt, node, shape, graph) => {
              graph.updateItem(node, {
                collapsed: !collapsed,
              });
            }}
          >
            {collapsed ? '-' : '+'}
          </Text>
        </Circle>
      </Rect>
    </Group>
  );
};

G6.registerNode('test', createNodeFromReact(Card));
```

展示了这样一个卡片的节点：

<img alt="graph" width="400" src="https://gw.alipayobjects.com/zos/antfincdn/imZMZ8jYKJ/xiazai%252520%2815%29.png" />


### 使用指南

#### 图形 React 组件

定义 React 组件节点的时候，你不能使用任何的 hook 或者异步获取的逻辑，因为目前节点绘制需要是一个同步的过程，并且，我们推荐把所有状态以及数据信息放在节点本身 data 中，这样可以更方便的进行管理。在React组件节点中，所有的数据流动都应该是：节点数据 -> react 组件 props(cfg) -> 节点内容变化。组件本身需要是没有任何副作用的，所有对于节点数据的改变，都是基于 updateItem 的。

#### React 组件内部的布局

如果你没有做任何定位或者布局，所有布局都会按照正常的文档流，自上而下排布。为了让大家有更自由的布局方式， React 内部还支持了 flex 布局，你可以通过操作：`alignContent`,`alignItems`,`alignSelf`,`display`,`flex`,`flexBasis`,`flexGrow`,`flexShrink`,`flexDirection`,`flexWrap`,`height`,`width`,`justifyContent`,`margin`,`padding`,`maxHeight`,`maxWidth`,`minHeight`,`minWidth` 这几个属性来控制节点内部的布局。

#### 基于 React 组件 Shape 的事件处理

为了更加方便的控制节点，我们支持了在节点内部的某一个图形进行事件绑定(事件冒泡会在后续版本支持)，这些事件绑定函数都有统一的参数： `(evt: G6本身的事件, node: 事件发生的节点, shape: 事件发生的Shape, graph: 发出事件的graph)`，目前我们支持了大部分的 G6 事件：`onClick`,`onDBClick `,`onMouseEnter`,`onMouseMove `,`onMouseOut`,`onMouseOver `,`onMouseLeave`,`onMouseDown `,`onMouseUp `,`onDragStart `,`onDrag`,`onDragEnd `,`onDragEnter `,`onDragLeave `,`onDragOver`,`onDrop`,`onContextMenu`

⚠️ 注意： 使用了事件后，需要使用函数 `appenAutoShapeListener(graph)` 对所进行对图进行事件挂载才可以生效，该方法可以直接从 `@antv/g6-react-node` 包引出。

#### 基于 React 组件 Shape 的简单动画（alpha）

为了更加方便给节点添加动画，所以我们内置了一些简单的动画来使用，希望能满足基本交互的效果，第一期我们暂时只推出了六种动画， `animation` 属性设置后就有动画，属性为空则停止动画。

示例：

```jsx
<Rect
        style={{
          width: 400,
          // ...
        }}
        draggable
        animation={
          animated && {
            animate: 'rubber', // 同时支持 'spin','flash','pulse','tada','bounce'
            repeat: true,
            duration: 2000,
          }
        }
      >
```

<img alt="animate show" src="https://gw.alipayobjects.com/zos/antfincdn/cXLES5%26w5x/ezgif.com-video-to-gif.gif" />

### 更多帮助

[「如何用React在G6里面优雅的定制节点」](https://www.yuque.com/docs/share/e1cb2776-ed13-45bb-8172-69b1d3db2fc2?#)


[G6 React Node Docs](https://dicegraph.github.io/g6-react-node/)






