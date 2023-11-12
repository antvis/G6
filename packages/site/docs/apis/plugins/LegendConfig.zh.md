---
title: Legend 图例
order: 3
---

<img alt="legend" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*5rwLT4o1Rd4AAAAAAAAAAAAADmJ7AQ/original" height='400'/>

## 配置项

<embed src="../../common/IPluginBaseConfig.zh.md"></embed>

### activeState

**类型**：`string`

**默认值**：`'active'`

**是否必须**：false

**说明**：图例激活后切换到该状态

### edge

**类型**：`ItemLegendConfig`

**默认值**：`undefined`

**是否必须**：false

**说明**：边图例配置

### inactiveState

**类型**：`string`

**默认值**：`''`

**是否必须**：false

**说明**：图例取消激活后切换到该状态

### node

**类型**：`ItemLegendConfig`

**默认值**：`undefined`

**是否必须**：false

**说明**：节点图例配置

### orientation

**类型**：`'horizontal'` | `'vertical'`

**默认值**：`'horizontal'`

**说明**：图例的布局方向，可以是水平或者垂直方向

### selectedState

**类型**：`string`

**默认值**：`'selected'`

**是否必须**：false

**说明**：图例选中后切换到该状态

### size

**类型**：`'fit-content'` | `[number | string, number | string]`

**默认值**：`'fit-content'`

**说明**：图例的大小，可以是一个数字或者字符串，也可以是一个数组，分别表示宽度和高度，如果是字符串，可以是 `'fit-content'`，表示图例的大小自适应内容

## API

<embed src="../../common/PluginAPIDestroy.zh.md"></embed>

---

```ts
type ItemLegendConfig = {
  /** 图例列数 */
  cols?: number;
  /** 图例列间距 */
  colPadding?: number;
  /** 是否启用图例 */
  enable?: boolean;
  /** 图例文本格式化函数 */
  labelFormatter?: (value: string) => string;
  /** 图例文本样式 */
  labelStyle?: Style;
  /** 图例 marker 样式 */
  markerStyle?: markerStyle;
  /** 图例内边距 */
  padding?: number | number[];
  /** 图例行数 */
  rows?: number;
  /** 图例行间距 */
  rowPadding?: number;
  /** item 类型的字段名 */
  typeField?: string;
};
```
