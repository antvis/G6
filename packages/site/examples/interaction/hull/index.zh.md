---
title: 节点集轮廓包裹
order: 5
---

使用平滑的轮廓来包裹指定的一组节点集合。

## 何时使用

节点集轮廓包裹常用语交互过程中，对团伙标记与分析，尤其是在不希望影响原图布局的情况下。轮廓包裹的形状支持 `round-convex` / `smooth-convex` / `bubble` 三种类型，默认为 `round-convex` 类型。`round-convex` 为圆角凸包轮廓，`smooth-convex` 为平滑曲线凸包轮廓，这两种凸包轮廓不可排除配置项中的 nonMembers；`bubble` 为自由凹包轮廓，可以排除 nonMembers。可配合事件监听实现轮廓的动态更新。下面的第一个示例中，蓝色为 bubble 类型轮廓， 绿色为 round-convex 类型轮廓，轮廓监听节点变化进行更新，始终包裹节点。第二个示例中，红色气泡配合节点 drag 事件，实现节点拖进拖出，右击可以增加内部成员；蓝色凸包随节点位置更新，始终包裹节点。完整的配置项请参考 API 文档： [createHull](/zh/docs/api/graphFunc/hull#createhullcfg-hullcfg)。
