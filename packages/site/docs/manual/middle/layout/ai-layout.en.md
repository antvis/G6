---
title: AI Layout Prediction
order: 6
---

### Background

In an application of graph visualization, how to choose a suitable layout so that the data queried every time can be clearly displayed is a big challenge. Although we can allow user to switch the layout and their configuration like Gephi, but it is obviousely inefficient. And the users might not able to choose a perfect layout. In order to completely solve the problem, G6 provides intelligent layout prediction capabilities. The prediction engine will recommend the most suitable layout based on the data.

### Definition

Intelligent layout refers to modeling in combination with neural networks and training output prediction models through a large amount of labeled data (label layout classification). In business scenarios, the real graph data is predicted through the model, so as to recommend the most suitable data layout classification method.

### Prediction Engine

@antv/vis-predict-engine is positioned as a prediction engine for visualization, which is mainly used for classification prediction of graph layout in the short term. Generally speaking, the prediction engine will support layout configuration parameter prediction, node category prediction, chart category prediction, etc.

The overall process of G6 map layout prediction is shown in the following figure:

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*6gsZTb6SvwYAAAAAAAAAAAAAARQnAQ' width='90%'>

### Usage

The AntV team encapsulated the ability of graph layout prediction into the NPM package @antv/vis-predict-engine, and used the predict method to predict the layout of the provided data. The basic usage is as follows:

```
import G6 from '@antv/g6'
import { GraphLayoutPredict } from '@antv/vis-predict-engine'
const data = {
    nodes: [],
  edges: []
}
// predictLayout indicates the predicted layout type, such as 'force' or 'radial'
// 'confidence' is the confidence of the prediction
const { predictLayout, confidence } = await GraphLayoutPredict.predict(data);
const graph = new G6.Graph({
    ... // other configurations
    layout: {
    type: predictLayout
  }
})
```

### Result

As shown in the figure below, in a medical and health map, the layout effect of "force" obtained by the intelligent layout prediction engine is the best, and the comparison experiment also meets expectations.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*9W-4S6WyouMAAAAAAAAAAAAAARQnAQ' width='90%'>

### Demo

[AI Layout Prediction DEMO](/en/examples/net/aiLayout#layoutPrediction)
