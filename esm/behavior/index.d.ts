import { IModel, IModelCfg, IModelStyle } from '../interface';
import { IGraph } from '../interface/graph';
interface IBehavior {
    getDefaultCfg?: () => IModelCfg;
    getEvents: () => {
        [key: string]: string;
    };
    shouldBegin: (cfg?: IModel) => boolean;
}
export default class Behavior {
    private _events;
    registerBehavior(type: string, behavior: IBehavior): void;
    bind(graph: IGraph): void;
    /**
     *
     * @param cfg 默认的配置项
     */
    getDefaultCfg(cfg: IModelCfg): IModelStyle;
}
export {};
