---
title: NodeShapeStyles
---

## keyShape

**类型**：`ShapeStyle`

**默认值**：`{}`

**是否必须**：false

**说明**：关键图形样式

## iconShape

**类型**：

```ts
Partial<
  TextStyleProps &
    ImageStyleProps &
    ShapeStyle & {
      offsetX?: number;
      offsetY?: number;
      lod?: number;
    }
>;
```

**默认值**：`{}`

**是否必须**：false

**说明**：图标样式

## haloShape

**类型**：`ShapeStyle`

**默认值**：`{}`

**是否必须**：false

**说明**：光环样式

## labelShape

**类型**：

```ts
ShapeStyle & {
    position?: 'top' | 'bottom' | 'left' | 'right' | 'center';
    offsetX?: number;
    offsetY?: number;
    offsetZ?: number;
    maxWidth?: string | number;
    angle?: number;
}
```

**默认值**：`{}`

**是否必须**：false

**说明**：标签样式

## labelBackgroundShape

**类型**：

```ts
ShapeStyle & {
    padding?: number | number[];
}
```

**默认值**：`{}`

**是否必须**：false

**说明**：标签背景样式

## badgeShapes

**类型**：

```ts
ShapeStyle & {
    color?: string;
    palette?: string[];
    textColor?: string;
    [key: number]: ShapeStyle & {
      position?: IBadgePosition;
      color?: string;
      textColor?: string;
    };
}
```

**默认值**：`{}`

**是否必须**：false

**说明**：徽标样式

## anchorShapes

**类型**：

```ts
ShapeStyle & {
    color?: string;
    textColor?: string;
    size?: number;
    offsetX?: number;
    offsetY?: number;
    offsetZ?: number;
    [key: number]: ShapeStyle & {
      position?: BadgePosition;
      color?: string;
      textColor?: string;
      size?: number;
      offsetX?: number;
      offsetY?: number;
      offsetZ?: number;
    };
}
```

**默认值**：`{}`

**是否必须**：false

**说明**：连接桩样式

## group

**类型**：`ShapeStyle`

**默认值**：`{}`

**是否必须**：false

**说明**：分组样式

## otherShapes

**类型**：

```ts
{ [shapeId: string]: ShapeStyle };
```

**默认值**：`{}`

**是否必须**：false

**说明**：其他图形样式

## animates

**类型**：`IAnimates`

**默认值**：`{}`

**是否必须**：false

**说明**：动画配置

---

<embed src="../../common/ShapeStyle.zh.md"></embed>

<embed src="../../common/Animates.zh.md"></embed>
