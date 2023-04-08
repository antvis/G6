// @ts-nocheck
import { Point } from '@antv/g-base';
import Hierarchy from '@antv/hierarchy';
import { each, isObject, isString, clone } from '@antv/util';
import {
  GraphData,
  Item,
  NodeConfig,
  ShapeStyle,
  TreeGraphData,
  GraphOptions,
  IPoint
} from '@antv/g6-core';
import { ITreeGraph } from '../interface/graph';
import Util from '../util';
import Graph from './graph';

const { radialLayout, traverseTree } = Util;

export default class TreeGraph extends Graph implements ITreeGraph {
  private layoutAnimating: boolean;

  constructor(cfg: GraphOptions) {
    super(cfg);
    this.layoutAnimating = false;

    // 用于缓存动画结束后需要删除的节点
    this.set('removeList', []);
    this.set('layoutMethod', this.getLayout());
  }

  /**
   * 通过 Layout 配置获取布局配置
   */
  private getLayout() {
    const layout = this.get('layout');

    if (!layout) {
      return null;
    }
    if (typeof layout === 'function') {
      return layout;
    }
    if (!layout.type) {
      layout.type = 'dendrogram';
    }
    if (!layout.direction) {
      layout.direction = layout.type === 'indented' ? 'LR' : 'TB';
    }
    if (layout.radial) {
      return (data: any) => {
        const layoutData = Hierarchy[layout.type](data, layout);
        radialLayout(layoutData);
        return layoutData;
      };
    }
    return (data: any) => Hierarchy[layout.type](data, layout);
  }

  /**
   * 返回指定节点在树图数据中的索引
   * @param children 树图数据
   * @param child 树图中某一个 Item 的数据
   */
  private static indexOfChild(children: TreeGraphData[], id: string): number {
    let index = -1;
    // eslint-disable-next-line consistent-return
    each(children, (former, i) => {
      if (id === former.id) {
        index = i;
        return false;
      }
    });
    return index;
  }

  public getDefaultCfg(): any {
    const cfg = super.getDefaultCfg();
    // 树图默认打开动画
    cfg.animate = true;
    return cfg;
  }

  /**
   * 向🌲树中添加数据
   * @param treeData 树图数据
   * @param parent 父节点实例
   * @param animate 是否开启动画
   */
  private innerAddChild(treeData: TreeGraphData, parent: Item | undefined, animate: boolean): Item {
    const self = this;
    const model = treeData.data;

    if (model) {
      // model 中应存储真实的数据，特别是真实的 children
      model.x = treeData.x;
      model.y = treeData.y;
      model.depth = treeData.depth;
    }

    const node = self.addItem('node', model!, false);
    if (parent) {
      node.set('parent', parent);
      if (animate) {
        const origin = parent.get('originAttrs');
        if (origin) {
          node.set('originAttrs', origin);
        } else {
          const parentModel = parent.getModel();
          node.set('originAttrs', {
            x: parentModel.x,
            y: parentModel.y,
          });
        }
      }
      const childrenList = parent.get('children');
      if (!childrenList) {
        parent.set('children', [node]);
      } else {
        childrenList.push(node);
      }
      self.addItem(
        'edge',
        {
          source: parent.get('id'),
          target: node.get('id'),
          id: `${parent.get('id')}:${node.get('id')}`,
        },
        false,
      );
    }
    // 渲染到视图上应参考布局的children, 避免多绘制了收起的节点
    each(treeData.children || [], child => {
      self.innerAddChild(child, node, animate);
    });
    self.emit('afteraddchild', { item: node, parent });
    return node;
  }

  /**
   * 将数据上的变更转换到视图上
   * @param data
   * @param parent
   * @param animate
   */
  private innerUpdateChild(data: TreeGraphData, parent: Item | undefined, animate: boolean) {
    const self = this;
    const current = self.findById(data.id);

    // 若子树不存在，整体添加即可
    if (!current) {
      self.innerAddChild(data, parent, animate);
      return;
    }

    // 更新新节点下所有子节点
    each(data.children || [], (child: TreeGraphData) => {
      self.innerUpdateChild(child, current, animate);
    });

    // 用现在节点的children实例来删除移除的子节点
    const children = current.get('children');
    if (children) {
      const len = children.length;
      if (len > 0) {
        for (let i = children.length - 1; i >= 0; i--) {
          const child = children[i].getModel();

          if (TreeGraph.indexOfChild(data.children || [], child.id) === -1) {
            self.innerRemoveChild(
              child.id,
              {
                x: data.x!,
                y: data.y!,
              },
              animate,
            );

            // 更新父节点下缓存的子节点 item 实例列表
            children.splice(i, 1);
          }
        }
      }
    }
    let oriX: number;
    let oriY: number;
    if (current.get('originAttrs')) {
      oriX = current.get('originAttrs').x;
      oriY = current.get('originAttrs').y;
    }
    const model = current.getModel();
    if (animate) {
      // 如果有动画，先缓存节点运动再更新节点
      current.set('originAttrs', {
        x: model.x,
        y: model.y,
      });
    }
    current.set('model', Object.assign(model, data.data));
    if (oriX !== data.x || oriY !== data.y) {
      current.updatePosition({ x: data.x, y: data.y });
    }
  }

  /**
   * 删除子节点Item对象
   * @param id
   * @param to
   * @param animate
   */
  private innerRemoveChild(id: string, to: Point, animate: boolean) {
    const self = this;
    const node: Item = self.findById(id);

    if (!node) {
      return;
    }

    each(node.get('children'), child => {
      self.innerRemoveChild(child.getModel().id, to, animate);
    });

    if (animate) {
      const model = node.getModel();
      node.set('to', to);
      node.set('originAttrs', { x: model.x, y: model.y });
      self.get('removeList').push(node);
    } else {
      self.removeItem(node, false);
    }
  }

  /**
   * 更新数据模型，差量更新并重新渲染
   * @param {object} data 数据模型
   */
  public changeData(data?: GraphData | TreeGraphData, stack: boolean = true): any {
    const self = this;

    // 更改数据源后，取消所有状态
    this.getNodes().map(node => self.clearItemStates(node));
    this.getEdges().map(edge => self.clearItemStates(edge));

    if (stack && this.get('enabledStack')) {
      this.pushStack('changedata', {
        before: self.get('originData'),
        after: data || self.get('data'),
      });
    }

    if (data) {
      self.data(data);
      self.render(false);
    } else {
      self.layout(this.get('fitView'));
    }
  }

  /**
   * 已更名为 updateLayout，为保持兼容暂且保留。
   * 更改并应用树布局算法
   * @param {object} layout 布局算法
   */
  public changeLayout(layout: any) {
    // eslint-disable-next-line no-console
    console.warn(
      'Please call updateLayout instead of changeLayout. changeLayout will be discarded soon',
    );
    const self = this;
    self.updateLayout(layout);
  }

  /**
   * 更改并应用树布局算法
   * @param {object} layout 布局算法
   */
  public updateLayout(layout: any, align?: 'center' | 'begin', alignPoint?: IPoint, stack: boolean = true) {
    const self = this;
    if (!layout) {
      // eslint-disable-next-line no-console
      console.warn('layout cannot be null');
      return;
    }
    if (stack && this.get('enabledStack')) {
      this.pushStack('layout', {
        before: self.get('layout'),
        after: layout
      });
    }
    self.set('layout', layout);
    self.set('layoutMethod', self.getLayout());
    self.layout();

    // align the graph after layout
    if (align) {
      let toPoint = alignPoint;
      if (!toPoint) {
        if (align === 'begin') toPoint = { x: 0, y: 0 };
        else toPoint = { x: this.getWidth() / 2, y: this.getHeight() / 2 };
      }
      // translate to point coordinate system
      toPoint = this.getPointByCanvas(toPoint.x, toPoint.y);

      const matrix = this.getGroup().getMatrix() || [1, 0, 0, 0, 1, 0, 0, 0, 1];
      toPoint.x = toPoint.x * matrix[0] + matrix[6];
      toPoint.y = toPoint.y * matrix[0] + matrix[7];

      const { minX, maxX, minY, maxY } = this.getGroup().getCanvasBBox();
      const bboxPoint = { x: (minX + maxX) / 2, y: (minY + maxY) / 2 };
      if (align === 'begin') {
        bboxPoint.x = minX;
        bboxPoint.y = minY;
      }

      this.translate(toPoint.x - bboxPoint.x, toPoint.y - bboxPoint.y);
    }
  }

  /**
   * 已更名为 layout，为保持兼容暂且保留。
   * 根据目前的 data 刷新布局，更新到画布上。用于变更数据之后刷新视图。
   * @param {boolean} fitView 更新布局时是否需要适应窗口
   */
  public refreshLayout(fitView?: boolean) {
    // eslint-disable-next-line no-console
    console.warn(
      'Please call layout instead of refreshLayout. refreshLayout will be discarded soon',
    );
    const self = this;
    self.layout(fitView);
  }

  /**
   * 根据目前的 data 刷新布局，更新到画布上。用于变更数据之后刷新视图。
   * @param {boolean} fitView 更新布局时是否需要适应窗口
   */
  public layout(fitView?: boolean) {
    const self = this;
    let data: TreeGraphData = self.get('data');
    const layoutMethod = self.get('layoutMethod');
    const layoutConfig = self.get('layout');

    let layoutData = data;
    if (layoutConfig?.excludeInvisibles) {
      data = clone(self.get('data'));
      const cacheChidMap = {}
      traverseTree<TreeGraphData>(data, subTree => {
        const siblings = subTree.children;
        if (!siblings?.length) return true;
        for (let i = siblings.length - 1; i >= 0; i--) {
          const node = this.findById(siblings[i].id);
          const isHidden = node ? !node.isVisible() : siblings[i].visible === false;
          if (isHidden) {
            cacheChidMap[subTree.id] = cacheChidMap[subTree.id] || [];
            cacheChidMap[subTree.id].push({
              idx: i,
              child: siblings.splice(i, 1)[0],
            });
          }
        }
      });
      layoutData = layoutMethod ? layoutMethod(data, self.get('layout')) : data;
      traverseTree<TreeGraphData>(layoutData, subTree => {
        const cachedItems = cacheChidMap[subTree.id];
        if (cachedItems?.length) {
          for (let i = cachedItems.length - 1; i >= 0; i --) {
            const { idx, child } = cachedItems[i];
            subTree.children.splice(idx, 0, child);
          }
        }
      });
    } else {
      layoutData = layoutMethod ? layoutMethod(data, self.get('layout')) : data;
    }
    

    const animate: boolean = self.get('animate');

    self.emit('beforerefreshlayout', { data, layoutData });
    self.emit('beforelayout');

    self.innerUpdateChild(layoutData, undefined, animate);

    if (fitView) {
      const viewController = self.get('viewController');
      viewController.fitView();
    }

    if (!animate) {
      // 如果没有动画，目前仅更新了节点的位置，刷新一下边的样式
      self.refresh();
      self.paint();
    } else {
      self.layoutAnimate(layoutData);
    }
    self.emit('afterrefreshlayout', { data, layoutData });
    self.emit('afterlayout');
  }

  /**
   * 添加子树到对应 id 的节点
   * @param {TreeGraphData} data 子树数据模型
   * @param {string} parent 子树的父节点id
   */
  public addChild(data: TreeGraphData, parent: string | Item, stack: boolean = true): void {
    const self = this;
    self.emit('beforeaddchild', { model: data, parent });
    // 将数据添加到源数据中，走changeData方法
    if (!isString(parent)) {
      parent = parent.get('id') as string;
    }

    const parentData = self.findDataById(parent);

    if (parentData) {
      if (!parentData.children) {
        parentData.children = [];
      }
      parentData.children.push(data);
      const parentItem = self.findById(parent);
      parentItem.refresh();
      self.changeData(undefined, stack);
    }
  }

  /**
   * 更新某个节点下的所有子节点
   * @param {TreeGraphData[]} data 子树数据模型集合
   * @param {string} parent 子树的父节点id
   */
  public updateChildren(data: TreeGraphData[], parentId: string, stack: boolean = true): void {
    const self = this;

    // 如果没有父节点或找不到该节点，是全量的更新，直接重置data
    const parentItem = self.findById(parentId);
    if (!parentId || !parentItem) {
      console.warn(`Update children failed! There is no node with id '${parentId}'`);
      return;
    }

    const parentModel = self.findDataById(parentId) as NodeConfig;

    parentModel.children = data;

    parentItem.refresh();

    self.changeData(undefined, stack);
  }

  /**
   * 更新源数据，差量更新子树
   * @param {TreeGraphData} data 子树数据模型
   * @param {string} parentId 子树的父节点id
   */
  public updateChild(data: TreeGraphData, parentId?: string, stack: boolean = true): void {
    const self = this;

    // 如果没有父节点或找不到该节点，是全量的更新，直接重置data
    if (!parentId || !self.findById(parentId)) {
      self.changeData(data, stack);
      return;
    }

    const parentModel = self.findDataById(parentId) as NodeConfig;

    const current = self.findById(data.id);

    if (!parentModel.children) {
      // 当 current 不存在时，children 为空数组
      parentModel.children = [];
    }

    // 如果不存在该节点，则添加
    if (!current) {
      parentModel.children.push(data);
    } else {
      const index = TreeGraph.indexOfChild(parentModel.children, data.id);
      if (index > -1) parentModel.children[index] = data;
    }
    const parentItem = self.findById(parentId);
    parentItem?.refresh();
    self.changeData(undefined, stack);
  }

  /**
   * 删除子树
   * @param {string} id 子树根节点id
   */
  public removeChild(id: string, stack: boolean = true): void {
    const self = this;
    const node = self.findById(id);

    let parent;
    if (!node) {
      parent = self.getNodes().find(node => {
        const children = node.getModel().children || [];
        return !!children.find(child => child.id === id);
      });
    } else {
      parent = node?.get('parent');
    }

    if (parent && !parent.destroyed) {
      const parentId = parent.get('id');
      const parentNode = self.findDataById(parentId);
      const siblings = (parentNode && parentNode.children) || [];
      const index = TreeGraph.indexOfChild(siblings, id);
      siblings.splice(index, 1);
      parent.refresh();
    }
    self.changeData(undefined, stack);
  }

  /**
   * 根据id获取对应的源数据
   * @param {string} id 元素id
   * @param {TreeGraphData | undefined} parent 从哪个节点开始寻找，为空时从根节点开始查找
   * @return {TreeGraphData} 对应源数据
   */
  public findDataById(id: string, parent?: TreeGraphData | undefined): TreeGraphData | null {
    const self = this;

    if (!parent) {
      parent = self.get('data') as TreeGraphData;
    }

    if (id === parent.id) {
      return parent;
    }

    let result: TreeGraphData | null = null;
    // eslint-disable-next-line consistent-return
    each(parent.children || [], child => {
      if (child.id === id) {
        result = child;
        return false;
      }
      result = self.findDataById(id, child);
      if (result) {
        return false;
      }
    });

    return result;
  }

  /**
   * 布局动画接口，用于数据更新时做节点位置更新的动画
   * @param {TreeGraphData} data 更新的数据
   * @param {function} onFrame 定义节点位置更新时如何移动
   */
  public layoutAnimate(
    data: TreeGraphData,
    onFrame?: (
      item: Item,
      ratio: number,
      originAttrs?: ShapeStyle,
      data?: TreeGraphData,
    ) => unknown,
  ): void {
    const self = this;
    const animateCfg = this.get('animateCfg');
    self.emit('beforeanimate', { data });
    // 如果边中没有指定锚点，但是本身有锚点控制，在动画过程中保持锚点不变
    self.getEdges().forEach(edge => {
      const model = edge.get('model');
      if (!model.sourceAnchor) {
        model.sourceAnchor = edge.get('sourceAnchorIndex');
      }
    });

    this.get('canvas').animate(
      (ratio: number) => {
        traverseTree<TreeGraphData>(data, child => {
          const node = self.findById(child.id);

          // 只有当存在node的时候才执行
          if (node) {
            let origin = node.get('originAttrs');
            const model = node.get('model');

            if (!origin) {
              origin = {
                x: model.x,
                y: model.y,
              };
              node.set('originAttrs', origin);
            }

            if (onFrame) {
              const attrs = onFrame(node, ratio, origin, data);
              node.set('model', Object.assign(model, attrs));
            } else {
              model.x = origin.x + (child.x! - origin.x) * ratio;
              model.y = origin.y + (child.y! - origin.y) * ratio;
            }
          }
          return true;
        });

        each(self.get('removeList'), node => {
          const model = node.getModel();
          const from = node.get('originAttrs');
          const to = node.get('to');
          model.x = from.x + (to.x - from.x) * ratio;
          model.y = from.y + (to.y - from.y) * ratio;
        });

        self.refreshPositions();
      },
      {
        duration: animateCfg.duration,
        easing: animateCfg.ease,
        callback: () => {
          each(self.getNodes(), node => {
            node.set('originAttrs', null);
          });

          each(self.get('removeList'), node => {
            self.removeItem(node, false);
          });

          self.set('removeList', []);

          if (animateCfg.callback) {
            animateCfg.callback();
          }

          self.emit('afteranimate', { data });
        },
        delay: animateCfg.delay,
      },
    );
  }

  /**
   * 立即停止布局动画
   */
  public stopLayoutAnimate(): void {
    this.get('canvas').stopAnimate();
    this.emit('layoutanimateend', { data: this.get('data') });
    this.layoutAnimating = false;
  }

  /**
   * 是否在布局动画
   * @return {boolean} 是否有布局动画
   */
  public isLayoutAnimating(): boolean {
    return this.layoutAnimating;
  }

  /**
   * 根据data接口的数据渲染视图
   */
  public render(clearStack: boolean = true): void {
    const self = this;
    const data: TreeGraphData = self.get('data');

    if (!data || !isObject(data) || !Object.keys(data).length) {
      throw new Error('data must be defined first');
    }

    self.clear();

    if (clearStack && this.get('enabledStack')) {
      // render 之前清空 redo 和 undo 栈
      this.clearStack();
    }

    self.emit('beforerender');

    self.layout(this.get('fitView'));

    self.emit('afterrender');
  }

  /**
   * 导出图数据
   * @return {object} data
   */
  public save(): TreeGraphData {
    return this.get('data');
  }

  /**
   * 设置视图初始化数据
   * @param {TreeGraphData} data 初始化数据
   */
  public data(data?: GraphData | TreeGraphData): void {
    super.data(data);
    this.set('originData', JSON.parse(JSON.stringify(data)));
  }
}
