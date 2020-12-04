---
title: Utilizing Iconfont
order: 10
---

## Introduction

Due to the good compatibility, type diversity, color diversity, The iconfont is popupar for front-end developments now. Refer to the <a href='https://www.iconfont.cn' target='_blank'>Iconfont Library of Alibaba</a>.

## Effect

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*rJ3lQa0HR-wAAAAAAAAAAABkARQnAQ' alt='result' width='450'/>

## Download the iconfont

Browse the <a href='https://www.iconfont.cn' target='_blank'>Iconfont Library of Alibaba</a> and download the iconfont you like by searching a iconfont -> adding it to your library -> going to your library by clicking the shopping cart logo on the right top -> adding it to your project (new one if you do not have any project) -> downloading the iconfont in 'my project' -> decompressing. You will get the files as shown below if everything is right:<br /> <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*EnNmQ5m7xHUAAAAAAAAAAABkARQnAQ' alt='download' width='550'/>

Copy the files in the red area (there are lots of unecessary files, we can still copy them all since the unused files will not be packed)to your project. In general, the iconfont files are on the directory of 'static/icons' or 'assets/icons'. New the directory if there is no such directory. It is also fine to put them into any directory. But note to import the right path when you use it. Now, the importing process is done.

PS: The directory for this example is '/static/icons'.

## Import G6

There are several ways to import G6 introduced in [Getting Started](/en/docs/manual/getting-started). <br />PS: We import G6 by CDN in this example.

```html
<script src="https://gw.alipayobjects.com/os/antv/pkg/_antv.g6-3.7.1/dist/g6.min.js"></script>
```

## Import the Iconfont

We import the iconfont in HTML here:

```html
<style>
  @import '/static/icons/iconfont.css';
</style>
```

## Using Iconfont

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
      name: 'text-shape2',
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

## Attention

In fact, iconfont is a text shape.

<br />**1、The `fontFamily` of the text and the `font-family` in iconfont.css shoulde be kept consistent:**<br /> <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*v0CoQoNIyJ8AAAAAAAAAAABkARQnAQ' alt='download' width='600'/>

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*wndRQo6U-oUAAAAAAAAAAABkARQnAQ' alt='download' width='600'/>

**2、The `text` in data is the `content` in iconfont.css. And add an `u` after `\`.**<br />

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*KO-IRbIXRGAAAAAAAAAAAABkARQnAQ' alt='download' width='600'/>

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*teUAQIkCffUAAAAAAAAAAABkARQnAQ' alt='download' width='600'/>

**3、If the iconfonts are rendered wrongly (maybe it is rendered as an empty rect), try the following code to solve it:** <br />

```javascript
// Call the following code after graph.render()
setTimeout(() => {
  graph.paint();
}, 16);
```

## Tool Function getIcon

You can write a function as below to transform unicode. Attention, unicode cannot be connected manually (`\\u${icon.unicode}`). Here we use the `code_decimal` in iconfont.json. For more detail, please refer to [MDN String.fromCodePoint](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCodePoint).

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

### Usage

```javascript
 {
    type: 'text',
    attrs: {
        id: 'node-icon',
        x: 0,
        y: 0,
        fontSize: iconSize,
        fill: primaryColor,
        text: getIcon('logo'), //logo is the name of the unicode
        fontFamily: 'iconfont', // same as font-family: "iconfont"; in CSS
        textAlign: 'center',
        textBaseline: 'middle',
    },
  }
```
