---
title: Annotation 标注
order: 15
---

点击节点时，可在弹出的卡片中增加标注内容

<img alt="edge filter lens" src="https://github.com/antvis/G6/assets/6951527/942c5667-63b3-4c46-9e40-6daf64a773da" height='400'/>

## 配置项

### trigger

**类型**：`'click' | 'manual'`

**默认值**：`'click`

触发标注卡片展示的事件

- `'click'`：点击节点时触发
- `'manual'`：无事件，需手动调用插件上的[```showCard```](#api-showCard)函数触发，适合特殊场景定制开发

### containerCfg

**类型**：
```typescript
{
    position?: 'left' | 'right' | 'top' | 'bottom';
    className?: string;
    width?: number | string;
    height?: number | string;
    offsetX?: number;
    offsetY?: number;
}
```

**默认值**：`undefined`

设置标注卡片的父元素，默认以```this.graph```的容器作为父元素

### editable

**类型**：`boolean`

**默认值**：`true`

设置卡片是否可编辑

### itemHighlightState

**类型**：`string`

**默认值**：`highlight`

item的高亮状态; 当鼠标或键盘聚焦到card上时，相关的item会被设置上此状态

### defaultData

**类型**：`CardConfig[]`

**默认值**：`undefined`

初始的卡片数据

### cardCfg

**类型**：`CardConfig[]`

**默认值**：
```typescript
{
    maxWidth: 300,
    maxHeight: 500,
    minWidth: 180,
    minHeight: 120,
    width: 180,
    height: 'fit-content',
    visible: true,
    collapsed: false,
    collapseType: 'minimize',
    closeType: 'hide',
    maxTitleLength: 20,
    focusEditOnInit: false,
}
```

卡片的详细配置，请参阅[```CardConfig```](#CardConfig)

### linkStyle

**类型**：`PathStyleProps`

**默认值**：`undefined`

卡片和item（节点、边等）之间的连接线的样式

### linkHighlightStyle

**类型**：`PathStyleProps`

**默认值**：
```typescript
{
    shadowColor: '#5B8FF9',
    shadowBlur: 10,
}
```

卡片和item（节点、边等）之间的连接线的高亮样式

### getTitle

**类型**：`(item: Item) => string`

**默认值**：
```typescript
(item) => {
    const { data, id } = item?.model || {};
    return data?.label || id || '-';
}
```

初始化卡片的标题。当getTitle返回空时，getTitlePlaceholder的返回将用作标题

### getContent

**类型**：`(item: Item) => string`

**默认值**：
```typescript
(item) => {
    if (!item) return '-';
    const { id, data } = item.model || {};
    const type = item.getType?.();
    const suffix = type ? `${type}: ` : '';
    return `${suffix}${data?.label || id || ''}`;
}
```

初始化卡片的内容。当getContent返回空时，getContentPlaceholder的返回将用作内容

### getTitlePlaceholder

**类型**：`(item: Item) => string`

**默认值**：
```typescript
() {
    return '按 回车 保存';
}
```

初始化卡片标题的占位符

### getContentPlaceholder

**类型**：`(item: Item) => string`

**默认值**：
```typescript
() {
    return '按 回车 保存\n按 Shift + 回车 换行';
}
```

初始化卡片内容的占位符

### onAnnotationChange

**类型**：`(cardInfo: Card, action: 'create' | 'update' | 'show' | 'hide' | 'remove') => void`

**默认值**：`undefined`

标注卡片更改时触发

## <a id="CardConfig">CardConfig</a>

```Annotation```在生成卡片时，会给卡片构造器传入```cardCfg```，```cardCfg```的类型就是```CardConfig```

### id

**类型**：`string`

卡片的ID，等价于item.getID()，item可以是node或edge

### width

**类型**：`number | string`

卡片的宽度

### height

**类型**：`number | string`

卡片的高度

### minWidth

**类型**：`number | string`

卡片的最小宽度

### minHeight

**类型**：`number | string`

卡片的最小高度

### maxWidth

**类型**：`number | string`

卡片的最大宽度

### maxHeight

**类型**：`number | string`

卡片的最大高度

### visible

**类型**：`boolean`

卡片最初是否可见，默认为true


### collapsed

**类型**：`boolean`

卡片最初是否折叠，默认为false

### x / y

**类型**：`number`

指定位置和视口坐标系，只有在没有`containerCfg`时才有效

### title

**类型**：`string`

卡片的标题

### content

**类型**：`string`

卡片的内容

### maxTitleLength

**类型**：`string`

编辑模式下，标题输入框的最大长度，默认为20

### collapseType

**类型**：`'minimize' | 'hide'`

点击折叠按钮时如何处理

* ```minimize```: 默认情况下，将折叠卡片

* ```hide```: 隐藏卡片，设置css属性display: none

### closeType

**类型**：`'hide' | 'remove'`

点击关闭按钮时如何处理

* ```hide```: 隐藏卡片，设置css属性display: none，默认

* ```remove```: 销毁卡片，这将删除卡片dom和相关事件

### defaultBegin

**类型**：
```typescript
{
    left?: number;
    top?: number;
    right?: number;
    bottom?: number;
}
```

指定卡片的起始位置。默认位置将在容器的右上角，多张卡片将按从上到下的顺序排列

### onMouseEnterIcon

**类型**：
```typescript
(
    evt: MouseEvent,
    id: string,
    type: 'expand' | 'collapse' | 'close',
) => void
```
关闭按钮和折叠按钮的hover事件

### onMouseLeaveIcon

**类型**：
```typescript
(
    evt: MouseEvent,
    id: string,
    type: 'expand' | 'collapse' | 'close',
) => void
```
关闭按钮和折叠按钮的hover事件

### onClickIcon

**类型**：
```typescript
(
    evt: MouseEvent,
    id: string,
    type: 'expand' | 'collapse' | 'close',
) => void
```
关闭按钮和折叠按钮的点击事件

### focusEditOnInit

**类型**：
```typescript
boolean | EditPosition
```
```typescript
type EditPosition = 'title' | 'content';
```

创建卡片时，是否进入编辑模式并聚焦到于卡片

* ```false```: 默认情况下，不会进入编辑模式，需要手动操作
* ```title```: 编辑并聚焦到标题区域
* ```content```: 编辑并聚焦到内容区域
* ```true```: 将所有区域切换到编辑模式，并将焦点放在标题区域

## API

### <a id="api-showCard">showCard</a>

**类型**：`(id: CardID) => void`

**相关类型**：
```typescript
type CardID = number | string
```

**说明**：传入节点或边的`id`，生成并展示标注卡片，传入的`id`将作为节点id

### hideCard

**类型**：`(id: CardID) => void`

**相关类型**：
```typescript
type CardID = number | string
```

**说明**：隐藏标注卡片，下次打开还保留隐藏前的配置，包括文本内容、位置等

### editCard

**类型**：`(id: CardID, options?: { position?: EditPosition; value?: any }) => void`

**相关类型**：
```typescript
type EditPosition = 'title' | 'content'
type CardID = number | string
```

**说明**：开启卡片的编辑模式，通过`position`设置要编辑的区域，通过`value`设置编辑时的初始内容

### exitEditCard

**类型**：`(id: CardID, options?: { position?: EditPosition }) => void`

**相关类型**：
```typescript
type EditPosition = 'title' | 'content'
type CardID = number | string
```

**说明**：退出卡片的编辑模式，通过`position`设置要退出编辑的区域

### moveCard

**类型**：`(id: CardID, x: number, y: number) => void`

**相关类型**：
```typescript
type CardID = number | string
```

**说明**：移动卡片到`x` / `y`

### focusCard

**类型**：`(id: CardID) => void`

**相关类型**：
```typescript
type CardID = number | string
```

**说明**：聚焦到指定`id`的卡片上，并设置聚焦样式

### blurCard

**类型**：`(id: CardID) => void`

**相关类型**：
```typescript
type CardID = number | string
```

**说明**：使指定`id`的卡片失去焦点，并取消设置聚焦样式

### collapseCard

**类型**：`(id: CardID, collapsed?: boolean) => void`

**相关类型**：
```typescript
type CardID = number | string
```

**说明**：根据传入的`collapsed`值，使指定`id`的卡片收起或展开，收起的卡片仅展示标题区域，不再展示主要内容区域；

### removeCard

**类型**：`(id: CardID) => void`

**相关类型**：
```typescript
type CardID = number | string
```

**说明**：删除指定`id`的卡片，注意这将删除卡片的DOM、已编辑的数据及相关事件

### saveData

**类型**：`() => AnnotationData`

**相关类型**：
```typescript
type AnnotationData = Array<{
  id: string;
  x?: number;
  y?: number;
  collapsed?: boolean;
  title?: string;
  content?: string;
  visible?: boolean;
}>;
```

**说明**：导出标注数据

### readData

**类型**：`(data: AnnotationData) => void`

**相关类型**：
```typescript
type AnnotationData = Array<{
  id: string;
  x?: number;
  y?: number;
  collapsed?: boolean;
  title?: string;
  content?: string;
  visible?: boolean;
}>;
```

**说明**：设置标注数据