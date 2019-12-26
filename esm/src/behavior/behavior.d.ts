import { BehaviorOpation } from '@g6/types';
export default class Behavior {
    private static types;
    /**
     * 自定义 Behavior
     * @param type Behavior 名称
     * @param behavior Behavior 定义的方法集合
     */
    static registerBehavior<T, U>(type: string, behavior: BehaviorOpation<U>): void;
    static hasBehavior(type: string): boolean;
    static getBehavior(type: string): any;
}
