/**
 * @fileOverview grid layout
 * @author shiwu.wyy@antfin.com
 * this algorithm refers to <cytoscape.js> - https://github.com/cytoscape/cytoscape.js/
 */

const Layout = require('./layout');
const isString = require('@antv/util/lib/type/is-string');


function getDegree(n, nodeIdxMap, edges) {
  const degrees = [];
  for (let i = 0; i < n; i++) {
    degrees[i] = 0;
  }
  edges.forEach(e => {
    degrees[nodeIdxMap.get(e.source)] += 1;
    degrees[nodeIdxMap.get(e.target)] += 1;
  });
  return degrees;
}

/**
 * 网格布局
 */
Layout.registerLayout('grid', {
  getDefaultCfg() {
    return {
      begin: [ 0, 0 ],            // 布局起始点
      preventOverlap: true,       // prevents node overlap, may overflow boundingBox if not enough space
      preventOverlapPadding: 10,  // extra spacing around nodes when preventOverlap: true
      condense: false,            // uses all available space on false, uses minimal space on true
      rows: undefined,            // force num of rows in the grid
      cols: undefined,            // force num of columns in the grid
      position() {},              // returns { row, col } for element
      sortBy: 'degree',           // a sorting function to order the nodes; e.g. function(a, b){ return a.data('weight') - b.data('weight') }
      nodeSize: 30
    };
  },
  /**
   * 执行布局
   */
  execute() {
    const self = this;
    const nodes = self.nodes;
    // const edges = self.edges;
    const n = nodes.length;
    const center = self.center;
    if (n === 0) {
      return;
    } else if (n === 1) {
      nodes[0].x = center[0];
      nodes[0].y = center[1];
      return;
    }

    const edges = self.edges;
    const layoutNodes = [];
    nodes.forEach(node => {
      layoutNodes.push(node);
    });
    const nodeIdxMap = new Map();
    layoutNodes.forEach((node, i) => {
      nodeIdxMap.set(node.id, i);
    });
    if (self.sortBy === 'degree' || !isString(self.sortBy) || layoutNodes[0][self.sortBy] === undefined) {
      self.sortBy = 'degree';
      if (isNaN(nodes[0].degree)) {
        const values = getDegree(layoutNodes.length, nodeIdxMap, edges);
        layoutNodes.forEach((node, i) => {
          node.degree = values[i];
        });
      }
    }
    // sort nodes by value
    layoutNodes.sort((n1, n2) => {
      return n2[self.sortBy] - n1[self.sortBy];
    });

    let width = self.width;
    if (!width && typeof window !== 'undefined') {
      width = window.innerWidth;
    }
    let height = self.height;
    if (!height && typeof height !== 'undefined') {
      height = window.innerHeight;
    }
    // width/height * splits^2 = cells where splits is number of times to split width
    self.cells = n;
    self.splits = Math.sqrt(self.cells * self.height / self.width);
    self.rows = Math.round(self.splits);
    self.cols = Math.round(self.width / self.height * self.splits);

    const oRows = self.rows;
    const oCols = self.cols != null ? self.cols : self.columns;

    // if rows or columns were set in self, use those values
    if (oRows != null && oCols != null) {
      self.rows = oRows;
      self.cols = oCols;
    } else if (oRows != null && oCols == null) {
      self.rows = oRows;
      self.cols = Math.ceil(self.cells / self.rows);
    } else if (oRows == null && oCols != null) {
      self.cols = oCols;
      self.rows = Math.ceil(self.cells / self.cols);
    } else if (self.cols * self.rows > self.cells) {
    // otherwise use the automatic values and adjust accordingly
    // if rounding was up, see if we can reduce rows or columns
      const sm = self.small();
      const lg = self.large();

      // reducing the small side takes away the most cells, so try it first
      if ((sm - 1) * lg >= self.cells) {
        self.small(sm - 1);
      } else if ((lg - 1) * sm >= self.cells) {
        self.large(lg - 1);
      }
    } else {

      // if rounding was too low, add rows or columns
      while (self.cols * self.rows < self.cells) {
        const sm = self.small();
        const lg = self.large();

        // try to add to larger side first (adds less in multiplication)
        if ((lg + 1) * sm >= self.cells) {
          self.large(lg + 1);
        } else {
          self.small(sm + 1);
        }
      }
    }

    self.cellWidth = self.width / self.cols;
    self.cellHeight = self.height / self.rows;

    if (self.condense) {
      self.cellWidth = 0;
      self.cellHeight = 0;
    }

    if (self.preventOverlap) {
      layoutNodes.forEach(node => {
        if (node.x == null || node.y == null) { // for bb
          node.x = 0;
          node.y = 0;
        }

        let nodew;
        let nodeh;
        if (isNaN(node.size)) {
          nodew = node.size[0];
          nodeh = node.size[1];
        } else {
          nodew = node.size;
          nodeh = node.size;
        }
        if (isNaN(nodew) || isNaN(nodeh)) {
          if (isNaN(self.nodeSize)) {
            nodew = self.nodeSize[0];
            nodeh = self.nodeSize[1];
          } else {
            nodew = self.nodeSize;
            nodeh = self.nodeSize;
          }
        }

        const p = self.preventOverlapPadding;

        const w = nodew + p;
        const h = nodeh + p;

        self.cellWidth = Math.max(self.cellWidth, w);
        self.cellHeight = Math.max(self.cellHeight, h);
      });
    }

    self.cellUsed = {}; // e.g. 'c-0-2' => true

    // to keep track of current cell position
    self.row = 0;
    self.col = 0;

    // get a cache of all the manual positions
    self.id2manPos = {};
    for (let i = 0; i < layoutNodes.length; i++) {
      const node = layoutNodes[i];
      const rcPos = self.position(node);

      if (rcPos && (rcPos.row !== undefined || rcPos.col !== undefined)) { // must have at least row or col def'd
        const pos = {
          row: rcPos.row,
          col: rcPos.col
        };

        if (pos.col === undefined) { // find unused col
          pos.col = 0;

          while (self.used(pos.row, pos.col)) {
            pos.col++;
          }
        } else if (pos.row === undefined) { // find unused row
          pos.row = 0;

          while (self.used(pos.row, pos.col)) {
            pos.row++;
          }
        }

        self.id2manPos[ node.id ] = pos;
        self.use(pos.row, pos.col);
      }
      self.getPos(node);
    }
  },
  small(val) {
    const self = this;
    let res;
    if (val == null) {
      res = Math.min(self.rows, self.cols);
    } else {
      const min = Math.min(self.rows, self.cols);
      if (min === self.rows) {
        self.rows = val;
      } else {
        self.cols = val;
      }
    }
    return res;
  },
  large(val) {
    const self = this;
    let res;
    if (val == null) {
      res = Math.max(self.rows, self.cols);
    } else {
      const max = Math.max(self.rows, self.cols);
      if (max === self.rows) {
        self.rows = val;
      } else {
        self.cols = val;
      }
    }
    return res;
  },
  used(row, col) {
    const self = this;
    return self.cellUsed[ 'c-' + row + '-' + col ] || false;
  },
  use(row, col) {
    const self = this;
    self.cellUsed[ 'c-' + row + '-' + col ] = true;
  },
  moveToNextCell() {
    const self = this;
    self.col++;
    if (self.col >= self.cols) {
      self.col = 0;
      self.row++;
    }
  },
  getPos(node) {
    const self = this;
    const begin = self.begin;
    const cellWidth = self.cellWidth;
    const cellHeight = self.cellHeight;
    let x;
    let y;

    // see if we have a manual position set
    const rcPos = self.id2manPos[ node.id ];
    if (rcPos) {
      x = rcPos.col * cellWidth + cellWidth / 2 + begin[0];
      y = rcPos.row * cellHeight + cellHeight / 2 + begin[1];

    } else { // otherwise set automatically

      while (self.used(self.row, self.col)) {
        self.moveToNextCell();
      }

      x = self.col * cellWidth + cellWidth / 2 + begin[0];
      y = self.row * cellHeight + cellHeight / 2 + begin[1];
      self.use(self.row, self.col);

      self.moveToNextCell();
    }
    node.x = x;
    node.y = y;
  }
});
