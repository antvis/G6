---
title: Diamond 菱形
order: 5
---

本文展示 Diamond 菱形节点 `keyShape` 配置项的详细说明。对于其它配置项，可以参考[通用配置](/apis/item/node/node-intro#通用属性)。[Diamond 菱形节点 DEMO](/zh/examples/item/defaultNodes/#diamond)。

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*oUSlSZt6rCoAAAAAAAAAAAAADmJ7AQ/original" width=600 />

## KeyShapeStyle

相关的图形样式参考 [`PathStyleProps`](../../shape/PathStyleProps.zh.md), 扩展属性如下：

### KeyShapeStyle.size

菱形的宽高。`size` 为一个数值时，宽高相同。

- **是否必须**：否
- **类型**：`number | [number, number]`
- **默认值**：`[32, 32]`
