---
title: 在 React 中使用
order: 0
---

## 非严格模式

参考下面的示例，你可以在 React 中使用 G6，也可以查看 [在线示例](https://codesandbox.io/p/sandbox/g6-react-gpcc43) 。

<embed src="@/common/react-snippet"></embed>

## 严格模式

在严格模式下，React 会二次更新导致 G6 重复创建 Graph 实例并销毁，可以参考如下示例解决：

<embed src="@/common/react-snippet-strict"></embed>
