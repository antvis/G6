---
title: AI Layout Prediction
order: 20
---

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

Please refer to [AI Layout Prediction](/en/docs/manual/middle/layout/ai-layout.en.md)
