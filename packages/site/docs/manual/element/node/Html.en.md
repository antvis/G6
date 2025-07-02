---
title: HTML Node
order: 7
---

## Overview

HTML node is a custom rectangular area used to display HTML content. It allows you to embed arbitrary HTML elements within graph nodes, providing great flexibility for creating complex custom nodes.

Use Cases:

- Used to represent complex custom nodes such as tables, charts, or rich text
- Suitable for representing custom visual elements or interactive components
- Commonly used in custom charts, UI design, dashboards, and other scenarios
- When you need to embed interactive elements like forms and buttons in nodes

## Framework Support

> **💡 Tips**：
>
> - **React Projects**: Recommended to use [React Node](/en/manual/element/node/react-node) for better component-based development experience
> - **Vue Projects**: Vue Node is not currently supported, community contributions are welcome
> - **Native HTML**: The HTML node introduced in this document is suitable for native HTML development

## Online Demo

<embed src="@/common/api/elements/nodes/html.md"></embed>

## Style Configuration

> If the element has specific properties, we will list them below. For all common style properties, see [BaseNode](/en/manual/element/node/base-node)

| Property  | Description                                                                                           | Type                        | Default | Required |
| --------- | ----------------------------------------------------------------------------------------------------- | --------------------------- | ------- | -------- |
| dx        | Horizontal offset. HTML container defaults to top-left corner as origin, use dx for horizontal offset | number                      | 0       |          |
| dy        | Vertical offset. HTML container defaults to top-left corner as origin, use dy for vertical offset     | number                      | 0       |          |
| innerHTML | HTML content, can be string or `HTMLElement`                                                          | string &#124; `HTMLElement` | -       | ✓        |

## Examples

### Basic HTML Node

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

### HTML Node with Interactive Buttons

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
    >Restart</button>
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
    >Monitor</button>
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

// Global functions to handle button clicks
window.handleRestart = (nodeId) => {
  console.log(`Restarting server: ${nodeId}`);
  alert(`Restarting server ${nodeId}...`);
};

window.handleMonitor = (nodeId) => {
  console.log(`Opening monitoring panel: ${nodeId}`);
  alert(`Opening monitoring panel for server ${nodeId}`);
};

graph.render();
```

### Form Input HTML Node

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  data: {
    nodes: [
      { id: 'form-1', data: { title: 'User Information', type: 'user-form' } },
      { id: 'form-2', data: { title: 'Configuration Panel', type: 'config-form' } },
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
    <label style="display: block; margin-bottom: 4px; font-size: 14px; color: #666;">Name</label>
    <input 
      type="text" 
      placeholder="Enter name"
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
    <label style="display: block; margin-bottom: 4px; font-size: 14px; color: #666;">Email</label>
    <input 
      type="email" 
      placeholder="Enter email"
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
    <label style="display: block; margin-bottom: 4px; font-size: 14px; color: #666;">Role</label>
    <select style="
      width: 100%;
      padding: 8px 12px;
      border: 1px solid #d9d9d9;
      border-radius: 4px;
      font-size: 14px;
      box-sizing: border-box;
    ">
      <option>Administrator</option>
      <option>User</option>
      <option>Guest</option>
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
    >Save</button>
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
    >Cancel</button>
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

// Global functions to handle form operations
window.handleSave = (nodeId) => {
  console.log(`Saving form: ${nodeId}`);
  alert(`Form ${nodeId} saved`);
};

window.handleCancel = (nodeId) => {
  console.log(`Canceling form: ${nodeId}`);
  alert(`Form ${nodeId} operation canceled`);
};

graph.render();
```

## Usage Notes

### 1. Performance Optimization

- HTML nodes have higher rendering costs compared to regular graphic nodes, recommend using when node count is small
- Complex HTML structures will affect performance, recommend keeping structure simple
- Avoid using too many animation effects in HTML

### 2. Event Handling

- Event handling in HTML nodes needs to be implemented through global functions or event delegation
- Recommend mounting event handling functions to the `window` object to ensure accessibility in HTML strings
- Be careful to prevent event bubbling from affecting graph interaction behavior

### 3. Style Isolation

- HTML node styles may be affected by global page styles
- Recommend using inline styles or ensuring sufficient style specificity
- Consider using CSS-in-JS or style namespaces to avoid style conflicts

### 4. Responsive Design

- HTML node dimensions are fixed and do not automatically adapt to content
- Need to dynamically calculate node dimensions based on content or use responsive layouts
- Consider display effects at different zoom levels

### 5. Framework Integration Recommendations

- **React Projects**: Recommended to use [React Node](/en/manual/element/node/react-node), which allows direct use of React components as node content
- **Vue Projects**: Vue Node is not currently supported, community contributions are welcome if needed
- **Native Projects**: HTML nodes are the best choice, providing maximum flexibility
