---
title: 行为模式
order: 8
---

### graph.setMode(mode)

切换图行为模式。主要用于不同模式下的行为切换，如从编辑模式下切换到只读模式。

**参数**

| 名称 | 类型   | 是否必选 | 描述       |
| ---- | ------ | -------- | ---------- |
| mode | string | true     | 模式的名称 |

**用法**

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

获取当前的行为模式。

该方法无参数。

**返回值**

- 返回值类型：String；
- 返回值表示当前的行为模式。

**用法**

```javascript
// 返回值 mode 表示当前的行为模式
const mode = graph.getCurrentMode();
```
