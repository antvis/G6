---
title: Hexagon
---

## Overview

A hexagon is a geometric shape with six equal sides, featuring a honeycomb structure.

Applicable scenarios:

- Used to represent honeycomb networks, molecular structures, or tightly packed nodes.

- Suitable for representing network topology, molecular diagrams, or game maps.

- Commonly used in network diagrams, topology diagrams, game design, etc.

## Online Experience

<embed src="@/common/api/elements/nodes/hexagon.md"></embed>

## Style Configuration

> If the element has specific attributes, we will list them below. For all general style attributes, see [BaseNode](/en/manual/element/node/build-in/base-node)

| Attribute | Description                                                        | Type   | Default                                 | Required |
| --------- | ------------------------------------------------------------------ | ------ | --------------------------------------- | -------- |
| outerR    | Outer radius, the distance from the hexagon's center to any vertex | number | Half of the minimum of width and height |          |

## Example

### Built-in Hexagon Node Effect

<Playground path="element/node/demo/hexagon.js" rid="default-hexagon-node"></Playground>
