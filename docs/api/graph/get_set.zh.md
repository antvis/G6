---
title: 获取/设置元素或属性
order: 10
---

### graph.getNodes()

获取图中所有节点的实例。

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️ 注意:</strong></span> 这里返回的是节点的实例，而不是节点的数据项。

**返回值**

- 返回值类型：Array；
- 返回值表示图中所有节点的实例。

**用法**

```javascript
const nodes = graph.getNodes();
```

### graph.getEdges()

获取图中所有边的实例。

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️ 注意:</strong></span> 这里返回的是边的实例，而不是边的数据项。

**返回值**

- 返回值类型：Array；
- 返回值表示图中所有边的实例。

**用法**

```javascript
const edges = graph.getEdges();
```

### graph.getCombos()

获取当前图中所有 combo 的实例。

**返回值**

- 返回值类型：Array；
- 返回值表示图中所有 combo 的实例。

**用法**

```javascript
const combos = graph.getCombos();
```

### graph.getComboChildren(combo)

获取指定 combo 中所有的子节点及子 combo。

**参数**

| 名称  | 类型            | 是否必选 | 描述                   |
| ----- | --------------- | -------- | ---------------------- |
| combo | string / ICombo | true     | Combo ID 或 combo 实例 |

**返回值**

- 返回值类型：Object，格式如下

```javascript
{
    nodes: INode[],
    edges: ICombo[]
}
```

- 返回指定 combo 中的子元素（子节点及子 combo）。

**用法**

```
const elements: {
  nodes: INode[],
  combos: ICombo[]
} = graph.getComboChildren('combo1')
```

### graph.getNeighbors(node, type)

**参数**

| 名称 | 类型 | 是否必选 | 描述 |
| --- | --- | --- | --- |
| node | string / INode | true | 节点 ID 或节点实例 |
| type | 'source' / 'target' / undefined | false | 邻居类型， 'source' 只获取当前节点的源节点，'target' 只获取当前节点指向的目标节点， 若不指定则返回所有类型的邻居 |

**返回值**

- 返回值类型：Array；
- 返回值符合要求的节点数组。

**用法**

```javascript
const neighbors = graph.getNeighbors('node1', 'source');
```

### graph.get(key)

根据 key 获取属性值。

**参数**

| 名称 | 类型   | 是否必选 | 描述     |
| ---- | ------ | -------- | -------- |
| key  | string | true     | 属性的键 |

**用法**

```javascript
// 获取 group
const group = graph.get('group');

// 获取 canvas 实例
const canvas = graph.get('canvas');

// 获取 autoPaint 值
const autoPaint = graph.get('autoPaint');
```

### graph.set(key, val)

设置属性值。

**参数**

| 名称 | 类型                    | 是否必选 | 描述     |
| ---- | ----------------------- | -------- | -------- |
| key  | string                  | true     | 属性的键 |
| val  | string / Object / Array | true     | 属性的值 |

**用法**

```javascript
// 设置 capture 值为 false
graph.set('capture', false);

// 设置 customGroup 值为 group
graph.set('customGroup', group);

// 设置 nodeIdList 值为数组
graph.set('nodeIdList', [1, 3, 5]);
```

### graph.getContainer()

获取 Graph 的 DOM 容器。

**参数**

无参数

**用法**

```javascript
graph.getContainer();
```

### graph.getGroup()

获取 Graph 根[图形分组](/zh/docs/manual/advanced/keyconcept/graphics-group)。

**参数**

无参数

**用法**

```javascript
graph.getGroup();
```

### graph.getMinZoom()

获取 graph 当前允许的最小缩放比例。

**参数**

无参数

**用法**

```javascript
graph.getMinZoom();
```

### graph.setMinZoom(ratio)

设置 graph 当前允许的最小缩放比例。

**参数**

| 名称  | 类型   | 是否必选 | 描述           |
| ----- | ------ | -------- | -------------- |
| ratio | number | true     | 最小缩放比例值 |

**用法**

```javascript
graph.setMinZoom(0.001);
```

### graph.getMaxZoom()

获取 graph 当前允许的最大缩放比例。

**参数**

无参数

**用法**

```javascript
graph.getMaxZoom();
```

### graph.setMaxZoom(ratio)

设置 graph 当前允许的最大缩放比例。

**参数**

| 名称  | 类型   | 是否必选 | 描述           |
| ----- | ------ | -------- | -------------- |
| ratio | number | true     | 最大缩放比例值 |

**用法**

```javascript
graph.setMaxZoom(1000);
```

### graph.getWidth()

获取 graph 当前的宽度。

**参数**

无参数

**用法**

```javascript
graph.getWidth();
```

### graph.getHeight()

获取 graph 当前的高度。

**参数**

无参数

**用法**

```javascript
graph.getHeight();
```

</div>
