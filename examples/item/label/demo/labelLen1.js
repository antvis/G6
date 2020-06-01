import G6 from '@antv/g6';
/**
 * Process the long label by breaking the text
 * by Jingxi
 *
 */


/**
 * format the string
 * @param {string} str The origin string
 * @param {number} maxWidth max width
 * @param {number} fontSize font size
 * @return {string} the processed result
 */
const fittingString = (str, maxWidth, fontSize) => {
  let currentWidth = 0;
  let res = str;
  const pattern = new RegExp("[\u4E00-\u9FA5]+"); // distinguish the Chinese charactors and letters
  str.split('').forEach((letter, i) => {
    if (currentWidth > maxWidth) return;
    if (pattern.test(letter)) {
      // Chinese charactors
      currentWidth += fontSize;
    } else {
      // get the width of single letter according to the fontSize
      currentWidth += G6.Util.getLetterWidth(letter, fontSize);
    }
    if (currentWidth > maxWidth) {
      res = `${str.substr(0, i)}\n${str.substr(i)}`;
    }
  });
  return res;
};


const globalFontSize = 12;
const data = {
  nodes: [
    {
      x: 100,
      y: 100,
      label: fittingString('Break the line if it is too long', 80, globalFontSize),
      id: 'node1',
      labelCfg: {
        position: 'bottom',
      },
      anchorPoints: [
        [0, 0.5],
        [1, 0.5],
      ],
    },
    {
      x: 300,
      y: 100,
      label: fittingString('Break the line if it is too long', 80, globalFontSize),
      id: 'node2',
      labelCfg: {
        position: 'bottom',
      },
      anchorPoints: [
        [0, 0.5],
        [1, 0.5],
      ],
    },
  ],
  edges: [
    {
      source: 'node1',
      target: 'node2',
      label: fittingString('Break the line if it is too long', 100, globalFontSize),
      labelCfg: {
        refY: 20,
      },
      style: {
        endArrow: true,
      },
    },
  ],
};

const width = document.getElementById('container').scrollWidth;
const height = document.getElementById('container').scrollHeight || 500;
const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  // translate the graph to align the canvas's center, support by v3.5.1
  fitCenter: true,
  defaultNode: {
    type: 'rect',
    style: {
      fill: '#DEE9FF',
      stroke: '#5B8FF9',
    },
  },
  defaultEdge: {
    color: '#F6BD16',
  },
});
graph.data(data);
graph.render();
