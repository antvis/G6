import { Point } from '@antv/g-base/lib/types';
import Hierarchy from '@antv/hierarchy'
import { each, isString } from '@antv/util/lib';
import { GraphOptions, ITreeGraph } from '@g6/interface/graph';
import { GraphData, Item, ITEM_TYPE, NodeConfig, ShapeStyle, TreeGraphData } from '@g6/types';
import { radialLayout } from '@g6/util/graphic';
import { traverseTree } from '@g6/util/graphic'
import { ViewController } from './controller';
import Graph, { PrivateGraphOption } from './graph';

export default class TreeGraph  extends Graph implements ITreeGraph {
  private layoutAnimating: boolean;

  constructor(cfg: GraphOptions) {
    super(cfg)
    this.layoutAnimating = false

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
      layout.direction = 'TB';
    }
    if (layout.radial) {
      return function(data) {
        const layoutData = Hierarchy[layout.type](data, layout);
        radialLayout(layoutData);
        return layoutData;
      };
    }
    return function(data) {
      return Hierarchy[layout.type](data, layout);
    };
  }

  /**
   * 返回指定节点在树图数据中的索引
   * @param children 树图数据
   * @param child 树图中某一个 Item 的数据
   */
  private indexOfChild(children: TreeGraphData[], id: string): number {
    let index = -1;
    each(children, (former, i) => {
      if (id === former.id) {
        index = i;
        return false;
      }
    });
    return index;
  }

  public getDefaultCfg(): PrivateGraphOption {
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
  private innerAddChild(treeData: TreeGraphData, parent: Item, animate: boolean): Item {
    const self = this;
    const model = treeData.data;
    // model 中应存储真实的数据，特别是真实的 children
    model.x = treeData.x;
    model.y = treeData.y;
    model.depth = treeData.depth;
    const node = self.addItem('node', model);
    if (parent) {
      node.set('parent', parent);
      if (animate) {
        const origin = parent.get('origin');
        if (origin) {
          node.set('origin', origin);
        } else {
          const parentModel = parent.getModel();
          node.set('origin', {
            x: parentModel.x,
            y: parentModel.y
          });
        }
      }
      const childrenList = parent.get('children');
      if (!childrenList) {
        parent.set('children', [ node ]);
      } else {
        childrenList.push(node);
      }
      self.addItem('edge', { 
        source: parent, 
        target: node, 
        id: parent.get('id') + ':' + node.get('id') 
      });
    }
    // 渲染到视图上应参考布局的children, 避免多绘制了收起的节点
    each(treeData.children, child => {
      self.innerAddChild(child, node, animate);
    });
    return node;
  }

  /**
   * 将数据上的变更转换到视图上
   * @param data 
   * @param parent 
   * @param animate 
   */
  private innerUpdateChild(data: TreeGraphData, parent: Item, animate: boolean) {
    const self = this;
    const current = self.findById(data.id);

    // 若子树不存在，整体添加即可
    if (!current) {
      self.innerAddChild(data, parent, animate);
      return;
    }

    // 更新新节点下所有子节点
    each(data.children, (child: TreeGraphData) => {
      self.innerUpdateChild(child, current, animate);
    });
    
    // 用现在节点的children实例来删除移除的子节点
    const children = current.get('children');
    if (children) {
      const len = children.length;
      if (len > 0) {
        for (let i = children.length - 1; i >= 0; i--) {
          const child = children[i].getModel();

          if (self.indexOfChild(data.children, child.id) === -1) {
            self.innerRemoveChild(child.id, {
              x: data.x,
              y: data.y
            }, animate);

            // 更新父节点下缓存的子节点 item 实例列表
            children.splice(i, 1);
          }
        }
      }
    }
    const model = current.getModel();
    if (animate) {
      // 如果有动画，先缓存节点运动再更新节点
      current.set('origin', {
        x: model.x,
        y: model.y
      });
    }
    current.set('model', data.data);
    current.updatePosition({ x: data.x, y: data.y });
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
      node.set('origin', { x: model.x, y: model.y });
      self.get('removeList').push(node);
    } else {
      self.removeItem(node);
    }
  }

  /**
   * 更新数据模型，差量更新并重新渲染
   * @param {object} data 数据模型
   */
  public changeData(data?: GraphData | TreeGraphData): any {
    const self = this;

    if (data) {
      self.data(data);
      self.render();
    } else {
      self.layout(this.get('fitView'));
    }
  }

  /**
   * 根据目前的 data 刷新布局，更新到画布上。用于变更数据之后刷新视图。
   * @param {boolean} fitView 更新布局时是否需要适应窗口
   */
  public layout(fitView?: boolean) {
    const self = this;
    const data: TreeGraphData = self.get('data');
    const layoutMethod = self.get('layoutMethod')
    const layoutData = layoutMethod(data, self.get('layout'));

    const animate: boolean = self.get('animate');
    const autoPaint: boolean = self.get('autoPaint');

    self.emit('beforerefreshlayout', { data, layoutData });

    self.setAutoPaint(false);

    self.innerUpdateChild(layoutData, null, animate);

    if (fitView) {
      const viewController: ViewController = self.get('viewController')
      viewController.fitView();
    }

    if (!animate) {
      // 如果没有动画，目前仅更新了节点的位置，刷新一下边的样式
      self.refresh();
      self.paint();
    } else {
      self.layoutAnimate(layoutData, null);
    }
    self.setAutoPaint(autoPaint);
    self.emit('afterrefreshlayout', { data, layoutData });
  }

  /**
   * 添加子树到对应 id 的节点
   * @param {TreeGraphData} data 子树数据模型
   * @param {string} parent 子树的父节点id
   */
  public addChild(data: TreeGraphData, parent: string | Item): void {
    const self = this;
    // 将数据添加到源数据中，走changeData方法
    if (!isString(parent)) {
      parent = parent.get('id') as string;
    }

    const parentData = self.findDataById(parent);

    if (!parentData.children) {
      parentData.children = [];
    }
    parentData.children.push(data);
    self.changeData();
  }

  /**
   * 更新源数据，差量更新子树
   * @param {TreeGraphData} data 子树数据模型
   * @param {string} parent 子树的父节点id
   */
  public updateChild(data: TreeGraphData, parent?: string): void {
    const self = this;

    // 如果没有父节点或找不到该节点，是全量的更新，直接重置data
    if (!parent || !self.findById(parent)) {
      self.changeData(data);
      return;
    }

    const parentModel = self.findById(parent).getModel();

    const current = self.findById(data.id);
    // 如果不存在该节点，则添加
    if (!current) {
      if (!parentModel.children) {
        // 当 current 不存在时，children 为空数组
        parentModel.children = [];
      }
      parentModel.children.push(data);
    } else {
      const index = self.indexOfChild(parentModel.children, data.id);
      parentModel.children[index] = data;
    }
    self.changeData();
  }

  /**
   * 删除子树
   * @param {string} id 子树根节点id
   */
  public removeChild(id: string): void {
    const self = this;
    const node = self.findById(id);

    if (!node) {
      return;
    }

    const parent = node.get('parent');
    if (parent && !parent.destroyed) {
      const siblings = self.findDataById(parent.get('id')).children;
      const model: NodeConfig = node.getModel() as NodeConfig

      const index = self.indexOfChild(siblings, model.id);
      siblings.splice(index, 1);
    }
    self.changeData();
  }

  /**
   * 根据id获取对应的源数据
   * @param {string} id 元素id
   * @param {TreeGraphData | undefined} parent 从哪个节点开始寻找，为空时从根节点开始查找
   * @return {TreeGraphData} 对应源数据
   */
  public findDataById(id: string, parent?: TreeGraphData | undefined): TreeGraphData {
    const self = this;
    
    if (!parent) {
      parent = self.get('data');
    }

    if (id === parent.id) {
      return parent;
    }

    let result = null;
    each(parent.children, child => {
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
  public layoutAnimate(data: TreeGraphData, onFrame?: (item: Item, ratio: number, originAttrs?: ShapeStyle, data?: TreeGraphData) => unknown): void {
    const self = this;
    this.setAutoPaint(false);
    const animateCfg = this.get('animateCfg');
    self.emit('beforeanimate', { data });
    // 如果边中没有指定锚点，但是本身有锚点控制，在动画过程中保持锚点不变
    self.getEdges().forEach(edge => {
      const model = edge.get('model');
      if (!model.sourceAnchor) {
        model.sourceAnchor = edge.get('sourceAnchorIndex');
      }
    });

    this.get('canvas').animate(ratio => {
      traverseTree<TreeGraphData>(data, child => {
        const node = self.findById(child.id);

        // 只有当存在node的时候才执行
        if (node) {
          let origin = node.get('origin');
          const model = node.get('model');

          if (!origin) {
            origin = {
              x: model.x,
              y: model.y
            };
            node.set('origin', origin);
          }

          if (onFrame) {
            const attrs = onFrame(node, ratio, origin, data);
            node.set('model', Object.assign(model, attrs));
          } else {
            model.x = origin.x + (child.x - origin.x) * ratio;
            model.y = origin.y + (child.y - origin.y) * ratio;
          }
        }
        return true
      });

      each(self.get('removeList'), node => {
        const model = node.getModel();
        const from = node.get('origin');
        const to = node.get('to');
        model.x = from.x + (to.x - from.x) * ratio;
        model.y = from.y + (to.y - from.y) * ratio;
      });

      self.refreshPositions();
    },
    animateCfg.duration, 
    animateCfg.ease, 
    () => {
      each(self.getNodes(), node => {
        node.set('origin', null);
      });

      each(self.get('removeList'), node => {
        self.removeItem(node);
      });

      self.set('removeList', []);

      if (animateCfg.callback) {
        animateCfg.callback();
      }

      self.paint();
      this.setAutoPaint(true);

      self.emit('afteranimate', { data });
    }, 
    animateCfg.delay);
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
  public render(): void {
    const self = this;
    const data: TreeGraphData = self.get('data');

    if (!data) {
      throw new Error('data must be defined first');
    }

    self.clear();

    self.emit('beforerender');

    self.layout(this.get('fitView'));

    self.emit('afterrender');
  }

  /**
   * 导出图数据
   * @return {object} data
   */
  public save(): TreeGraphData | GraphData {
    return this.get('data');
  }
}