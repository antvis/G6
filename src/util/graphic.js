/**
 * @fileOverview graphic util
 * @author huangtonger@aliyun.com
 */

const MathUtil = require('./math');

const GraphicUtil = {
  /**
   * set box1 into box2
   * @param  {object} box1 - box1
   * @param  {object} box2 - box2
   * @param  {array} padding - autozoom padding
   * @param  {function} limitRtio - limit ratio callback
   * @return {object} matrix
   */
  getAutoZoomMatrix(box1, box2, padding, limitRtio) {
    const matrix = [ 1, 0, 0, 0, 1, 0, 0, 0, 1 ];
    const width = box1.maxX - box1.minX;
    const height = box1.maxY - box1.minY;
    const centerX = (box2.maxX + box2.minX) / 2;
    const centerY = (box2.maxY + box2.minY) / 2;
    const cWidth = width - padding[1] - padding[3];
    const cHeight = height - padding[0] - padding[2];
    const bWidth = box2.maxX - box2.minX;
    const bHeight = box2.maxY - box2.minY;
    let ratio = Math.min(cHeight / bHeight, cWidth / bWidth);
    if (limitRtio) ratio = limitRtio(ratio);
    MathUtil.mat3.translate(matrix, matrix, [ -centerX, -centerY ]);
    MathUtil.mat3.scale(matrix, matrix, [ ratio, ratio ]);
    MathUtil.mat3.translate(matrix, matrix, [ width / 2, height / 2 ]);
    return matrix;
  },
  /**
   * get nine block box location
   * @param  {string} position could be 'tl' 'lc' 'bl' 'cc' 'tc' 'tr' 'rc' 'br' 'bc' default to be 'tl'
   * @param  {object} containerBox container box
   * @param  {number} width graph width
   * @param  {number} height graph height
   * @param  {array} padding padding
   * @return {object} left top point
   */
  getNineBoxPosition(position, containerBox, width, height, padding) {
    const startPoint = {};
    switch (position) {
      case 'tl':
        startPoint.y = containerBox.x + padding[0];
        startPoint.x = containerBox.y + padding[3];
        break;
      case 'lc':
        startPoint.y = (containerBox.height - height) / 2;
        startPoint.x = padding[3];
        break;
      case 'bl':
        startPoint.y = containerBox.height - height - padding[2];
        startPoint.x = padding[3];
        break;
      case 'cc':
        startPoint.y = (containerBox.height - height) / 2;
        startPoint.x = (containerBox.width - width) / 2;
        break;
      case 'tc':
        startPoint.y = padding[0];
        startPoint.x = (containerBox.width - width) / 2;
        break;
      case 'tr':
        startPoint.y = padding[0];
        startPoint.x = containerBox.width - width - padding[1];
        break;
      case 'rc':
        startPoint.y = (containerBox.height - height) / 2;
        startPoint.x = containerBox.width - width - padding[1];
        break;
      case 'br':
        startPoint.y = containerBox.height - height - padding[2];
        startPoint.x = containerBox.width - width - padding[1];
        break;
      case 'bc':
        startPoint.y = (containerBox.height - height - padding[2]);
        startPoint.x = (containerBox.width - width) / 2;
        break;
      default:
        startPoint.y = containerBox.x + padding[0];
        startPoint.x = containerBox.y + padding[3];
        break;
    }
    startPoint.x += containerBox.x;
    startPoint.y += containerBox.y;
    return startPoint;
  },
  getBBox(element, parent) {
    const bbox = element.getBBox();
    let leftTop = {
      x: bbox.minX,
      y: bbox.minY
    };
    let rightBottom = {
      x: bbox.maxX,
      y: bbox.maxY
    };
    // 根据父元素变换矩阵
    if (parent) {
      const matrix = parent.getMatrix();
      leftTop = MathUtil.applyMatrix(leftTop, matrix);
      rightBottom = MathUtil.applyMatrix(rightBottom, matrix);
    }

    return {
      minX: leftTop.x,
      minY: leftTop.y,
      maxX: rightBottom.x,
      maxY: rightBottom.y
    };
  }
};

module.exports = GraphicUtil;
