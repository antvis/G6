---
title: Random 随机
order: 1
---

Random 布局是 G6 中的默认布局方法。当实例化图时没有指定布局方法，且数据中也不存在位置信息时，G6 将自动使用 Random 布局。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*G5_uRodUTaYAAAAAAAAAAABkARQnAQ' width=430 alt='img'/>

```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 1000,
  height: 600,
  layout: {
    type: 'random',
    width: 300,
    height: 300,
  },
});
```

## layoutCfg.center

**类型**： Array<br />**示例**：[ 0, 0 ]<br />**默认值**：图的中心<br />**是否必须**：false<br />**说明**：布局的中心

## layoutCfg.width

**类型**： Number<br />**默认值**：图的宽度<br />**是否必须**：false<br />**说明**：布局的宽度范围

## layoutCfg.height

**类型**： Number<br />**默认值**：图的高度<br />**是否必须**：false<br />**说明**：布局的高度范围

## layoutCfg.workerEnabled

**类型**: Boolean<br />**默认值**: false<br />**是否必须**: false<br />**说明**: 是否启用 web-worker 以防布局计算时间过长阻塞页面交互。
<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️ 注意:</strong></span> `workerEnabled: true` 时，不支持所有函数类型的参数。
