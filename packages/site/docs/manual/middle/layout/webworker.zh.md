---
title: 使用 webworker 布局
order: 5
---

在大规模图可视化中，布局算法往往需要较大的计算量。若配置了布局，G6 需要首先完成布局才可以将图渲染出来。然而，在一些应用页面中，这一过程可能会阻塞页面的其他部分用户交互。为了让大规模图布局不阻塞页面，G6 为**一般图**布局提供了 Web-Worker 机制。只需要在配置布局时，将 `workerEnabled` 设置为 `true` 即可。如下：

```javascript
const graph = new G6.Graph({
  // ...                      // 其他配置项
  layout: {
    // Object，可选，布局的方法及其配置项，默认为 random 布局。
    type: 'fruchterman',
    workerEnabled: true, // 开启 Web-Worker
    // ...                 // 其他配置
  },
});
```

注意：

- 树图不支持 Web-Worker 机制；
- 子图布局机制暂不支持 Web-Worker 机制；
- worker 使用的是 @antv/layout 线上的脚本，如果你的项目无法访问到线上资源，请保存 [layout 脚本](https://unpkg.com/@antv/layout@0.3.23/dist/layout.min.js)，并放在可以访问到的地址上，将 layout 的 `workerScriptURL` 配置为该地址即可
