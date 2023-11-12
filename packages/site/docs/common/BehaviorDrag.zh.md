## delegateStyle

**类型**：

```ts
type delegateStyle = {
  fill?: string;
  stroke?: string;
  lineWidth?: number;
  lineDash?: number[];
  opacity?: number;
};
```

**默认值**：

```json
{
  "fill": "#F3F9FF",
  "fillOpacity": 0.5,
  "stroke": "#1890FF",
  "strokeOpacity": 0.9,
  "lineDash": [5, 5]
}
```

**是否必须**：false

**说明**：临时矩形的样式

<embed src="./BehaviorEventName.zh.md"></embed>

## enableTransient

**类型**：`boolean`

**默认值**：`true`

**是否必须**：false

**说明**：是否允将交互目标渲染到临时层(Transient Layer)

## enableDelegate

**类型**：`boolean`

**默认值**：`false`

**是否必须**：false

**说明**：创建一个临时矩形来作为交互目标

<img alt="enable delegate" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*ajOlSJlLPpAAAAAAAAAAAAAADmJ7AQ/original
" height='300'/>

## hideRelatedEdges

**类型**：`boolean`

**默认值**：`false`

**是否必须**：false

**说明**：是否隐藏与节点相关的边

## selectedState

**类型**：`string`

**默认值**：`selected`

**是否必须**：false

**说明**：拖拽时切换到该状态

<embed src="./Throttle.zh.md"></embed>

## updateComboStructure

**类型**：`boolean`

**默认值**：`true`

**是否必须**：false

**说明**：拖拽过程中，是否更新 Combo 结构

<embed src="./BehaviorShouldBegin.zh.md"></embed>
