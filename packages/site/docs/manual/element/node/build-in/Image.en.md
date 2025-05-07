---
title: Image
---

## Overview

The image node is a rectangular area used to display images.

Applicable scenarios:

- Used to represent user avatars, product images, or icons.

- Suitable for representing social networks, product catalogs, or icon collections.

- Commonly used in social network graphs, product images, UI design, etc.

## Online Experience

<embed src="@/common/api/elements/nodes/image.md"></embed>

## Style Configuration

> If the element has specific attributes, we will list them below. For all general style attributes, see [BaseNode](/en/manual/element/node/build-in/base-node)

| Attribute | Description                          | Type   | Default | Required |
| --------- | ------------------------------------ | ------ | ------- | -------- |
| img       | Alias for the img attribute          | string | -       |          |
| src       | Image source, i.e., image URL string | string | -       | ✓        |

## Example

### Built-in Image Node Effect

<Playground path="element/node/demo/image.js" rid="default-image-node"></Playground>
