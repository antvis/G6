---
title: 放缩、平移、变换画布
order: 10
---

### graph.getZoom()

获取当前视口的缩放比例。

该方法无参数。

**返回值**

- 返回值类型：Number；
- 返回值表示当前视口的缩放比例， 默认值为 `1`。

**用法**

```javascript
// 返回值zoom表示当前视口的缩放比例
const zoom = graph.getZoom();
```

### graph.zoom(ratio, center)

改变视口的缩放比例，在当前画布比例下缩放，是相对比例。

**参数**

| 名称 | 类型 | 是否必选 | 描述 |
| --- | --- | --- | --- |
| ratio | Number | true | 缩放比例 |
| center | Object | false | 以 `center` 的 `x`、`y` 坐标为中心缩放，如果省略了 `center` 参数，则以元素当前位置为中心缩放 |

**用法**

```javascript
// 以 (100, 100) 为中心点，放大3倍
graph.zoom(3, { x: 100, y: 100 });

// 以当前元素位置为中心，缩小到 0.5
graph.zoom(0.5);
```

### graph.zoomTo(toRatio, center)

缩放视窗窗口到一个固定比例。

**参数**

| 名称 | 类型 | 是否必选 | 描述 |
| --- | --- | --- | --- |
| toRatio | Number | true | 固定比例值 |
| center | Object | false | 以 `center` 的 `x`、`y` 坐标为中心缩放，如果省略了 `center` 参数，则以元素当前位置为中心缩放 |

**用法**

```javascript
// 以 (100, 100) 为中心点，放大3倍
graph.zoomTo(3, { x: 100, y: 100 });

// 以当前元素位置为中心，缩小到 0.5
graph.zoomTo(0.5);
```

### graph.changeSize(width, height)

改变画布大小。

**参数**

| 名称   | 类型   | 是否必选 | 描述     |
| ------ | ------ | -------- | -------- |
| width  | Number | true     | 画布宽度 |
| height | Number | true     | 画布高度 |

**用法**

```javascript
graph.changeSize(600, 350);
```

### graph.translate(dx, dy)

采用**相对位移**来平移画布。

**参数**

| 名称 | 类型   | 是否必选 | 描述         |
| ---- | ------ | -------- | ------------ |
| dx   | Number | true     | 水平方向位移 |
| dy   | Number | true     | 垂直方向位移 |

**用法**

```javascript
graph.translate(100, 100);
```

### graph.moveTo(x, y)

采用**绝对位移**将画布移动到指定坐标。

**参数**

| 名称 | 类型   | 是否必选 | 描述         |
| ---- | ------ | -------- | ------------ |
| x    | Number | true     | 水平方向坐标 |
| y    | Number | true     | 垂直方向坐标 |

**用法**

```javascript
graph.moveTo(200, 300);
```

### graph.fitView(padding)

让画布内容适应视口。

**参数**

| 名称    | 类型           | 是否必选 | 描述                                          |
| ------- | -------------- | -------- | --------------------------------------------- |
| padding | Number / Array | false    | [top, right, bottom, left] 四个方向上的间距值 |

**用法**

```javascript
// padding 只设置为一个值，则表示 top = right = bottom = left = 20
graph.fitView(20);

// 等价于 graph.fitView(20)
graph.fitView([20]);

// padding 设置为数组，只传 2 个值，则 top = bottom = 20, right = left = 10
graph.fitView([20, 10]);

// padding 设置为数组，四个方向值都指定
graph.fitView([20, 10, 20, 15]);
```

### graph.fitCenter()

*v3.5.1 后支持。*平移图到中心将对齐到画布中心，但不缩放。优先级低于 fitView。

**用法**

```javascript
// 在渲染和动画完成后调用
graph.fitCenter();
```

### graph.focusItem(item, animate, animateCfg)

移动图，使得 item 对齐到视口中心，该方法可用于做搜索后的缓动动画。

**参数**

| 名称 | 类型 | 是否必选 | 描述 |
| --- | --- | --- | --- |
| item | string / Object | true | 元素 ID 或元素实例 |
| animate | boolean | false | 是否带有动画。若未配置，则跟随 graph 的 `animate` 参数 |
| animateCfg | Object | false | 若带有动画，可配置动画，参见[基础动画教程](/zh/docs/manual/advanced/animation#animatecfg)。若未配置，则跟随 graph 的 `animateCfg` 参数 |

**用法**

```javascript
graph.focusItem(item);

// 动画地移动
graph.focusItem(item, true);

// 动画地移动，并配置动画
graph.focusItem(item, true, {
  easing: 'easeCubic',
  duration: 400,
});
```
