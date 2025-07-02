---
title: HTML节点 Html
order: 7
---

## 概述

HTML 节点是一个自定义的矩形区域，用于显示 HTML 内容。它允许您在图形节点中嵌入任意的 HTML 元素，提供了极大的灵活性来创建复杂的自定义节点。

适用场景：

- 用于表示复杂的自定义节点，如表格、图表或富文本
- 适合表示自定义的可视化元素或交互组件
- 常用于自定义图表、UI 设计、仪表板等场景
- 需要在节点中嵌入表单、按钮等交互元素时

## 框架支持说明

> **💡 提示**：
>
> - **React 项目**：推荐使用 [React Node](/manual/element/node/react-node) 来实现更好的组件化开发体验
> - **Vue 项目**：目前暂不支持 Vue Node，欢迎社区共建贡献
> - **原生 HTML**：本文档介绍的 HTML 节点适用于原生 HTML 开发

## 在线体验

<embed src="@/common/api/elements/nodes/html.md"></embed>

## 样式配置

> 如果元素有其特定的属性，我们将在下面列出。对于所有的通用样式属性，见 [BaseNode](/manual/element/node/base-node)

| 属性      | 描述                                                            | 类型                        | 默认值 | 必选 |
| --------- | --------------------------------------------------------------- | --------------------------- | ------ | ---- |
| dx        | 横行偏移量。HTML 容器默认以左上角为原点，通过 dx 来进行横向偏移 | number                      | 0      |      |
| dy        | 纵向偏移量。HTML 容器默认以左上角为原点，通过 dy 来进行纵向偏移 | number                      | 0      |      |
| innerHTML | HTML 内容，可以为字符串或者 `HTMLElement`                       | string &#124; `HTMLElement` | -      | ✓    |

## 示例

### 基础HTML节点

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  data: {
    nodes: [
      { id: 'node-1', data: { location: 'East', status: 'error', ip: '192.168.1.2' } },
      { id: 'node-2', data: { location: 'West', status: 'overload', ip: '192.168.1.3' } },
      { id: 'node-3', data: { location: 'South', status: 'running', ip: '192.168.1.4' } },
    ],
  },
  node: {
    type: 'html',
    style: {
      size: [240, 80],
      dx: -120,
      dy: -40,
      innerHTML: (d) => {
        const ICON_MAP = {
          error: '&#10060;',
          overload: '&#9889;',
          running: '&#9989;',
        };

        const COLOR_MAP = {
          error: '#f5222d',
          overload: '#faad14',
          running: '#52c41a',
        };

        const {
          data: { location, status, ip },
        } = d;
        const color = COLOR_MAP[status];

        return `
<div 
  style="
    width:100%; 
    height: 100%; 
    background: ${color}bb; 
    border: 1px solid ${color};
    color: #fff;
    user-select: none;
    display: flex; 
    padding: 10px;
    border-radius: 8px;
    "
>
  <div style="display: flex;flex-direction: column;flex: 1;">
    <div style="font-weight: bold; font-size: 14px;">
      ${location} Node
    </div>
    <div style="font-size: 12px; margin-top: 4px;">
      status: ${status} ${ICON_MAP[status]}
    </div>
  </div>
  <div>
    <span style="border: 1px solid white; padding: 2px 6px; border-radius: 4px; font-size: 12px;">
      ${ip}
    </span>
  </div>
</div>`;
      },
    },
  },
  layout: {
    type: 'grid',
  },
  behaviors: ['drag-element', 'zoom-canvas'],
});

graph.render();
```

### 带交互按钮的HTML节点

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  data: {
    nodes: [
      { id: 'server-1', data: { name: 'Web Server', cpu: 45, memory: 67, status: 'online' } },
      { id: 'server-2', data: { name: 'Database', cpu: 78, memory: 89, status: 'warning' } },
      { id: 'server-3', data: { name: 'Cache Server', cpu: 23, memory: 34, status: 'offline' } },
    ],
  },
  node: {
    type: 'html',
    style: {
      size: [280, 210],
      dx: -140,
      dy: -105,
      innerHTML: (d) => {
        const { data } = d;
        const statusColors = {
          online: '#52c41a',
          warning: '#faad14',
          offline: '#f5222d',
        };

        return `
<div style="
  width: 100%;
  height: 100%;
  background: #fff;
  border: 2px solid ${statusColors[data.status]};
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
">
  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
    <h3 style="margin: 0; font-size: 16px; color: #333;">${data.name}</h3>
    <span style="
      background: ${statusColors[data.status]};
      color: white;
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: bold;
    ">${data.status.toUpperCase()}</span>
  </div>

  <div style="margin-bottom: 12px;">
    <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
      <span style="font-size: 12px; color: #666;">CPU</span>
      <span style="font-size: 12px; color: #333;">${data.cpu}%</span>
    </div>
    <div style="background: #f0f0f0; height: 6px; border-radius: 3px; overflow: hidden;">
      <div style="background: ${data.cpu > 70 ? '#f5222d' : '#52c41a'}; height: 100%; width: ${data.cpu}%; transition: width 0.3s;"></div>
    </div>
  </div>

  <div style="margin-bottom: 12px;">
    <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
      <span style="font-size: 12px; color: #666;">Memory</span>
      <span style="font-size: 12px; color: #333;">${data.memory}%</span>
    </div>
    <div style="background: #f0f0f0; height: 6px; border-radius: 3px; overflow: hidden;">
      <div style="background: ${data.memory > 80 ? '#f5222d' : '#1890ff'}; height: 100%; width: ${data.memory}%; transition: width 0.3s;"></div>
    </div>
  </div>

  <div style="display: flex; gap: 8px;">
    <button
      onclick="handleRestart('${d.id}')"
      style="
        flex: 1;
        padding: 6px 12px;
        background: #1890ff;
        color: white;
        border: none;
        border-radius: 6px;
        font-size: 12px;
        cursor: pointer;
        transition: background 0.2s;
      "
      onmouseover="this.style.background='#40a9ff'"
      onmouseout="this.style.background='#1890ff'"
    >重启</button>
    <button
      onclick="handleMonitor('${d.id}')"
      style="
        flex: 1;
        padding: 6px 12px;
        background: #52c41a;
        color: white;
        border: none;
        border-radius: 6px;
        font-size: 12px;
        cursor: pointer;
        transition: background 0.2s;
      "
      onmouseover="this.style.background='#73d13d'"
      onmouseout="this.style.background='#52c41a'"
    >监控</button>
  </div>
</div>`;
      },
    },
  },
  layout: {
    type: 'grid',
    cols: 2,
  },
  behaviors: ['drag-element', 'zoom-canvas'],
});

// 全局函数处理按钮点击
window.handleRestart = (nodeId) => {
  console.log(`重启服务器: ${nodeId}`);
  alert(`正在重启服务器 ${nodeId}...`);
};

window.handleMonitor = (nodeId) => {
  console.log(`打开监控面板: ${nodeId}`);
  alert(`打开服务器 ${nodeId} 的监控面板`);
};

graph.render();
```

### 表单输入HTML节点

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  data: {
    nodes: [
      { id: 'form-1', data: { title: '用户信息', type: 'user-form' } },
      { id: 'form-2', data: { title: '配置面板', type: 'config-form' } },
    ],
  },
  node: {
    type: 'html',
    style: {
      size: [300, 400],
      dx: -150,
      dy: -200,
      innerHTML: (d) => {
        const { data } = d;

        return `
<div style="
  width: 100%; 
  height: 100%; 
  background: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
">
  <h3 style="margin: 0 0 16px 0; color: #333; font-size: 16px;">${data.title}</h3>
  
  <div style="margin-bottom: 12px;">
    <label style="display: block; margin-bottom: 4px; font-size: 14px; color: #666;">姓名</label>
    <input 
      type="text" 
      placeholder="请输入姓名"
      style="
        width: 100%;
        padding: 8px 12px;
        border: 1px solid #d9d9d9;
        border-radius: 4px;
        font-size: 14px;
        box-sizing: border-box;
      "
    />
  </div>
  
  <div style="margin-bottom: 12px;">
    <label style="display: block; margin-bottom: 4px; font-size: 14px; color: #666;">邮箱</label>
    <input 
      type="email" 
      placeholder="请输入邮箱"
      style="
        width: 100%;
        padding: 8px 12px;
        border: 1px solid #d9d9d9;
        border-radius: 4px;
        font-size: 14px;
        box-sizing: border-box;
      "
    />
  </div>
  
  <div style="margin-bottom: 16px;">
    <label style="display: block; margin-bottom: 4px; font-size: 14px; color: #666;">角色</label>
    <select style="
      width: 100%;
      padding: 8px 12px;
      border: 1px solid #d9d9d9;
      border-radius: 4px;
      font-size: 14px;
      box-sizing: border-box;
    ">
      <option>管理员</option>
      <option>用户</option>
      <option>访客</option>
    </select>
  </div>
  
  <div style="display: flex; gap: 8px;">
    <button 
      onclick="handleSave('${d.id}')"
      style="
        flex: 1;
        padding: 8px 16px;
        background: #1890ff;
        color: white;
        border: none;
        border-radius: 4px;
        font-size: 14px;
        cursor: pointer;
      "
    >保存</button>
    <button 
      onclick="handleCancel('${d.id}')"
      style="
        flex: 1;
        padding: 8px 16px;
        background: #f5f5f5;
        color: #333;
        border: 1px solid #d9d9d9;
        border-radius: 4px;
        font-size: 14px;
        cursor: pointer;
      "
    >取消</button>
  </div>
</div>`;
      },
    },
  },
  layout: {
    type: 'grid',
    cols: 2,
  },
  behaviors: ['drag-element', 'zoom-canvas'],
});

// 全局函数处理表单操作
window.handleSave = (nodeId) => {
  console.log(`保存表单: ${nodeId}`);
  alert(`表单 ${nodeId} 已保存`);
};

window.handleCancel = (nodeId) => {
  console.log(`取消表单: ${nodeId}`);
  alert(`取消表单 ${nodeId} 操作`);
};

graph.render();
```

## 使用注意事项

### 1. 性能优化

- HTML 节点相比普通图形节点有更高的渲染成本，建议在节点数量较少时使用
- 复杂的 HTML 结构会影响性能，建议保持结构简洁
- 避免在 HTML 中使用过多的动画效果

### 2. 事件处理

- HTML 节点中的事件处理需要通过全局函数或事件委托来实现
- 建议将事件处理函数挂载到 `window` 对象上，确保在 HTML 字符串中可以访问
- 注意防止事件冒泡影响图的交互行为

### 3. 样式隔离

- HTML 节点的样式可能会受到页面全局样式的影响
- 建议使用内联样式或确保样式的特异性足够高
- 考虑使用 CSS-in-JS 或样式命名空间来避免样式冲突

### 4. 响应式设计

- HTML 节点的尺寸是固定的，不会自动适应内容
- 需要根据内容动态计算节点尺寸，或使用响应式布局
- 考虑在不同缩放级别下的显示效果

### 5. 框架集成建议

- **React 项目**：推荐使用 [React Node](/manual/element/node/react-node)，可以直接使用 React 组件作为节点内容
- **Vue 项目**：目前暂不支持 Vue Node，如有需求欢迎社区贡献
- **原生项目**：HTML 节点是最佳选择，提供了最大的灵活性
