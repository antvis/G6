/**
 * @fileOverview tree
 * @author huangtonger@aliyun.com
 */

const Util = require('./util/');
const Graph = require('./graph');
const Layouts = require('./layouts/');

class Tree extends Graph {
  constructor(inputCfg) {
    const cfg = Util.mix({
      layout: new Layouts.CompactBoxTree({
        getHGap() {
          return 10;
        },
        getVGap() {
          return 10;
        }
      }),
      _type: 'tree'
    }, inputCfg);
    super(cfg);
  }
  initEvent() {
    this.on('afterdrawinner', () => {
      const source = this.get('_sourceData');
      source.roots.forEach(root => {
        const rootItem = this.find(root.id);
        this._setVisibleByCollapsed(rootItem);
      });
    });
  }
  _executeLayout(processor) {
    const source = this.get('_sourceData');
    if (Util.isFunction(processor)) {
      processor(source.roots, this);
    } else if (Util.isObject(processor)) {
      processor.roots = source.roots;
      processor.graph = this;
      processor.execute();
    }
  }
  getHierarchy(item) {
    item = this.getItem(item);
    const dataMap = this.get('_dataMap');
    const model = item.getModel();
    let { parent } = model;
    let hierarchy = 1;
    while (parent) {
      parent = dataMap[parent].parent;
      hierarchy++;
    }
    return hierarchy;
  }
  parseSource(data) {
    const roots = data.roots;
    const dataMap = this.get('_dataMap');
    const nodes = [];
    const edges = [];
    if (!roots) {
      throw new Error('please set data.roots!');
    }
    roots.forEach(root => {
      Util.traverseTree(root, (child, parent) => {
        if (!child.id) {
          child.id = Util.guid();
        }
        if (!parent) {
          parent = dataMap[child.parent];
        }
        if (parent) {
          child.parent = parent.id;
          if (!parent.id) {
            parent.id = Util.guid();
          }
          edges.push({
            source: parent.id,
            target: child.id,
            id: parent.id + '-' + child.id
          });
        }
        nodes.push(child);
      }, parent => {
        return parent.children;
      }, true);
    });

    return {
      nodes,
      edges
    };
  }
  // input an item set it's children visiable
  _setVisibleByCollapsed(item) {
    const model = item.getModel();
    if (item.collapsedParent) {
      // hide all
      item.hide();
      item.getEdges().forEach(edge => {
        edge.hide();
      });
      item.deepEach(node => {
        node.hide();
        node.getEdges().forEach(edge => {
          edge.hide();
        });
      });
    } else if (model.collapsed) {
      // hide all children
      item.deepEach(node => {
        node.hide();
        node.getEdges().forEach(edge => {
          edge.hide();
        });
      });
    } else {
      // hide a part of children
      item.deepEach(node => {
        if (node.collapsedParent) {
          node.hide();
          node.getEdges().forEach(edge => {
            edge.hide();
          });
        }
      });
    }
  }
  /**
   * @param {object} data tree data
   */
  source(data) {
    const _data = this.parseSource(data);
    this.emit('beforesource');
    this.set('_sourceData', data);
    this.set('_data', _data);
    this.emit('aftersource');
  }
  /**
   * @param {object} node item node
   * @param {object} nth nth
   */
  _setNodeNth(node, nth) {
    node = this.getItem(node);
    const model = node.getModel();
    const parent = node.getParent();
    const parentModel = parent.getModel();
    const children = parentModel.children;
    Util.Array.remove(children, model);
    children.splice(nth, 0, model);
  }
  /**
   * @param {object} node item node
   * @return {number} nth
   */
  getNth(node) {
    node = this.getItem(node);
    const model = node.getModel();
    const parent = node.getParent();
    const parentModel = parent.getModel();
    return parentModel.children.indexOf(model);
  }
  /**
   * @param {string} type item type
   * @param {object} model data model
   * @return {Graph} this
   */
  add(type, model) {
    const dataMap = this.get('_dataMap');
    const parent = dataMap[model.parent];
    const ev = {
      action: 'add',
      model
    };
    let item;
    if (type !== 'node' && type !== 'guide') {
      console.warn('Tree do not support add type ' + type + '!');
      return;
    }
    this.emit('beforechange', ev);
    if (type === 'node') {
      if (!parent) {
        throw new Error('please set available parent Id !');
      }
      if (Util.isArray(parent.children)) {
        parent.children.push(model);
      } else {
        parent.children = [ model ];
      }
      const data = this.parseSource({
        roots: [ model ]
      });
      this._addItems('node', data.nodes);
      this._addItems('edge', data.edges);
      item = this.find(model.id);
      this._setVisibleByCollapsed(item);
      // set node nth
      if (!Util.isNil(model.nth)) {
        this._setNodeNth(item, model.nth);
      }
      this.find(parent.id).forceUpdate();
    } else {
      this._addItems(type, [ model ]);
      item = this.find(model.id);
    }
    ev.item = item;
    this.emit('afterchange', ev);
    return item;
  }
  /**
   * @param {string|Item} item target item
   * @param {object} model data model
   * @return {Graph} this
   */
  update(item, model) {
    if (!model) {
      return;
    }
    item = this.getItem(item);
    const itemModel = item.getModel();
    const originModel = Util.mix({}, itemModel);
    const ev = {
      action: 'update',
      item,
      originModel,
      updateModel: model
    };

    this.emit('beforechange', ev);
    this._updateItems([ item ], [ model ]);

    if (item.isNode) {
      // deal collapsed
      if ('collapsed' in model) {
        if (model.collapsed) {
          item.deepEach(child => {
            child.hide();
            child.getEdges().forEach(edge => {
              edge.hide();
            });
          });
        } else {
          item.deepEach(child => {
            child.show();
            child.getInEdges().forEach(edge => {
              edge.show();
            });
          }, parent => {
            if (!parent.model.collapsed) {
              return parent.getChildren();
            }
            return null;
          });
        }
      }

      // exchange parent
      if (model.parent && model.parent !== originModel.parent) {
        const originParent = this.find(originModel.parent);
        const originParentModel = originParent.getModel();
        const newParent = this.find(model.parent);
        const newParentModel = newParent.getModel();
        const oldEdge = this.find(originParentModel.id + '-' + originModel.id);
        const newEdgeModel = {
          id: newParentModel.id + '-' + originModel.id,
          source: newParentModel.id,
          target: originModel.id
        };
        Util.Array.remove(originParentModel.children, itemModel);
        if (newParentModel.children) {
          newParentModel.children.push(itemModel);
        } else {
          newParentModel.children = [ itemModel ];
        }
        this._removeItems([ oldEdge ]);
        this._addItems('edge', [ newEdgeModel ]);
        this.find(newParentModel.id).forceUpdate();
      }

      // update children
      if (Util.isArray(model.children)) {
        if (originModel.children) {
          Util.each(originModel.children, child => {
            const childItem = this.find(child.id);
            const _removeItems = [ childItem ];
            childItem.getEdges().forEach(edge => {
              _removeItems.push(edge);
            });
            this._removeItems(_removeItems);
          });
        }
        Util.each(model.children, child => {
          const data = this.parseSource({
            roots: [ child ]
          });
          const childId = Util.isNil(child.id) ? Util.guid() : child.id;
          this._addItems('node', data.nodes);
          this._addItems('edge', data.edges);
          !child.parent && this._addItems('edge', [{
            id: originModel.id + '-' + childId,
            source: originModel.id,
            target: childId
          }]);
        });
      }

      // set node nth
      if (!Util.isNil(model.nth)) {
        this._setNodeNth(item, model.nth);
      }
      const parentItem = this.find(itemModel.parent);
      parentItem && parentItem.forceUpdate();
    }

    this.emit('afterchange', ev);
    return this;
  }
  /**
   * @param {string|Item} item target item
   * @return {Graph} this
   */
  remove(item) {
    const dataMap = this.get('_dataMap');
    const items = [];
    item = this.getItem(item);
    if (!item || item.destroyed) {
      return;
    }
    const ev = {
      action: 'remove',
      item
    };
    this.emit('beforechange', ev);
    items.push(item);

    if (item.type === 'node') {
      item.getEdges().forEach(edge => {
        items.push(edge);
      });
      const model = item.getModel();
      const parent = dataMap[model.parent];
      item.deepEach(child => {
        items.push(child);
        child.getEdges().forEach(edge => {
          items.push(edge);
        });
      });
      Util.Array.remove(parent.children, model);
      this.find(parent.id).forceUpdate();
    }
    this._removeItems(Util.uniq(items));
    this.emit('afterchange', ev);
    return this;
  }
  getRoots() {
    const source = this.getSource();
    return source.roots.map(root => {
      return this.find(root.id);
    });
  }
  save() {
    const rst = {
      roots: Util.clone(this.getSource().roots),
      guides: this.getGuides().map(guide => {
        return guide.getModel();
      })
    };
    rst.roots.length === 0 && delete rst.roots;
    rst.guides.length === 0 && delete rst.guides;
    return rst;
  }
}

module.exports = Tree;
