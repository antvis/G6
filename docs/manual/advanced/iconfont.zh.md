---
title: 使用 Iconfont
order: 10
---

## 简介

为什么使用 iconfont？  兼容性好、种类多、多色等。在此不做过多介绍，请直接移步 <a href='https://www.iconfont.cn' target='_blank'>阿里巴巴-iconfont 平台</a>。

## 效果

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*rJ3lQa0HR-wAAAAAAAAAAABkARQnAQ' alt='result' width='450'/>

## 下载字体图标

直接到 <a href='https://www.iconfont.cn' target='_blank'>阿里巴巴字体图标库</a> 搜索下载即可，简要操作流程是：搜索图标（例如篮球）->  选择自己喜欢的图标添加入库  ->  点击页面右上角的购物车可以看到我们加入的图标 -> 添加至项目，如果没有项目到话可以新建一个  -> 在我到项目里面点击下载至本地 -> 解压。如果一切操作正常的话可以得到如下解压文件：<br /> <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*EnNmQ5m7xHUAAAAAAAAAAABkARQnAQ' alt='download' width='550'/>

选中红色区域的所有文件（这里面很多文件是不需要的，为了方便起见，我们全部复制即可，不需要的也不会被打包），复制到项目里面，一般放在目录 'static/icons' 或者 'assets/icons' 下面，如果没有的话可以新建目录，当然你也可以放到任意你喜欢的位置，只要引入的时候路径对即可，到此 iconfont 引入完毕。

PS: 本案文件目录为 '/static/icons'。

## 引入 G6

多种引入方式，请移步[快速上手](/zh/docs/manual/getting-started)。 <br />PS: 本案例简单粗暴，通过 CDN 的方式引入。

```html
<script src="https://gw.alipayobjects.com/os/antv/pkg/_antv.g6-3.7.1/dist/g6.min.js"></script>
```

## 添加字体图标

引入方式可自行选择，下面为在 HTML 中引入的例子：

```html
<style>
  @import '/static/icons/iconfont.css';
</style>
```

## 使用字体

```javascript
G6.registerNode('iconfont', {
  draw(cfg, group) {
    const { backgroundConfig: backgroundStyle, style, labelCfg: labelStyle } = cfg;

    if (backgroundStyle) {
      group.addShape('circle', {
        attrs: {
          x: 0,
          y: 0,
          r: cfg.size,
          ...backgroundStyle,
        },
        // must be assigned in G6 3.3 and later versions. it can be any value you want
        name: 'circle-shape',
      });
    }

    const keyShape = group.addShape('text', {
      attrs: {
        x: 0,
        y: 0,
        fontFamily: 'iconfont', // 对应css里面的font-family: "iconfont";
        textAlign: 'center',
        textBaseline: 'middle',
        text: cfg.text,
        fontSize: cfg.size,
        ...style,
      },
      // must be assigned in G6 3.3 and later versions. it can be any value you want
      name: 'text-shape1',
    });
    const labelY = backgroundStyle ? cfg.size * 2 : cfg.size;

    group.addShape('text', {
      attrs: {
        x: 0,
        y: labelY,
        textAlign: 'center',
        text: cfg.label,
        ...labelStyle.style,
      },
      // must be assigned in G6 3.3 and later versions. it can be any value you want
      name: 'text-shape1',
    });
    return keyShape;
  },
});

const COLOR = '#40a9ff';
const graph = new G6.TreeGraph({
  container: 'mountNode',
  width: 800,
  height: 600,
  modes: {
    default: ['collapse-expand', 'drag-canvas', 'drag-node'],
  },
  defaultNode: {
    backgroundConfig: {
      backgroundType: 'circle',
      fill: COLOR,
      stroke: 'LightSkyBlue',
    },
    type: 'iconfont',
    size: 12,
    style: {
      fill: '#fff',
    },
    labelCfg: {
      style: {
        fill: COLOR,
        fontSize: 12,
      },
    },
  },
  // 布局相关
  layout: {
    type: 'compactBox',
    direction: 'LR',
    getId(d) {
      return d.id;
    },
    getHeight() {
      return 16;
    },
    getWidth() {
      return 16;
    },
    getVGap() {
      return 20;
    },
    getHGap() {
      return 60;
    },
  },
});

graph.edge(({ target }) => {
  const fill = target.get('model').backgroundConfig && target.get('model').backgroundConfig.fill;
  return {
    type: 'cubic-horizontal',
    color: fill || COLOR,
    label: target.get('model').relation || '',
    labelCfg: {
      style: {
        fill: fill || COLOR,
        fontSize: 12,
      },
    },
  };
});

const data = {
  isRoot: true,
  id: 'Root',
  label: '可疑人员王**',
  text: '\ue6b2', // 对应iconfont.css 里面的content，注意加u，后面的自行修改一下。
  style: {
    fill: 'red',
  },
  labelCfg: {
    style: {
      fill: 'red',
    },
  },
  backgroundConfig: null, // 自定义项，用于判读是否需要圆背景
  size: 30,
  children: [
    {
      id: 'SubTreeNode1',
      label: '**网咖',
      text: '&#xe605;',
      relation: '上网',
      children: [
        {
          id: 'SubTreeNode2',
          label: '多伦多',
          text: '&#xe64b;',
        },
        {
          id: 'id1',
          label: '小王',
          text: '&#xe622;',
          children: [
            {
              id: 'SubTreeNode1.2.1',
              label: '182****2123',
              text: '&#xe60d;',
            },
            {
              id: 'SubTreeNode4',
              label: '今晚在吗',
              text: '&#xe629;',
            },
          ],
        },
      ],
    },
    {
      id: 'SubTreeNode3',
      label: 'subway',
      text: '&#xe653;',
      children: [
        {
          id: 'SubTreeNode3.1',
          label: '王五',
          text: '&#xe622;',
        },
        {
          id: 'SubTreeNode3.2',
          label: '张三',
          text: '&#xe622;',
        },
      ],
    },
    {
      id: 'SubTreeNode5',
      label: '小花',
      relation: '老婆',
      text: '&#xe74b;',
      backgroundConfig: {
        fill: 'Coral',
      },
      style: {
        fill: '#fff',
      },
      labelCfg: {
        style: {
          fill: 'Coral',
        },
      },
      children: [
        {
          id: 'SubTreeNode1.2.1',
          label: '182****2123',
          text: '&#xe60d;',
          relation: '通话',
          backgroundConfig: {
            fill: 'Coral',
          },
          style: {
            fill: '#fff',
          },
          labelCfg: {
            style: {
              fill: 'Coral',
            },
          },
        },
        {
          id: 'SubTreeNode3.3',
          label: '凶器',
          text: '&#xe673;',
          relation: '指纹',
          backgroundConfig: {
            fill: 'Coral',
          },
          style: {
            fill: '#fff',
          },
          labelCfg: {
            style: {
              fill: 'Coral',
            },
          },
        },
      ],
    },
    {
      id: 'SubTreeNode6',
      label: '马航37*',
      relation: '乘坐',
      text: '&#xe610;',
    },
  ],
};

graph.data(data);
graph.render();
```

## 注意事项

看了代码大家应该很清楚了，实质就是用了 text 图形，但有几个需要注意的地方：<br /> **1、text 的 `fontFamily` 必须和 iconfont.css 里面的 `font-family` 保持一致：**<br /> <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*v0CoQoNIyJ8AAAAAAAAAAABkARQnAQ' alt='download' width='600'/>

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*wndRQo6U-oUAAAAAAAAAAABkARQnAQ' alt='download' width='600'/>

**2、data 里面的 `text` 使用的是 iconfont.css 里面的 `content`，注意加 `u` 。如有需要可自行复制。**<br />

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*KO-IRbIXRGAAAAAAAAAAAABkARQnAQ' alt='download' width='600'/>

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*teUAQIkCffUAAAAAAAAAAABkARQnAQ' alt='download' width='600'/>

**3、若出现了第一次渲染 iconfont 错误（可能显示成一个方框），可以尝试使用下面代码解决：**<br />

```javascript
// 在 graph.render() 之后调用以下语句：
setTimeout(() => {
  graph.paint();
}, 16);
```

## 工具函数 getIcon

我们可以将 unicode 的转化封装成函数使用。这里注意，手动拼接 unicode 是不行的（`\\u${icon.unicode}`）。这里采用 iconfont.json 中的 `code_decimal` 进行转化。详细参考《[MDN String.fromCodePoint](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCodePoint)》。

```javascript
import fonts from '../fonts/iconfont.json';

const icons = fonts.glyphs.map((icon) => {
  return {
    name: icon.name,
    unicode: String.fromCodePoint(icon.unicode_decimal), // `\\u${icon.unicode}`,
  };
});
const getIcon = (type: string) => {
  const matchIcon = icons.find((icon) => {
    return icon.name === type;
  }) || { unicode: '', name: 'default' };
  return matchIcon.unicode;
};
```

### 用法

```javascript
 {
    type: 'text',
    attrs: {
        id: 'node-icon',
        x: 0,
        y: 0,
        fontSize: iconSize,
        fill: primaryColor,
        text: getIcon('logo'), // logo 为 unicode 对应的 name
        fontFamily: 'iconfont', // 对应 CSS 里面的 font-family: "iconfont";
        textAlign: 'center',
        textBaseline: 'middle',
    },
  }
```
