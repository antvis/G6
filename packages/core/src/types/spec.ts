import { AnimateCfg } from "./animate";
import { Point } from "./common";
import { FetchDataConfig, InlineDataConfig, TransformerFn } from "./data";
import { EdgeDisplayModel, EdgeEncode, EdgeModel, EdgeShapesEncode } from "./edge";
import { NodeDisplayModel, NodeEncode, NodeModel, NodeShapesEncode } from "./node";
import { GraphAlignment } from "./view";
import { LayoutCommonConfig } from "./layout";
import { ComboDisplayModel, ComboEncode, ComboModel } from "./combo";

type rendererName = 'canvas' | 'svg' | 'webgl';

export interface Specification {
  type: 'graph' | 'tree';
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
  combo?: (data: ComboModel) => ComboDisplayModel | ComboEncode;

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
    default: BehaviorName[] | BehaviorConfig[]; // TODO: behavior config comes from behaviors; TODO: interaction specs
    [mode: string]: BehaviorName[] | BehaviorConfig[]; // TODO: behavior config comes from behaviors; TODO: interaction specs
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
