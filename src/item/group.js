/**
 * @fileOverview group item
 * @author huangtonger@aliyun.com
 */

const Util = require('../util/');
const Node = require('./node');

class Group extends Node {
  constructor(cfg) {
    const defaultCfg = {
      type: 'group',
      isNode: false,
      isGroup: true,
      zIndex: 1
    };
    Util.mix(defaultCfg, cfg);
    super(defaultCfg);
  }
  _beforeDraw() {
    this.deepEach((child, parent) => {
      if (parent) {
        child.zIndex = parent.zIndex + 1;
      }
      child.updateCollapsedParent();
      if (child.collapsedParent) {
        child.hide();
      } else {
        child.show();
      }
    });
    this.getInnerEdges().forEach(child => {
      const bool = child.linkedItemVisible();
      if (bool) {
        child.show();
      } else {
        child.hide();
      }
    });
    super._beforeDraw();
  }
  updatePosition() {

  }
  _shouldDraw() {
    return true;
  }
  /**
   * get cross group edge
   * @return {array} edges
   */
  getCrossEdges() {
    const allChildrenIds = [];
    const innerEdges = this.getInnerEdges();
    this.deepEach(child => {
      allChildrenIds.push(child.id);
    });
    const rst = innerEdges.filter(edge => {
      const edgeModel = edge.getModel();
      return allChildrenIds.indexOf(edgeModel.source) === -1 ||
      allChildrenIds.indexOf(edgeModel.target) === -1;
    });
    return Util.uniq(rst);
  }
  /**
   * get all inner edges
   * @return {array} edges
   */
  getInnerEdges() {
    const edges = [];
    this.deepEach(child => {
      child.getEdges().forEach(edge => {
        edges.push(edge);
      });
    });
    return Util.uniq(edges);
  }
  /**
   * get children BBox
   * @return {object} box
   */
  getChildrenBBox() {
    const children = this.getChildren();
    const graphicChildren = children.map(child => {
      return child.getGraphicGroup();
    });
    return Util.getChildrenBBox(graphicChildren);
  }
}

module.exports = Group;
