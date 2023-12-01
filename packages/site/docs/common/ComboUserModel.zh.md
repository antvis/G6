### type

**类型**： `string`

Combo 的渲染类型，可以是已经注册到图类上的 Combo 类型，内置并默认注册的有 `'circle-combo'`，`'rect-combo'`。默认为 `'circle-combo'`。

### visible

**类型**： `boolean`

Combo 是否默认展示出来。

### color

**类型**： `string`

该 Combo 的主图形（keyShape）的主题色，值为十六进制字符串。为方便简单配置而提供，更多的样式配置应当在 Graph 实例的 Combo mapper 中配置 keyShape 以及各种图形的图形样式。

### label

**类型**： `string`

Combo `labelShape` 的文本内容。更多的样式配置应当在 Graph 实例的 Combo mapper 中配置 `labelShape` 的 `text` 值或其他图形样式。

<embed src="./DataIcon.zh.md"></embed>

### parentId

**类型**： `string | number`

在有 Combo 的图上表示该 Combo 所属的父亲 Combo 的 id。`undefined` 表示当前 Combo 是一个根。
