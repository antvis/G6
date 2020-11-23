---
title: 获取/设置
order: 2
---

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

获取 Graph 根[图形分组](/zh/docs/manual/middle/elements/shape/graphics-group)。

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
