---
title: NodeShapeStyles
---

## keyShape

**Type**: `ShapeStyle`

**Default**: `{}`

**Required**: false

**Description**: key shape style

## iconShape

**Type**: 

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

**Default**: `{}`

**Required**: false

**Description**: icon style

## haloShape

**Type**: `ShapeStyle`

**Default**: `{}`

**Required**: false

**Description**: halo style

## labelShape

**Type**: 

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

**Default**: `{}`

**Required**: false

**Description**: label style

## labelBackgroundShape

**Type**: 

```ts
ShapeStyle & {
    padding?: number | number[];
}
```

**Default**: `{}`

**Required**: false

**Description**: label background style

## badgeShapes

**Type**: 

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

**Default**: `{}`

**Required**: false

**Description**: badge style

## anchorShapes

**Type**: 

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

**Default**: `{}`

**Required**: false

**Description**: anchor style

## group

**Type**: `ShapeStyle`

**Default**: `{}`

**Required**: false

**Description**: group style

## otherShapes

**Type**: 

```ts
{ [shapeId: string]: ShapeStyle };
```

**Default**: `{}`

**Required**: false

**Description**: other shapes style

## animates

**Type**: `IAnimates`

**Default**: `{}`

**Required**: false

**Description**: animates

---

<embed src="../../common/ShapeStyle.en.md"></embed>

<embed src="../../common/Animates.en.md"></embed>
