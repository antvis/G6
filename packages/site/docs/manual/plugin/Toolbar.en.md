---
title: Toolbar
order: 15
---

## Overview

The Toolbar is a plugin in G6 used to provide a collection of operation buttons, supporting common chart operations such as zoom in, zoom out, auto-fit, and reset. Through the toolbar, users can quickly access common functions of the chart, improving operational efficiency and user experience.

## Use Cases

This plugin is mainly used for:

- Quickly accessing common functions of the chart

## Basic Usage

Below is a simple example of initializing the Toolbar plugin:

```js
const graph = new Graph({
  // Other configurations...
  plugins: [
    {
      type: 'toolbar',
      getItems: () => [
        { id: 'zoom-in', value: 'zoom-in' },
        { id: 'zoom-out', value: 'zoom-out' },
        { id: 'auto-fit', value: 'auto-fit' },
      ],
      onClick: (value) => {
        // Handle button click events
        if (value === 'zoom-in') {
          graph.zoomTo(1.1);
        } else if (value === 'zoom-out') {
          graph.zoomTo(0.9);
        } else if (value === 'auto-fit') {
          graph.fitView();
        }
      },
    },
  ],
});
```

## Configuration Options

| Property  | Description                                                                  | Type                                                                                        | Default Value | Required |
| --------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ------------- | -------- |
| type      | Plugin type                                                                  | string                                                                                      | `toolbar`     | ✓        |
| key       | Unique identifier for the plugin, used for updates                           | string                                                                                      | -             |          |
| className | Additional CSS class name for the toolbar DOM element                        | string                                                                                      | -             |          |
| position  | Toolbar position relative to the canvas, [optional values](#position)        | string                                                                                      | `'top-left'`  |          |
| style     | Custom style for the toolbar DOM element, [common values](#style-attributes) | [CSSStyleDeclaration](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration) | -             |          |
| getItems  | Returns the list of toolbar items                                            | () => [ToolbarItem](#toolbaritem)[] \| Promise<[ToolbarItem](#toolbaritem)[]>               | -             | ✓        |
| onClick   | Callback function after a toolbar item is clicked                            | (value: string, target: Element) => void                                                    | -             |          |

### position

The `position` parameter supports the following values:

- `'top-left'`: Top left corner
- `'top-right'`: Top right corner
- `'bottom-left'`: Bottom left corner
- `'bottom-right'`: Bottom right corner
- `'left-top'`: Left side, top
- `'left-bottom'`: Left side, bottom
- `'right-top'`: Right side, top
- `'right-bottom'`: Right side, bottom

### style Attributes

| Attribute       | Description      | Type   | Default Value       |
| --------------- | ---------------- | ------ | ------------------- |
| backgroundColor | Background color | string | `#fff`              |
| border          | Border           | string | `1px solid #e8e8e8` |
| borderRadius    | Border radius    | string | `4px`               |
| height          | Height           | string | `auto`              |
| margin          | Margin           | string | `12px`              |
| opacity         | Opacity          | number | 0.9                 |
| padding         | Padding          | string | `8px`               |
| width           | Width            | string | `auto`              |

### ToolbarItem

Each toolbar item (ToolbarItem) includes the following attributes:

| Attribute | Description                                                | Type     | Required |
| --------- | ---------------------------------------------------------- | -------- | -------- |
| id        | Icon ID of the item, see [Built-in Icons](#built-in-icons) | `string` | ✓        |
| value     | Value returned when the item is clicked                    | `string` | ✓        |

### Built-in Icons

The Toolbar provides the following built-in icon IDs:

- `'zoom-in'`: Zoom in
- `'zoom-out'`: Zoom out
- `'redo'`: Redo
- `'undo'`: Undo
- `'edit'`: Edit
- `'delete'`: Delete
- `'auto-fit'`: Auto-fit view
- `'export'`: Export chart
- `'reset'`: Reset view
- `'request-fullscreen'`: Request fullscreen
- `'exit-fullscreen'`: Exit fullscreen

### Custom Icons

In addition to using built-in icons, you can also use custom icons by introducing third-party icon libraries (such as Alibaba iconfont):

```js
// Introduce iconfont script
const iconFont = document.createElement('script');
iconFont.src = '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js'; // Replace with your iconfont script URL
document.head.appendChild(iconFont);

// Use custom icons in the toolbar
const graph = new Graph({
  // Other configurations...
  plugins: [
    {
      type: 'toolbar',
      getItems: () => [
        { id: 'icon-xinjian', value: 'new' }, // Use icons from iconfont
        { id: 'icon-fenxiang', value: 'share' },
        { id: 'icon-chexiao', value: 'undo' },
      ],
      onClick: (value) => {
        // Handle click events
      },
    },
  ],
});
```

> Note: Custom icon IDs usually start with `icon-` and need to correspond to the icon names in the introduced iconfont.

## Code Examples

### Basic Toolbar

```js
const graph = new Graph({
  // Other configurations...
  plugins: [
    {
      type: 'toolbar',
      position: 'top-right',
      getItems: () => [
        { id: 'zoom-in', value: 'zoom-in' },
        { id: 'zoom-out', value: 'zoom-out' },
        { id: 'undo', value: 'undo' },
        { id: 'redo', value: 'redo' },
        { id: 'auto-fit', value: 'fit' },
      ],
      onClick: (value) => {
        // redo, undo need to be used with the history plugin
        const history = graph.getPluginInstance('history');
        switch (value) {
          case 'zoom-in':
            graph.zoomTo(1.1);
            break;
          case 'zoom-out':
            graph.zoomTo(0.9);
            break;
          case 'undo':
            history?.undo();
            break;
          case 'redo':
            history?.redo();
            break;
          case 'fit':
            graph.fitView();
            break;
          default:
            break;
        }
      },
    },
  ],
});
```

### Custom Styles

```js
const graph = new Graph({
  // Other configurations...
  plugins: [
    {
      type: 'toolbar',
      className: 'my-custom-toolbar',
      style: {
        backgroundColor: '#f5f5f5',
        padding: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
        borderRadius: '8px',
        border: '1px solid #e8e8e8',
        opacity: '0.9',
        marginTop: '12px',
        marginLeft: '12px',
      },
      getItems: () => [
        { id: 'zoom-in', value: 'zoom-in' },
        { id: 'zoom-out', value: 'zoom-out' },
      ],
      onClick: (value) => {
        // Handle click events
      },
    },
  ],
});
```

> Common style attributes include:
>
> - `backgroundColor`: Background color
> - `padding`: Padding
> - `margin`/`marginTop`/`marginLeft`, etc.: Margin
> - `border`: Border
> - `borderRadius`: Border radius
> - `boxShadow`: Shadow effect
> - `opacity`: Opacity
> - `width`/`height`: Width and height (default is content adaptive)
> - `zIndex`: Layer (default is 100)
> - `display`: Display mode (default is flex)

The toolbar container is set to `display: flex` by default, and child items use row layout by default (or change according to the direction configured by position). You can customize its appearance and position through `style`.

### Asynchronous Loading of Toolbar Items

```js
const graph = new Graph({
  // Other configurations...
  plugins: [
    {
      type: 'toolbar',
      getItems: async () => {
        // Toolbar configuration can be obtained from the server or other asynchronous sources
        const response = await fetch('/api/toolbar-config');
        const items = await response.json();
        return items;
      },
      onClick: (value) => {
        // Handle click events
      },
    },
  ],
});
```

## Common Issues

### 1. Toolbar icons not displaying?

- Check if the correct built-in icon ID is used
- Ensure CSS styles are not overridden or conflicting

### 2. How to use with other plugins?

The toolbar is often used in conjunction with other plugins (such as history):

```js
const graph = new Graph({
  plugins: [
    {
      type: 'history',
      key: 'history',
    },
    {
      type: 'toolbar',
      getItems: () => [
        { id: 'undo', value: 'undo' },
        { id: 'redo', value: 'redo' },
      ],
      onClick: (value) => {
        const history = graph.getPluginInstance('history');
        if (value === 'undo') {
          history.undo();
        } else if (value === 'redo') {
          history.redo();
        }
      },
    },
  ],
});
```

### 3. How to dynamically update the toolbar?

You can use the `updatePlugin` method to dynamically update the toolbar:

```js
const graph = new Graph({
  // Other configurations...
  plugins: [
    {
      type: 'toolbar',
      key: 'my-toolbar',
    },
  ],
});

// Update toolbar position
graph.updatePlugin({
  key: 'my-toolbar',
  position: 'bottom-right',
});
```

## Real Cases

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const data = {
  nodes: [{ id: 'node-0' }, { id: 'node-1' }, { id: 'node-2' }, { id: 'node-3' }, { id: 'node-4' }, { id: 'node-5' }],
  edges: [
    { source: 'node-0', target: 'node-1' },
    { source: 'node-0', target: 'node-2' },
    { source: 'node-0', target: 'node-3' },
    { source: 'node-0', target: 'node-4' },
    { source: 'node-1', target: 'node-0' },
    { source: 'node-2', target: 'node-0' },
    { source: 'node-3', target: 'node-0' },
    { source: 'node-4', target: 'node-0' },
    { source: 'node-5', target: 'node-0' },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  layout: {
    type: 'grid',
  },
  behaviors: ['zoom-canvas', 'drag-canvas', 'drag-element'],
  plugins: [
    {
      type: 'toolbar',
      position: 'top-left',
      onClick: (item) => {
        alert('item clicked:' + item);
      },
      getItems: () => {
        // G6 内置了 9 个 icon，分别是 zoom-in、zoom-out、redo、undo、edit、delete、auto-fit、export、reset
        return [
          { id: 'zoom-in', value: 'zoom-in' },
          { id: 'zoom-out', value: 'zoom-out' },
          { id: 'redo', value: 'redo' },
          { id: 'undo', value: 'undo' },
          { id: 'edit', value: 'edit' },
          { id: 'delete', value: 'delete' },
          { id: 'auto-fit', value: 'auto-fit' },
          { id: 'export', value: 'export' },
          { id: 'reset', value: 'reset' },
        ];
      },
    },
  ],
});

graph.render();
```
