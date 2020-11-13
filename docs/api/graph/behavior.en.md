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
