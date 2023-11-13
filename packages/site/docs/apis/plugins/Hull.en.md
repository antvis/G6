---
title: Hull
order: 12
---

Add a hull to a group of objects for wrapping

- [Use hulls to wrap the node sets](/en/examples/tool/hull/#hull)
- [Interactively change the members in the hull](/en/examples/tool/hull/#changeMembers)

<img alt="hull" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*GVnERKlGhNgAAAAAAAAAAAAADmJ7AQ/original" height='400'/>

## Configurations

<embed src="../../common/IPluginBaseConfig.en.md"></embed>

### bubbleCfg

**Type**: `BubbleCfg`

**Default**: `undefined`

**Required**: false

**Description**: More detailed configuration of the wrapped properties

> Usually, you don't need to configure this property

### hulls

**Type**: `HullComponentOptions[]`

**Default**: `undefined`

**Required**: false

**Description**: Enabled hull wrapping

> You can also add, remove, and update hulls through the API

### labelShape

**Type**:

```ts
type labelShape = ShapeSyle & {
  position?: ComboLabelPosition;
  offsetX?: number;
  offsetY?: number;
  maxWidth?: string | number;
};
```

**Default**: `{}`

**Required**: false

**Description**: Label style

### padding

**Type**: `number`

**Default**: `10`

**Required**: false

**Description**: The inner padding of the hull

### style

**Type**: `ShapeStyle`

**Default**: `{}`

**Required**: false

**Description**: Hull style

## API

### addHull

**Type**: `(options: HullComponentOptions | HullComponentOptions[]) => void;`

**Description**: Add a hull

### addHullMember

**Type**: `(id: ID, member: ID | ID[]) => void;`

**Description**: Add a hull member

### addHullNonMember

**Type**: `(id: ID, member: ID | ID[]) => void;`

**Description**: Add a hull non-member

### removeHull

**Type**: `(id: ID[]) => void;`

**Description**: Remove a hull

### removeHullMember

**Type**: `(id: ID, member: ID | ID[]) => void;`

**Description**: Remove a hull member

### removeHullNonMember

**Type**: `(id: ID, member: ID | ID[]) => void;`

**Description**: Remove a hull non-member

### updateHull

**Type**: `(options: HullComponentOptions | HullComponentOptions[]) => void;`

**Description**: Update a hull

<embed src="../../common/PluginAPIDestroy.en.md"></embed>

---

```ts
type BubbleCfg = {
  /** DEFAULT_NODE_R0; the amount of space to move the virtual edge when wrapping around obstacles */
  morphBuffer?: number;
  /** the resolution of the algorithm in square pixels, 4 by default */
  pixelGroupSize?: number;
  /** number of times to refine the boundary, 100 by default */
  maxMarchingIterations?: number;
  /** number of times to run the algorithm to refine the path finding in difficult areas */
  maxRoutingIterations?: number;
  /** the distance from nodes which energy is 1 (full influence) */
  nodeR0?: number;
  /** the distance from nodes at which energy is 0 (no influence) */
  nodeR1?: number;
  /** the distance from edges at which energy is 1 (full influence) */
  edgeR0?: number;
  /** the distance from edges at which energy is 0 (no influence) */
  edgeR1?: number;
  /** node influence factor */
  nodeInfluenceFactor?: number;
  /** negativeNode influence factor */
  negativeNodeInfluenceFactor?: number;
  /** edge influence factor */
  edgeInfluenceFactor?: number;
  /** member influence factor */
  memberInfluenceFactor?: number;
  /** nonMember influence factor */
  nonMemberInfluenceFactor?: number;
};

type ComboLabelPosition =
  | 'bottom'
  | 'center'
  | 'top'
  | 'left'
  | 'left-top'
  | 'right'
  | 'outside-top'
  | 'outside-left'
  | 'outside-right'
  | 'outside-bottom';

type HullComponentOptions = {
  id: string;
  members?: ID[];
  nonMembers?: ID[];
  style?: ShapeStyle;
  padding?: number;
  type?: 'bubble' | 'round-convex' | 'smooth-convex';
  labelShape?: ShapeStyle & {
    autoRotate?: boolean;
    maxWidth?: string | number;
    offsetX?: number;
    offsetY?: number;
    position?: 'left' | 'right' | 'top' | 'bottom';
  };
};

type ID = string | number;
```
