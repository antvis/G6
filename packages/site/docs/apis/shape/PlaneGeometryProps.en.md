---
title: Plane
order: 11
---

Plane geometry, default lying on the XZ plane

<img alt="plane" src="https://gw.alipayobjects.com/mdn/rms_6ae20b/afts/img/A*jN9zQp3RflAAAAAAAAAAAAAAARQnAQ" height='200'/>

## width

**Type**: `number`

**Default**: `100`

width

## depth

**Type**: `number`

**Default**: `100`

depth

## widthSegments

**Type**: `number`

**Default**: `5`

width segments

## depthSegments

**Type**: `number`

**Default**: `5`

depth segments

## materialType

**Type**：`'basic' | 'phong' | 'lambert'`

**Default**：`basic`

material type

## materialProps

**Type**: `MaterialProps`

<details>
  <summary style="color: #873bf4; cursor: pointer;">
    MaterialProps
  </summary>

```ts
type MaterialProps = {
  /** Whether to enable wireframe mode, which is often used to intuitively display triangles */
  wireframe?: boolean;
  /** Specify the color after opening wireframe */
  wireframeColor?: string;
  /** Specify the line width after opening wireframe */
  wireframeLineWidth?: number;
  /**
   * Specify the cull mode
   * 0: no culling
   * 1: cull front
   * 2: cull back
   * 3: cull front and back
   */
  cullMode?: number;
};
```

</details>

**Default**: `object`

<details>
  <summary style="color: #873bf4; cursor: pointer;">
    object
  </summary>

```json
{
  "wireframe": false,
  "wireframeColor": "black",
  "wireframeLineWidth": 1,
  "cullMode": 0
}
```

</details>

material-related properties
