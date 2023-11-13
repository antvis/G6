## labelShape

节点的文本图形，内置节点或继承内置节点（未复写相关内容）的自定义节点均支持。

- **是否必须**：否
- **类型**：`LabelShapeStyle`

`LabelShapeStyle` 文本标签样式基于 [Text 图形样式](../../shape/TextStyleProps.zh.md)。扩展配置项如下：

| 配置项   | 类型                                                 | 默认值     | 描述                                           |
| -------- | ---------------------------------------------------- | ---------- | ---------------------------------------------- |
| position | `'top' \| 'bottom' \| 'left' \| 'right' \| 'center'` | `'center'` | 文本在节点上的位置                             |
| offsetX  | `number`                                             | `0`        | 文本相对于当前位置的 x 轴偏移量                |
| offsetY  | `number`                                             | `0`        | 文本相对于当前位置的 y 轴偏移量                |
| offsetZ  | `number`                                             | `0`        | 文本相对于当前位置的 z 轴偏移量                |
| maxWidth | `string \| number`                                   | `'200%'`   | 文本的最大宽度，字符串表示百分比，数字表示像素 |
| angle    | `number`                                             | `-`        | 文本的顺时针旋转角度，以弧度为单位             |

## labelBackgroundShape

节点的文本的背景图形，是一个矩形。若不设置则不显示。设置为 `{}` 将使用主题中默认的样式显示文本背景图形。

- **是否必须**：否
- **类型**：`LabelBackgroundShapeStyle`

`LabelBackgroundShapeStyle` 文本背景样式基于 [`RectStyleProps` 矩形图形样式](../../shape/RectStyleProps.zh.md)。扩展配置项如下：

| 配置项  | 类型                 | 默认值 | 描述               |
| ------- | -------------------- | ------ | ------------------ |
| padding | `number \| number[]` | `/`    | 文本在节点上的位置 |

## badgeShapes

节点四周的徽标，单个徽标包括了文本和背景图形，`badgeShapes` 配置的是多个徽标。[节点徽标 DEMO](/zh/examples/item/defaultNodes/#circle)。

- **是否必须**：否
- **类型**：`BadgeShapesStyle`

`BadgeShapesStyle` 徽标样式基于 [`RectStyleProps` 矩形图形样式](../../shape/RectStyleProps.zh.md)。扩展配置项如下：

```typescript
type IBadgePosition =
  | 'rightTop'
  | 'right'
  | 'rightBottom'
  | 'bottomRight'
  | 'bottom'
  | 'bottomLeft'
  | 'leftBottom'
  | 'left'
  | 'leftTop'
  | 'topLeft'
  | 'top'
  | 'topRight';

type BadgeShapeStyle = {
  /** 该徽标的位置 */
  position?: IBadgePosition;
  /** 该徽标的背景色 */
  color?: string;
  /** 该徽标的文本色*/
  textColor?: string;
};

type BadgeShapesStyle =
  | (RectStyleProps & {
      /**
       * 徽标的背景颜色（对所有徽标生效，优先级低于下面单个徽标的 color 设置）
       */
      color?: string;
      /**
       * 徽标背景颜色的色板，意味着下面各个徽标将自动取用该色板中的颜色。
       * 优先级低于下面单个徽标的 color 设置
       */
      palette?: string[];
      /**
       * 徽标上文本的颜色（对所有徽标生效，优先级低于下面单个徽标的 textColor 设置）
       */
      textColor?: string;
    })
  | BadgeShapeStyle[];
```

## anchorShapes

其中，相关的图形样式参考 [Text 图形样式](../../shape/TextStyleProps.zh.md)。

## otherShapes

其中，不同的图形样式参考图形样式目录下对应的图形类型文档。
