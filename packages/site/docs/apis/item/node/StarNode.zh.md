---
title: Star 星形
order: 8
---

本文展示 Star 星形节点 `keyShape` 配置项的详细说明。对于其它配置项，可以参考[通用配置](/apis/item/node/node-intro#通用属性)。[Star 星形节点 DEMO](/zh/examples/item/defaultNodes/#star)。

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*YSVjSLyYNwIAAAAAAAAAAAAADmJ7AQ/original" width=600 />

## KeyShapeStyle

相关的图形样式参考 [`PathStyleProps`](../../shape/PathStyleProps.zh.md), 扩展属性如下：

### KeyShapeStyle.outerR

五角星的大小。

- **是否必须**：否
- **类型**：`number`
- **默认值**：`20`

### KeyShapeStyle.innerR

五角星的内环大小。若未设置 `innerR`, 则自动根据 `outerR * 3 / 8` 计算。

- **是否必须**：否
- **类型**：`number`
