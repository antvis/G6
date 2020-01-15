import isArray from '@antv/util/lib/is-array'
import isNil from '@antv/util/lib/is-nil'
import isNumber from "@antv/util/lib/is-number";
import isString from '@antv/util/lib/is-string'
import { G6GraphEvent } from '../interface/behavior';
import { IG6GraphEvent, Padding, Matrix } from '../../types';
import { mat3 } from '@antv/matrix-util/lib';
import mix from '@antv/util/lib/mix';
import deepMix from '@antv/util/lib/deep-mix';
import { transform } from '@antv/matrix-util';

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
  } else if(isString(padding)) {
    const intPadding = parseInt(padding, 10)
    top = left = right = bottom = intPadding;
  } else if (isArray(padding)) {
    top = padding[0];
    right = !isNil(padding[1]) ? padding[1] : padding[0];
    bottom = !isNil(padding[2]) ? padding[2] : padding[0];
    left = !isNil(padding[3]) ? padding[3] : right;
  }
  return [ top, right, bottom, left ];
}

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
  event.item = e.item;
  return event;
}

/**
 * 判断 viewport 是否改变，通过和单位矩阵对比
 * @param matrix Viewport 的 Matrix
 */
export const isViewportChanged = (matrix: Matrix) => {
  // matrix 为 null， 则说明没有变化
  if(!matrix) {
    return false
  }

  const MATRIX_LEN = 9
  const ORIGIN_MATRIX = mat3.create()

  for (let i = 0; i < MATRIX_LEN; i++) {
    if (matrix[i] !== ORIGIN_MATRIX[i]) {
      return true;
    }
  }
  return false;
}

export default {
  mat3,
  mix,
  deepMix,
  transform
}