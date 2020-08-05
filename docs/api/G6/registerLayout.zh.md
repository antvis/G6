---
title: registerLayout
order: 9
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
