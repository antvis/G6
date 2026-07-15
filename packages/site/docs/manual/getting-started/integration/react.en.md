---
title: react
order: 0
---

## Non-Strict Mode

Refer to the example below, you can use G6 in React, and you can also view the [Live Example](https://stackblitz.com/edit/g6-in-react?file=src/App.tsx) 。

<embed src="@/common/react-snippet"></embed>

## Strict Mode

In strict mode, React intentionally mounts, unmounts, and remounts components in development. Create the Graph instance inside an effect, keep it in a ref, and destroy it in the cleanup callback so the first development-only mount does not leave a stale graph behind. The following complete example also shows how to register and render a React node.

<embed src="@/common/react-snippet-strict"></embed>
