---
title: Fullscreen 全屏展示
---

> 如需深入了解插件的使用，请参阅 [API 文档 - 图配置项 - plugins](/api/graph/option#plugins) 章节。此章节将介绍完整的配置参数、类型定义以及应用示例。

**参考示例**

- [结合 Toolbar 插件实现全屏效果](/examples/plugin/fullscreen/#basic)

## 配置项

### <Badge type="success">Required</Badge> type

> _`fullscreen` \| string_

此插件已内置，你可以通过 `type: 'fullscreen'` 来使用它。

### autoFit

> _boolean_ **Default:** `true`

是否自适应画布尺寸，全屏后画布尺寸会自动适应屏幕尺寸

### onEnter

> _() => void_

进入全屏后的回调

### onExit

> _() => void_

退出全屏后的回调

### trigger

> _{ request?: string[]; exit?: string[]; }_

触发全屏的方式

- `request` : 请求全屏
- `exit` : 退出全屏

## API

### Fullscreen.destroy()

```typescript
destroy(): void;
```

### Fullscreen.exit()

退出全屏

```typescript
exit(): void;
```

### Fullscreen.request()

请求全屏

```typescript
request(): void;
```
