---
title: Utilize Iconfont
order: 9
---

## Introduction
Due to the good compatibility, type diversity, color diversity, The iconfont is popupar for front-end developments now. Refer to the [Iconfont Library of Alibaba](https://www.iconfont.cn)。

## Effect
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*rJ3lQa0HR-wAAAAAAAAAAABkARQnAQ' alt='result' width='450'/>

## Download the iconfont
Browse the [Iconfont Library of Alibaba](https://www.iconfont.cn) and download the iconfont you like by searching a iconfont -> adding it to your library -> going to your library by clicking the shopping cart logo on the right top -> adding it to your project (new one if you do not have any project) -> downloading the iconfont in 'my project' -> decompressing. You will get the files as shown below if everything is right:<br />
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*EnNmQ5m7xHUAAAAAAAAAAABkARQnAQ' alt='download' width='550'/>

Copy the files in the red area (there are lots of unecessary files, we can still copy them all since the unused files will not be packed)to your project. In general, the iconfont files are on the directory of 'static/icons' or 'assets/icons'. New the directory if there is no such directory. It is also fine to put them into any directory. But note to import the right path when you use it. Now, the importing process is done.

PS: The directory for this example is '/static/icons'.


## Import G6
There are several ways to import G6 introduced in [Getting Started](/en/docs/manual/getting-started)。
<br />PS: We import G6 by CDN in this example.

```html
<script src="https://gw.alipayobjects.com/os/antv/pkg/_antv.g6-3.2.0/build/g6.js"></script>
```

## Import the Iconfont
We import the iconfont in HTML here:

```html
<style>
   @import "/static/icons/iconfont.css";
</style>
```

## Using Iconfont
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
        fontFamily: "iconfont", // Corresponds to the font-family: "iconfont"; in CSS
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
  // Layout configurations
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
  text: "&#xe622;", // The Unicode of the iconfont
  style: {
    fill: "red"
  },
  labelCfg: {
    style: {
      fill: "red"
    }
  },
  backgroundConfig: null, // It is a custom property for judging whether draw the circle background
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
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*v0CoQoNIyJ8AAAAAAAAAAABkARQnAQ' alt='download' width='600'/>

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*wndRQo6U-oUAAAAAAAAAAABkARQnAQ' alt='download' width='600'/>


**2、data 里面的 text 使用的是 Unicode，需要自行复制。**<br />

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*SV8TRrKFLD8AAAAAAAAAAABkARQnAQ' alt='download' width='600'/>


<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*NF3mQYRurWsAAAAAAAAAAABkARQnAQ' alt='download' width='600'/>
