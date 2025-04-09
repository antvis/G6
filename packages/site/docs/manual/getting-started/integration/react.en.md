---
title: react
order: 0
---

## Non-Strict Mode

Refer to the example below, you can use G6 in React, and you can also view the [Live Example](https://stackblitz.com/edit/g6-in-react?file=src/App.tsx) 。

<embed src="@/common/react-snippet"></embed>

## Strict Mode

In strict mode, React will update twice, causing G6 to create and destroy the Graph instance repeatedly. You can refer to the following example to solve this problem:

<embed src="@/common/react-snippet-strict"></embed>
