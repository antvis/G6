---
title: Tooltip
---

## Overview

The Tooltip is used to display additional information when the user hovers over elements in the graph. Tooltips can help users better understand the data in the graph and enhance the interactive experience.

## Use Cases

- When users need to know detailed information about an element, they can use the Tooltip to display this information.
- In data visualization, Tooltips can be used to display detailed information about data points in a chart, helping users better understand the data.

## Basic Usage

Below is a simple example of initializing the Tooltip plugin:

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

| Property     | Description                            | Type                                                                                                                                       | Default Value                         | Required |
| ------------ | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------- | -------- |
| type         | Plugin type                            | string                                                                                                                                     | `tooltip`                             | ✓        |
| key          | Identifier                             | string                                                                                                                                     | -                                     |          |
| position     | Tooltip position                       | `top` \| `bottom` \| `left` \| `right` \| `top-left` \| `top-right` \| `bottom-left` \| `bottom-right`                                     | `top-right`                           |          |
| enable       | Whether the plugin is enabled          | boolean \| ((event: [IElementEvent](/api/event#event-object-properties), items: NodeData \| EdgeData \| ComboData[]) => boolean)           | true                                  |          |
| getContent   | Custom content                         | (event: [IElementEvent](/api/event#event-object-properties), items: NodeData \| EdgeData \| ComboData[]) => Promise<HTMLElement \| string> | -                                     |          |
| onOpenChange | Callback for show/hide                 | (open: boolean) => void                                                                                                                    | -                                     |          |
| trigger      | Trigger behavior                       | `hover` \| `click`                                                                                                                         | `hover`                               |
| container    | Custom rendering container for tooltip | string \| HTMLElement                                                                                                                      | -                                     |          |
| offset       | Offset distance                        | [number,number]                                                                                                                            | [10,10]                               |          |
| enterable    | Whether the pointer can enter          | boolean                                                                                                                                    | false                                 |          |
| title        | Title                                  | string                                                                                                                                     | -                                     |
| style        | Style object                           | Record<string,any>                                                                                                                         | {'.tooltip': { visibility: 'hidden'}} |          |

### enable

- Whether to enable, supports passing a function to dynamically adjust the plugin logic

Only nodes use the tooltip plugin

```js
const graph = new Graph({
  // Other configurations...
  plugins: [
    {
      type: 'tooltip',
      enable:(e) => e.targetType === 'node';
    },
  ],
});
```

### getContent

- Custom render Tooltip content, supports returning HTMLElement or string

Dynamically render custom HTML content

```js
const graph = new Graph({
  // Other configurations...
  plugins: [
    {
      type: 'tooltip',
      trigger: 'click',
      getContent: (e, items) => {
        let result = `<h4>Custom Content</h4>`;
        items.forEach((item) => {
          result += `<p>Type: ${item.data.description}</p>`;
        });
        return result;
      },
    },
  ],
});
```

### onOpenChange

- Callback for show/hide

Trigger tooltip display, can add custom buried point statistics reporting content

```js
const graph = new Graph({
  // Other configurations...
  plugins: [
    {
      key: 'tooltip-click',
      type: 'tooltip',
      trigger: 'click',
      onOpenChange: (open) => {
        console.log('Tooltip open change');
      },
    },
  ],
});
```

### trigger

Trigger behavior

- `'hover'`: Triggered when the mouse enters the element
- `'click'`: Triggered when the mouse clicks the element

Click the element to trigger the tooltip

```js
const graph = new Graph({
  // Other configurations...
  plugins: [
    {
      key: 'tooltip-click',
      type: 'tooltip',
      trigger: 'click',
    },
  ],
});
```

### position

Display position supports the following values

- `top`: Top
- `bottom`: Bottom
- `left`: Left
- `right`: Right
- `top-left` : Top left
- `top-right` : Top right
- `bottom-left` : Bottom left
- `bottom-right` : Bottom right

Display at the bottom

```js
const graph = new Graph({
  // Other configurations...
  plugins: [
    {
      key: 'tooltip-click',
      type: 'tooltip',
      position: 'bottom',
    },
  ],
});
```

### offset

Offset of the display position, based on the point where the mouse enters the element

```js
const graph = new Graph({
  // Other configurations...
  plugins: [
    {
      key: 'tooltip-click',
      type: 'tooltip',
      position: 'bottom',
    },
  ],
});
```

### enterable

Whether the mouse pointer can enter the tooltip

The mouse can enter the tooltip

```js
const graph = new Graph({
  // Other configurations...
  plugins: [
    {
      key: 'tooltip-click',
      type: 'tooltip',
      enterable: true,
    },
  ],
});
```

### style

Style object

Black element background color

```js
const graph = new Graph({
  // Other configurations...
  plugins: [
    {
      key: 'tooltip-click',
      type: 'tooltip',
      style: {
        ['.tooltip']: {
          backgroundColor: 'black',
        },
      },
    },
  ],
});
```

## Real Cases

<embed src="@/common/api/plugins/tooltip.md"></embed>

**Reference Examples**:

- [Tooltip](/examples/plugin/tooltip/#basic)
- [Click to Trigger Tooltip](/examples/plugin/tooltip/#click)
- [Show Different Tooltips When Hovering and Clicking the Same Element](/examples/plugin/tooltip/#dual)

## API
