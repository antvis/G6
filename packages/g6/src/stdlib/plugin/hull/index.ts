import { ShapeStyle } from '../../../types/item';
import { ComboModel, EdgeModel, ID, IGraph, NodeModel } from '../../../types';
import { Plugin as Base, IPluginBaseConfig } from '../../../types/plugin';
import HullComponent, { HullComponentOptions } from './hullComponent';
import { isArray, throttle, uniqueId } from '@antv/util';
import { BubblesetCfg } from './types';
import { ITEM_TYPE } from '@antv/g6';
import { isArrayOverlap } from '../../../util/array';
import { ComboLabelPosition } from 'types/combo';
import { DEFAULT_TEXT_STYLE } from '../../../constant';

interface HullConfig extends IPluginBaseConfig {
  /** Common style for the hulls in this plugin. You can also configure individually for each hulls. */
  style?: ShapeStyle;
  /** Common label config for hulls. You can also configure individually for each hull. */
  labelShape?: ShapeStyle & {
    position?: ComboLabelPosition;
    offsetX?: number;
    offsetY?: number;
    // string means the percentage of the keyShape, number means pixel
    maxWidth?: string | number;
  };
  /** The padding of the hull. */
  padding?: number;
  /** Controlling the effect of the bubble more finely (the scaling degree of the point and edge design, setting the granularity), generally no configuration is required */
  bubbleCfg?: BubblesetCfg;
  /** Initial Hulls. You can also add/remove/update hulls by API of this plugin. */
  hulls?: HullComponentOptions[];
}

export default class Hull extends Base {
  private hullMap: { [id: string]: HullComponent } = {};
  private cacheChanges = {
    remove: [],
    update: [],
  };
  constructor(options?: HullConfig) {
    super(options);
    this.key = options.key;
  }

  public getDefaultCfgs(): HullConfig {
    return {
      key: `hull-${uniqueId()}`,
      padding: 10,
      style: {
        fill: 'lightblue',
        stroke: 'blue',
        opacity: 0.2,
      },
      labelShape: {
        ...DEFAULT_TEXT_STYLE,
        position: 'outside-top',
        offsetY: -2,
      },
      hulls: [],
    };
  }

  public init(graph: IGraph) {
    super.init(graph);
  }

  // class-methods-use-this
  public getEvents() {
    return {
      afteritemchange: this.handleNodesChange,
      afterrender: this.handleAfterRender,
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
    if (action === 'remove') {
      this.cacheChanges.remove = this.cacheChanges.remove.concat(ids);
    } else {
      this.cacheChanges.update = this.cacheChanges.update.concat(models);
    }
    this.debounceUpdateMembers();
  }

  private debounceUpdateMembers = throttle(
    () => {
      Object.keys(this.hullMap).forEach((id) => {
        const hullComponent = this.hullMap[id];
        if (this.cacheChanges.remove.length) {
          isArrayOverlap(
            hullComponent.options.members,
            this.cacheChanges.remove,
          ) && hullComponent.removeMember(this.cacheChanges.remove);
        } else if (this.cacheChanges.update.length) {
          const modelIds = this.cacheChanges.update.map((model) => model.id);
          isArrayOverlap(hullComponent.options.members, modelIds) &&
            hullComponent.updateMembers();
        }
      });
      this.cacheChanges = { update: [], remove: [] };
    },
    50,
    {
      trailing: true,
      leading: true,
    },
  );

  protected handleAfterRender() {
    this.addHull(this.options.hulls);
  }

  public addHull(options: HullComponentOptions | HullComponentOptions[]) {
    const { padding, style, bubbleCfg, labelShape } = this.options;
    const configs = isArray(options) ? options : [options];
    configs.forEach((config) => {
      const {
        id,
        style: singleStyle,
        labelShape: singleLabelShape,
        members,
        ...others
      } = config;
      const validMembers = members?.filter(
        (memberId) =>
          this.graph.getNodeData(memberId) || this.graph.getComboData(memberId),
      );
      if (!validMembers?.length) {
        console.warn(`Create hull failed. There are no valid members.`);
        return;
      }
      if (validMembers.length !== members.length) {
        console.warn(
          `Some member of hull ${id} is not exist in the graph. Hull ${id} is added without those invalid members.`,
        );
      }
      const fullOptions = {
        id: `${this.key}-${id}`,
        padding,
        bubbleCfg,
        style: {
          ...style,
          ...singleStyle,
        },
        labelShape: singleLabelShape?.text
          ? {
              ...labelShape,
              ...singleLabelShape,
            }
          : undefined,
        members: validMembers,
        ...others,
      };
      if (this.hullMap[id]) {
        this.updateHull(fullOptions);
        return;
      }
      this.hullMap[id] = new HullComponent(this.graph, fullOptions);
    });
  }

  public updateHull(options: HullComponentOptions | HullComponentOptions[]) {
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

  public removeHull(ids: ID | ID[]) {
    const idArr = isArray(ids) ? ids : [ids];
    idArr.forEach((id) => {
      const hullComponent = this.hullMap[id];
      hullComponent.destroy();
      delete this.hullMap[id];
    });
  }

  public addHullMember(id: ID, members: ID | ID[]) {
    const hullComponent = this.hullMap[id];
    if (!hullComponent) {
      console.warn(
        `Add member to hull faield. The hull with id ${id} is not exist`,
      );
      return;
    }
    hullComponent.addMember(members);
  }

  public removeHullMember(id: ID, members: ID | ID[]) {
    const hullComponent = this.hullMap[id];
    if (!hullComponent) {
      console.warn(
        `Remove member from hull faield. The hull with id ${id} is not exist`,
      );
      return;
    }
    hullComponent.removeMember(members);
  }

  public addHullNonMember(id: ID, members: ID | ID[]) {
    const hullComponent = this.hullMap[id];
    if (!hullComponent) {
      console.warn(
        `Add non member to hull faield. The hull with id ${id} is not exist`,
      );
      return;
    }
    hullComponent.addNonMember(members);
  }

  public removeHullNonMember(id: ID, members: ID | ID[]) {
    const hullComponent = this.hullMap[id];
    if (!hullComponent) {
      console.warn(
        `Remove non member from hull faield. The hull with id ${id} is not exist`,
      );
      return;
    }
    hullComponent.removeNonMember(members);
  }
}
