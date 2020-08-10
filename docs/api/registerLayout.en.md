---
title: G6.registerLayout
order: 7
---

## G6.registerLayout(layoutName, layout)

When the built-in Layouts cannot satisfy your requirments, custom a type of Layout by `G6.registerLayout(layoutName, layout)`.

### Parameters

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| layoutName | String | true | The name of the custom layout. |
| layout | Object | true | The configurations of the custom layout. For more information, please refer to [Layout API](/en/docs/manual/middle/layout). |

### Usage

```javascript
G6.registerLayout('layoutName', {
  /**
   * The default configurations will be mixed by configurations from user
   */
  getDefaultCfg() {
    return {};
  },
  /**
   * Initialize
   * @param {Object} data The data
   */
  init(data) {
    const self = this;
    self.nodes = data.nodes;
    self.edges = data.edges;
  },
  /**
   * Execute the layout
   */
  execute() {
    // TODO
  },
  /**
   * Layout with the data
   * @param {Object} data The data
   */
  layout(data) {
    const self = this;
    self.init(data);
    self.execute();
  },
  /**
   * Update the configurations of the layout, but it does not execute the layout
   * @param {Object} cfg The new configurations
   */
  updateCfg(cfg) {
    const self = this;
    Util.mix(self, cfg);
  },
  /**
   * Destroy the layout
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

## Initialize

### init(data)

Initialize the layout.

**Paramter**

| Name | Type   | Required | Description             |
| ---- | ------ | -------- | ----------------------- |
| data | Object | true     | The data for the layout |

### getDefaultCfg()

Get the default configurations of the layout.

**Return**

| Name | Type   | Required | Description                |
| ---- | ------ | -------- | -------------------------- |
| cfg  | Object | true     | The default configurations |

## Layout

### execute()

Execute the layout.

### layout(data)

Execute layout according to the data.

**Paramter**

| Name | Type   | Required | Description             |
| ---- | ------ | -------- | ----------------------- |
| data | Object | true     | The data to be arranged |

## Update

### updateCfg(cfg)

Update the configurations for layout.

**Paramter**

| Name | Type   | Required | Description        |
| ---- | ------ | -------- | ------------------ |
| cfg  | Object | true     | New configurations |

## Destroy

### destroy()

Destroy the layout.
