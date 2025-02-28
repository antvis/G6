---
title: Fisheye 鱼眼放大镜
---

> 如需深入了解插件的使用，请参阅 [API 文档 - 图配置项 - plugins](/api/graph/option#plugins) 章节。此章节将介绍完整的配置参数、类型定义以及应用示例。

Fisheye 鱼眼放大镜是为 focus+context 的探索场景设计的，它能够保证在放大关注区域的同时，保证上下文以及上下文与关注中心的关系不丢失。

**参考示例**：

- [鱼眼放大镜](/examples/plugin/fisheye/#basic)
- [自定义鱼眼放大镜](/examples/plugin/fisheye/#custom)

## 配置项

### <Badge type="success">Required</Badge> type

> _`fisheye` \| string_

此插件已内置，你可以通过 `type: 'fisheye'` 来使用它。

### d

> _number_ **Default:** `1.5`

畸变因子

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*4ITFR7GOl8UAAAAAAAAAAAAADmJ7AQ/original" width="200" />

### maxD

> _number_ **Default:** `5`

鱼眼放大镜可调整的最大畸变因子，配合 `scaleDBy` 使用

### maxR

> _number_ **Default:** `画布宽高的最小值的一半`

鱼眼放大镜可调整的最大半径，配合 `scaleRBy` 使用

### minD

> _number_ **Default:** `0`

鱼眼放大镜可调整的最小畸变因子，配合 `scaleDBy` 使用

### minR

> _number_ **Default:** `0`

鱼眼放大镜可调整的最小半径，配合 `scaleRBy` 使用

### nodeStyle

> _NodeStyle_ _\| ((datum:_ [NodeData](/api/graph/option#nodedata)_) =>_ _NodeStyle\_\_)_

在鱼眼放大镜中的节点样式

### preventDefault

> _boolean_ **Default:** `true`

是否阻止默认事件

### r

> _number_ **Default:** `120`

鱼眼放大镜半径

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*unAvQqAb_NMAAAAAAAAAAAAADmJ7AQ/original" width="200" />

### scaleDBy

> _'wheel' \| 'drag'_

调整鱼眼放大镜畸变因子的方式

- `'wheel'`：滚轮调整
- `'drag'`：拖拽调整

### scaleRBy

> _'wheel' \| 'drag'_

调整鱼眼放大镜范围半径的方式

- `'wheel'`：滚轮调整
- `'drag'`：拖拽调整

如果 `trigger`、`scaleRBy` 和 `scaleDBy` 同时设置为 `'drag'`，优先级顺序为 `trigger` > `scaleRBy` > `scaleDBy`，只会为优先级最高的配置项绑定拖拽事件。同理，如果 `scaleRBy` 和 `scaleDBy` 同时设置为 `'wheel'`，只会为 `scaleRBy` 绑定滚轮事件

### showDPercent

> _boolean_ **Default:** `true`

是否在鱼眼放大镜中显示畸变因子数值

### style

> _[CircleStyleProps](https://g.antv.antgroup.com/api/basic/circle)_

鱼眼放大镜样式

### trigger

> _'pointermove' \| 'drag' \| 'click'_ **Default:** ``

移动鱼眼放大镜的方式

- `'pointermove'`：始终跟随鼠标移动
- `'click'`：鼠标点击时移动
- `'drag'`：拖拽移动

## API

### Fisheye.destroy()

```typescript
destroy(): void;
```

### Fisheye.update(options)

```typescript
update(options: Partial<FisheyeOptions>): void;
```

| 参数    | 类型                               | 描述   | 默认值 | 必选 |
| ------- | ---------------------------------- | ------ | ------ | ---- |
| options | Partial<[FisheyeOptions](#配置项)> | 配置项 | -      | ✓    |
