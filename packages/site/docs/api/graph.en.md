---
title: Graph Instance
order: 2
---

## API Reference

### Graph.destroy()

Destroy the current graph instance and release all resources related to it.

⚠️ **Note**: After destruction, no operations can be performed. If you need to use it again, you must create a new graph instance.

```typescript
destroy(): void;
```

**Usage Scenarios**:

- When the user closes the chart or switches to another view, this method can be called to release resources.
- When needing to recreate a graph instance, ensure the old instance is destroyed first to avoid memory leaks.
