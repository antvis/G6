---
title: 在 React 中使用
order: 0
---

:::info{title=建议}
如果你需要更完善的 React 与 G6 集成解决方案，可以使用 AntV 官方封装库 [`@antv/graphin`](https://github.com/antvis/graphin)。
:::

## 非严格模式

参考下面的示例，你可以在 React 中使用 G6，也可以查看 [在线示例](https://stackblitz.com/edit/g6-in-react?file=src/App.tsx) 。

<embed src="@/common/react-snippet"></embed>

## 严格模式

在严格模式下，React 会在开发环境中有意执行挂载、卸载、再挂载。请把 Graph 实例放在 effect 里创建，用 ref 保存，并在清理函数中销毁，这样第一次开发态挂载不会留下旧实例。下面的完整示例同时演示了如何注册和渲染 React 节点。

<embed src="@/common/react-snippet-strict"></embed>
