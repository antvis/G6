---
title: Using G6 with IE
order: 11
---

In this section, we will introduce the usage of G6 in IE.

## Solution

Import `babel-polyfill` into your project:

- Import `babel-polyfill` in your main entrance file;
- Add some code into `bable-loader`:

```
{
    test: /\.js$/,
    loader: 'babel-loader',
    include: [resolve('src'), resolve('node_modules/@antv/g6')]
}
```

> `include` indicates the directories of the .js files should to be babel-loader; exclude represents the directories of .js files should not to be babel-loader。

The content of `include` should be assigned according to your project.

Refer to <a href='https://blog.csdn.net/y491887095/article/details/81541502' target='_blank'>The Link</a> for more detail.

In addition, there are some solutions for the projects with @vue/cli, umi, and create-react-app. **First, ensure your project can be ran on IE without G6**.

You may find the error: <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*dIrtS6eorxUAAAAAAAAAAABkARQnAQ' width=800 alt='img'/>

### vue/cli

The <a href='https://github.com/lxfu/vue-g6' target='_blank'>G6 Vue Demo</a> is based on @vue/cli(V: 4.0.5). There will be some small differences to the 3.x version. Now, we are going to solve the compatibility issues of @vue/cli.<br />First, we find the document on <a href='https://cli.vuejs.org/guide/browser-compatibility.html#polyfills' target='_blank'>Vue Official Website</a>, which points out the problem of browser compatibility: <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*J_aTR7CdPnwAAAAAAAAAAABkARQnAQ' width=850 alt='img'/>

New a vue.config.js file in the same directory of package.json, and add `transpileDependencies`: <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*EDkTRpk9TxoAAAAAAAAAAABkARQnAQ' width=850 alt='img'/>

The value of `transpileDependencies` is `[]` by default, which means no Babel with all the node_modules files. Now, we add the files should be Bable into `transpileDependencies` as below. Note that the dependencies to be added **should not contain node_modules, and use the package name @antv/g6**. The reason is that the @vue/cli will add the prefix node_modules automatically. The @antv/g6 must be same consistent to that in package.json. Use npm while installing the dependencies. If you are using yarn or cnpm, you should make sure that there are no modified package name in node_modules.

```javascript
module.exports = {
  transpileDependencies: ['@antv/g6'],
};
```

Open the project with IE11 to see the result: <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*yS3BRL12vyAAAAAAAAAAAABkARQnAQ' width=850 alt='img'/>

The original error is solved, but new problem shows up. Open the project with Chrome, you can find the same error. The compatibility issue has been solved by adding `transpileDependencies`. We find a solution in the issues of Vue: add `sourceType: "unambiguous"` to babel.config.js, which can be refered to the official website of Vue for the definition.

```javascript
module.exports = {
  sourceType: 'unambiguous',
  presets: ['@vue/cli-plugin-babel/preset'],
};
```

Compile it again: <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*ewAJS55iBOkAAAAAAAAAAABkARQnAQ' width=850 alt='img'/>

Now, the prolem is solved.

### create-react-app

If you are using create-react-app(V: 3.0.0) to initiate your project, create-react-app has built in the solution for compatibility. You only need to configure the compatibility of the project by several methods. Please refer to <a href='https://create-react-app.dev/docs/supported-browsers-features/#configuring-supported-browsers' target='_blank'>HERE</a>.<br /> <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*aeWfSKGfgycAAAAAAAAAAABkARQnAQ' width=850 alt='img'/>

If you want to figure out the inner solving process, run `npm run eject` or `yarn run eject` to check the inner configurations of create-react-app. This operation is irreversible. <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*NcvcSL90CvUAAAAAAAAAAABkARQnAQ' width=850 alt='img'/>
