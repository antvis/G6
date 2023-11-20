## workerEnabled

**Type**: `boolean`

**Default**: `false`

Whether to enable web worker for layout calculation to prevent blocking page interaction when the calculation takes too long.

:::warning
When `workerEnabled: true`, all parameter types of functions are not supported.
:::
