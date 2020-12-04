---
title: 时间轴
order: 5
---

[AntV G6](https://github.com/antvis/G6) 内置了三种形态的 TimeBar 组件：

- 带有趋势图的 TimeBar 组件；
- 简易版的 TimeBar 组件；
- 刻度 TimeBar 组件。

并且每种类型的 TimeBar 组件都可以配合播放、快进、后退等控制按钮组使用。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*DOo6QpfFfMUAAAAAAAAAAAAAARQnAQ' width='500' />
<br />趋势图 TimeBar 组件<br />

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*bzGBQKkewZMAAAAAAAAAAAAAARQnAQ' width='500' />
<br />简易版 TimeBar 组件<br />

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*kHRkQpnvBmwAAAAAAAAAAAAAARQnAQ' width='500' />
<br />刻度 TimeBar 组件<br />

<br />在趋势图 TimeBar 基础上，我们可以通过配置数据，实现更加复杂的趋势图 TimeBar 组件，如下图所示。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*17VoSoTm9o8AAAAAAAAAAAAAARQnAQ' width='500' />

<br />虽然 G6 提供了各种不同类型的 TimeBar 组件，但在使用的方式却非常简单，通过配置字段就可以进行区分。<br />

## 使用指南

使用 G6 内置的 TimeBar 组件，和使用其他组件的方式完全相同。

```javascript
import G6 from '@antv/g6'

const timebar = new G6.TimeBar({
  width: 500,
  height: 150,
  padding: 10,
  type: 'trend',
  trend: {
    data: timeBarData
  },
});

const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  plugins: [timebar],
});
```