import G6 from "@antv/g6";

/**
 * Process the long label, hover to show the complete label, click the icon to copy the label
 * provided by GitHub user @WontonCat
 * Thanks for contributing!
 */

 const tipDiv = document.createElement('div');
 tipDiv.innerHTML = `Hover to show the complete label, click the icon to copy the content. Hover 显示完整 label，点击左侧 icon 复制 label 内容`;
 document.getElementById('container').appendChild(tipDiv);


/**
 * format the string
 * @param {string} str The origin string
 * @param {number} maxWidth max width
 * @param {number} fontSize font size
 * @return {string} the processed result
 */
const fittingString = (str, maxWidth, fontSize) => {
  const ellipsis = "...";
  const ellipsisLength = G6.Util.getTextSize(ellipsis, fontSize)[0];
  let currentWidth = 0;
  let res = str;
  const pattern = new RegExp("[\u4E00-\u9FA5]+"); // distinguish the Chinese charactors and letters
  str.split("").forEach((letter, i) => {
    if (currentWidth > maxWidth - ellipsisLength) return;
    if (pattern.test(letter)) {
      // Chinese charactors
      currentWidth += fontSize;
    } else {
      // get the width of single letter according to the fontSize
      currentWidth += G6.Util.getLetterWidth(letter, fontSize);
    }
    if (currentWidth > maxWidth - ellipsisLength) {
      res = `${str.substr(0, i)}${ellipsis}`;
    }
  });
  return res;
};

const copyStr = (str) => {
  const input = document.createElement("textarea");
  input.value = str;
  document.body.appendChild(input);
  input.select();
  document.execCommand("Copy");
  document.body.removeChild(input);
  alert("Copy Success!");
};

const data = {
  nodes: [
    {
      x: 100,
      y: 0,
      id: "node1",
      topText: "This label is too long to be displayed",
      bottomText: "This label is too long to be displayed"
    },
    {
      x: 100,
      y: 100,
      id: "node2",
      topText: "Short Label",
      bottomText: "Click the Logo to Copy!"
    }
  ]
};

const width = document.getElementById("container").scrollWidth;
const height = document.getElementById("container").scrollHeight || 500;
const graph = new G6.Graph({
  container: "container",
  width,
  height: height - 50,
  // translate the graph to align the canvas's center, support by v3.5.1
  fitCenter: true,
  defaultNode: {
    type: "copy-node"
  },
  defaultEdge: {
    color: "#F6BD16"
  }
});

const nodeHeight = 80;
const nodeWidth = 200;
const fillColor = "#f6e9d7";
const fontColor = "#ff7900";
const padding = 7;

G6.registerNode(
  "copy-node",
  {
    drawShape: function drawShape(cfg, group) {
      const rect = group.addShape("rect", {
        attrs: {
          x: 0,
          y: 0,
          height: nodeHeight,
          width: nodeWidth,
          fill: fillColor,
          stroke: fontColor,
          lineWidth: 2,
          radius: 5
        }
      });

      // 上部文字区域
      const topGroup = group.addGroup({
        name: "top-group"
      });

      topGroup.addShape("rect", {
        attrs: {
          fill: "#fff",
          stroke: "#c7d0d1",
          x: padding,
          y: padding,
          width: nodeWidth - padding * 2,
          height: 0.5 * nodeHeight - padding,
          lineWidth: 1.5,
          radius: 4
        }
      });

      topGroup.addShape("text", {
        attrs: {
          text: fittingString(cfg.topText, nodeWidth - padding * 2 - 10, 14),
          x: 0.5 * nodeWidth,
          y: (0.5 * nodeHeight + padding) * 0.5,
          fontSize: 14,
          textAlign: "center",
          textBaseline: "middle",
          shadowColor: fontColor,
          fill: fontColor
        },
        name: "top-text"
      });

      topGroup.addShape("image", {
        attrs: {
          x: padding + 5,
          y: padding + (0.5 * nodeHeight - padding) * 0.5 - 10,
          height: 20,
          width: 20,
          img: "https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png",
          opacity: 0,
          cursor: "pointer"
        },
        name: "top-copy-img"
      });

      // 下部文字区域
      const bottomGroup = group.addGroup({
        name: "bottom-group"
      });

      bottomGroup.addShape("text", {
        attrs: {
          text: fittingString(cfg.bottomText, nodeWidth - 10, 14),
          x: 0.5 * nodeWidth,
          y: nodeHeight - (0.5 * nodeHeight + padding) * 0.5,
          fontSize: 14,
          textAlign: "center",
          textBaseline: "middle",
          shadowColor: fontColor,
          fill: fontColor
        },
        name: "bottom-text"
      });

      bottomGroup.addShape("image", {
        attrs: {
          x: 5,
          y: 0.5 * nodeHeight + 8,
          height: 20,
          width: 20,
          img: "https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png",
          opacity: 0,
          cursor: "pointer"
        },
        name: "bottom-copy-img"
      });

      return rect;
    },
    setState(name, value, item) {
      const group = item.get("group");
      const model = item.get("model");
      const { topText, bottomText } = model;

      if (name === "top-group-active") {
        const img = group.find((e) => e.get("name") === "top-copy-img");
        img.attr({
          opacity: value ? 1 : 0
        });

        const text = group.find((e) => e.get("name") === "top-text");
        // 区域是否够长 ? 居中， 展示内容不变 : 左对其， 展示完整
        const cutStr = fittingString(topText, nodeWidth - padding * 2 - 10, 14);
        if (cutStr === topText) {
          text.attr({
            fontWeight: value ? 800 : 700,
            shadowBlur: value ? 12.2 : 0,
            text: value
              ? topText
              : fittingString(topText, nodeWidth - padding * 2 - 10, 14)
          });
        } else {
          text.attr({
            fontWeight: value ? 800 : 700,
            x: value ? padding + 30 : 0.5 * nodeWidth,
            shadowBlur: value ? 12.2 : 0,
            textAlign: value ? "left" : "center",
            text: value
              ? topText
              : fittingString(topText, nodeWidth - padding * 2 - 10, 14)
          });
        }
      }

      if (name === "bottom-group-active") {
        const img = group.find((e) => e.get("name") === "bottom-copy-img");
        img.attr({
          opacity: value ? 1 : 0
        });

        const text = group.find((e) => e.get("name") === "bottom-text");
        const cutStr = fittingString(bottomText, nodeWidth - 10, 14);

        if (cutStr === bottomText) {
          text.attr({
            fontWeight: value ? 800 : 700,
            shadowBlur: value ? 12.2 : 0,
            text: value
              ? bottomText
              : fittingString(bottomText, nodeWidth - 10, 14)
          });
        } else {
          text.attr({
            fontWeight: value ? 800 : 700,
            x: value ? 30 : 0.5 * nodeWidth,
            shadowBlur: value ? 12.2 : 0,
            textAlign: value ? "left" : "center",
            text: value
              ? bottomText
              : fittingString(bottomText, nodeWidth - 10, 14)
          });
        }
      }
    }
  },
  "single-node"
);

graph.on("top-group:mouseenter", (e) => {
  graph.setItemState(e.item, "top-group-active", true);
});
graph.on("top-group:mouseleave", (e) => {
  graph.setItemState(e.item, "top-group-active", false);
});
graph.on("bottom-group:mouseenter", (e) => {
  graph.setItemState(e.item, "bottom-group-active", true);
});
graph.on("bottom-group:mouseleave", (e) => {
  graph.setItemState(e.item, "bottom-group-active", false);
});

graph.on("node:click", (e) => {
  const name = e.target.get("name");
  const model = e.item.get("model");
  if (name === "top-copy-img") {
    const text = model.topText;
    copyStr(text);
  } else if (name === "bottom-copy-img") {
    const text = model.bottomText;
    copyStr(text);
  }
});
graph.data(data);
graph.render();
