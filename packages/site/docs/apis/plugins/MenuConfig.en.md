---
title: Contextmenu
order: 5
---

- [Context Menu](/en/examples/tool/contextMenu/#contextMenu)

<img alt="contextmenu" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*665CS41sG2oAAAAAAAAAAAAADmJ7AQ/original" height='120'/>

## Configurations

<embed src="../../common/IPluginBaseConfig.en.md"></embed>

<embed src="../../common/PluginGetContent.en.md"></embed>

### handleMenuClick

**Type**: `(target: Item, item: MenuItem) => void`

**Default**: `undefined`

The callback function when the menu item is clicked

### itemTypes

**Type**: `string[]`

**Default**: `['node', 'edge', 'canvas']`

The object type to add menu items

### liHoverStyle

**Type**: `CSSProperties`

**Default**:

```json
{
  "color": "white",
  "background-color": "#227EFF",
};
```

**Required**: false

**Description**: The style of the menu item hover state

<embed src="../../common/PluginLoadingContent.en.md"></embed>

### onHide

**Type**: `() => void`

**Default**: `undefined`

The callback function when the menu is hidden

<embed src="../../common/PluginShouldBegin.en.md"></embed>

### trigger

**Type**: `'click' | 'contextmenu'`

**Default**: `'click'`

The trigger type of the menu

## API

<embed src="../../common/PluginAPIDestroy.en.md"></embed>
