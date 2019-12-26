import Group from "@antv/g-canvas/lib/group";
import Path from "@antv/g-canvas/lib/shape/path";
import { EdgeConfig, IBBox, IShapeBase, TreeGraphData } from '@g6/types';
export declare const getBBox: (element: IShapeBase, group: Group) => IBBox;
/**
 * get loop edge config
 * @param cfg edge config
 */
export declare const getLoopCfgs: (cfg: EdgeConfig) => EdgeConfig;
/**
 * 根据 label 所在线条的位置百分比，计算 label 坐标
 * @param {object}  pathShape  G 的 path 实例，一般是 Edge 实例的 keyShape
 * @param {number}  percent    范围 0 - 1 的线条百分比
 * @param {number}  refX     x 轴正方向为基准的 label 偏移
 * @param {number}  refY     y 轴正方向为基准的 label 偏移
 * @param {boolean} rotate     是否根据线条斜率旋转文本
 * @return {object} 文本的 x, y, 文本的旋转角度
 */
export declare const getLabelPosition: (pathShape: Path, percent: number, refX: number, refY: number, rotate: boolean) => Partial<{
    rotate: number;
    textAlign: string;
    angle: number;
    x: number;
    y: number;
    text: string;
    stroke: string;
    opacity: number;
    fontSize: number;
    fill: string;
}>;
export declare const traverseTree: (data: TreeGraphData, fn: (param: TreeGraphData) => boolean) => void;
/**
 *
 * @param data Tree graph data
 * @param layout
 */
export declare const radialLayout: (data: TreeGraphData, layout?: string) => TreeGraphData;
