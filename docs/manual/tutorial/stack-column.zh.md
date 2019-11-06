---
title: Stacked-Column 堆叠柱状图
order: 0
---

## 图表故事

堆叠柱状图是基础柱状图的扩展形式，将每根柱子进行分割，以显示大类目下的细分类目占比情况。堆叠柱状图可以展示更多维度的数据：大类目之间的数值比较、大类目下各细分类目的占比情况、不同大类目下同一细分类目的横向数值比较。

堆叠柱状图的一个缺点是当柱子上的堆叠太多时会导致数据很难区分对比，同时很难对比不同分类下相同维度的数据，因为它们不是按照同一基准线对齐的。

## 数据类型

堆叠柱状图适合的数据类型为两个**分类字段**(分类字段、堆叠字段)和一个**连续字段**(数值)。在下面这个例子中，`type`为分类数据字段，`quarter`为堆叠数据字段，`value`为离散数据字段。

```
const data = [
  {type:'a',quarter:'Q1',value: 100},
  {type:'a',quarter:'Q2',value: 70},
  {type:'a',quarter:'Q3',value: 20},
  {type:'b',quarter:'Q1',value: 10},
  {type:'b',quarter:'Q2',value: 50},
  {type:'b',quarter:'Q3',value: 40},
  {type:'c',quarter:'Q1',value: 30},
  {type:'c',quarter:'Q2',value: 50},
  {type:'c',quarter:'Q3',value: 20},
 ];
```

图表绘制时，每一个分类对应一根柱子，映射到 x 轴，而堆叠字段决定柱子被如何分割，连续字段决定每块细分的高度，映射到 y 轴，细分高度之和即是柱子的总体高度。

## 图表用法

- **Dont's**
  - 分类数目过多，这将使数据变得难以比较
  - y 轴不以 0 值为起点，将有可能导致柱状图显示错误的比例关系

* **Do**
  - 极小值会让柱形的分割难以用视觉辨认，可以将极小值进行合并

## API

说明： **required** 标签代表生成图表的必选配置项，**optional** 标签代表生成图表的可选配置项。

### 特殊配置

#### stackField: string

**required**

数据集中的分组字段名，通过该字段的值，柱子将会被分割为多个部分，通过颜色进行区分。

---

### 通用图表配置

#### title

**optional** 见[通用图表配置](../generalConfig.zh-CN.md)。

#### description

**optional** 见[通用图表配置](../generalConfig.zh-CN.md)。

#### width

**optional** 见[通用图表配置](../generalConfig.zh-CN.md)。

#### height

**optional** 见[通用图表配置](../generalConfig.zh-CN.md)。

#### forceFit

**optional** 见[通用图表配置](../generalConfig.zh-CN.md)。

#### padding

**optional** 见[通用图表配置](../generalConfig.zh-CN.md)。

#### theme

**optional** 见[通用图表配置](../generalConfig.zh-CN.md)。

#### tooltip

**optional** 见[通用图表配置](../generalConfig.zh-CN.md)。

#### legend

**optional** 见[通用图表配置](../generalConfig.zh-CN.md)。

---

### 与基础柱状图相同的配置

#### data: collection

**required** 见[基础柱状图配置](./column.zh-CN.md)

#### xField: string

**required** 见[基础柱状图配置](./column.zh-CN.md)

#### yField: string

**required** 见[基础柱状图配置](./column.zh-CN.md)

#### color: string | string[] | function

**optional** 见[基础柱状图配置](./column.zh-CN.md)

#### columnSize: number

**optional** 见[基础柱状图配置](./column.zh-CN.md)

#### columnStyle: object | function

**optional**

配置柱形样式。 见[基础柱状图配置](./column.zh-CN.md)

#### label

**optional** 见[基础柱状图配置](./column.zh-CN.md)

#### events

**optional**

- 图形事件 见[基础柱状图配置](./column.zh-CN.md)

- 其他事件类型 见[通用图表配置](../generalConfig.zh-CN.md)。
