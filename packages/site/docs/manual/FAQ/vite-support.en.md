---
title: Error in Vite with G6
order: 3
---

> This solution comes from GitHub User @wooodchen

If you coming up with the error like following picture shows
![image](https://user-images.githubusercontent.com/20942938/121661253-98c82e00-cad6-11eb-9d5c-e5827db62ed9.png)

Please refer to [GitHub Issue #2961](https://github.com/antvis/G6/issues/2961).


You should configure two plugins: `rollup-plugin-node-rosolve` and `rollup-plugin-commonjs`. The warning will exist but the project will be available.

Configure `plugin` in `vite.config.js`:

```javascript
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
// ...
export default defineConfig({
  plugin: [
    ...,
    resolve(),
    commonjs(),
    ...
  ]
})
```

And [#3284](https://github.com/antvis/G6/issues/3284) propose another sulution for reference:

```javascript
build: {
  commonjsOptions: {
    ignoreTryCatch: false,
  },
},
```
