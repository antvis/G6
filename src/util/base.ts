import isArray from '@antv/util/lib/is-array';
import isNil from '@antv/util/lib/is-nil';
import isNumber from '@antv/util/lib/is-number';
import isString from '@antv/util/lib/is-string';
import { G6GraphEvent } from '../interface/behavior';
import { IG6GraphEvent, Padding, Matrix, Item } from '../types';
import { mat3 } from '@antv/matrix-util/lib';

/**
 * turn padding into [top, right, bottom, right]
 * @param  {Number|Array} padding input padding
 * @return {array} output
 */
export const formatPadding = (padding: Padding): number[] => {
  let top = 0;
  let left = 0;
  let right = 0;
  let bottom = 0;

  if (isNumber(padding)) {
    top = left = right = bottom = padding;
  } else if (isString(padding)) {
    const intPadding = parseInt(padding, 10);
    top = left = right = bottom = intPadding;
  } else if (isArray(padding)) {
    top = padding[0];
    right = !isNil(padding[1]) ? padding[1] : padding[0];
    bottom = !isNil(padding[2]) ? padding[2] : padding[0];
    left = !isNil(padding[3]) ? padding[3] : right;
  }
  return [top, right, bottom, left];
};

/**
 * clone event
 * @param e
 */
export const cloneEvent = (e: IG6GraphEvent) => {
  const event = new G6GraphEvent(e.type, e);
  event.clientX = e.clientX;
  event.clientY = e.clientY;
  event.x = e.x;
  event.y = e.y;
  event.target = e.target;
  event.currentTarget = e.currentTarget;
  event.bubbles = true;
  (event.item as Item | null) = e.item;
  return event;
};

/**
 * 判断 viewport 是否改变，通过和单位矩阵对比
 * @param matrix Viewport 的 Matrix
 */
export const isViewportChanged = (matrix: Matrix) => {
  // matrix 为 null， 则说明没有变化
  if (!matrix) {
    return false;
  }

  const MATRIX_LEN = 9;
  const ORIGIN_MATRIX = mat3.create();

  for (let i = 0; i < MATRIX_LEN; i++) {
    if (matrix[i] !== ORIGIN_MATRIX[i]) {
      return true;
    }
  }
  return false;
};

export const isNaN = (input: any) => Number.isNaN(Number(input));

/**
 * 计算一组 Item 的 BBox
 * @param items 选中的一组Item，可以是 node 或 combo
 */
export const calculationItemsBBox = (items: Item[]) => {
  let minx = Infinity;
  let maxx = -Infinity;
  let miny = Infinity;
  let maxy = -Infinity;

  // 获取已节点的所有最大最小x y值
  for (let i = 0; i < items.length; i++) {
    const element = items[i];
    const bbox = element.getBBox();
    const { minX, minY, maxX, maxY } = bbox;
    if (minX < minx) {
      minx = minX;
    }

    if (minY < miny) {
      miny = minY;
    }

    if (maxX > maxx) {
      maxx = maxX;
    }

    if (maxY > maxy) {
      maxy = maxY;
    }
  }

  const x = Math.floor(minx);
  const y = Math.floor(miny);
  const width = Math.ceil(maxx) - Math.floor(minx);
  const height = Math.ceil(maxy) - Math.floor(miny);

  return {
    x,
    y,
    width,
    height,
    minX: minx,
    minY: miny,
  };
}


/**
 * 调用 gpuDetector.webgl 判断当前浏览器是否支持 webgl。（支持 gpgpu 的浏览器一定也支持 webgl）
 */
export const gpuDetector = {
  canvas: !!window.CanvasRenderingContext2D,
  webgl: (function () {
    try {
      const canvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (e) {
      return false;
    }
  })(),
  workers: !!window.Worker,
  fileapi: window.File && window.FileReader && window.FileList && window.Blob,
  getWebGLErrorMessage: function () {
    const element = document.createElement('div');
    element.id = 'webgl-error-message';
    element.style.fontFamily = 'monospace';
    element.style.fontSize = '13px';
    element.style.fontWeight = 'normal';
    element.style.textAlign = 'center';
    element.style.background = '#fff';
    element.style.color = '#000';
    element.style.padding = '1.5em';
    element.style.width = '400px';
    element.style.margin = '5em auto 0';
    if (!this.webgl) {
      element.innerHTML = window.WebGLRenderingContext ? [
        'Your graphics card does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" rel="external nofollow" rel="external nofollow" style="color:#000">WebGL</a>.<br />',
        'Find out how to get it <a href="http://get.webgl.org/" rel="external nofollow" rel="external nofollow" style="color:#000">here</a>.'
      ].join('\n') : [
        'Your browser does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" rel="external nofollow" rel="external nofollow" style="color:#000">WebGL</a>.<br/>',
        'Find out how to get it <a href="http://get.webgl.org/" rel="external nofollow" rel="external nofollow" style="color:#000">here</a>.'
      ].join('\n');
    }
    return element;
  },
  addGetWebGLMessage: function (parameters) {
    let parent, id, element;
    parameters = parameters || {};
    parent = parameters.parent !== undefined ? parameters.parent : document.body;
    id = parameters.id !== undefined ? parameters.id : 'oldie';
    element = gpuDetector.getWebGLErrorMessage();
    element.id = id;
    parent.appendChild(element);
  }
};