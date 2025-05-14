---
title: Atomic Shapes and Their Properties
order: 2
---

Elements (nodes/edges) in G6 are composed of **one or more [shapes](/en/manual/element/shape/overview)**, mainly added via `upsert` in the `render` method when customizing nodes or edges. G6 supports the following shapes:

1. [Circle](#circlestyleprops)
2. [Ellipse](#ellipsestyleprops)
3. [Rect](#rectstyleprops)
4. [HTML Element](#htmlstyleprops)
5. [Image](#imagestyleprops)
6. [Line](#linestyleprops)
7. [Path](#pathstyleprops)
8. [Polygon](#polygonstyleprops)
9. [Polyline](#polylinestyleprops)
10. [Text](#textstyleprops)

## Common Properties of All Shapes

### BaseShapeStyle

| Property       | Description                                                                                      | Type                                     | Required |
| -------------- | ------------------------------------------------------------------------------------------------ | ---------------------------------------- | -------- |
| x              | x coordinate                                                                                     | number                                   | ✓        |
| y              | y coordinate                                                                                     | number                                   | ✓        |
| width          | Width                                                                                            | number                                   | ✓        |
| height         | Height                                                                                           | number                                   | ✓        |
| fill           | Fill color                                                                                       | string \| Pattern \| null                |          |
| stroke         | Stroke color                                                                                     | string \| Pattern \| null                |          |
| opacity        | Overall opacity                                                                                  | number \| string                         |          |
| fillOpacity    | Fill opacity                                                                                     | number \| string                         |          |
| strokeOpacity  | Stroke opacity                                                                                   | number \| string                         |          |
| lineWidth      | Line width                                                                                       | number \| string                         |          |
| lineCap        | Line cap style                                                                                   | `butt` \| `round` \| `square`            |          |
| lineJoin       | Line join style                                                                                  | `miter` \| `round` \| `bevel`            |          |
| lineDash       | Dash array                                                                                       | number \| string \| (string \| number)[] |          |
| lineDashOffset | Dash offset                                                                                      | number                                   |          |
| shadowBlur     | Shadow blur                                                                                      | number                                   |          |
| shadowColor    | Shadow color                                                                                     | string                                   |          |
| shadowOffsetX  | Shadow X offset                                                                                  | number                                   |          |
| shadowOffsetY  | Shadow Y offset                                                                                  | number                                   |          |
| cursor         | Mouse cursor, supports all [CSS cursor](https://developer.mozilla.org/en-US/docs/Web/CSS/cursor) | string                                   |          |
| zIndex         | Render z-index                                                                                   | number                                   |          |
| visibility     | Visibility                                                                                       | `visible` \| `hidden`                    |          |

**Example:**

```js
const shape = BaseShape.upsert(
  // Specify the shape key, which must be unique within the same custom element type
  'shape',
  'circle',
  {
    cx: 100,
    cy: 100,
    r: 50,
    fill: 'blue',
  },
  container,
);
```

## Common Methods of All Shapes

### attr()

Set or get the drawing attributes of the instance.

### attr(name)

Get the value of an attribute.

```js
const width = shape.attr('width');
```

### attr(name, value)

Update a single drawing attribute.

### attr({...})

Batch update drawing attributes.

```js
shape.attr({
  fill: '#999',
  stroke: '#666',
});
```

## Circle Shape

### CircleStyleProps

| Property          | Description                               | Type             | Required |
| ----------------- | ----------------------------------------- | ---------------- | -------- |
| cx                | Center x coordinate                       | number \| string | ✓        |
| cy                | Center y coordinate                       | number \| string | ✓        |
| cz                | Center z coordinate                       | number \| string |          |
| r                 | Radius                                    | number \| string | ✓        |
| isBillboard       | Billboard mode (always faces camera)      | boolean          |          |
| isSizeAttenuation | Size attenuation (size changes with view) | boolean          |          |

**Example:**

```js
BaseShape.upsert(
  'shape',
  'circle',
  {
    cx: 100,
    cy: 100,
    r: 50,
    fill: 'blue',
  },
  container,
);
```

## Rect Shape

### RectStyleProps

| Property          | Description       | Type                         | Required |
| ----------------- | ----------------- | ---------------------------- | -------- |
| x                 | Rect x coordinate | number \| string             |          |
| y                 | Rect y coordinate | number \| string             |          |
| z                 | Rect z coordinate | number                       |          |
| width             | Rect width        | number \| string             | ✓        |
| height            | Rect height       | number \| string             | ✓        |
| isBillboard       | Billboard mode    | boolean                      |          |
| isSizeAttenuation | Size attenuation  | boolean                      |          |
| radius            | Border radius     | number \| string \| number[] |          |

**Example:**

```js
BaseShape.upsert(
  'shape',
  'rect',
  {
    x: 100,
    y: 100,
    width: 100,
    height: 100,
    radius: 8,
    fill: 'blue',
  },
  container,
);
```

## Ellipse Shape

### EllipseStyleProps

| Property          | Description         | Type             | Required |
| ----------------- | ------------------- | ---------------- | -------- |
| cx                | Center x coordinate | number \| string | ✓        |
| cy                | Center y coordinate | number \| string | ✓        |
| cz                | Center z coordinate | number \| string |          |
| rx                | X-axis radius       | number \| string | ✓        |
| ry                | Y-axis radius       | number \| string | ✓        |
| isBillboard       | Billboard mode      | boolean          |          |
| isSizeAttenuation | Size attenuation    | boolean          |          |

**Example:**

```js
BaseShape.upsert(
  'shape',
  'ellipse',
  {
    cx: 100,
    cy: 100,
    rx: 50,
    ry: 80,
    fill: 'blue',
  },
  container,
);
```

## HTML DOM

### HTMLStyleProps

| Property  | Description       | Type                  | Required |
| --------- | ----------------- | --------------------- | -------- |
| x         | HTML x coordinate | number \| string      |          |
| y         | HTML y coordinate | number \| string      |          |
| innerHTML | HTML content      | string \| HTMLElement | ✓        |
| width     | HTML width        | number \| string      |          |
| height    | HTML height       | number \| string      |          |

**Example:**

```js
BaseShape.upsert(
  'shape',
  'html',
  {
    x: 100,
    y: 100,
    innerHTML: <div>content</div>,
  },
  container,
);
```

## Image Shape

### ImageStyleProps

| Property          | Description                      | Type                       | Required |
| ----------------- | -------------------------------- | -------------------------- | -------- |
| x                 | Image x coordinate               | number \| string           |          |
| y                 | Image y coordinate               | number \| string           |          |
| z                 | Image z coordinate               | number                     |          |
| src               | Image source or HTMLImageElement | string \| HTMLImageElement | ✓        |
| width             | Image width                      | number \| string           |          |
| height            | Image height                     | number \| string           |          |
| isBillboard       | Billboard mode                   | boolean                    |          |
| isSizeAttenuation | Size attenuation                 | boolean                    |          |
| billboardRotation | Billboard rotation angle         | number                     |          |
| keepAspectRatio   | Keep original aspect ratio       | boolean                    |          |

**Example:**

```js
BaseShape.upsert(
  'shape',
  'image',
  {
    x: 100,
    y: 100,
    src: 'http://',
  },
  container,
);
```

## Line Shape

### LineStyleProps

| Property          | Description         | Type                  | Required |
| ----------------- | ------------------- | --------------------- | -------- |
| x1                | Start x coordinate  | number                | ✓        |
| y1                | Start y coordinate  | number                | ✓        |
| x2                | End x coordinate    | number                | ✓        |
| y2                | End y coordinate    | number                | ✓        |
| z1                | Start z coordinate  | number                |          |
| z2                | End z coordinate    | number                |          |
| isBillboard       | Billboard mode      | boolean               |          |
| isSizeAttenuation | Size attenuation    | boolean               |          |
| markerStart       | Marker at start     | DisplayObject \| null |          |
| markerEnd         | Marker at end       | DisplayObject \| null |          |
| markerStartOffset | Start marker offset | number                |          |
| markerEndOffset   | End marker offset   | number                |          |

**Example:**

```js
BaseShape.upsert(
  'shape',
  'line',
  {
    x1: 100,
    y1: 100,
    x2: 150,
    y2: 150,
    stroke: 'blue',
  },
  container,
);
```

## Path Shape

### PathStyleProps

| Property          | Description          | Type                   | Required |
| ----------------- | -------------------- | ---------------------- | -------- |
| d                 | Path string or array | string \| PathArray    | ✓        |
| markerStart       | Marker at start      | DisplayObject \| null  |          |
| markerEnd         | Marker at end        | DisplayObject \| null  |          |
| markerMid         | Marker at middle     | DisplayObject \| null  |          |
| markerStartOffset | Start marker offset  | number                 |          |
| markerEndOffset   | End marker offset    | number                 |          |
| isBillboard       | Billboard mode       | boolean                |          |
| isSizeAttenuation | Size attenuation     | boolean                |          |
| fillRule          | Fill rule            | `nonzero` \| `evenodd` |          |

**Example:**

```js
BaseShape.upsert(
  'shape',
  'path',
  {
    d: 'M 0,0 L 20,10 L 20,-10 Z',
    stroke: 'blue',
  },
  container,
);
```

## Polygon Shape

### PolygonStyleProps

| Property          | Description             | Type                                             | Required |
| ----------------- | ----------------------- | ------------------------------------------------ | -------- |
| points            | Array of polygon points | ([number, number] \| [number, number, number])[] | ✓        |
| markerStart       | Marker at start         | DisplayObject \| null                            |          |
| markerEnd         | Marker at end           | DisplayObject \| null                            |          |
| markerMid         | Marker at middle        | DisplayObject \| null                            |          |
| markerStartOffset | Start marker offset     | number                                           |          |
| markerEndOffset   | End marker offset       | number                                           |          |
| isClosed          | Is polygon closed       | boolean                                          |          |
| isBillboard       | Billboard mode          | boolean                                          |          |
| isSizeAttenuation | Size attenuation        | boolean                                          |          |

**Example:**

```js
BaseShape.upsert(
  'shape',
  'polygon',
  {
    points: [
      [30, 30],
      [40, 20],
      [30, 50],
      [60, 100],
    ],
    fill: 'red',
  },
  container,
);
```

## Polyline Shape

### PolylineStyleProps

| Property          | Description              | Type                                             | Required |
| ----------------- | ------------------------ | ------------------------------------------------ | -------- |
| points            | Array of polyline points | ([number, number] \| [number, number, number])[] | ✓        |
| markerStart       | Marker at start          | DisplayObject \| null                            |          |
| markerEnd         | Marker at end            | DisplayObject \| null                            |          |
| markerMid         | Marker at middle         | DisplayObject \| null                            |          |
| markerStartOffset | Start marker offset      | number                                           |          |
| markerEndOffset   | End marker offset        | number                                           |          |
| isBillboard       | Billboard mode           | boolean                                          |          |
| isSizeAttenuation | Size attenuation         | boolean                                          |          |

**Example:**

```js
BaseShape.upsert(
  'shape',
  'polyline',
  {
    points: [
      [30, 30],
      [40, 20],
      [30, 50],
      [60, 100],
    ],
    fill: 'red',
  },
  container,
);
```

## Text

### TextStyleProps

| Property            | Description              | Type                                                                        | Required |
| ------------------- | ------------------------ | --------------------------------------------------------------------------- | -------- |
| x                   | Text x coordinate        | number \| string                                                            |          |
| y                   | Text y coordinate        | number \| string                                                            |          |
| z                   | Text z coordinate        | number \| string                                                            |          |
| text                | Text content             | number \| string                                                            | ✓        |
| fontSize            | Font size                | number \| string                                                            |          |
| fontFamily          | Font family              | string                                                                      |          |
| fontStyle           | Font style               | `normal` \| `italic` \| `oblique`                                           |          |
| fontWeight          | Font weight              | `normal` \| `bold` \| `bolder` \| `lighter` \| number                       |          |
| fontVariant         | Font variant             | `normal` \| `small-caps` \| string                                          |          |
| textAlign           | Text horizontal align    | `start` \| `center` \| `middle` \| `end` \| `left` \| `right`               |          |
| textBaseline        | Text baseline            | `top` \| `hanging` \| `middle` \| `alphabetic` \| `ideographic` \| `bottom' |          |
| textOverflow        | Text overflow            | `clip` \| `ellipsis` \| string                                              |          |
| lineHeight          | Line height              | number \| string                                                            |          |
| letterSpacing       | Letter spacing           | number \| string                                                            |          |
| maxLines            | Max lines                | number                                                                      |          |
| textPath            | Text path                | Path                                                                        |          |
| textPathSide        | Text path side           | `left` \| `right`                                                           |          |
| textPathStartOffset | Text path start offset   | number \| string                                                            |          |
| textDecorationLine  | Text decoration line     | string                                                                      |          |
| textDecorationColor | Text decoration color    | string                                                                      |          |
| textDecorationStyle | Text decoration style    | `solid` \| `double` \| `dotted` \| `dashed` \| `wavy`                       |          |
| isBillboard         | Billboard mode           | boolean                                                                     |          |
| billboardRotation   | Billboard rotation angle | number                                                                      |          |
| isSizeAttenuation   | Size attenuation         | boolean                                                                     |          |
| wordWrap            | Word wrap                | boolean                                                                     |          |
| wordWrapWidth       | Word wrap width          | number                                                                      |          |
| dx                  | X offset                 | number \| string                                                            |          |
| dy                  | Y offset                 | number \| string                                                            |          |

**Example:**

```js
BaseShape.upsert(
  'shape',
  'text',
  {
    x: 100,
    y: 100,
    text: 'text',
  },
  container,
);
```

**Display in multiply line:**

```js
{
  wordWrap: true,
  wordWrapWidth: 100,
  maxLines: 4,
  textOverflow: 'ellipsis',
}
```
