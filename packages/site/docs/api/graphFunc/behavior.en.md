---
title: Add/Remove Behaviors
order: 10
---

### graph.addBehaviors(behaviors, modes)

Add interaction behaviors to a mode or multiple modes.

**Parameters**

| Name      | Type           | Required | Description                             |
| --------- | -------------- | -------- | --------------------------------------- |
| behaviors | string / Array | true     | The name(s) of behavior(s) to be added. |
| modes     | string / Array | true     | The name(s) of mode(s)                  |

**Usage**

```javascript
// Add single behavior 'click-select' to a single mode 'default'
graph.addBehaviors('click-select', 'default');

// Add multiple behaviors to single mode 'default'
graph.addBehaviors(['brush-select', 'click-select'], 'default');

// Add single behavior 'brush-select' to multiple modes
graph.addBehaviors('brush-select', ['default', 'select']);

// Add multiple behaviors to multiple modes
graph.addBehaviors(['brush-select', 'click-select'], ['default', 'select']);
```

### graph.removeBehaviors(behaviors, modes)

Remove behavior(s) from mode(s).

**Parameters**

| Name      | Type           | Required | Description                               |
| --------- | -------------- | -------- | ----------------------------------------- |
| behaviors | string / Array | true     | The name(s) of behavior(s) to be removed. |
| modes     | string / Array | true     | The name(s) of mode(s).                   |

**Usage**

```javascript
// remove single behavior 'click-select' from single mode 'default'
graph.removeBehaviors('click-select', 'default');

// remove multiple behaviors from single mode 'default'
graph.removeBehaviors(['brush-select', 'click-select'], 'default');

// remove single behavior 'brush-select' from multiple modes
graph.removeBehaviors('brush-select', ['default', 'select']);

// remove multiple behaviors from multiple modes
graph.removeBehaviors(['brush-select', 'click-select'], ['default', 'select']);
```

### graph.updateBehavior(behavior, mode)

Update the configurations for a behavior from mode.

**Parameters**

| Name      | Type           | Required | Description                               |
| --------- | -------------- | -------- | ----------------------------------------- |
| behavior | string | true     | The type name of the behavior need to be updated |
| newCfg   | object | true     | The new configurations                   |
| mode     | string | false    | The mode name of the mode where the behavior need to be updated. 'default' by default     |

**Usage**

```javascript
const graph = new Graph({
  ... // Other graph configurations
  modes: {
    default: ['zoom-canvas', 'drag-canvas'],
    select: ['click-select']
  }
});

graph.data(data);
graph.render();

// update the behavior 'zoom-canvas' from mode 'default'
graph.updateBehavior('zoom-canvas', { sensitivity: 1.5, enableOptimize: true}, 'default');

// update the behavior 'click-select' from mode 'select'
graph.updateBehavior('click-select', { trigger: 'ctrl' }, 'select');
```

