import { ShapeStyle } from '../../../types/item';
import { ComboModel, EdgeModel, ID, IGraph, NodeModel } from '../../../types';
import { Plugin as Base, IPluginBaseConfig } from '../../../types/plugin';
import HullComponent, { HullComponentOptions } from './hullComponent';
import { isArray, uniqueId } from '@antv/util';
import { BubblesetCfg } from './types';
import { ITEM_TYPE } from '@antv/g6';
import { isArrayOverlap } from '../../../util/array';

interface HullConfig extends IPluginBaseConfig {
  /** Hull type. */
  hullType?: 'round-convex' | 'bubble' | 'smooth-convex';
  /** Common style for the hulls in this plugin. You can also set individual styles for each hulls while create one. */
  style?: ShapeStyle;
  /** The padding of the hull. */
  padding?: number;
  /** Controlling the effect of the bubble more finely (the scaling degree of the point and edge design, setting the granularity), generally no configuration is required */
  bubbleCfg?: BubblesetCfg;
}

export default class Hull extends Base {
  private hullMap: { [id: string]: HullComponent } = {};
  constructor(options?: HullConfig) {
    super(options);
  }

  public getDefaultCfgs(): HullConfig {
    return {
      key: `hull-${uniqueId()}`,
      hullType: 'round-convex',
      padding: 10,
      style: {
        fill: 'lightblue',
        stroke: 'blue',
        opacity: 0.2,
      },
    };
  }

  public init(graph: IGraph) {
    super.init(graph);
  }

  // class-methods-use-this
  public getEvents() {
    return {
      afteritemchange: this.handleNodesChange,
    };
  }

  /**
   * viewport change
   * @param param
   */
  protected handleNodesChange(param: {
    itemType: ITEM_TYPE;
    action: string;
    models?: (NodeModel | EdgeModel | ComboModel)[];
    ids?: ID[];
  }) {
    const { itemType, models, ids, action } = param;
    if (itemType === 'edge' || action === 'add') return;

    Object.keys(this.hullMap).forEach((id) => {
      const hullComponent = this.hullMap[id];
      if (action === 'remove') {
        isArrayOverlap(hullComponent.options.members, ids) &&
          hullComponent.removeMember(ids);
      } else {
        const modelIds = models.map((model) => model.id);
        isArrayOverlap(hullComponent.options.members, modelIds) &&
          hullComponent.updateMembers();
      }
    });
  }

  public create(options: HullComponentOptions | HullComponentOptions[]) {
    const { padding, style, hullType, bubbleCfg } = this.options;
    const configs = isArray(options) ? options : [options];
    configs.forEach((config) => {
      const { id, style: singleStyle, members, ...others } = config;
      const validMembers = members?.filter(
        (memberId) =>
          this.graph.getNodeData(memberId) || this.graph.getComboData(memberId),
      );
      if (!validMembers?.length) {
        console.warn(`Create hull failed. There are no valid members.`);
        return;
      }
      if (this.hullMap[id]) {
        console.warn(
          `Create hull component failed. The bubble with id ${id} is existed.`,
        );
        return;
      }
      this.hullMap[id] = new HullComponent(this.graph, {
        id,
        padding,
        type: hullType,
        bubbleCfg,
        style: {
          ...style,
          ...singleStyle,
        },
        members: validMembers,
        ...others,
      });
    });
  }

  public update(options: HullComponentOptions | HullComponentOptions[]) {
    const configs = isArray(options) ? options : [options];
    configs.forEach((config) => {
      const { id, ...others } = config;
      if (!this.hullMap[id]) {
        console.warn(
          `Update hull component failed. The bubble with id ${id} is not existed.`,
        );
        return;
      }
      this.hullMap[id].updateOptions(others);
    });
  }

  public remove(ids: ID | ID[]) {
    const idArr = isArray(ids) ? ids : [ids];
    idArr.forEach((id) => {
      const hullComponent = this.hullMap[id];
      hullComponent.destroy();
      delete this.hullMap[id];
    });
  }

  public addMember(id: ID, members: ID | ID[]) {
    const hullComponent = this.hullMap[id];
    if (!hullComponent) {
      console.warn(
        `Add member to hull faield. The hull with id ${id} is not exist`,
      );
      return;
    }
    hullComponent.addMember(members);
  }

  public removeMember(id: ID, members: ID | ID[]) {
    const hullComponent = this.hullMap[id];
    if (!hullComponent) {
      console.warn(
        `Remove member from hull faield. The hull with id ${id} is not exist`,
      );
      return;
    }
    hullComponent.removeMember(members);
  }

  public destroy() {
    super.destroy();
  }
}
