---
title: Contextmenu 右键菜单
order: 5
---

- [上下文菜单](/examples/tool/contextMenu/#contextMenu)

<img alt="contextmenu" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*665CS41sG2oAAAAAAAAAAAAADmJ7AQ/original" height='120'/>

## 配置项

<embed src="../../common/IPluginBaseConfig.zh.md"></embed>

<embed src="../../common/PluginGetContent.zh.md"></embed>

### handleMenuClick

**类型**：`(target: Item, item: MenuItem) => void`

**默认值**：`undefined`

**是否必须**：false

**说明**：点击菜单项的回调函数

### itemTypes

**类型**：`string[]`

**默认值**：`['node', 'edge', 'canvas']`

**是否必须**：false

**说明**：添加菜单项的对象类型

### liHoverStyle

**类型**：`CSSProperties`

**默认值**：

```json
{
  "color": "white",
  "background-color": "#227EFF",
};
```

**是否必须**：false

**说明**：菜单项 hover 状态的样式

<embed src="../../common/PluginLoadingContent.zh.md"></embed>

### onHide

**类型**：`() => void`

**默认值**：`undefined`

**是否必须**：false

**说明**：菜单隐藏时的回调函数

<embed src="../../common/PluginShouldBegin.zh.md"></embed>

### trigger

**类型**：`'click' | 'contextmenu'`

**默认值**：`'click'`

**是否必须**：false

**说明**：触发菜单的事件类型

---

## API

<embed src="../../common/PluginAPIDestroy.zh.md"></embed>

<embed src="../../common/IG6GraphEvent.zh.md"></embed>
