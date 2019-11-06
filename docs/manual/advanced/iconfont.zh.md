---
title: 使用 Iconfont
order: 9
---

## 简介
为什么使用 iconfont？ 兼容性好、种类多、多色等。在此不做过多介绍，请直接移步[阿里巴巴-iconfont平台](https://www.iconfont.cn)。

## 效果
<img src='https://cdn.nlark.com/yuque/0/2019/png/278352/1571125839794-cbba404a-ce90-4cc5-898a-4b545cfd47ed.png#align=left&display=inline&height=568&name=DDBB5DB5-50EF-4F44-BE4C-0983BB49B0D3.png&originHeight=568&originWidth=799&search=&size=221993&status=done&width=799' alt='result' width='450'/>

## 下载字体图标
直接去到[阿里巴巴字体图标库](https://www.iconfont.cn)搜索下载即可，简要操作流程是：搜索图标（例如篮球） ->  选择自己喜欢的图标添加入库  ->  点击页面右上角的购物车可以看到我们加入的图标 -> 添加至项目，如果没有项目到话可以新建一个  ->  在我到项目里面点击下载至本地 -> 解压。如果一切操作正常的话可以得到如下解压文件：<br />
<img src='https://cdn.nlark.com/yuque/0/2019/png/278352/1570869515380-ce180c6b-e1b9-4cc2-ae5c-fc542c564e43.png#align=left&display=inline&height=446&name=20F6E13E-4E32-464B-A413-FF69400B472F.png&originHeight=446&originWidth=1314&search=&size=230616&status=done&width=1314' alt='download' width='550'/>

选中红色区域的所有文件（这里面很多文件是不需要的，为了方便起见，我们全部复制即可，不需要的也不会被打包），复制到项目里面，一般放在目录 'static/icons' 或者 'assets/icons' 下面，如果没有的话可以新建目录，当然你也可以放到任意你喜欢的位置，只要引入的时候路径对即可，到此 iconfont 引入完毕。

PS: 本案文件目录为 '/static/icons'


## 引入G6
多种引入方式，请移步[https://github.com/antvis/g6](https://github.com/antvis/g6)。
<br />PS: 本案例简单粗暴，通过CDN的方式引入。
```html
<script src="https://gw.alipayobjects.com/os/antv/pkg/_antv.g6-3.1.0/build/g6.js"></script>
```

## 添加字体图标
引入方式可自行选择，下面为在 HTML 中引入的例子：
```html
<style>
   @import "/static/icons/iconfont.css";
</style>
```

## 撸代码
```javascript
G6.registerNode("iconfont", {
  draw(cfg, group) {
    const {
      backgroundConfig: backgroundStyle,
      style,
      labelCfg: labelStyle
    } = cfg;

    if (backgroundStyle) {
      group.addShape("circle", {
        attrs: {
          x: 0,
          y: 0,
          r: cfg.size,
          ...backgroundStyle
        }
      });
    }

    const keyShape = group.addShape("text", {
      attrs: {
        x: 0,
        y: 0,
        fontFamily: "iconfont", // 对应css里面的font-family: "iconfont";
        textAlign: "center",
        textBaseline: "middle",
        text: cfg.text,
        fontSize: cfg.size,
        ...style
      }
    });
    const labelY = backgroundStyle ? cfg.size * 2 : cfg.size;

    group.addShape("text", {
      attrs: {
        x: 0,
        y: labelY,
        textAlign: "center",
        text: cfg.label,
        ...labelStyle.style
      }
    });
    return keyShape;
  }
});

const COLOR = "#40a9ff";
const graph = new G6.TreeGraph({
  container: "mountNode",
  width: 800,
  height: 600,
  modes: {
    default: ["collapse-expand", "drag-canvas", "drag-node"]
  },
  defaultNode: {
    backgroundConfig: {
      backgroundType: "circle",
      fill: COLOR,
      stroke: "LightSkyBlue"
    },
    shape: "iconfont",
    size: 12,
    style: {
      fill: "#fff"
    },
    labelCfg: {
      style: {
        fill: COLOR,
        fontSize: 12
      }
    }
  },
  // 布局相关
  layout: {
    type: "compactBox",
    direction: "LR",
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
    }
  }
});

graph.edge(({ target }) => {
  const fill =
        target.get("model").backgroundConfig &&
        target.get("model").backgroundConfig.fill;
  return {
    shape: "cubic-horizontal",
    color: fill || COLOR,
    label: target.get("model").relation || "",
    labelCfg: {
      style: {
        fill: fill || COLOR,
        fontSize: 12
      }
    }
  };
});

const data = {
  isRoot: true,
  id: "Root",
  label: "可疑人员王**",
  text: "&#xe622;", // 对应字体图标的Unicode码，
  style: {
    fill: "red"
  },
  labelCfg: {
    style: {
      fill: "red"
    }
  },
  backgroundConfig: null, // 自定义项，用于判读是否需要圆背景
  size: 30,
  children: [
    {
      id: "SubTreeNode1",
      label: "**网咖",
      text: "&#xe605;",
      relation: "上网",
      children: [
        {
          id: "SubTreeNode2",
          label: "多伦多",
          text: "&#xe64b;"
        },
        {
          id: "id1",
          label: "小王",
          text: "&#xe622;",
          children: [
            {
              id: "SubTreeNode1.2.1",
              label: "182****2123",
              text: "&#xe60d;"
            },
            {
              id: "SubTreeNode4",
              label: "今晚在吗",
              text: "&#xe629;"
            }
          ]
        }
      ]
    },
    {
      id: "SubTreeNode3",
      label: "subway",
      text: "&#xe653;",
      children: [
        {
          id: "SubTreeNode3.1",
          label: "王五",
          text: "&#xe622;"
        },
        {
          id: "SubTreeNode3.2",
          label: "张三",
          text: "&#xe622;"
        }
      ]
    },
    {
      id: "SubTreeNode5",
      label: "小花",
      relation: "老婆",
      text: "&#xe74b;",
      backgroundConfig: {
        fill: "Coral"
      },
      style: {
        fill: "#fff"
      },
      labelCfg: {
        style: {
          fill: "Coral"
        }
      },
      children: [
        {
          id: "SubTreeNode1.2.1",
          label: "182****2123",
          text: "&#xe60d;",
          relation: "通话",
          backgroundConfig: {
            fill: "Coral"
          },
          style: {
            fill: "#fff"
          },
          labelCfg: {
            style: {
              fill: "Coral"
            }
          }
        },
        {
          id: "SubTreeNode3.3",
          label: "凶器",
          text: "&#xe673;",
          relation: "指纹",
          backgroundConfig: {
            fill: "Coral"
          },
          style: {
            fill: "#fff"
          },
          labelCfg: {
            style: {
              fill: "Coral"
            }
          }
        }
      ]
    },
    {
      id: "SubTreeNode6",
      label: "马航37*",
      relation: "乘坐",
      text: "&#xe610;"
    }
  ]
};

graph.data(data);
graph.render();
```

## 注意事项
看了代码大家应该很清楚了，实质就是用了 text 图形，但有几个需要注意的地方：<br />**1、text的fontFamily必须和iconfont.css里面的font-family保持一致：**<br />
<img src='https://cdn.nlark.com/yuque/0/2019/png/278352/1570872937530-c0e6bca4-53d2-40f3-adc5-4bbdae5a4d06.png#align=left&display=inline&height=474&name=19F51E85-4DAF-4FC8-B56C-A5FBAF72E33D.png&originHeight=474&originWidth=1134&search=&size=215903&status=done&width=1134' alt='download' width='600'/>

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*wndRQo6U-oUAAAAAAAAAAABkARQnAQ' alt='download' width='600'/>


**2、data 里面的 text 使用的是 Unicode，需要自行复制。**<br />

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*SV8TRrKFLD8AAAAAAAAAAABkARQnAQ' alt='download' width='600'/>


<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*NF3mQYRurWsAAAAAAAAAAABkARQnAQ' alt='download' width='600'/>
