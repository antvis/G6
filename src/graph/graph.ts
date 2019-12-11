import EventEmitter from '@antv/event-emitter'
import { GraphOptions, IGraph } from '@g6/interface/graph';
import { IItem } from '@g6/interface/item';
import { Matrix } from '@g6/types';
import { translate } from '@g6/util/math'
import { Point } from '_@antv_g-base@0.1.1@@antv/g-base/lib/types';
import Group from '_@antv_g-canvas@0.1.1@@antv/g-canvas/lib/group';
import { mat3 } from '_@antv_matrix-util@2.0.4@@antv/matrix-util/lib';
import clone from '_@antv_util@2.0.6@@antv/util/lib/clone';
import isPlainObject from '_@antv_util@2.0.6@@antv/util/lib/is-plain-object';

export default class Graph extends EventEmitter implements IGraph {
  private _cfg: GraphOptions
  constructor(cfg: GraphOptions) {
    super()
    this._cfg = cfg
  }

  /**
   * 将值设置到 this._cfg 变量上面
   * @param key 键 或 对象值
   * @param val 值
   */
  public set<T = any>(key: string | object, val?: T): Graph {
    if(isPlainObject(key)) {
      this._cfg = Object.assign({}, this._cfg, key)
    } else {
      this._cfg[key] = val
    }
    return this
  }

  /**
   * 获取 this._cfg 中的值
   * @param key 键
   */
  public get(key: string) {
    return this._cfg[key]
  }

  /**
   * 根据 ID 查询图元素实例
   * @param id 图元素 ID
   */
  public findById(id: string): IItem {
    return this.get('itemMap')[id]
  }

  /**
   * 平移画布
   * @param dx 水平方向位移
   * @param dy 垂直方向位移
   */
  public translate(dx: number, dy: number): void {
    const group: Group = this.get('group')
    translate(group, { x: dx, y: dy })
    this.emit('viewportchange', { action: 'translate', matrix: group.getMatrix() });
    this.autoPaint();
  }

  /**
   * 伸缩窗口
   * @param ratio 伸缩比例
   * @param center 以center的x, y坐标为中心缩放
   */
  public zoom(ratio: number,  center: Point): void {
    const group: Group = this.get('group')
    const matrix: Matrix = clone(group.getMatrix())
    const minZoom: number = this.get('minZoom')
    const maxZoom: number = this.get('maxZoom')

    if(center) {
      mat3.translate(matrix, matrix, [ -center.x, -center.y ])
      mat3.scale(matrix, matrix, [ ratio, ratio ])
      mat3.translate(matrix, matrix, [ center.x, center.y ])
    } else {
      mat3.scale(matrix, matrix, [ ratio, ratio ])
    }

    if (minZoom && matrix[0] < minZoom) {
      return;
    }
    if (maxZoom && matrix[0] > maxZoom) {
      return;
    }

    group.setMatrix(matrix);
    this.emit('viewportchange', { action: 'zoom', matrix });
    this.autoPaint();
  }

  /**
   * 自动重绘
   * @internal 仅供内部更新机制调用，外部根据需求调用 render 或 paint 接口
   */
  public autoPaint(): void {
    if(this.get('autoPaint')) {
      this.paint()
    }
  }

  /**
   * 仅画布重新绘制
   */
  public paint(): void {
    this.emit('beforepaint');
    this.get('canvas').draw();
    this.emit('afterpaint');
  }
}