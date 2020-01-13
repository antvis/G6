---
title: 上下文菜单
order: 1
---

G6 中内置的 contextMenu。

## 使用指南
下面的代码演示展示了如何在图上使用 ContextMenu。如果需要定义菜单的样式，需要定义菜单对应标签的 CSS 样式，例如：
```
/* 根据菜单对应标签的 id 进行设置 */
 #contextMenu {
    position: absolute;
    /* ... Other styles */
  }
  #contextMenu li {
    cursor: pointer;
		/* ... Other styles */
  }
  #contextMenu li:hover {
    color: #aaa;
    /* ... Other styles */
  }
```