/**
 * @fileOverview layout base file
 * @author shiwu.wyy@antfin.com
 */

import { EdgeConfig, GraphData, IPointTuple, NodeConfig } from '@g6/types';
import { ILayout } from '../interface/layout';

import augment from '@antv/util/lib/augment';
import mix from '@antv/util/lib/mix';

/**
 * 基础布局，将被自定义布局所继承
 */
export class BaseLayout<Cfg = any> implements ILayout<Cfg> {
  public nodes: NodeConfig[];
  public edges: EdgeConfig[];
  public positions: IPointTuple[];
  public destroyed: boolean;

  public init(data: GraphData) {
    const self = this;
    self.nodes = data.nodes;
    self.edges = data.edges;
  }

  public execute() {}

  public layout(data: GraphData) {
    const self = this;
    self.init(data);
    self.execute();
  }

  public getDefaultCfg() {}

  public updateCfg(cfg: Partial<Cfg>) {
    const self = this;
    mix(self as any, cfg);
  }

  public destroy() {
    const self = this;
    self.positions = null;
    self.nodes = null;
    self.edges = null;
    self.destroyed = true;
  }
}

// TODO: 通过 cfg 二次混入方法不好
// 等后续回头再改这里以及 Layout 的类型
// 可以考虑 registerLayout(new forceLayout()) 这样的形式

const Layout = {
  /**
   * 注册布局的方法
   * @param {string} type 布局类型，外部引用指定必须，不要与已有布局类型重名
   * @param {object} layout 布局方法
   */
  registerLayout(type: string, layout) {
    if (!layout) {
      throw new Error('please specify handler for this layout:' + type);
    }
    const gLayout = function(cfg) {
      const self = this;
      mix(self, self.getDefaultCfg(), cfg);
    };
    augment(augment, layout);

    Layout[type] = gLayout;
  },
};

export default Layout;
