import { AnimateCfg } from './animate';
import { BehaviorOptionsOf, BehaviorRegistry } from './behavior';
import { ComboDisplayModel, ComboEncode, ComboModel, ComboShapesEncode } from './combo';
import { Point } from './common';
import { FetchDataConfig, GraphData, InlineDataConfig, TransformerFn } from './data';
import { EdgeDisplayModel, EdgeEncode, EdgeModel, EdgeShapesEncode } from './edge';
import { LayoutOptions } from './layout';
import { NodeDisplayModel, NodeEncode, NodeModel, NodeShapesEncode } from './node';
import { GraphAlignment } from './view';

type rendererName = 'canvas' | 'svg' | 'webgl';

export interface Specification<B extends BehaviorRegistry> {
  type: 'graph' | 'tree';
  container: string | HTMLElement;
  width?: number;
  height?: number;
  renderer?:
    | rendererName
    | {
        type: rendererName;
        pixelRatio: number;
        headless: boolean;
      };
  zoom?: number;
  autoFit?:
    | 'view'
    | 'center'
    | {
        position: Point;
        alignment: GraphAlignment;
      };
  optimizeThreshold?: number;

  /** data */
  data: GraphData | InlineDataConfig | FetchDataConfig; // TODO: more
  transform?:
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
    [state: string]: ((data: NodeModel) => NodeDisplayModel) | NodeShapesEncode;
  };
  edgeState?: {
    [state: string]: ((data: EdgeModel) => EdgeDisplayModel) | EdgeShapesEncode;
  };
  comboState?: {
    [state: string]: ((data: ComboModel) => ComboDisplayModel) | ComboShapesEncode;
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
  plugins?: {
    name: string;
    options: any; // TODO: configs from plugins
  }[];
}
