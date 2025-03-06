---
title: ZoomCanvas 缩放画布
---

## 概述

ZoomCanvas 插件用于在画布上实现缩放功能，支持鼠标滚轮缩放和快捷键缩放。

## 在线体验

<embed src="@/common/api/behaviors/zoom-canvas.md"></embed>

## 配置方式

ZoomCanvas 插件支持以下三种配置方式：

1. 使用默认配置

```javascript
new Graph({
  behaviors: ['zoom-canvas'],
});
```

2. 自定义配置

```javascript
new Graph({
  behaviors: [
    {
      type: 'zoom-canvas',
      key: 'my-zoom-canvas',
      trigger: {
        zoomIn: ['Control', '+'],
        zoomOut: ['Control', '-'],
        reset: ['Control', '0'],
      },
    },
  ],
});
```

3. 高级配置，通过获取图实例进行配置

```javascript
new Graph({
  behaviors: [
    function () {
      const graph = this;
      return {
        type: 'zoom-canvas',
      };
    },
  ],
});
```

## 配置项

| 属性           | 描述                                                                                                                                                                                                                                                  | 类型                                                                                | 默认值              | 必选 |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ------------------- | ---- |
| type           | 此插件已内置，你可以通过 `type: 'zoom-canvas'` 来使用它                                                                                                                                                                                               | `zoom-canvas` \| string                                                             | `zoom-canvas`       | ✓    |
| animation      | 是否启用缩放动画                                                                                                                                                                                                                                      | [ViewportAnimationEffectTiming](/manual/graph/option#viewportanimationeffecttiming) | `{ duration: 200 }` |      |
| enable         | 是否启用缩放画布的功能                                                                                                                                                                                                                                | boolean \| ((event: Event) => boolean)                                              | true                |      |
| onFinish       | 完成缩放时的回调                                                                                                                                                                                                                                      | () => void                                                                          | -                   |      |
| preventDefault | 是否阻止默认事件                                                                                                                                                                                                                                      | boolean                                                                             | true                |      |
| sensitivity    | 缩放灵敏度                                                                                                                                                                                                                                            | number                                                                              | 1                   |      |
| trigger        | 触发缩放的方式 <br/> - ShortcutKey：组合快捷键，**默认使用滚轮缩放**，['Control'] 表示按住 Control 键滚动鼠标滚轮时触发缩放 <br/> - CombinationKey：缩放快捷键，例如 { zoomIn: ['Control', '+'], zoomOut: ['Control', '-'], reset: ['Control', '0'] } | ShortcutKey \| CombinationKey                                                       | -                   |      |

## 示例

### 默认缩放画布

<Playground path="behavior/canvas/demo/zoom.js" rid="default-zoom-canvas"></Playground>
