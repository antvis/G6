---
title: 添加/移除交互行为
order: 10
---

### graph.addBehaviors(behaviors, modes)

新增行为，将单个或多个行为添加到单个或多个模式中。

**参数**

| 名称      | 类型           | 是否必选 | 描述             |
| --------- | -------------- | -------- | ---------------- |
| behaviors | string / Array | true     | 添加的行为的名称 |
| modes     | string / Array | true     | 模式的名称       |

**用法**

```javascript
// 将单个 Behavior 添加到单个模式（默认的 default 模式）中
graph.addBehaviors('click-select', 'default');

// 将多个 Behavior 添加到单个模式（默认的 default 模式）中
graph.addBehaviors(['brush-select', 'click-select'], 'default');

// 将单个 Behavior 添加到多个模式中
graph.addBehaviors('brush-select', ['default', 'select']);

// 将多个 Behavior 添加到多个模式中
graph.addBehaviors(['brush-select', 'click-select'], ['default', 'select']);
```

### graph.removeBehaviors(behaviors, modes)

移除行为，将单个或多个行为从单个或多个模式中去除。

**参数**

| 名称      | 类型           | 是否必选 | 描述             |
| --------- | -------------- | -------- | ---------------- |
| behaviors | string / Array | true     | 删除的行为的名称 |
| modes     | string / Array | true     | 模式的名称       |

**用法**

```javascript
// 从单个模式中移除单个 Behavior
graph.removeBehaviors('click-select', 'default');

// 从单个模式中移除多个 Behavior
graph.removeBehaviors(['brush-select', 'click-select'], 'default');

// 从多个模式中移除单个 Behavior
graph.removeBehaviors('brush-select', ['default', 'select']);

// 从多个模式中移除多个 Behavior
graph.removeBehaviors(['brush-select', 'click-select'], ['default', 'select']);
```
