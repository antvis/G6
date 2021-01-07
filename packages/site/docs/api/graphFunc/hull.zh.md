---
title: 聚类轮廓包裹
order: 11
---

## createHull(cfg: HullCfg)

**参数**

| 名称 | 类型    | 是否必选 | 描述       |
| ---- | ------- | -------- | ---------- |
| cfg  | HullCfg | true     | 轮廓配置项 |

轮廓包裹的形状支持 `round-convex` / `smooth-convex` / `bubble` 三种类型，默认为 `round-convex` 类型。`round-convex` 为圆角凸包轮廓，smooth-convex 为平滑曲线凸包轮廓，这两种凸包轮廓不可绕开配置项中的 nonMembers；bubble 为自由凹包轮廓，可以绕开 nonMembers。配置项（ HullCfg）支持的配置参数详情如下：

| 名称 | 类型 | 是否必选 | 描述 |
| --- | --- | --- | --- |
| id | string | true | 包裹的 id |
| type | `round-convex` / `smooth-convex` / `bubble` | false | 包裹的类型：`round-convex` 生成圆角凸包轮廓，`smooth-convex` 生成平滑凸包轮廓 / `bubble` 产生一种可以避开 nonMembers 的平滑凹包轮廓（[算法](http://vialab.science.uoit.ca/portfolio/bubblesets)）。 默认值是 `round-convex`。 |
| members | Item[] / string[] | true | 在包裹内部的节点实例或节点 Id 数组 |
| nonMembers | Item[] / string[] | false | 不在轮廓内部的节点数组，只在 `bubble` 类型的包裹中生效 |
| padding | number | false | 轮廓边缘和内部成员的间距 |
| style | object | false | 轮廓的样式属性，属性包括 fill (填充颜色), stroke (描边颜色), opacity (透明度) |

**用法**

```javascript
let centerNodes = graph.getNodes().filter((node) => !node.getModel().isLeaf);
graph.on('afterlayout', () => {
  const hull1 = graph.createHull({
    id: 'centerNode-hull',
    type: 'bubble',
    members: centerNodes,
    padding: 10,
  });

  const hull2 = graph.createHull({
    id: 'leafNode-hull1',
    members: ['node6', 'node7'],
    padding: 10,
    style: {
      fill: 'lightgreen',
      stroke: 'green',
    },
  });

  const hull3 = graph.createHull({
    id: 'leafNode-hull2',
    members: ['node8', 'node9', 'node10', 'node11', 'node12'],
    padding: 10,
    style: {
      fill: 'lightgreen',
      stroke: 'green',
    },
  });

  graph.on('afterupdateitem', (e) => {
    hull1.updateData(hull1.members);
    hull2.updateData(hull2.members);
    hull3.updateData(hull3.members);
  });
});
```

## getHulls()

获取图上所有的包裹轮廓。

**返回值**

- 返回值类型：Object；对象中的 key 是字符串类型，代表 hull 的 ID ，对象中的 value 是对应的 hull 实例。
- 返回值表示当前 graph 中所有轮廓 ID 到 轮廓实例的映射。

**用法**

```javascript
const hullMap = graph.getHulls();
```

## removeHull(hull: string ｜ Hull)

移除指定 id 或指定实例的轮廓。

**参数**

| 名称 | 类型          | 是否必选 | 描述               |
| ---- | ------------- | -------- | ------------------ |
| hull | string / Hull | true     | 轮廓 id 或轮廓实例 |

**用法**

```javascript
graph.removeHull('myHull');
```

## removeHulls()

移除当前图上所有轮廓实例。

**参数**

无参数。

**用法**

```javascript
graph.removeHulls();
```
