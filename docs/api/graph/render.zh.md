---
title: 渲染与画布更新
order: 10
---

### graph.render()

根据提供的数据渲染视图。

**用法**

```javascript
graph.render();
```

### graph.renderCustomGroup(data, groupType)

根据提供的数据渲染组群。

**参数**

| 名称      | 类型   | 是否必选 | 描述                                  |
| --------- | ------ | -------- | ------------------------------------- |
| data      | Object | true     | 渲染图的数据                          |
| groupType | string | true     | group 类型，支持 `'circle'`、`'rect'` |

**用法**

```javascript
const data = {
  nodes: [
    {
      id: 'node1',
      groupId: 'group1',
      label: 'node1',
    },
    {
      id: 'node2',
      groupId: 'group1',
      label: 'node2',
    },
  ],
  edges: [
    {
      source: 'node1',
      target: 'node2',
    },
  ],
  groups: [
    {
      id: 'group1',
      title: {
        text: 'Group 1',
        stroke: '#444',
        offsetX: -20,
        offsetY: 30,
      },
    },
  ],
};

// graph 是 Graph 的实例
graph.renderCustomGroup(data, 'circle');
```

### graph.refresh()

当源数据中**现有**节点/边/ Combo 的数据项发生配置的变更时，根据新数据刷新视图。

注意：节点/边/ Combo 数据的增删需要使用 [graph.addItem](./Graph#additemtype-model) / [graph.removeItem](./Graph#removeitemitem) 或 [graph.changeData](./Graph#changedatadata)。

该方法无参数。

**用法**

```javascript
graph.refresh();
```

### graph.refreshItem(item)

刷新指定元素。

**参数**

| 名称 | 类型            | 是否必选 | 描述               |
| ---- | --------------- | -------- | ------------------ |
| item | string / Object | true     | 元素 ID 或元素实例 |

**用法**

```javascript
// 通过 ID 查询节点实例
const item = graph.findById('node');
graph.refreshItem(item);
```

### graph.refreshPositions()

当节点位置发生变化时，刷新所有节点位置，并重计算边的位置。

该方法无参数。

**用法**

```javascript
graph.refreshPositions();
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
