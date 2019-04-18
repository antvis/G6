/**
 * 用于测试文本或者 html 节点大小，考虑到用户可以设置节点label 某些 svg 属性样式来影响内部元素尺寸，故这里采用 foreignObject 来测量尺寸，当label 为 html 元素时，在labelCfg中设置的样式会被设置到foreignObject上，而 label 会被插入foreignObject，以能够继承某些属性样式。
 * @fileOverview htmlSizeMeasure
 * @author wangwei
 */

const Util = require('./base');
const G = require('@antv/g/lib');
const effectSizeAttrs = {
  fontSize: 'font-size',
  fontWeight: 'font-weight',
  fontFamily: 'font-family',
  style: 'style'
};
function initTestSizeSvg(id = 'svg-for-test') {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.id = id;
  Util.modifyCSS(svg, {
    position: 'absolute',
    zIndex: '-9999',
    visibility: 'hidden'
  });
  document.body.appendChild(svg);
  return initMeasureGroupForHtmlLabel(svg);
}

function initMeasureGroupForHtmlLabel(svgRoot) {
  const foriegnObjectForTest = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
  foriegnObjectForTest.style.boxSizing = 'padding-box';
  foriegnObjectForTest.setAttribute('width', 1000);
  foriegnObjectForTest.setAttribute('height', 1000);
  svgRoot.appendChild(foriegnObjectForTest);
  const htmlContainerForTest = Util.createDom('<div style="display:inline-block"></div>');
  foriegnObjectForTest.appendChild(htmlContainerForTest);
  return function(html, attrs) {
    if (typeof html === 'string') {
      html = Util.createDom(html);
    } else if (!html instanceof HTMLElement) {
      console.error('the element is not HTMLElement,can\'t measure its\'size');
      return [ null, null ];
    }
    const hasAttr = [];
    for (const attr in attrs) {
      const fAttr = effectSizeAttrs[attr];
      if (fAttr) {
        hasAttr.push(attr);
        foriegnObjectForTest.setAttribute(fAttr, attrs[attr]);
      }
    }
    htmlContainerForTest.appendChild(html);
    const { width, height } = htmlContainerForTest.getBoundingClientRect();
    hasAttr.forEach(attr => {
      foriegnObjectForTest.removeAttribute(attr);
    });
    htmlContainerForTest.removeChild(html);
    return [ width, height ];
  };
}

function textSizeMeasure(string, attrs) {
  if (Util.isString(string)) {
    string = new G.Text({ attrs });
  }
  if (!string instanceof G.Text) {
    console.error('the string is not G.Text, can\'t measure its\' size');
    return [ null, null ];
  }
  const { width, height } = string.getBBox();
  return [ width, height ];
}

module.exports = {
  htmlSizeMeasure: initTestSizeSvg(),
  textSizeMeasure
};

