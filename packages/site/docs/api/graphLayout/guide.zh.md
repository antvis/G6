---
title: 导览及使用
order: 0
---

## 内置布局导览

G6 提供了以下内置布局算法。可以在[实例化图时配置](#实例化图时使用布局)，或[独立使用](#单独使用布局)。当内置布局算法不满足需求时，还可以[自定义布局](/zh/docs/api/registerLayout)。

注意，Graph 布局与 TreeGaph 布局相互不通用。

- [Random Layout](./random)：随机布局；
- **[GForce Layout](./gforce)：G6 4.0 支持的经典力导向布局，支持 GPU 并行计算：**

  > 力导向布局：一个布局网络中，粒子与粒子之间具有引力和斥力，从初始的随机无序的布局不断演变，逐渐趋于平衡稳定的布局方式称之为力导向布局。适用于描述事物间关系，比如人物关系、计算机网络关系等。

- [Force Layout](./force)：引用 d3 的经典力导向布局；
- [Force Atlas 2 Layout](./forceAtlas2)：FA2 力导向布局，比 force 收敛地更好，更紧凑；
- [Circular Layout](./circular)：环形布局；
- [Radial Layout](./radial)：辐射状布局；
- [MDS Layout](./mds)：高维数据降维算法布局；
- [Fruchterman Layout](./fruchterman)：Fruchterman 布局，一种力导布局；
- [Dagre Layout](./dagre)：层次布局；
- [Concentric Layout](./concentric)：同心圆布局，将重要（默认以度数为度量）的节点放置在布局中心；
- [Grid Layout](./grid)：格子布局，将节点有序（默认是数据顺序）排列在格子上；
- [Combo Force Layout](./combo-force)：*V3.5 新增。*适用于带有 combo 图的力导向布局，推荐有 combo 的图使用该布局。

## 实例化图时使用布局

在 G6 中使用布局，在实例化图时配置 `layout` 属性。例如：

```javascript
const graph = new G6.Graph({
  // ...                      // 其他配置项
  layout: {                // Object，可选，布局的方法及其配置项，默认为 random 布局。
    type: 'force',
    preventOverlap: true,
    nodeSize: 30,
    // workerEnabled: true, // 是否启用 webworker
    // gpuEnabled: true // 是否使用 gpu 版本的布局算法，G6 4.0 支持，目前仅支持 gForce 及 fruchterman。若用户的机器或浏览器不支持 GPU 计算，将会自动降级为 CPU 计算
    ...                    // 其他配置
  }
});
```

每种布局方法的配置项不尽相同，具体参见本目录下每种布局的 API。<br />当实例化图时没有配置 `layout` 时：

- 若数据中节点有位置信息（`x` 和 `y`），则按照数据的位置信息进行绘制；
- 若数据中节点没有位置信息，则默认使用 Random Layout 进行布局。

## 单独使用布局

以下方法为通过 `const layout = new G6.Layout['layoutName']` 单独使用布局时，或自定义布局时可能需要复写的方法。如果上述两种情况，仅在实例化图时通过配置 `layout` 使用内置布局方法时，以下方法由 G6 控制并调用，用户不需要了解。

### 初始化

#### init(data)

初始化布局。

**参数**

| 名称 | 类型   | 是否必选 | 描述             |
| ---- | ------ | -------- | ---------------- |
| data | object | true     | 布局中使用的数据 |

#### getDefaultCfg()

返回布局的默认参数。

**返回值**

| 名称 | 类型   | 是否必选 | 描述           |
| ---- | ------ | -------- | -------------- |
| cfg  | object | true     | 布局的默认参数 |

### 布局

#### execute()

执行布局算法。

#### layout(data)

根据传入的数据进行布局。

**参数**

| 名称 | 类型   | 是否必选 | 描述             |
| ---- | ------ | -------- | ---------------- |
| data | object | true     | 布局中使用的数据 |

### 更新

#### updateCfg(cfg)

更新布局参数。

**参数**

| 名称 | 类型   | 是否必选 | 描述         |
| ---- | ------ | -------- | ------------ |
| cfg  | object | true     | 新的布局配置 |

### 销毁

#### destroy()

销毁布局。

## AI 智能布局推荐

`markdown:docs/manual/middle/layout/ai-layout.zh.md`
