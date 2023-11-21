---
title: 快速开始
order: 1
---

## 在线示例

<iframe src="https://codesandbox.io/embed/g6-v5-beta-quick-start-m3yncv?fontsize=14&hidenavigation=1&theme=light"
   style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
   title="g6-v5-beta-quick-start"
   allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
   sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
 ></iframe>

## 在原生 HTML 中使用

在原生 HTML 中使用 G6 仅需要引入 G6 的 JS 文件即可，如下所示：

```html
<!DOCTYPE html>
<html>
  <body>
    <!-- 1. 创建容器 -->
    <div id="container"></div>

    <script src="https://gw.alipayobjects.com/os/lib/antv/g6/5.0.0/dist/g6.min.js"></script>

    <script>
      // 2. 准备数据
      const data = {
        /** 节点 */
        nodes: [
          {
            /** 节点的唯一标识，必选，可以为字符串或数字 */
            id: 'node1',
            /** 自定义节点的其他数据，可选 */
            data: { name: 'Circle1' },
          },
          { id: 'node2', data: { name: 'Circle2' } },
        ],
        /** 边 */
        edges: [
          {
            /** 边的唯一标识，可选，可以为字符串或数字 */
            id: 'edge1',
            /** 边的起始节点 id，必选 */
            source: 'node1',
            /** 边的目标节点 id，必选 */
            target: 'node2',
            /** 自定义边的其他数据，可选 */
            data: {},
          },
        ],
      };

      // 3. 创建 G6 实例
      const graph = new Graph({
        /** 画布容器，必选，可以是容器 id 或者 HTML 节点对象 */
        container: 'container',
        /** 画布宽度，可选，不指定则自适应容器宽度 */
        width: 800,
        /** 画布高度，可选，不指定则自适应容器高度 */
        height: 500,
        /** 数据，可选，也可以稍后通过 graph.read(data) 配置 */
        data: data,
        /** 启用的交互，可选 */
        modes: {
          default: ['drag-node', 'drag-canvas', 'zoom-canvas'],
        },
      });
    </script>
  </body>
</html>
```

**效果预览**

<img src='https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*DQl8SJmb_6gAAAAAAAAAAAAADmJ7AQ/original' width=400 alt='img' />

## 通过 npm 安装

### 安装

```bash
# 使用 npm 安装
npm install --save @antv/g6@5.0.0

# 使用 yarn 安装
yarn add @antv/g6@5.0.0

# 使用 pnpm 安装
pnpm add @antv/g6@5.0.0
```

### 引入

```js
import { Graph } from '@antv/g6';
```

## 在 React 中使用

你可以在 React 中使用 G6，只需要在 React 组件中创建一个 DOM 容器，然后在 `useEffect` 中实例化 G6 即可。[线上 Demo](https://codesandbox.io/s/g6-5-0-demo-hqjs9w)

<!-- TODO 有 Bug -->

```js
import React, { useEffect, useRef } from 'react';
import { Graph } from '@antv/g6';

export default () => {
  const ref = useRef();

  const data = {
    nodes: [
      { id: 'node1', data: { name: 'Circle1' } },
      { id: 'node2', data: { name: 'Circle2' } },
    ],
    edges: [{ id: 'edge1', source: 'node1', target: 'node2', data: {} }],
  };

  useEffect(() => {
    if (!ref.current) return;

    const graph = new Graph({
      container: ref.current,
      width: 800,
      height: 500,
      data,
      modes: {
        default: ['drag-node', 'drag-canvas', 'zoom-canvas'],
      },
    });
  }, []);

  return <div ref={ref}></div>;
};
```

## 在 Vue 中使用

> 建设中，欢迎 PR

## 更多

本章介绍了如何安装以及最简单的场景，在 [G6 Tutorial 入门教程](https://g6-next.antv.antgroup.com/manual/tutorial/preface) 中其他的章节中您将学习到：

- 实例化配置
- 如何设置元素属性、样式
- 设置布局
- 添加交互
- 配置动画
- 使用插件
