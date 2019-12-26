import { IEdge, INode } from "@g6/interface/item";
import { EdgeConfig } from '@g6/types';
import Item from './item';
export default class Edge extends Item implements IEdge {
    protected getDefaultCfg(): {
        type: string;
        sourceNode: any;
        targetNode: any;
        startPoint: any;
        endPoint: any;
        linkCenter: boolean;
    };
    private setEnd;
    /**
     * 获取连接点的坐标
     * @param name source | target
     * @param model 边的数据模型
     * @param controlPoints 控制点
     */
    private getLinkPoint;
    /**
     * 获取同端点进行连接的点，计算交汇点
     * @param name
     * @param controlPoints
     */
    private getPrePoint;
    /**
     * 获取端点的位置
     * @param name
     */
    private getEndPoint;
    /**
     * 通过端点的中心获取控制点
     * @param model
     */
    private getControlPointsByCenter;
    private getEndCenter;
    protected init(): void;
    getShapeCfg(model: EdgeConfig): EdgeConfig;
    /**
     * 获取边的数据模型
     */
    getModel(): EdgeConfig;
    setSource(source: INode): void;
    setTarget(target: INode): void;
    getSource(): INode;
    getTarget(): INode;
    updatePosition(): void;
    /**
     * 边不需要重计算容器位置，直接重新计算 path 位置
     * @param {object} cfg 待更新数据
     */
    update(cfg: EdgeConfig): void;
    destroy(): void;
}
