/**
 * @fileOverview quadTree
 * @author shiwu.wyy@antfin.com
 */
class QuadTree {
  // each quadtree represents a quadrant and an aggregate body
  // that represents all bodies inside the quadrant
  constructor(param) {
    /**
     * (aggregated) body in this quad
     * @type  {object}
     */
    this.body = null;
    /**
     * tree representing the northwest quadrant
     * @type  {object}
     */
    this.quad = null;
    this.NW = null;
    this.NE = null;
    this.SW = null;
    this.SE = null;
    /**
     * threshold
     * @type  {number}
     */
    this.theta = 0.5;
    if (param != null) this.quad = param;
  }
  // insert a body(node) into the tree
  insert(bo) {
    // if this node does not contain a body, put the new body bo here
    if (this.body == null) {
      this.body = bo;
      return;
    }
    // internal node
    if (!this._isExternal()) {
      // update mass info
      this.body = this.body.add(bo);
      // insert body into quadrant
      this._putBody(bo);
    } else { // external node
      // divide this region into four children
      this.NW = new QuadTree(this.quad.NW());
      this.NE = new QuadTree(this.quad.NE());
      this.SW = new QuadTree(this.quad.SW());
      this.SE = new QuadTree(this.quad.SE());

      // insert this body and bo
      this._putBody(this.body);
      this._putBody(bo);
      // update the mass info
      this.body = this.body.add(bo);

    }
  }
  // inserts bo into a quad
  _putBody(bo) {
    if (bo.in(this.quad.NW())) this.NW.insert(bo);
    else if (bo.in(this.quad.NE())) this.NE.insert(bo);
    else if (bo.in(this.quad.SW())) this.SW.insert(bo);
    else if (bo.in(this.quad.SE())) this.SE.insert(bo);
  }
  _isExternal() {
    // four children are null
    return (this.NW == null && this.NE == null && this.SW == null && this.SE == null);
  }
  // update the forces
  updateForce(bo) {
    if (this.body == null || bo === this.body) {
      return;
    }
    // if the current node is external
    if (this._isExternal()) bo.addForce(this.body);
    // internal nodes
    else {
      const s = this.quad.getLength();
      const d = this.body.distanceTo(bo);
      // b is far enough
      if ((s / d) < this.theta) bo.addForce(this.body);
      else {
        this.NW.updateForce(bo);
        this.NE.updateForce(bo);
        this.SW.updateForce(bo);
        this.SE.updateForce(bo);
      }
    }
  }
}
module.exports = QuadTree;
