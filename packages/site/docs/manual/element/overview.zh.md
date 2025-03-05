---
title: 元素总览
order: 1
---

G6 中图元素包括**节点(Node)**、**边(Edge)**、**组合(Combo)**，它们是图的基本构成单元。

一个元素是由一个或多个原子图形组合而成，原子图形是 G6 中的最小图形单元，包括[矩形](https://g.antv.antgroup.com/api/basic/rect)、[圆形](https://g.antv.antgroup.com/api/basic/circle)、[文本](https://g.antv.antgroup.com/api/basic/text)、[路径](https://g.antv.antgroup.com/api/basic/path)等。

例如一个节点可以由一个矩形和一个文本组成，一个边可以由一条路径和一个文本组成。

<image width="300" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*2ZewT4T1p_4AAAAAAAAAAAAADmJ7AQ/original" />

G6 内置了丰富的图元素类型，同时也支持用户自定义图元素，用户可以根据自己的需求定义新的图元素类型。

## 配置元素

与 G6 4.x 不同，G6 5.x 中单个图元素的全部配置是平铺在同一个对象下的，不会有嵌套的情况，对于节点中不同部分的配置采用前缀进行区分，例如设置节点的填充颜色和标签名：

```typescript
{
  node: {
    style: {
      fill: 'orange',
      labelText: 'node',
    },
  },
};
```

采用这种方式的好处是在开发过程中，能够更容易地找到对应的配置项，同时也能够更方便地进行配置的合并。如果你使用的 `VSCode` 编辑器，可以看到元素的全部可配置属性，并可基于关键字进行搜索：

<image width="800" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*oY_uTK80sIoAAAAAAAAAAAAADmJ7AQ/original" />
