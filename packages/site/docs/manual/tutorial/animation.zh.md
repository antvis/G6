---
title: 动画（选读）
order: 6
---

由于动画机制较为复杂，我们未在 Tutorial-案例 中增加动画。本文简单描述了 G6 中的动画，希望快速上手的用户可以跳过本文，希望深入了解的用户可参见：[基础动画](/zh/docs/manual/middle/animation)。

G6 的动画分为两个层次：

- 图全局动画：图整体变化时的动画过渡；
- 元素动画：节点和边的动画效果。

## 全局动画

G6 的全局动画指通过图实例进行操作时，产生的动画效果。例如：

- `graph.updateLayout(cfg)`

通过实例化图时配置 `animate: true`，可以达到每次进行上述操作时，动画效果变化的目的。

**例子**

```javascript
const graph = new G6.Graph({
  // ...                      // 其他配置项
  animate: true, // Boolean，可选，全局变化时否使用动画过渡
});
```

## 元素动画

G6 允许用户通过自定义节点/边的方式，给元素增加动画效果，如下：<br /> <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*hYJSQaneVmgAAAAAAAAAAABkARQnAQ' width=330  alt='img'/>

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*-90pSrm4hkUAAAAAAAAAAABkARQnAQ' width=330 alt='img' />

更多关于动画的案例请参考 [G6 中的动画案例](/zh/examples/scatter/node)。
