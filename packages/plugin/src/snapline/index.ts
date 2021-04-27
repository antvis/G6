import { each, mix } from '@antv/util';
import { IAbstractGraph as IGraph, ShapeStyle, Util } from '@antv/g6-core';
import Base, { IPluginBaseConfig } from '../base';

const { pointLineDistance } = Util;

interface SnapLineConfig extends IPluginBaseConfig {
  // 辅助线的样式
  line?: ShapeStyle;
  // 辅助线类型，true 表示双向
  itemAlignType?: boolean | 'horizontal' | 'vertical' | 'center';
}

// 对齐线样式
const alignLineStyle = {
  stroke: '#FA8C16',
  lineWidth: 1,
};

export default class SnapLine extends Base {
  constructor(props?: SnapLineConfig) {
    super(props);
  }

  public getDefaultCfgs() {
    return {
      line: alignLineStyle,
      /**
       * item align type
       * @type {String|True|False}
       */
      itemAlignType: 'center', // true || false || 'horizontal' || 'vertical' || 'center',

      /**
       * tolerance to item force align
       * @type {String|True|False}
       */
      tolerance: 5,
      horizontalLines: {},
      verticalLines: {},
      alignLines: [],
    };
  }

  public init() {}

  // class-methods-use-this
  public getEvents() {
    return {
      'node:dragstart': 'onDragStart',
      'node:drag': 'onDrag',
      'node:dragend': 'onDragEnd',
    };
  }

  onDragStart() {
    this.initBoxLine();
  }

  onDrag(e) {
    const { item } = e;
    // 计算辅助线位置,拖动过程中更新辅助线
    const delegateShape = item.get('delegateShape') || item;

    const bbox = delegateShape.getBBox();
    const model = item.getModel();
    const dx = model.x - bbox.x;
    const dy = model.y - bbox.y;

    this.show(
      {
        x: bbox.minX + dx,
        y: bbox.minY + dy,
      },
      {
        width: bbox.width,
        height: bbox.height,
      },
    );
  }

  onDragEnd() {
    // 拖动结束时候删除辅助线
    this.destory();
  }

  /**
   * 每次开始拖动之前，计算出所有节点在水平和垂直方向上，左中右三条中线，并缓存起来
   *
   * @param {object} item Node节点
   * @memberof AlignLine
   */
  initBoxLine() {
    const { horizontalLines, verticalLines, itemAlignType } = this._cfgs;

    const graph: IGraph = this.get('graph');
    const nodes = graph.getNodes();
    nodes.forEach(item => {
      const bbox = item.getBBox();
      const nodeId = item.get('id');
      // 设置水平方向辅助线
      if (itemAlignType === true || itemAlignType === 'horizontal') {
        // tltr: top left top right
        // lcrc: left center right center
        // blbr: bottom left bottom right
        horizontalLines[`${nodeId}tltr`] = [bbox.minX, bbox.minY, bbox.maxX, bbox.minY, item];
        horizontalLines[`${nodeId}lcrc`] = [bbox.minX, bbox.centerY, bbox.maxX, bbox.centerY, item];
        horizontalLines[`${nodeId}blbr`] = [bbox.minX, bbox.maxY, bbox.maxX, bbox.maxY, item];
      } else if (itemAlignType === 'center') {
        horizontalLines[`${nodeId}lcrc`] = [bbox.minX, bbox.centerY, bbox.maxX, bbox.centerY, item];
      }

      // 设置垂直方向辅助线
      if (itemAlignType === true || itemAlignType === 'vertical') {
        // tlbl: top left bottom left
        // tcbc: top center bottom center
        // trbr: top right bottom right
        verticalLines[`${nodeId}tlbl`] = [bbox.minX, bbox.minY, bbox.minX, bbox.maxY, item];
        verticalLines[`${nodeId}tcbc`] = [bbox.centerX, bbox.minY, bbox.centerX, bbox.maxY, item];
        verticalLines[`${nodeId}trbr`] = [bbox.maxX, bbox.minY, bbox.maxX, bbox.maxY, item];
      } else if (itemAlignType === 'center') {
        verticalLines[`${nodeId}tcbc`] = [bbox.centerX, bbox.minY, bbox.centerX, bbox.maxY, item];
      }
    });
  }

  /**
   * 显示AlignLine
   *
   * @param {object} point 起始点
   * @param {object} bbox BBox
   * @returns
   * @memberof AlignLine
   */
  show(point, bbox) {
    const originPoint = mix({}, point);
    this.itemAlign(point, bbox, originPoint);
    return point;
  }

  /**
   * 拖动拖出中添加辅助线
   *
   * @param {object} point 起始点
   * @param {object} bbox 代理形状的bbox
   * @param {object} originPoint 原始点，同point
   * @memberof AlignLine
   */
  private itemAlign(point, bbox, originPoint) {
    const { horizontalLines, verticalLines, tolerance } = this._cfgs;

    const tc = {
      x: originPoint.x + bbox.width / 2,
      y: originPoint.y,
    };
    const cc = {
      x: originPoint.x + bbox.width / 2,
      y: originPoint.y + bbox.height / 2,
    };
    const bc = {
      x: originPoint.x + bbox.width / 2,
      y: originPoint.y + bbox.height,
    };
    const lc = {
      x: originPoint.x,
      y: originPoint.y + bbox.height / 2,
    };
    const rc = {
      x: originPoint.x + bbox.width,
      y: originPoint.y + bbox.height / 2,
    };

    const horizontalDis = [];
    const verticalDis = [];
    let alignCfg = null;
    this.clearAlignLine();

    each(horizontalLines, line => {
      if (line[4].isVisible) {
        horizontalDis.push(this.getLineDisObject(line, tc));
        horizontalDis.push(this.getLineDisObject(line, cc));
        horizontalDis.push(this.getLineDisObject(line, bc));
      }
    });

    each(verticalLines, line => {
      if (line[4].isVisible) {
        verticalDis.push(this.getLineDisObject(line, lc));
        verticalDis.push(this.getLineDisObject(line, cc));
        verticalDis.push(this.getLineDisObject(line, rc));
      }
    });

    horizontalDis.sort((a, b) => {
      return a.dis - b.dis;
    });
    verticalDis.sort((a, b) => {
      return a.dis - b.dis;
    });

    if (horizontalDis.length !== 0 && horizontalDis[0].dis < tolerance) {
      point.y = horizontalDis[0].line[1] - horizontalDis[0].point.y + originPoint.y;
      alignCfg = {
        type: 'item',
        horizontals: [horizontalDis[0]],
      };
      for (let i = 1; i < 3; i++) {
        if (horizontalDis[0].dis === horizontalDis[i].dis) {
          alignCfg.horizontals.push(horizontalDis[i]);
        }
      }
    }
    if (verticalDis.length !== 0 && verticalDis[0].dis < tolerance) {
      point.x = verticalDis[0].line[0] - verticalDis[0].point.x + originPoint.x;
      if (!alignCfg) {
        alignCfg = {
          type: 'item',
          verticals: [verticalDis[0]],
        };
      } else {
        alignCfg.verticals = [verticalDis[0]];
      }
      for (let i = 1; i < 3; i++) {
        if (verticalDis[0].dis === verticalDis[i].dis) {
          alignCfg.verticals.push(verticalDis[i]);
        }
      }
    }
    if (alignCfg) {
      alignCfg.bbox = bbox;
      this.addAlignLine(alignCfg);
    }
  }

  /**
   * 根据配置项添加辅助线
   *
   * @param {object} cfg
   * @memberof AlignLine
   */
  private addAlignLine(cfg) {
    const { bbox, type, horizontals, verticals } = cfg;
    const { line: lineStyle, alignLines } = this._cfgs;
    const graph: IGraph = this.get('graph');
    const group = graph.get('group');

    if (type === 'item') {
      if (horizontals) {
        each(horizontals, horizontal => {
          const { line: refLine, point: refPoint } = horizontal;
          const lineCenterX = (refLine[0] + refLine[2]) / 2;
          let x1;
          let x2;
          if (refPoint.x < lineCenterX) {
            x1 = refPoint.x - bbox.width / 2;
            x2 = Math.max(refLine[0], refLine[2]);
          } else {
            x1 = refPoint.x + bbox.width / 2;
            x2 = Math.min(refLine[0], refLine[2]);
          }

          const lineAttrs = mix(
            {
              x1,
              y1: refLine[1],
              x2,
              y2: refLine[1],
            },
            lineStyle,
          );

          const line = group.addShape('line', {
            attrs: lineAttrs,
            capture: false,
          });
          alignLines.push(line);
        });
      }

      if (verticals) {
        each(verticals, vertical => {
          const { line: refLine, point: refPoint } = vertical;
          const lineCenterY = (refLine[1] + refLine[3]) / 2;
          let y1;
          let y2;
          if (refPoint.y < lineCenterY) {
            y1 = refPoint.y - bbox.height / 2;
            y2 = Math.max(refLine[1], refLine[3]);
          } else {
            y1 = refPoint.y + bbox.height / 2;
            y2 = Math.min(refLine[1], refLine[3]);
          }

          const lineAtts = mix(
            {
              x1: refLine[0],
              y1,
              x2: refLine[0],
              y2,
            },
            lineStyle,
          );

          const line = group.addShape('line', {
            attrs: lineAtts,
            capture: false,
          });

          alignLines.push(line);
        });
      }
    }
  }

  /**
   * 获取点到线的距离
   *
   * @param {array} line [x1, y1, x2, y2] 线的四个点
   * @param {object} point 点的x和y坐标点 {x, y}
   * @returns
   * @memberof AlignLine
   */
  private getLineDisObject(line, point) {
    return {
      line,
      point,
      dis: pointLineDistance(line, point),
    };
  }

  public getContainer(): HTMLDivElement {
    return this.get('container');
  }

  /**
   * 拖动过程中，清楚上次绘制的线
   *
   * @memberof AlignLine
   */
  clearAlignLine() {
    const { alignLines } = this._cfgs;
    each(alignLines, line => {
      line.remove();
    });
    alignLines.length = 0;
  }

  /**
   * 拖动结束时候，情况缓存的节点的辅助线，同时删除绘制的线
   *
   * @memberof AlignLine
   */
  public destory() {
    const { horizontalLines, verticalLines } = this._cfgs;

    const graph: IGraph = this.get('graph');
    const nodes = graph.getNodes();
    nodes.forEach(node => {
      const itemId = node.get('id');
      delete horizontalLines[`${itemId}tltr`];
      delete horizontalLines[`${itemId}lcrc`];
      delete horizontalLines[`${itemId}blbr`];
      delete verticalLines[`${itemId}tlbl`];
      delete verticalLines[`${itemId}tcbc`];
      delete verticalLines[`${itemId}trbr`];
    });

    this.clearAlignLine();
  }
}
