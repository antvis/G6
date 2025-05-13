---
title: ZoomCanvas
---

## Overview

ZoomCanvas is a built-in behavior in G6 used to implement the canvas zooming feature, supporting zooming in and out of the canvas using the mouse wheel or keyboard shortcuts. This is one of the most commonly used interactions in graph visualization, helping users view both the overall structure and local details of the graph.

## Use Cases

This behavior is mainly used for:

- Browsing large-scale graph data, freely switching between the whole and details
- Focusing on specific areas for detailed analysis

## Online Experience

<embed src="@/common/api/behaviors/zoom-canvas.md"></embed>

## Basic Usage

Add this behavior in the graph configuration:

**1. Quick Configuration (Static)**

Declare directly using a string form. This method is simple but only supports default configuration and cannot be dynamically modified after configuration:

```javascript
const graph = new Graph({
  // Other configurations...
  behaviors: ['zoom-canvas'],
});
```

**2. Object Configuration (Recommended)**

Configure using an object form, supporting custom parameters, and can dynamically update the configuration at runtime:

```javascript
const graph = new Graph({
  // Other configurations...
  behaviors: [
    {
      type: 'zoom-canvas',
      key: 'zoom-canvas-1', // Specify an identifier for the behavior for dynamic updates
      sensitivity: 1.5, // Set sensitivity
    },
  ],
});
```

## Configuration Options

| Option         | Description                                                                                            | Type                                                                                | Default             | Required |
| -------------- | ------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------- | ------------------- | -------- |
| type           | Behavior type name                                                                                     | string                                                                              | `zoom-canvas`       | ✓        |
| animation      | Zoom animation effect settings                                                                         | [ViewportAnimationEffectTiming](/manual/graph/option#viewportanimationeffecttiming) | `{ duration: 200 }` |          |
| enable         | Whether to enable this behavior                                                                        | boolean \| ((event: Event) => boolean)                                              | true                |          |
| origin         | Zoom center point (viewport coordinates)                                                               | [Point](/api/viewport#point)                                                        | -                   |          |
| onFinish       | Callback function when zooming is finished                                                             | () => void                                                                          | -                   |          |
| preventDefault | Whether to prevent the browser's default event                                                         | boolean                                                                             | true                |          |
| sensitivity    | Zoom sensitivity, the larger the value, the faster the zoom                                            | number                                                                              | 1                   |          |
| trigger        | How to trigger zooming, supports mouse wheel and keyboard shortcuts, [configuration options](#trigger) | object                                                                              | -                   |          |

### Trigger

`trigger` has two usage methods, suitable for different scenarios:

#### Method 1: Modifier keys combined with the mouse wheel

If you want to trigger zooming only when certain keys are pressed while scrolling the mouse wheel, you can configure it like this:

```javascript
{
  trigger: ['Control']; // Hold down the Control key and scroll the mouse wheel to zoom
}
```

Common modifier keys include:

- `Control`
- `Shift`
- `Alt`

> Not sure what value corresponds to a keyboard key? Refer to [MDN Key Values](https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values).

#### Method 2: Pure keyboard shortcuts

If you want to control zooming entirely using the keyboard, you can set up key combinations:

```javascript
{
  trigger: {
    zoomIn: ['Control', '+'],  // Zoom in shortcut
    zoomOut: ['Control', '-'], // Zoom out shortcut
    reset: ['Control', '0']    // Reset zoom ratio shortcut
  }
}
```

## Code Examples

### Basic Zoom Functionality

```javascript
const graph = new Graph({
  container: 'container',
  width: 800,
  height: 600,
  behaviors: ['zoom-canvas'],
});
```

### Custom Zoom Center

```javascript
const graph = new Graph({
  // Other configurations...
  behaviors: [
    function () {
      return {
        type: 'zoom-canvas',
        origin: this.getCanvasCenter(), // Zoom with the viewport center as the origin
      };
    },
  ],
});
```

### Custom Zoom Sensitivity

```javascript
const graph = new Graph({
  // Other configurations...
  behaviors: [
    {
      type: 'zoom-canvas',
      sensitivity: 0.8, // Lower sensitivity for smoother zoom changes
    },
  ],
});
```

### Zoom with Shift + Mouse Wheel

```javascript
const graph = new Graph({
  // Other configurations...
  behaviors: [
    {
      type: 'zoom-canvas',
      trigger: ['Shift'], // Hold down the Shift key and scroll to zoom
    },
  ],
});
```

### Control Zoom with Keyboard Shortcuts

```javascript
const graph = new Graph({
  // Other configurations...
  behaviors: [
    {
      type: 'zoom-canvas',
      trigger: {
        zoomIn: ['Control', '='], // Ctrl + = to zoom in
        zoomOut: ['Control', '-'], // Ctrl + - to zoom out
        reset: ['Control', '0'], // Ctrl + 0 to reset
      },
    },
  ],
});
```

## FAQ

### 1. What if the canvas zoom exceeds the expected range?

To avoid excessive zooming in or out, you can set zoom limits:

```javascript
const graph = new Graph({
  // Other configurations...
  zoomRange: [0.5, 3], // Allow zooming out to 50% and zooming in to 300%
  behaviors: ['zoom-canvas'],
});
```

### 2. How to use it with other interactions?

Zooming and dragging are common combinations for a complete navigation experience:

```javascript
const graph = new Graph({
  // Other configurations...
  behaviors: ['drag-canvas', 'zoom-canvas'],
});
```

## Practical Example

<Playground path="behavior/canvas/demo/zoom.js" rid="default-zoom-canvas"></Playground>
