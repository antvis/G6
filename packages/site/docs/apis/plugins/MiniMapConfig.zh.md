---
title: MiniMap 缩略图
order: 6
---

当画布的内容过多时，可以通过缩略图来查看整体画布的内容，并且可以通过缩略图来移动画布

<img alt="minimap" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*XojSQY_-5iIAAAAAAAAAAAAADmJ7AQ/original" height='400'/>

## 配置项

<embed src="../../common/IPluginBaseConfig.zh.md"></embed>

### delegateStyle

**类型**：`StyleConfig`

**默认值**：

```json
{
  "fill": "#40a9ff",
  "stroke": "#096dd9"
}
```

**是否必须**：false

**说明**：mode 为 `'delegate'` 时，缩略图中节点的样式

### hideEdge

**类型**：`boolean`

**默认值**：`false`

**是否必须**：false

**说明**：是否隐藏缩略图中的边以提高性能

### mode

**类型**：`'default'` | `'keyShape'` | `'delegate'`

**默认值**：`'default'`

**是否必须**：false

**说明**：缩略图的模式

- `'default'`：默认模式，缩略图会显示画布的所有内容
- `'keyShape'`：只显示画布中所有节点的 keyShape
- `'delegate'`：只显示画布中所有节点的 delegate

### padding

**类型**：`number`

**默认值**：`10`

**是否必须**：false

**说明**：缩略图的内边距

### refresh

**类型**：`boolean`

**默认值**：`true`

**是否必须**：false

**说明**：是否在画布更新时刷新缩略图

### size

**类型**：`[number, number]`

**默认值**：`[200, 120]`

**是否必须**：false

**说明**：缩略图的大小

## API

<embed src="../../common/PluginAPIDestroy.zh.md"></embed>
