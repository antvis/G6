import { GraphChange, ID } from '@antv/graphlib';
import type { G6Spec } from '../spec';
import type { DataOption } from '../spec/data';
import { ComboOptions, EdgeOptions, NodeOptions } from '../spec/element';
import { LayoutOption } from '../spec/layout';
import { STDWidget } from '../spec/widget';
import { AnimationOptions } from '../types/animate';
import { ComboDisplayModel, ComboModel, ComboShapesEncode } from '../types/combo';
import type { DataChangeType, DataId } from '../types/data';
import { EdgeDisplayModel, EdgeModel, EdgeModelData, EdgeShapesEncode } from '../types/edge';
import { ItemType, SHAPE_TYPE, ShapeStyle, State } from '../types/item';
import { NodeDisplayModel, NodeModel, NodeModelData, NodeShapesEncode } from '../types/node';
import { Theme } from '../types/theme';
import { GraphTransformOptions } from '../types/view';
import type { Controller } from './controller';
import type { Graph } from './graph';

export class Hooks {
  /**
   * <zh/> 画布初始化完成
   *
   * <en/> Canvas initialization completed
   */
  public init = new Hook<InitParams>('init');

  /**
   * <zh/> 数据变化
   *
   * <en/> Data change
   */
  public datachange = new Hook<DataChangeParams>('datachange');

  /**
   * <zh/> 节点/边/Combo变化
   *
   * <en/> Item change
   */
  public itemchange = new Hook<ItemChangeParams>('itemchange');

  /**
   * <zh/> 渲染完成
   *
   * <en/> Render completed
   */
  public render = new Hook<RenderParams>('render');

  /**
   * <zh/> 布局完成
   *
   * <en/> Layout completed
   */
  public layout = new Hook<LayoutParams>('layout');

  // TODO layoutchange
  // public layoutchange = new Hook<>('layoutchange');

  /**
   * <zh/> 模式变化
   *
   * <en/> Mode change
   */
  public modechange = new Hook<ModeChangeParams>('modechange');

  /**
   * <zh/> 行为变化
   *
   * <en/> Behavior change
   */
  public behaviorchange = new Hook<BehaviorChangeParams>('behaviorchange');

  /**
   * <zh/> 状态变化
   *
   * <en/> State change
   */
  public itemstatechange = new Hook<ItemStateChangeParams>('itemstatechange');

  /**
   * <zh/> 状态配置变化
   *
   * <en/> State config change
   */
  public itemstateconfigchange = new Hook<ItemStateConfigChangeParams>('itemstateconfigchange');

  /**
   * <zh/> 可见性变化
   *
   * <en/> Visibility change
   */
  public itemvisibilitychange = new Hook<ItemVisibilityChangeParams>('itemvisibilitychange');

  /**
   * <zh/> 层级变化
   *
   * <en/> Z index change
   */
  public itemzindexchange = new Hook<ItemZIndexChangeParams>('itemzindexchange');

  /**
   * <zh/> 临时元素更新
   *
   * <en/> Transient item update
   */
  public transientupdate = new Hook<TransientUpdateParams>('transientupdate');

  /**
   * <zh/> 视口变化
   *
   * <en/> Viewport change
   */
  public viewportchange = new Hook<ViewportChangeParams>('viewportchange');

  /**
   * <zh/> 主题变化
   *
   * <en/> Theme change
   */
  public themechange = new Hook<ThemeChangeParams>('themechange');

  /**
   * <zh/> 主题样式变化
   *
   * <en/> Theme style change
   */
  public themestylechange = new Hook<ThemeStyleChangeParams>('themestylechange');

  /**
   * <zh/> 数据映射变化
   *
   * <en/> Mapper change
   */
  public mapperchange = new Hook<MapperChangeParams>('mapperchange');

  public widgetchange = new Hook<WidgetChangeParams>('widgetchange');

  /**
   * <zh/> 树图节点展开/收起
   *
   * <en/> Tree node collapse/expand
   */
  public treecollapseexpand = new Hook<TreeCollapseExpandParams>('treecollapseexpand');

  /**
   * <zh/> 销毁
   *
   * <en/> Destroy
   */
  public destroy = new Hook<DestroyParams>('destroy');
}

export interface RuntimeContext {
  options: G6Spec;
  graph: Graph;
  controller: Controller;
}

export interface BaseParams {
  context: RuntimeContext;
}

export interface InitParams extends BaseParams {}

export type DataChangeParams =
  | {
      type: Exclude<DataChangeType, 'remove'>;
      data: DataOption;
    }
  | {
      type: Extract<DataChangeType, 'remove'>;
      data: DataId;
    };

export interface ItemChangeParams extends BaseParams {
  changes: GraphChange<NodeModelData, EdgeModelData>[];
  updateAncestors?: boolean;
  animate?: boolean;
  action?: 'updatePosition';
  callback?: (model: NodeModel | EdgeModel | ComboModel) => void;
}

export interface RenderParams extends BaseParams {}

export interface LayoutParams extends BaseParams {
  options?: LayoutOption;
  animate?: boolean;
}

export interface ModeChangeParams extends BaseParams {
  mode: string[];
}

export interface BehaviorChangeParams extends BaseParams {
  action: 'update' | 'add' | 'remove';
  modes: string[];
  behaviors: (string | any)[];
}

export interface ItemStateChangeParams extends BaseParams {
  value: Record<string, State[]>;
}

export interface ItemStateConfigChangeParams extends BaseParams {
  itemType: ItemType;
  stateConfig:
    | {
        [stateName: string]: ((data: NodeModel) => NodeDisplayModel) | NodeShapesEncode;
      }
    | {
        [stateName: string]: ((data: EdgeModel) => EdgeDisplayModel) | EdgeShapesEncode;
      }
    | {
        [stateName: string]: ((data: ComboModel) => ComboDisplayModel) | ComboShapesEncode;
      };
}

export interface ItemVisibilityChangeParams extends BaseParams {
  value: Record<ID, 'visible' | 'hidden'>;
  animate?: boolean;
}

export interface ItemZIndexChangeParams extends BaseParams {
  value: Record<ID, number | 'bottom' | 'top'>;
}

export interface TransientUpdateParams extends BaseParams {
  type: ItemType | SHAPE_TYPE;
  id: ID;
  config: {
    style?: ShapeStyle;
    action?: 'remove' | 'add' | 'update';
    /** For type: 'edge' */
    drawSource?: boolean;
    /** For type: 'edge' */
    drawTarget?: boolean;
    /** Only shape with id in shapeIds will be cloned while type is ITEM_TYPE. If shapeIds is not assigned, the whole item will be cloned. */
    shapeIds?: string[];
    /** Whether show the shapes in shapeIds. True by default. */
    visible?: boolean;
    updateAncestors?: boolean;
  };
}

export interface ViewportChangeParams extends BaseParams {
  transform: GraphTransformOptions;
  effectTiming?: Partial<AnimationOptions>;
  tileLodSize?: number;
}

export interface ThemeChangeParams extends BaseParams {}

export interface ThemeStyleChangeParams extends BaseParams {
  value: Theme;
}

export interface MapperChangeParams extends BaseParams {
  type: ItemType;
  mapper: NodeOptions | EdgeOptions | ComboOptions;
}

export interface WidgetChangeParams extends BaseParams {
  value: STDWidget[];
}

export interface TreeCollapseExpandParams extends BaseParams {
  ids: ID[];
  action: 'collapse' | 'expand';
  animate?: boolean;
}

export interface DestroyParams extends BaseParams {}

/**
 * <zh/> 钩子类，统一定义 tap 和 emit
 * 一个钩子对应一个图上的生命周期
 *
 * <en/> A hook class unified the definitions of tap, and emit.
 * One hook corresponds to one lifecycle on a graph.
 */
class Hook<T> {
  public name: string;

  /**
   * <zh/> 钩子对应的生命周期的监听器，会依次执行
   *
   * <en/> The listeners of the corresponding lifecycle of this hook, which will be executed in order.
   */
  protected listeners: ((param: T) => void)[] = [];

  constructor(name: string) {
    this.name = name;
  }

  /**
   * <zh/> 订阅钩子对应的生命周期
   *
   * <en/> Tap a listener to the corresponding lifecycle of this hook.
   * @param listener - <zh/> 钩子监听器 | <en/> Hook listener
   */
  public tap(listener: (param: T) => void) {
    this.listeners.push(listener);
  }

  /**
   * <zh/> 触发钩子对应的生命周期，调用所有订阅的监听器
   *
   * <en/> Emit the corresponding lifecycle of this hook, and call all the tapped listeners.
   * @param param - <zh/> 钩子参数 | <en/> Hook parameter
   */
  public emit(param: T) {
    this.listeners.forEach((listener) => listener(param));
  }

  /**
   * <zh/> 顺序触发钩子对应的生命周期，调用所有订阅的监听器
   *
   * <en/> Emit the corresponding lifecycle of this hook in order, and call all the tapped listeners.
   * @param param - <zh/> 钩子参数 | <en/> Hook parameter
   */
  public async emitAsync(param: T): Promise<void> {
    for (const listener of this.listeners) {
      await listener(param);
    }
  }
}
