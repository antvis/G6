---
title: 提示框 Tooltip
order: 16
---

## 概述

Tooltip 插件用于在用户将鼠标悬停或点击图中的元素时，显示额外的信息。它可以帮助用户更好地理解图中的数据，提高交互体验。

## 使用场景

- **详细信息展示**：当用户需要了解元素的详细信息时，使用 Tooltip 提示框来展示这些信息
- **数据可视化辅助**：在数据可视化中，Tooltip 可以显示图表中数据点的详细信息，帮助用户更好地理解数据
- **交互反馈**：为用户的鼠标操作提供即时的视觉反馈

## 基本使用

最简单的 Tooltip 插件配置：

```js
const graph = new Graph({
  // 其他配置...
  plugins: [
    {
      type: 'tooltip',
    },
  ],
});
```

## 配置项

| 属性         | 描述                    | 类型                                                                                                                            | 默认值                                | 必选 |
| ------------ | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- | ---- |
| type         | 插件类型                | string                                                                                                                          | `tooltip`                             | ✓    |
| key          | 标识符                  | string                                                                                                                          | -                                     |      |
| position     | 气泡框位置              | `top` \| `bottom` \| `left` \| `right` \| `top-left` \| `top-right` \| `bottom-left` \| `bottom-right`                          | `top-right`                           |      |
| enable       | 插件是否启用            | boolean \| ((event: [IElementEvent](/api/event#事件对象属性), items: NodeData \| EdgeData \| ComboData[]) => boolean)           | true                                  |      |
| getContent   | 自定义内容              | (event: [IElementEvent](/api/event#事件对象属性), items: NodeData \| EdgeData \| ComboData[]) => Promise<HTMLElement \| string> | -                                     |      |
| onOpenChange | 显示隐藏的回调          | (open: boolean) => void                                                                                                         | -                                     |      |
| trigger      | 触发行为                | `hover` \| `click`                                                                                                              | `hover`                               |
| container    | tooltip自定义渲染的容器 | string \| HTMLElement                                                                                                           | -                                     |      |
| offset       | 偏移距离                | [number,number]                                                                                                                 | [10,10]                               |      |
| enterable    | 指针是否可以进入        | boolean                                                                                                                         | false                                 |      |
| title        | 标题                    | string                                                                                                                          | -                                     |
| style        | 样式对象                | Record<string,any>                                                                                                              | {'.tooltip': { visibility: 'hidden'}} |      |
| prefixCls    | tooltip自定义类名前缀   | string                                                                                                                          | -                                     |      |

## 详细配置说明

### enable - 条件启用

控制插件是否启用，支持传入函数动态调整启用逻辑。

**示例：只对节点启用 Tooltip**

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const data = {
  nodes: [
    { id: 'node1', style: { x: 100, y: 100 }, data: { name: '服务器节点' } },
    { id: 'node2', style: { x: 200, y: 100 }, data: { name: '数据库节点' } },
  ],
  edges: [{ source: 'node1', target: 'node2', data: { type: '连接线' } }],
};

const graph = new Graph({
  container: 'container',
  width: 400,
  height: 200,
  data,
  plugins: [
    {
      type: 'tooltip',
      // 只对节点启用，边不显示tooltip
      enable: (e) => e.targetType === 'node',
      getContent: (e, items) => {
        return `<div>节点: ${items[0].data.name}</div>`;
      },
    },
  ],
});

graph.render();
```

### getContent - 自定义内容

自定义渲染 Tooltip 内容，支持返回 HTMLElement 或 string。

**示例：动态渲染自定义 HTML 内容**

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const data = {
  nodes: [
    {
      id: 'node1',
      style: { x: 100, y: 100 },
      data: { name: '服务器A', type: '应用服务器', status: '运行中', cpu: '45%', memory: '2.1GB' },
    },
    {
      id: 'node2',
      style: { x: 250, y: 100 },
      data: { name: '数据库B', type: 'MySQL数据库', status: '正常', connections: 23, size: '500MB' },
    },
  ],
  edges: [{ source: 'node1', target: 'node2', data: { bandwidth: '1Gbps', latency: '5ms' } }],
};

const graph = new Graph({
  container: 'container',
  width: 400,
  height: 200,
  data,
  plugins: [
    {
      type: 'tooltip',
      getContent: (e, items) => {
        const item = items[0];

        if (e.targetType === 'node') {
          return `
            <div>
              <h4 style="margin: 0 0 8px 0; color: #333; border-bottom: 1px solid #eee; padding-bottom: 4px;">
                ${item.data.name}
              </h4>
              <div style="margin: 4px 0; color: #666;">
                <strong>类型:</strong> ${item.data.type}
              </div>
              <div style="margin: 4px 0; color: #666;">
                <strong>状态:</strong>
                <span style="color: ${item.data.status === '运行中' || item.data.status === '正常' ? '#52c41a' : '#ff4d4f'}">
                  ${item.data.status}
                </span>
              </div>
              ${item.data.cpu ? `<div style="margin: 4px 0; color: #666;"><strong>CPU:</strong> ${item.data.cpu}</div>` : ''}
              ${item.data.memory ? `<div style="margin: 4px 0; color: #666;"><strong>内存:</strong> ${item.data.memory}</div>` : ''}
              ${item.data.connections ? `<div style="margin: 4px 0; color: #666;"><strong>连接数:</strong> ${item.data.connections}</div>` : ''}
              ${item.data.size ? `<div style="margin: 4px 0; color: #666;"><strong>大小:</strong> ${item.data.size}</div>` : ''}
            </div>
          `;
        } else if (e.targetType === 'edge') {
          return `
            <div>
              <h4 style="margin: 0 0 8px 0; color: #333;">连接信息</h4>
              <div style="margin: 4px 0; color: #666;"><strong>带宽:</strong> ${item.data.bandwidth}</div>
              <div style="margin: 4px 0; color: #666;"><strong>延迟:</strong> ${item.data.latency}</div>
            </div>
          `;
        }

        return '暂无信息';
      },
    },
  ],
});

graph.render();
```

### trigger - 触发方式

控制 Tooltip 的触发行为。

**可选值：**

- `hover`：鼠标移入元素时触发（默认）
- `click`：鼠标点击元素时触发

**示例：点击触发 Tooltip**

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const data = {
  nodes: [
    { id: 'node1', style: { x: 100, y: 100 }, data: { name: '点击我' } },
    { id: 'node2', style: { x: 200, y: 100 }, data: { name: '也点击我' } },
  ],
  edges: [{ source: 'node1', target: 'node2' }],
};

const graph = new Graph({
  container: 'container',
  width: 350,
  height: 200,
  data,
  node: {
    style: {
      labelText: (d) => d.data.name,
    },
  },
  plugins: [
    {
      type: 'tooltip',
      trigger: 'click',
      getContent: (e, items) => {
        return `
          <div>
            <div style="color: #0369a1; font-weight: bold; margin-bottom: 4px;">
              点击触发 🖱️
            </div>
            <div style="color: #0c4a6e;">
              元素ID: ${items[0].id}<br/>
              名称: ${items[0].data?.name || '未命名'}
            </div>
          </div>
        `;
      },
    },
  ],
});

graph.render();
```

### position - 显示位置

控制 Tooltip 相对于鼠标位置的显示位置。

**可选值：**

- `top`: 顶部
- `bottom`: 底部
- `left`: 左侧
- `right`: 右侧
- `top-left`: 顶部靠左
- `top-right`: 顶部靠右（默认）
- `bottom-left`: 底部靠左
- `bottom-right`: 底部靠右

**示例：不同位置的 Tooltip**

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const data = {
  nodes: [
    { id: 'node1', style: { x: 100, y: 100 }, data: { label: 'TOP' } },
    { id: 'node2', style: { x: 250, y: 100 }, data: { label: 'BOTTOM' } },
    { id: 'node3', style: { x: 100, y: 250 }, data: { label: 'LEFT' } },
    { id: 'node4', style: { x: 250, y: 250 }, data: { label: 'RIGHT' } },
  ],
};

const graph = new Graph({
  container: 'container',
  width: 800,
  height: 400,
  data,
  node: { style: { labelText: (d) => d.data.label } },
  plugins: [
    {
      key: 'tooltip-top',
      type: 'tooltip',
      position: 'top',
      enable: (e, items) => items[0].id === 'node1',
      getContent: () => `顶部显示 ⬆️`,
      style: {
        '.tooltip': {
          background: ' #fff2e8',
          border: '1px solid #ffa940',
          borderRadius: 4,
        },
      },
    },
    {
      key: 'tooltip-bottom',
      type: 'tooltip',
      position: 'bottom',
      enable: (e, items) => items[0].id === 'node2',
      getContent: () => `底部显示 ⬇️`,
      style: {
        '.tooltip': {
          background: '#f6ffed',
          border: '1px solid #73d13d',
          borderRadius: 4,
        },
      },
    },
    {
      key: 'tooltip-left',
      type: 'tooltip',
      position: 'left',
      enable: (e, items) => items[0].id === 'node3',
      getContent: () => `左侧显示 ⬅️`,
      style: {
        '.tooltip': {
          background: '#fff1f0',
          border: '1px solid #ff7875',
          borderRadius: 4,
        },
      },
    },
    {
      key: 'tooltip-right',
      type: 'tooltip',
      position: 'right',
      enable: (e, items) => items[0].id === 'node4',
      getContent: () => `右侧显示 ➡️`,
      style: {
        '.tooltip': {
          background: '#f0f5ff',
          border: '1px solid #597ef7',
          borderRadius: 4,
        },
      },
    },
  ],
});

graph.render();
```

### offset - 偏移量

设置 Tooltip 显示位置的偏移量，以鼠标位置为基点。

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const data = {
  nodes: [
    { id: 'node1', style: { x: 100, y: 100 }, data: { label: '默认偏移' } },
    { id: 'node2', style: { x: 250, y: 100 }, data: { label: '自定义偏移' } },
  ],
};

const graph = new Graph({
  container: 'container',
  width: 800,
  height: 200,
  data,
  plugins: [
    {
      key: 'tooltip-default',
      type: 'tooltip',
      enable: (e, items) => items[0].id === 'node1',
      getContent: () => `默认偏移 [10,10]`,
    },
    {
      key: 'tooltip-custom',
      type: 'tooltip',
      offset: [30, -10], // 向右偏移30px，向上偏移10px
      enable: (e, items) => items[0].id === 'node2',
      getContent: () => `自定义偏移 [30,-10]`,
    },
  ],
});

graph.render();
```

### enterable - 鼠标可进入

控制鼠标指针是否可以进入气泡框，常用于需要在 Tooltip 内进行交互的场景。

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const data = {
  nodes: [
    { id: 'node1', style: { x: 100, y: 100 }, data: { name: '用户A', email: 'usera@example.com' } },
    { id: 'node2', style: { x: 250, y: 100 }, data: { name: '用户B', email: 'userb@example.com' } },
  ],
};

const graph = new Graph({
  container: 'container',
  width: 400,
  height: 200,
  data,
  plugins: [
    {
      type: 'tooltip',
      enterable: true,
      position: 'right',
      getContent: (e, items) => {
        const item = items[0];
        return `
          <div>
            <h4 style="margin: 0 0 12px 0; color: #333;">用户操作</h4>
            <div style="margin-bottom: 8px; color: #666;">
              <strong>姓名:</strong> ${item.data.name}
            </div>
            <div style="margin-bottom: 12px; color: #666;">
              <strong>邮箱:</strong> ${item.data.email}
            </div>
            <div style="display: flex; gap: 8px;">
              <button onclick="alert('发送消息给 ${item.data.name}')"
                      style="padding: 4px 12px; background: #1890ff; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">
                发消息
              </button>
              <button onclick="alert('查看 ${item.data.name} 的详情')"
                      style="padding: 4px 12px; background: #52c41a; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">
                详情
              </button>
            </div>
          </div>
        `;
      },
      style: {
        '.tooltip': {
          background: '#fff',
          borderRadius: '8px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          minWidth: '200px',
        },
      },
    },
  ],
});

graph.render();
```

### style - 样式自定义

自定义 Tooltip 的样式。

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const data = {
  nodes: [
    { id: 'node1', style: { x: 100, y: 100 }, data: { theme: 'dark', name: '深色主题' } },
    { id: 'node2', style: { x: 250, y: 100 }, data: { theme: 'light', name: '浅色主题' } },
  ],
};

const graph = new Graph({
  container: 'container',
  width: 400,
  height: 200,
  data,
  plugins: [
    {
      key: 'tooltip-dark',
      type: 'tooltip',
      enable: (e, items) => items[0].data.theme === 'dark',
      style: {
        '.tooltip': {
          background: '#1f1f1f',
          color: '#fff',
          border: '1px solid #333',
          borderRadius: '8px',
          fontSize: '14px',
          fontFamily: 'Arial, sans-serif',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        },
      },
      getContent: (e, items) => {
        return `<div>🌙 ${items[0].data.name}</div>`;
      },
    },
    {
      key: 'tooltip-light',
      type: 'tooltip',
      enable: (e, items) => items[0].data.theme === 'light',
      style: {
        '.tooltip': {
          background: '#ffffff',
          color: '#333',
          border: '1px solid #d9d9d9',
          borderRadius: '8px',
          fontSize: '14px',
          fontFamily: 'Arial, sans-serif',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        },
      },
      getContent: (e, items) => {
        return `<div>☀️ ${items[0].data.name}</div>`;
      },
    },
  ],
});

graph.render();
```

## 实际案例

- [基础提示框](/examples/plugin/tooltip/#basic)
- [点击触发 Tooltip](/examples/plugin/tooltip/#click)
- [鼠标移入和点击同一元素时显示不同的提示框](/examples/plugin/tooltip/#dual)
- [自定义样式的 Tooltip](/examples/plugin/tooltip/#custom-style)
- [异步加载内容的 Tooltip](/examples/plugin/tooltip/#async)
