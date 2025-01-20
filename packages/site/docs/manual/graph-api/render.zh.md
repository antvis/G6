---
title: 绘制与渲染
order: 3
---

### Graph.draw()

绘制元素

```typescript
draw(): Promise<void>;
```

仅执行元素绘制，不会重新布局

⚠️ draw 为异步方法，如果需要在 draw 后执行一些操作，可以使用 `await graph.draw()` 或者监听 GraphEvent.AFTER_DRAW 事件

<details><summary>相关参数</summary>

**返回值**：

- **类型：**Promise&lt;void&gt;

- **描述：**渲染结果

</details>

### Graph.render()

执行渲染

```typescript
render(): Promise<void>;
```

此过程会执行数据更新、绘制元素、执行布局

<details><summary>相关参数</summary>

**返回值**：

- **类型：**Promise&lt;void&gt;

</details>
