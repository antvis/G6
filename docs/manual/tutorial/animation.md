---
title: 动画（选读）
order: 6
---

由于动画机制较为复杂，我们未在 Tutorial-案例 中增加动画。本文简单描述了 G6 中的动画，希望快速上手的用户可以跳过本文，希望深入了解的用户可参见：[基础动画](../advanced/animation-zh)。

G6 的动画分为两个层次：

- 图全局动画：图整体变化时的动画过渡；
- 元素动画：节点和边的动画效果。

## 全局动画
G6 的全局动画指通过图实例进行操作时，产生的动画效果。例如：

- `graph.updateLayout(cfg)`
- xxxx

通过实例化图时配置 `animate: true`，可以达到每次进行上述操作时，动画效果变化的目的。

#### 例子
```javascript
const graph = new G6.Graph({
  ...                      // 其他配置项
  animate: true            // Boolean，可选，切换布局时是否使用动画过度
});
```

## 元素动画
G6 允许用户通过自定义节点/边的方式，给元素增加动画效果，如下：<br />

![node-animation.gif](https://cdn.nlark.com/yuque/0/2019/gif/156681/1569834416356-26055f95-a015-466c-93e0-99a78d550ea4.gif#align=left&display=inline&height=155&name=node-animation.gif&originHeight=202&originWidth=430&search=&size=155937&status=done&width=329)

![edge-animation.gif](https://cdn.nlark.com/yuque/0/2019/gif/156681/1569834416363-46245951-0657-4763-84af-e318407ef54f.gif#align=left&display=inline&height=200&name=edge-animation.gif&originHeight=377&originWidth=363&search=&size=40062&status=done&width=193)

![hover-animation.gif](https://cdn.nlark.com/yuque/0/2019/gif/156681/1569834416382-da3fcbb2-cf76-418e-9573-9c0048aa4404.gif#align=left&display=inline&height=206&name=hover-animation.gif&originHeight=554&originWidth=556&search=&size=88448&status=done&width=207)
