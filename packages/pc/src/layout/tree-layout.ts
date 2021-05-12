import Hierarchy from '@antv/hierarchy';
import { TreeGraphData } from '@antv/g6-core';
import { TreeLayoutConfig } from '../types';
import Util from '../util';
const { radialLayout } = Util;

class TreeLayout {
  public type: string;
  public radial: boolean;
  public data: TreeGraphData;
  public config: any;
  private layoutMethod: any;

  constructor(cfg: TreeLayoutConfig) {
    this.type = cfg.type;
    this.radial = cfg.radial;
    this.config = cfg;
  }

  init(data: TreeGraphData) {
    this.data = data;
    if (this.radial) {
      this.layoutMethod =  (data: any) => {
        const layoutData = Hierarchy[this.type](data, this.config);
        radialLayout(layoutData);
        return layoutData;
      };
      return;
    }
    this.layoutMethod = (data: any) => Hierarchy[this.type](data, this.config);
  }
  
  execute() {
    return this.layoutMethod(this.data, this.config);
  }

  layout(data) {
    this.init(data);
    return this.execute()
  }
}

export default TreeLayout;
