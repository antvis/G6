---
title: 高维数据降维 MDS
order: 9
---

MDS 布局是高维数据降维算法布局，该算法全称  Multidimensional Scaling 。<br /> <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*aUS7TJR2NHcAAAAAAAAAAABkARQnAQ' width=600 alt='img'/>

```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 1000,
  height: 600,
  layout: {
    type: 'mds',
    workerEnabled: true, // 可选，开启 web-worker
  },
});
```

## layoutCfg.center

**类型**： Array<br />**示例**：[ 0, 0 ]<br />**默认值**：图的中心<br />**是否必须**：false<br />**说明**：布局的中心

## layoutCfg.linkDistance

**类型**： Number<br />**默认值**：50<br />**是否必须**：false<br />**说明**：边长度

## layoutCfg.workerEnabled

**类型**: Boolean<br />**默认值**: false<br />**是否必须**: false<br />**说明**: 是否启用 web-worker 以防布局计算时间过长阻塞页面交互。
<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️ 注意:</strong></span> `workerEnabled: true` 时，不支持所有函数类型的参数。
