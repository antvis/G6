import { IGraph, IMode, IModeType } from '@g6/interface/graph';
export default class ModeController {
    private graph;
    destroyed: boolean;
    /**
     * modes = {
     *  default: [ 'drag-node', 'zoom-canvas' ],
     *  edit: [ 'drag-canvas', {
     *    type: 'brush-select',
     *    trigger: 'ctrl'
     *  }]
     * }
     *
     * @private
     * @type {IMode}
     * @memberof Mode
     */
    modes: IMode;
    /**
     * mode = 'drag-node'
     *
     * @private
     * @type {string}
     * @memberof Mode
     */
    mode: string;
    private currentBehaves;
    constructor(graph: IGraph);
    private formatModes;
    private setBehaviors;
    private mergeBehaviors;
    private filterBehaviors;
    setMode(mode: string): ModeController;
    /**
     * 动态增加或删除 Behavior
     *
     * @param {IModeType[]} behaviors
     * @param {(IModeType[] | IModeType)} modes
     * @param {boolean} isAdd
     * @returns {Mode}
     * @memberof Mode
     */
    manipulateBehaviors(behaviors: IModeType[] | IModeType, modes: string[] | string, isAdd: boolean): ModeController;
    destroy(): void;
}
