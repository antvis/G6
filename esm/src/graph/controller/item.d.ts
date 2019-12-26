import { EdgeConfig, Item, ITEM_TYPE, NodeConfig } from '@g6/types';
import Graph from '../graph';
export default class ItemController {
    private graph;
    destroyed: boolean;
    constructor(graph: Graph);
    /**
     * 增加 Item 实例
     *
     * @param {ITEM_TYPE} type 实例类型，node 或 edge
     * @param {(NodeConfig & EdgeConfig)} model 数据模型
     * @returns {(Item)}
     * @memberof ItemController
     */
    addItem<T = Item>(type: ITEM_TYPE, model: NodeConfig & EdgeConfig): T;
    /**
     * 更新节点或边
     *
     * @param {Item} item ID 或 实例
     * @param {(EdgeConfig | NodeConfig)} cfg 数据模型
     * @returns
     * @memberof ItemController
     */
    updateItem(item: Item, cfg: EdgeConfig | NodeConfig): void;
    /**
     * 删除指定的节点或边
     *
     * @param {Item} item item ID 或实例
     * @returns {void}
     * @memberof ItemController
     */
    removeItem(item: Item): void;
    /**
     * 更新 item 状态
     *
     * @param {Item} item Item 实例
     * @param {string} state 状态名称
     * @param {boolean} enabled 是否启用状态
     * @returns {void}
     * @memberof ItemController
     */
    setItemState(item: Item, state: string, enabled: boolean): void;
    /**
     * 清除所有指定的状态
     *
     * @param {Item} item Item 实例
     * @param {string[]} states 状态名称集合
     * @memberof ItemController
     */
    clearItemStates(item: Item, states: string[]): void;
    /**
     * 刷新指定的 Item
     *
     * @param {Item} item Item ID 或 实例
     * @memberof ItemController
     */
    refreshItem(item: Item): void;
    /**
     * 改变Item的显示状态
     *
     * @param {Item} item Item ID 或 实例
     * @param {boolean} visible 是否显示
     * @memberof ItemController
     */
    changeItemVisibility(item: Item, visible: boolean): void;
    destroy(): void;
}
