import { AnimateCfg } from ".";
import { Point } from "./common";
import { FetchDataConfig, InlineDataConfig, TransformerFn } from "./data";
import { EdgeDisplayModel, EdgeEncode, EdgeModel, EdgeShapesEncode } from "./edge";
import { NodeDisplayModel, NodeEncode, NodeModel, NodeShapesEncode } from "./node";
import { GraphAlignment } from "./view";
import { LayoutCommonConfig } from "./layout";

type rendererName = 'canvas' | 'svg' | 'webgl';

export interface Specification {
  type: 'graph' | 'treeGraph';
  width?: number;
  height?: number;
  renderer?: rendererName | {
    type: rendererName,
    pixelRatio: number,
    headless: boolean,
  };
  zoom?: number;
  autoFit?: 'view' | 'center' | {
    position: Point,
    alignment: GraphAlignment
  };
  optimizeThreshold?: number;

  /** data */
  data: InlineDataConfig | FetchDataConfig; // TODO: more
  transform?: string[] | {
    type: string,
    [param: string]: unknown // TODO: generate by plugins
  }[] | TransformerFn[];

  /** item */
  node?: (data: NodeModel) => NodeDisplayModel | NodeEncode;
  edge?: (data: EdgeModel) => EdgeDisplayModel | EdgeEncode;
  combo?: (data: NodeModel) => NodeDisplayModel | NodeEncode; // TODO: combo's type

  /** item state styles */
  nodeState?: {
    [state: string]: (data: NodeModel) => NodeDisplayModel | NodeShapesEncode;
  };
  edgeState?: {
    [state: string]: (data: EdgeModel) => EdgeDisplayModel | EdgeShapesEncode;
  };
  comboState?: {
    [state: string]: (data: NodeModel) => NodeDisplayModel | NodeShapesEncode;
  };

  /** layout */
  layout?: LayoutCommonConfig | LayoutCommonConfig[]; // TODO: Config comes from @antv/layout

  /** interaction */
  modes?: {
    default: string[] | BehaviorConfig[]; // TODO: behavior config comes from behaviors; TODO: interaction specs
    [mode: string]: string[] | BehaviorConfig[]; // TODO: behavior config comes from behaviors; TODO: interaction specs
  };
  mode?: string;

  /** global animate */
  animate?: AnimateCfg;

  /** free plugins */
  plugins?: {
    name: string,
    options: any; // TODO: configs from plugins
  }[]
}