import { IGraph } from '@g6/interface/graph';
declare const _default: {
    getDefaultCfg(): {};
    /**
     * register event handler, behavior will auto bind events
     * for example:
     * return {
     *  clicl: 'onClick'
     * }
     */
    getEvents(): {};
    shouldBegin(): boolean;
    shouldUpdate(): boolean;
    shouldEnd(): boolean;
    /**
     * auto bind events when register behavior
     * @param graph Graph instance
     */
    bind(graph: IGraph): void;
    unbind(graph: IGraph): void;
    get(val: any): any;
    set(key: any, val: any): any;
};
export default _default;
