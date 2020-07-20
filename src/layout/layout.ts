/**
 * @fileOverview layout base file
 * @author shiwu.wyy@antfin.com
 */

import { EdgeConfig, GraphData, IPointTuple, NodeConfig, ComboConfig } from '../types';
import { ILayout } from '../interface/layout';

// import augment from '@antv/util/lib/augment';
import each from '@antv/util/lib/each';
import mix from '@antv/util/lib/mix';

/**
 * 基础布局，将被自定义布局所继承
 */
export class BaseLayout<Cfg = any> implements ILayout<Cfg> {
  public nodes: NodeConfig[] | null = [];

  public edges: EdgeConfig[] | null = [];

  public combos: ComboConfig[] | null = [];

  public positions: IPointTuple[] | null = [];

  public destroyed: boolean = false;

  public init(data: GraphData) {
    const self = this;
    self.nodes = data.nodes || [];
    self.edges = data.edges || [];
    self.combos = data.combos || [];
  }

  public execute(ctx?: Worker) { }

  public layout(data: GraphData) {
    const self = this;
    self.init(data);
    self.execute();
  }

  public getDefaultCfg() {
    return {};
  }

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

type LayoutOption<Cfg = any> = Partial<ILayout<Cfg>>;
type LayoutConstructor<Cfg = any> = new () => BaseLayout<Cfg>;

const Layout: {
  [layoutType: string]: any;
  registerLayout<Cfg>(
    type: string,
    layout: LayoutOption<Cfg>,
    layoutCons?: LayoutConstructor<Cfg>,
  ): void;
} = {
  /**
   * 注册布局的方法
   * @param {string} type 布局类型，外部引用指定必须，不要与已有布局类型重名
   * @param {object} layout 布局方法
   */
  registerLayout<Cfg>(type: string, layout: LayoutOption<Cfg>, layoutCons = BaseLayout) {
    if (!layout) {
      throw new Error(`please specify handler for this layout: ${type}`);
    }

    // tslint:disable-next-line: max-classes-per-file
    class GLayout extends layoutCons {
      constructor(cfg: Cfg) {
        super();
        const self = this as any;
        const props: object = {};
        const defaultCfg = self.getDefaultCfg();
        mix(props, defaultCfg, layout, cfg as unknown);
        each(props, (value, key: string) => {
          self[key] = value;
        });
      }
    }

    Layout[type] = GLayout;
  },
};

export default Layout;
