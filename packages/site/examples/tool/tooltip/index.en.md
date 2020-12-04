---
title: Tooltip
order: 0
---

G6 has two type of Tooltip, plugin and behavior. We recommand you to use the Tooltip Plugin since the Tooltip behavior will be discarded in v4.0.

## Usage

The first demo below shows the Tooltip plugin. Instantiate the Tooltip plugin and assign it to the `plugins` of the graph. Notice that the `offsetX` and `offsetY` can be used to adjust the offset of the tooltip to the mouse, the padding of the parent container should be counted into them, e.g. the padding of the parent container in this demo is `24px 16px`, so we set the `offsetX` and `offsetY` tobe `16 + 10` and `24 + 10` respectively. The Tooltip's style can be defined by the CSS with class name `g6-component-tooltip` as below. For more detail, please refer to [Tooltip Plugin API](/en/docs/api/Plugins#tooltip).

The second to the forth demo below show the Tooltip behavior. Tooltip's style can be defined by the CSS with class name `g6-tooltip` as below. For more detail, please refer to [Tooltip Behavior](/en/docs/manual/middle/states/defaultBehavior#tooltip).

```
// change the 'g6-tooltip' tobe 'g6-component-tooltip' for plugin type Tooltip
.g6-tooltip {
    border: 1px solid #e2e2e2;
    border-radius: 4px;
    font-size: 12px;
    color: #545454;
    background-color: rgba(255, 255, 255, 0.9);
    padding: 10px 8px;
    box-shadow: rgb(174, 174, 174) 0px 0px 10px;
  }
```
