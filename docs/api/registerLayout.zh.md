---
title: G6.registerLayout
order: 7
---

## G6.registerLayout(layoutName, layout)

当内置布局不满足需求时，可以通过 `G6.registerLayout(layoutName, layout)` 方法自定义布局。

### 参数

| 名称 | 类型 | 是否必选 | 描述 |
| --- | --- | --- | --- |
| layoutName | String | true | 自定义布局名称。 |
| layout | Object | true | 自定义布局的配置项，配置项中包括的方法及作用具体请参考：[Layout API](/zh/docs/manual/middle/layout)。 |

### 用法

```javascript
G6.registerLayout('layoutName', {
  /**
   * 定义自定义行为的默认参数，会与用户传入的参数进行合并
   */
  getDefaultCfg() {
    return {};
  },
  /**
   * 初始化
   * @param {Object} data 数据
   */
  init(data) {
    const self = this;
    self.nodes = data.nodes;
    self.edges = data.edges;
  },
  /**
   * 执行布局
   */
  execute() {
    // TODO
  },
  /**
   * 根据传入的数据进行布局
   * @param {Object} data 数据
   */
  layout(data) {
    const self = this;
    self.init(data);
    self.execute();
  },
  /**
   * 更新布局配置，但不执行布局
   * @param {Object} cfg 需要更新的配置项
   */
  updateCfg(cfg) {
    const self = this;
    Util.mix(self, cfg);
  },
  /**
   * 销毁
   */
  destroy() {
    const self = this;
    self.positions = null;
    self.nodes = null;
    self.edges = null;
    self.destroyed = true;
  },
});
```

以下方法为自定义布局时可能需要复写的方法。如果非自定义，使用内置布局方法时，以下方法由 G6 控制并调用，用户不需要了解。

## 初始化

### init(data)

初始化布局。

**参数**

| 名称 | 类型   | 是否必选 | 描述             |
| ---- | ------ | -------- | ---------------- |
| data | object | true     | 布局中使用的数据 |

### getDefaultCfg()

返回布局的默认参数。

**返回值**

| 名称 | 类型   | 是否必选 | 描述           |
| ---- | ------ | -------- | -------------- |
| cfg  | object | true     | 布局的默认参数 |

## 布局

### execute()

执行布局算法。

### layout(data)

根据传入的数据进行布局。

**参数**

| 名称 | 类型   | 是否必选 | 描述             |
| ---- | ------ | -------- | ---------------- |
| data | object | true     | 布局中使用的数据 |

## 更新

### updateCfg(cfg)

更新布局参数。

**参数**

| 名称 | 类型   | 是否必选 | 描述         |
| ---- | ------ | -------- | ------------ |
| cfg  | object | true     | 新的布局配置 |

## 销毁

### destroy()

销毁布局。
