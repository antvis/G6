---
title: AI 智能布局推荐
order: 20
---

AntV 团队将图布局预测的能力封装成 NPM 包 @antv/vis-predict-engine，通过 predict 方法来预测提供的数据应该使用什么布局，基本用法如下。

```
import G6 from '@antv/g6'
import { GraphLayoutPredict } from '@antv/vis-predict-engine'
const data = {
    nodes: [],
  edges: []
}
// predictLayout 表示预测的布局，如 force 或 radial
// confidence 表示预测的可信度
const { predictLayout, confidence } = await GraphLayoutPredict.predict(data);
const graph = new G6.Graph({
  // 省略其他配置
    layout: {
    type: predictLayout
  }
})
```

更详情的内容请参考[AI 智能布局推荐](/zh/docs/manual/middle/layout/ai-layout.zh.md)。