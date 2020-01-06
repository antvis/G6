/**
 * @fileOverview grid layout
 * @author shiwu.wyy@antfin.com
 * this algorithm refers to <cytoscape.js> - https://github.com/cytoscape/cytoscape.js/
 */

import { EdgeConfig, IPointTuple, NodeConfig } from '@g6/types';

import isString from '@antv/util/lib/is-string';
import { BaseLayout } from './layout';
import { isArray, isNumber } from '@antv/util';
import { Circle } from '@antv/g-canvas/lib/shape';

type Node = NodeConfig & {
  degree: number;
  size: number;
};
type Edge = EdgeConfig;

type NodeIndexMap = Map<string, string>;

function getDegree(n: number, nodeIdxMap: NodeIndexMap, edges: Edge[]) {
  const degrees = [];
  for (let i = 0; i < n; i++) {
    degrees[i] = 0;
  }
  edges.forEach((e) => {
    degrees[nodeIdxMap.get(e.source)] += 1;
    degrees[nodeIdxMap.get(e.target)] += 1;
  });
  return degrees;
}

/**
 * 网格布局
 */
export default class GridLayout extends BaseLayout {
  /** 布局起始点 */
  public begin: IPointTuple;
  /** prevents node overlap, may overflow boundingBox if not enough space */
  public preventOverlap: boolean;
  /** extra spacing around nodes when preventOverlap: true */
  public preventOverlapPadding: 10;
  /** uses all available space on false, uses minimal space on true */
  public condense: boolean;
  /** force num of rows in the grid */
  public rows: number;
  /** force num of columns in the grid */
  public cols: number;
  /** returns { row, col } for element */
  public position: (node: Node) => { row: number; col: number };
  /** a sorting function to order the nodes; e.g. function(a, b){ return a.datapublic ('weight') - b.data('weight') } */
  public sortBy: string;
  public nodeSize: number | number[];

  public nodes: Node[];
  public edges: Edge[];

  /** 布局中心 */
  public center: IPointTuple;
  public width: number;
  public height: number;

  private cells: number;
  private row: number;
  private col: number;
  private splits: number;
  private columns: number;
  private cellWidth: number;
  private cellHeight: number;
  private cellUsed: {
    [key: string]: boolean;
  };
  private id2manPos: {
    [key: string]: {
      row: number;
      col: number;
    };
  };

  public getDefaultCfg() {
    return {
      begin: [0, 0],
      preventOverlap: true,
      preventOverlapPadding: 10,
      condense: false,
      rows: undefined,
      cols: undefined,
      position() {},
      sortBy: 'degree',
      nodeSize: 30
    };
  }
  /**
   * 执行布局
   */
  public execute() {
    const self = this;
    const nodes = self.nodes;
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
    const layoutNodes: Node[] = [];
    nodes.forEach((node) => {
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
      return (n2 as any)[self.sortBy] - (n1 as any)[self.sortBy];
    });

    if (!self.width && typeof window !== 'undefined') {
      self.width = window.innerWidth;
    }
    if (!self.height && typeof window !== 'undefined') {
      self.height = window.innerHeight;
    }

    const oRows = self.rows;
    const oCols = self.cols != null ? self.cols : self.columns;
    self.cells = n;

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
    } else {
      // otherwise use the automatic values and adjust accordingly	      // otherwise use the automatic values and adjust accordingly
      // width/height * splits^2 = cells where splits is number of times to split width
      self.splits = Math.sqrt((self.cells * self.height) / self.width);
      self.rows = Math.round(self.splits);
      self.cols = Math.round((self.width / self.height) * self.splits);
    }
    if (self.cols * self.rows > self.cells) {
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
      layoutNodes.forEach((node) => {
        if (!node.x || !node.y) {
          // for bb
          node.x = 0;
          node.y = 0;
        }

        let nodew: number;
        let nodeh: number;
        if (isArray(node.size)) {
          nodew = node.size[0];
          nodeh = node.size[1];
        } else {
          nodew = node.size;
          nodeh = node.size;
        }
        if (isNaN(nodew) || isNaN(nodeh)) {
          if (isArray(self.nodeSize)) {
            nodew = self.nodeSize[0];
            nodeh = self.nodeSize[1];
          } else if (isNumber(self.nodeSize)) {
            nodew = self.nodeSize;
            nodeh = self.nodeSize;
          } else {
            nodew = 30;
            nodeh = 30;
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

      if (rcPos && (rcPos.row !== undefined || rcPos.col !== undefined)) {
        // must have at least row or col def'd
        const pos = {
          row: rcPos.row,
          col: rcPos.col,
        };

        if (pos.col === undefined) {
          // find unused col
          pos.col = 0;

          while (self.used(pos.row, pos.col)) {
            pos.col++;
          }
        } else if (pos.row === undefined) {
          // find unused row
          pos.row = 0;

          while (self.used(pos.row, pos.col)) {
            pos.row++;
          }
        }

        self.id2manPos[node.id] = pos;
        self.use(pos.row, pos.col);
      }
      self.getPos(node);
    }
  }
  private small(val?: number) {
    const self = this;
    let res: number;
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
  }

  private large(val?: number) {
    const self = this;
    let res: number;
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
  }

  private used(row: number, col: number) {
    const self = this;
    return self.cellUsed['c-' + row + '-' + col] || false;
  }

  private use(row: number, col: number) {
    const self = this;
    self.cellUsed['c-' + row + '-' + col] = true;
  }

  private moveToNextCell() {
    const self = this;
    self.col++;
    if (self.col >= self.cols) {
      self.col = 0;
      self.row++;
    }
  }

  private getPos(node: Node) {
    const self = this;
    const begin = self.begin;
    const cellWidth = self.cellWidth;
    const cellHeight = self.cellHeight;
    let x: number;
    let y: number;

    // see if we have a manual position set
    const rcPos = self.id2manPos[node.id];
    if (rcPos) {
      x = rcPos.col * cellWidth + cellWidth / 2 + begin[0];
      y = rcPos.row * cellHeight + cellHeight / 2 + begin[1];
    } else {
      // otherwise set automatically

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
}
