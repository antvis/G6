---
title: Set/Get Mode
---

### graph.setMode(mode)

Switch the interaction mode of graph. For example, switch from edit mode to read-only mode.

**Parameters**

| Name | Type   | Required | Description           |
| ---- | ------ | -------- | --------------------- |
| mode | string | true     | The name of the mode. |

**Usage**

```javascript
const graph = new G6.Graph({
    container: div,
    width: 500,
    height: 500,
    modes: {
      default: [...],
      custom: [...]
    }
})

graph.setMode('custom')
```

### graph.getCurrentMode()

Get the current mode.

**Return**

- Type of return value: string;
- The return value indicates the current mode.

**Usage**

```javascript
// The return value is the current interaction mode
const mode = graph.getCurrentMode();
```
