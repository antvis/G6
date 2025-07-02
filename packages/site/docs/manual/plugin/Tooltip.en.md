---
title: Tooltip
order: 16
---

## Overview

The Tooltip plugin is used to display additional information when users hover over or click on elements in the graph. It helps users better understand the data in the graph and improves the interactive experience.

## Use Cases

- **Detailed Information Display**: When users need to understand detailed information about elements, use Tooltip to display this information
- **Data Visualization Assistance**: In data visualization, Tooltip can display detailed information about data points in charts, helping users better understand the data
- **Interactive Feedback**: Provide immediate visual feedback for user mouse operations

## Basic Usage

The simplest Tooltip plugin configuration:

```js
const graph = new Graph({
  // Other configurations...
  plugins: [
    {
      type: 'tooltip',
    },
  ],
});
```

## Configuration Options

| Property     | Description               | Type                                                                                                                                          | Default Value                         | Required |
| ------------ | ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- | -------- |
| type         | Plugin type               | string                                                                                                                                        | `tooltip`                             | ✓        |
| key          | Identifier                | string                                                                                                                                        | -                                     |          |
| position     | Tooltip position          | `top` \| `bottom` \| `left` \| `right` \| `top-left` \| `top-right` \| `bottom-left` \| `bottom-right`                                        | `top-right`                           |          |
| enable       | Whether plugin is enabled | boolean \| ((event: [IElementEvent](/en/api/event#event-object-properties), items: NodeData \| EdgeData \| ComboData[]) => boolean)           | true                                  |          |
| getContent   | Custom content            | (event: [IElementEvent](/en/api/event#event-object-properties), items: NodeData \| EdgeData \| ComboData[]) => Promise<HTMLElement \| string> | -                                     |          |
| onOpenChange | Show/hide callback        | (open: boolean) => void                                                                                                                       | -                                     |          |
| trigger      | Trigger behavior          | `hover` \| `click`                                                                                                                            | `hover`                               |
| container    | Custom render container   | string \| HTMLElement                                                                                                                         | -                                     |          |
| offset       | Offset distance           | [number,number]                                                                                                                               | [10,10]                               |          |
| enterable    | Whether pointer can enter | boolean                                                                                                                                       | false                                 |          |
| title        | Title                     | string                                                                                                                                        | -                                     |
| style        | Style object              | Record<string,any>                                                                                                                            | {'.tooltip': { visibility: 'hidden'}} |          |

## Detailed Configuration

### enable - Conditional Enable

Controls whether the plugin is enabled, supports passing functions to dynamically adjust enable logic.

**Example: Enable Tooltip only for nodes**

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const data = {
  nodes: [
    { id: 'node1', style: { x: 100, y: 100 }, data: { name: 'Server Node' } },
    { id: 'node2', style: { x: 200, y: 100 }, data: { name: 'Database Node' } },
  ],
  edges: [{ source: 'node1', target: 'node2', data: { type: 'Connection' } }],
};

const graph = new Graph({
  container: 'container',
  width: 400,
  height: 200,
  data,
  plugins: [
    {
      type: 'tooltip',
      // Enable only for nodes, not for edges
      enable: (e) => e.targetType === 'node',
      getContent: (e, items) => {
        return `<div>Node: ${items[0].data.name}</div>`;
      },
    },
  ],
});

graph.render();
```

### getContent - Custom Content

Customize Tooltip content rendering, supports returning HTMLElement or string.

**Example: Dynamically render custom HTML content**

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const data = {
  nodes: [
    {
      id: 'node1',
      style: { x: 100, y: 100 },
      data: { name: 'Server A', type: 'Application Server', status: 'Running', cpu: '45%', memory: '2.1GB' },
    },
    {
      id: 'node2',
      style: { x: 250, y: 100 },
      data: { name: 'Database B', type: 'MySQL Database', status: 'Normal', connections: 23, size: '500MB' },
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
                <strong>Type:</strong> ${item.data.type}
              </div>
              <div style="margin: 4px 0; color: #666;">
                <strong>Status:</strong>
                <span style="color: ${item.data.status === 'Running' || item.data.status === 'Normal' ? '#52c41a' : '#ff4d4f'}">
                  ${item.data.status}
                </span>
              </div>
              ${item.data.cpu ? `<div style="margin: 4px 0; color: #666;"><strong>CPU:</strong> ${item.data.cpu}</div>` : ''}
              ${item.data.memory ? `<div style="margin: 4px 0; color: #666;"><strong>Memory:</strong> ${item.data.memory}</div>` : ''}
              ${item.data.connections ? `<div style="margin: 4px 0; color: #666;"><strong>Connections:</strong> ${item.data.connections}</div>` : ''}
              ${item.data.size ? `<div style="margin: 4px 0; color: #666;"><strong>Size:</strong> ${item.data.size}</div>` : ''}
            </div>
          `;
        } else if (e.targetType === 'edge') {
          return `
            <div>
              <h4 style="margin: 0 0 8px 0; color: #333;">Connection Info</h4>
              <div style="margin: 4px 0; color: #666;"><strong>Bandwidth:</strong> ${item.data.bandwidth}</div>
              <div style="margin: 4px 0; color: #666;"><strong>Latency:</strong> ${item.data.latency}</div>
            </div>
          `;
        }

        return 'No information available';
      },
    },
  ],
});

graph.render();
```

### trigger - Trigger Mode

Controls the trigger behavior of Tooltip.

**Available values:**

- `hover`: Trigger when mouse enters element (default)
- `click`: Trigger when mouse clicks element

**Example: Click-triggered Tooltip**

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const data = {
  nodes: [
    { id: 'node1', style: { x: 100, y: 100 }, data: { name: 'Click me' } },
    { id: 'node2', style: { x: 200, y: 100 }, data: { name: 'Click me too' } },
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
              Click Triggered 🖱️
            </div>
            <div style="color: #0c4a6e;">
              Element ID: ${items[0].id}<br/>
              Name: ${items[0].data?.name || 'Unnamed'}
            </div>
          </div>
        `;
      },
    },
  ],
});

graph.render();
```

### position - Display Position

Controls the display position of Tooltip relative to mouse position.

**Available values:**

- `top`: Top
- `bottom`: Bottom
- `left`: Left
- `right`: Right
- `top-left`: Top left
- `top-right`: Top right (default)
- `bottom-left`: Bottom left
- `bottom-right`: Bottom right

**Example: Tooltips at different positions**

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
      getContent: () => `Display at top ⬆️`,
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
      getContent: () => `Display at bottom ⬇️`,
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
      getContent: () => `Display at left ⬅️`,
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
      getContent: () => `Display at right ➡️`,
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

### offset - Offset

Set the offset for Tooltip display position, with mouse position as the base point.

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const data = {
  nodes: [
    { id: 'node1', style: { x: 100, y: 100 }, data: { label: 'Default offset' } },
    { id: 'node2', style: { x: 250, y: 100 }, data: { label: 'Custom offset' } },
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
      getContent: () => `Default offset [10,10]`,
    },
    {
      key: 'tooltip-custom',
      type: 'tooltip',
      offset: [30, -10], // Offset 30px to the right, 10px up
      enable: (e, items) => items[0].id === 'node2',
      getContent: () => `Custom offset [30,-10]`,
    },
  ],
});

graph.render();
```

### enterable - Mouse Enterable

Controls whether the mouse pointer can enter the tooltip box, commonly used for scenarios requiring interaction within the Tooltip.

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const data = {
  nodes: [
    { id: 'node1', style: { x: 100, y: 100 }, data: { name: 'User A', email: 'usera@example.com' } },
    { id: 'node2', style: { x: 250, y: 100 }, data: { name: 'User B', email: 'userb@example.com' } },
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
            <h4 style="margin: 0 0 12px 0; color: #333;">User Actions</h4>
            <div style="margin-bottom: 8px; color: #666;">
              <strong>Name:</strong> ${item.data.name}
            </div>
            <div style="margin-bottom: 12px; color: #666;">
              <strong>Email:</strong> ${item.data.email}
            </div>
            <div style="display: flex; gap: 8px;">
              <button onclick="alert('Send message to ${item.data.name}')"
                      style="padding: 4px 12px; background: #1890ff; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">
                Message
              </button>
              <button onclick="alert('View ${item.data.name} details')"
                      style="padding: 4px 12px; background: #52c41a; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">
                Details
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

### style - Style Customization

Customize Tooltip styles.

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const data = {
  nodes: [
    { id: 'node1', style: { x: 100, y: 100 }, data: { theme: 'dark', name: 'Dark Theme' } },
    { id: 'node2', style: { x: 250, y: 100 }, data: { theme: 'light', name: 'Light Theme' } },
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

## Practical Examples

- [Basic Tooltip](/en/examples/plugin/tooltip/#basic)
- [Click-triggered Tooltip](/en/examples/plugin/tooltip/#click)
- [Different tooltips for hover and click on the same element](/en/examples/plugin/tooltip/#dual)
- [Custom styled Tooltip](/en/examples/plugin/tooltip/#custom-style)
- [Asynchronous content loading Tooltip](/en/examples/plugin/tooltip/#async)

## API
