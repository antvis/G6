---
title: 在 React 中使用
order: 0
---

## 非严格模式

参考下面的示例，你可以在 React 中使用 G6，也可以查看 [在线示例](https://stackblitz.com/edit/g6-in-react?file=src/App.tsx) 。

<embed src="@/common/react-snippet"></embed>

> 如果你需要更完善的 React 与 G6 集成解决方案，可以使用 AntV 官方封装库 [`@antv/graphin`](https://github.com/antvis/graphin)。

## 严格模式

在严格模式下，React 会二次更新导致 G6 重复创建 Graph 实例并销毁，可以参考如下示例解决：

<embed src="@/common/react-snippet-strict"></embed>
