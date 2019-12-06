import { G6Event, IG6GraphEvent } from "./event";
import { IModelConfig } from "./model";
export interface IBehavior {
  getDefaultCfg?: () => unknown;
  getEvents: () => { [key in G6Event]?: string };
  shouldBegin?: (cfg?: IModelConfig) => boolean;
  shouldUpdate?: (cfg?: IModelConfig) => boolean;
  shouldEnd?: (cfg?: IModelConfig) => boolean;
  [key: string]: (event?: IG6GraphEvent | IModelConfig) => unknown;
}
