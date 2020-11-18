---
title: 渲染与更新
order: 1
---

### graph.render()

根据提供的数据渲染视图。

**用法**

```javascript
graph.render();
```

### graph.refresh()

当源数据中**现有**节点/边/ Combo 的数据项发生配置的变更时，根据新数据刷新视图。

注意：节点/边/ Combo 数据的增删需要使用 [graph.addItem](./Graph#additemtype-model) / [graph.removeItem](./Graph#removeitemitem) 或 [graph.changeData](./Graph#changedatadata)。

该方法无参数。

**用法**

```javascript
graph.refresh();
```

### graph.paint()

仅重新绘制画布。当设置了元素样式或状态后，通过调用 `paint()` 方法，让修改生效。

该方法无参数。

**用法**

```javascript
const item = e.item;
const graph = this.graph;

const autoPaint = graph.get('autoPaint');
graph.setAutoPaint(false);

graph.setItemState(item, 'selected', true);

graph.paint();
graph.setAutoPaint(autoPaint);
```

### graph.setAutoPaint(auto)

设置是否在更新/删除后自动重绘，一般搭配 `paint()` 方法使用。

**参数**

| 名称 | 类型    | 是否必选 | 描述         |
| ---- | ------- | -------- | ------------ |
| auto | Boolean | true     | 是否自动重绘 |

**用法**

```javascript
const item = e.item;
const graph = this.graph;

const autoPaint = graph.get('autoPaint');
graph.setAutoPaint(false);

graph.setItemState(item, 'selected', true);

graph.paint();
graph.setAutoPaint(autoPaint);
```
