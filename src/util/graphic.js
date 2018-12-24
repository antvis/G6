/**
 * @fileOverview graphic util
 * @author huangtonger@aliyun.com
 */

const MathUtil = require('./math');
const BaseUtil = require('./base');

const GraphicUtil = {
  /**
   * set box1 into box2
   * @param  {object} box1 - box1
   * @param  {object} box2 - box2
   * @param  {array} padding - autozoom padding
   * @param  {function} limitRatio - limit ratio callback
   * @return {object} matrix
   */
  getAutoZoomMatrix(box1, box2, padding, limitRatio) {
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
    if (limitRatio) ratio = limitRatio(ratio);
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
  /**
   * get total bbox
   * @param  {array} boxes boxes
   * @return {object} box
   */
  getTotalBBox(boxes) {
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;
    boxes.forEach(box => {
      if (box.minX < minX) {
        minX = box.minX;
      }

      if (box.maxX > maxX) {
        maxX = box.maxX;
      }

      if (box.minY < minY) {
        minY = box.minY;
      }

      if (box.maxY > maxY) {
        maxY = box.maxY;
      }
    });
    return {
      minX,
      minY,
      maxX,
      maxY,
      width: maxX - minX,
      height: maxY - minY
    };
  },
  /**
   * get children bbox
   * @param  {array} children g children
   * @return {object} box
   */
  getChildrenBBox(children) {
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;
    BaseUtil.each(children, function(child) {
      const box = child.isGroup ? GraphicUtil.getChildrenBBox(child.get('children')) : child.getBBox();
      if (!box) {
        return true;
      }
      const leftTop = [ box.minX, box.minY, 1 ];
      const leftBottom = [ box.minX, box.maxY, 1 ];
      const rightTop = [ box.maxX, box.minY, 1 ];
      const rightBottom = [ box.maxX, box.maxY, 1 ];

      child.apply(leftTop);
      child.apply(leftBottom);
      child.apply(rightTop);
      child.apply(rightBottom);

      const boxMinX = Math.min(leftTop[0], leftBottom[0], rightTop[0], rightBottom[0]);
      const boxMaxX = Math.max(leftTop[0], leftBottom[0], rightTop[0], rightBottom[0]);
      const boxMinY = Math.min(leftTop[1], leftBottom[1], rightTop[1], rightBottom[1]);
      const boxMaxY = Math.max(leftTop[1], leftBottom[1], rightTop[1], rightBottom[1]);

      if (boxMinX < minX) {
        minX = boxMinX;
      }

      if (boxMaxX > maxX) {
        maxX = boxMaxX;
      }

      if (boxMinY < minY) {
        minY = boxMinY;
      }

      if (boxMaxY > maxY) {
        maxY = boxMaxY;
      }
    });
    const box = {
      minX,
      minY,
      maxX,
      maxY
    };
    box.x = box.minX;
    box.y = box.minY;
    box.width = box.maxX - box.minX;
    box.height = box.maxY - box.minY;
    box.centerX = (box.minX + box.maxX) / 2;
    box.centerY = (box.minY + box.maxY) / 2;
    return box;
  },
  /**
   * get bbox apply root matrix
   * @param  {number} element g element
   * @param  {number} root    g group (should be element parent) or matix
   * @return {object} applied point
   */
  getBBox(element, root) {
    const bbox = element.getBBox();
    let leftTop = {
      x: bbox.minX,
      y: bbox.minY
    };
    let rightBottom = {
      x: bbox.maxX,
      y: bbox.maxY
    };
    let parent;
    if (root.isGroup) {
      parent = element;
      while (parent !== root) {
        const matrix = parent.getMatrix();
        leftTop = MathUtil.applyMatrix(leftTop, matrix);
        rightBottom = MathUtil.applyMatrix(rightBottom, matrix);
        parent = parent.getParent();
      }
      const matrix = parent.getMatrix();
      leftTop = MathUtil.applyMatrix(leftTop, matrix);
      rightBottom = MathUtil.applyMatrix(rightBottom, matrix);
    } else {
      leftTop = MathUtil.applyMatrix(leftTop, root);
      rightBottom = MathUtil.applyMatrix(rightBottom, root);
    }
    return {
      minX: leftTop.x,
      minY: leftTop.y,
      maxX: rightBottom.x,
      maxY: rightBottom.y
    };
  },
  /**
   * element to back
   * @param  {object} element g shape or group
   */
  toBack(element) {
    element.toBack();
  },
  /**
   * element to front
   * @param  {object} element g shape or group
   */
  toFront(element) {
    element.toFront();
  }
};

module.exports = GraphicUtil;
