---
title: Hull 轮廓包裹
order: 12
---

为一组对象添加轮廓进行包裹

- [用轮廓包裹节点集合](/examples/tool/hull/#hull)
- [修改包裹内部成员](/examples/tool/hull/#changeMembers)

<img alt="hull" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*GVnERKlGhNgAAAAAAAAAAAAADmJ7AQ/original" height='400'/>

## 配置项

<embed src="../../common/IPluginBaseConfig.zh.md"></embed>

### bubbleCfg

**类型**：`BubbleCfg`

**默认值**：`undefined`

更精细的配置包裹属性

> 通常情况下，不需要配置该属性

### hulls

**类型**：`HullComponentOptions[]`

**默认值**：`undefined`

启用的轮廓包裹

> 也可以通过 API 来添加、移除、更新轮廓包裹

### labelShape

**类型**：

```ts
type labelShape = ShapeSyle & {
  position?: ComboLabelPosition;
  offsetX?: number;
  offsetY?: number;
  maxWidth?: string | number;
};
```

**默认值**：`{}`

标签样式

### padding

**类型**：`number`

**默认值**：`10`

轮廓包裹的内边距

### style

**类型**：`ShapeStyle`

**默认值**：`{}`

轮廓样式

## API

### addHull

**类型**：`(options: HullComponentOptions | HullComponentOptions[]) => void;`

添加轮廓包裹

### addHullMember

**类型**：`(id: ID, member: ID | ID[]) => void;`

添加轮廓包裹成员

### addHullNonMember

**类型**：`(id: ID, member: ID | ID[]) => void;`

添加轮廓包裹非成员

### removeHull

**类型**：`(id: ID[]) => void;`

移除轮廓包裹

### removeHullMember

**类型**：`(id: ID, member: ID | ID[]) => void;`

移除轮廓包裹成员

### removeHullNonMember

**类型**：`(id: ID, member: ID | ID[]) => void;`

移除轮廓包裹非成员

### updateHull

**类型**：`(options: HullComponentOptions | HullComponentOptions[]) => void;`

更新轮廓包裹

<embed src="../../common/PluginAPIDestroy.zh.md"></embed>

---

```ts
type BubbleCfg = {
  /** 当环绕障碍物时移动虚拟边缘的空间量 */
  morphBuffer?: number;
  /** 算法分辨率，默认为 4 */
  pixelGroupSize?: number;
  /** 用于计算轮廓的最大迭代次数，默认为 100 */
  maxMarchingIterations?: number;
  /** 在困难区域运行算法以细化路径查找的次数 */
  maxRoutingIterations?: number;
  /** 到能量为1的节点的距离 */
  nodeR0?: number;
  /** 到能量为0的节点的距离 */
  nodeR1?: number;
  /** 到能量为1的边的距离 */
  edgeR0?: number;
  /** 到能量为0的边的距离 */
  edgeR1?: number;
  /** 节点影响因子 */
  nodeInfluenceFactor?: number;
  /** 负节点影响因子 */
  negativeNodeInfluenceFactor?: number;
  /** 边影响因子 */
  edgeInfluenceFactor?: number;
  /** 成员影响因子 */
  memberInfluenceFactor?: number;
  /** 非成员影响因子 */
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
