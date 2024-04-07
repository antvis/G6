---
title: 导览及使用
order: 0
---

## 树图布局总览

与 [Graph 的布局](/zh/docs/api/graph-layout/guide) 类似，G6 为树图 TreeGraph 提供了一些内置布局算法。可以在[实例化图时配置](#使用方法)。与 [Graph 的布局](/zh/docs/api/graph-layout/guide) 不同的是：

- 实例化树图时必须通过配置 `layout` 配置布局，而 Graph 不配置 `layout` 时将会使用数据中的位置信息或随机布局；
- 树图布局不支持独立使用；
- 树图布局不支持自定义。

注意，Graph 布局与 TreeGaph 布局相互不通用。

G6 的内置树图布局有：

- [CompactBox 紧凑树布局](/zh/docs/api/treegraphlayout/compact-box)
- [Dendrogram 生态树布局](/zh/docs/api/treegraphlayout/dendrogram)
- [Indented 缩进树布局](/zh/docs/api/treegraphlayout/indented)
- [Mindmap 脑图树布局](/zh/docs/api/treegraphlayout/mindmap)

## 使用方法

```javascript
const graph = new G6.TreeGraph({
  // ...                      // 其他配置项
  layout: {                // Object，对于 TreeGraph 为必须字段
    type: 'dendrogram',
    ...                    // 布局的其他配置
  }
});
```

每种布局方法的配置项不尽相同，具体参见本目录下每种布局的 API。

## 通用配置项

| 名称 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| type | String | dendrogram | 布局类型，支持 dendrogram、compactBox、mindmap 和 indented。 |
| excludeInvisibles | Boolean | false | *v4.8.8 起支持。* 布局计算是否排除掉隐藏的节点，若配置为 true，则隐藏节点不参与布局计算。 |
| direction | String | LR | 布局方向，有  `LR` , `RL` , `TB` , `BT` , `H` , `V`  可选。<br />L：左；R：右；T：上；B：下；H：垂直；V：水平。 |
| getChildren | Function |  | 返回当前节点的所有子节点 |

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️ 注意:</strong></span> 当 `type='indented'` 时，`direction` 只能取 `'LR'`、`'RL'` 和 `'H'` 这三个值。
