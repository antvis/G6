---
title: Html
---

## Overview

The HTML node is a custom rectangular area used to display HTML content.

Applicable scenarios:

- Used to represent complex custom nodes, such as tables, charts, or rich text.

- Suitable for representing custom visual elements or interactive components.

- Commonly used in custom charts, UI design, etc.

## Online Experience

<embed src="@/common/api/elements/nodes/html.md"></embed>

## Style Configuration

> If the element has specific attributes, we will list them below. For all general style attributes, see [BaseNode](/en/manual/element/node/build-in/base-node)

| Attribute | Description                                                                                                               | Type                    | Default | Required |
| --------- | ------------------------------------------------------------------------------------------------------------------------- | ----------------------- | ------- | -------- |
| dx        | Horizontal offset. The HTML container defaults to the top-left corner as the origin, and dx is used for horizontal offset | number                  | 0       |          |
| dy        | Vertical offset. The HTML container defaults to the top-left corner as the origin, and dy is used for vertical offset     | number                  | 0       |          |
| innerHTML | HTML content, can be a string or `HTMLElement`                                                                            | string \| `HTMLElement` | 0       | ✓        |

## Example

### Built-in HTML Node Effect

<Playground path="element/node/demo/html.js" rid="default-html-node"></Playground>
