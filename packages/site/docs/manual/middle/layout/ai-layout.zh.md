---
title: G6 智能布局预测
order: 6
---

### 背景

图可视分析应用中，如何选择合适的布局让每次查询的数据都能够很清晰地展示是一个不小的挑战，虽然我们可以像 Gephi 一样，把布局的配置切换交给用户来做，让用户自己切换布局、调整参数来选择合适的布局，但这样的效率显然太低。为了彻底解决布局选择的问题，G6 提供了智能布局预测的能力，预测引擎会根据查询到的数据，推荐最适合的布局，用户直接使用推荐的布局即可。

### 定义

智能布局是指在结合神经网络进行建模，通过大量的标注数据（标记布局分类）进行训练输出预测模型，业务场景中针对通过模型对真实的图数据进行预测，从而推荐出该数据最适合的布局分类的方法。

### 预测引擎

@antv/vis-predict-engine 定位为可视化预测引擎，短期内主要用于图布局的分类预测。常久来看，可视化预测引擎会支持布局配置参数预测、节点类别预测、chart 类别预测等。

G6 中图布局预测的整体流程如下图所示。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*6gsZTb6SvwYAAAAAAAAAAAAAARQnAQ' width='90%'>

### 用法

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

### 效果

如下图所示，在一份医疗健康图谱中，通过智能布局预测引擎得出 "Force" 的布局效果最佳，通过对比实验，也符合预期。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*9W-4S6WyouMAAAAAAAAAAAAAARQnAQ' width='90%'>

### Demo

具体 Demo 参考这里：[AI 智能布局推荐 DEMO](/zh/examples/net/aiLayout#layoutPrediction)
