import { Canvas } from '@antv/g';
import { AnimateCfg, CameraAnimationOptions } from './animate';
import { Padding, Point } from './common';
import { DataConfig, TransformerFn } from './data';
import {
  EdgeDisplayModel,
  EdgeEncode,
  EdgeModel,
  EdgeShapesEncode,
} from './edge';
import {
  NodeDisplayModel,
  NodeEncode,
  NodeModel,
  NodeShapesEncode,
} from './node';
import { FitViewRules, GraphAlignment } from './view';
import {
  ComboDisplayModel,
  ComboEncode,
  ComboModel,
  ComboShapesEncode,
} from './combo';
import { BehaviorOptionsOf, BehaviorRegistry } from './behavior';
import { LayoutOptions } from './layout';
import { ThemeOptionsOf, ThemeRegistry } from './theme';

import { RendererName } from './render';
import { StackCfg } from './history';
import { Plugin } from './plugin';

export interface Specification<
  B extends BehaviorRegistry,
  T extends ThemeRegistry,
> {
  container?: string | HTMLElement;
  backgroundCanvas?: Canvas;
  canvas?: Canvas;
  transientCanvas?: Canvas;
  width?: number;
  height?: number;
  renderer?:
    | RendererName
    | {
        type: RendererName;
        pixelRatio: number;
        headless: boolean;
      };
  zoom?: number;
  optimize?: {
    tileFirstRender: boolean | number;
    behavior: boolean | number;
  };
  autoFit?:
    | 'view'
    | 'center'
    | {
        type: 'view';
        padding?: Padding;
        rules?: FitViewRules;
        effectTiming?: CameraAnimationOptions;
      }
    | {
        type: 'center';
        effectTiming?: CameraAnimationOptions;
      }
    | {
        type: 'position';
        position: Point;
        alignment?: GraphAlignment;
        effectTiming?: CameraAnimationOptions;
      };
  optimizeThreshold?: number;

  /** data */
  data?: DataConfig;
  transforms?:
    | string[]
    | {
        type: string;
        [param: string]: unknown; // TODO: generate by plugins
      }[]
    | TransformerFn[];

  /** item */
  node?: ((data: NodeModel) => NodeDisplayModel) | NodeEncode;
  edge?: ((data: EdgeModel) => EdgeDisplayModel) | EdgeEncode;
  combo?: ((data: ComboModel) => ComboDisplayModel) | ComboEncode;

  /** item state styles */
  nodeState?: {
    [stateName: string]:
      | ((data: NodeModel) => NodeDisplayModel)
      | NodeShapesEncode;
  };
  edgeState?: {
    [stateName: string]:
      | ((data: EdgeModel) => EdgeDisplayModel)
      | EdgeShapesEncode;
  };
  comboState?: {
    [stateName: string]:
      | ((data: ComboModel) => ComboDisplayModel)
      | ComboShapesEncode;
  };

  /** layout */
  layout?: LayoutOptions | LayoutOptions[];

  /** interaction */
  modes?: {
    // default: BehaviorOptionsOf<B>[]; // TODO: behavior config comes from behaviors; TODO: interaction specs
    [mode: string]: BehaviorOptionsOf<B>[]; // TODO: behavior config comes from behaviors; TODO: interaction specs
  };
  mode?: 'default' | string;

  /** global animate */
  animate?: AnimateCfg;

  /** free plugins */
  plugins?: (
    | string
    | {
        key: string;
        type: string;
        [cfgName: string]: unknown; // TODO: configs from plugins
      }
    | Plugin
  )[];

  /** theme */
  theme?: ThemeOptionsOf<T>;

  enableStack?: boolean;

  stackCfg?: StackCfg;
}
