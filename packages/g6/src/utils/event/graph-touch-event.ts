import { IPointerEvent } from '@/src';
import { CanvasEvent } from '@/src/constants';
import { Graph } from '@/src/runtime/graph';
import deepClone from '@/src/utils/deepClone';

export type TouchEventType = 'touchStart' | 'touchMove' | 'touchEnd';
type TouchCB = (touchList: TouchListType) => void;
export type CB = {
  key: string;
  cb: TouchCB;
};
export type TouchListType = IPointerEvent[];
export enum TouchEventEnum {
  TOUCH_START = 'touchStart',
  TOUCH_END = 'touchEnd',
  TOUCH_MOVE = 'touchMove',
}
class GraphTouchEvent {
  private touchList: IPointerEvent[] = [];
  private graphInstance: Graph | null = null;
  private cbList: {
    [key in TouchEventType]: CB[];
  } = {
    touchStart: [],
    touchMove: [],
    touchEnd: [],
  };
  constructor(graph: Graph) {
    this.bindEvent(graph);
  }
  bindEvent(graph: Graph) {
    this.graphInstance = graph;
    graph.on(CanvasEvent.POINTER_DOWN, (e: IPointerEvent) => {
      this.touchStart(e);
    });
    graph.on(CanvasEvent.POINTER_MOVE, (e: IPointerEvent) => {
      this.touchMove(e);
    });
    graph.on(CanvasEvent.POINTER_UP, (e: IPointerEvent) => {
      this.touchEnd();
    });
  }
  on(eventName: TouchEventType, cb: TouchCB, behaviorKey: string): void {
    this.cbList[eventName].push({
      key: behaviorKey,
      cb,
    });
  }

  touchStart(e: IPointerEvent): void {
    if (!this.validate(e)) return;
    this.touchList.push(deepClone(e));

    this.notify(TouchEventEnum.TOUCH_START, this.touchList);
  }
  touchMove(e: IPointerEvent): void {
    if (!this.validate(e)) return;
    this.notify(TouchEventEnum.TOUCH_MOVE, [e]);
  }
  touchEnd(): void {
    this.touchList.pop();
    this.notify(TouchEventEnum.TOUCH_END, this.touchList);
  }
  notify(eventName: TouchEventType, arg: IPointerEvent[]): void {
    {
      this.cbList[eventName].forEach((cb) => {
        cb.cb(arg);
      });
    }
  }
  unsubscribe(eventName: TouchEventType, behaviorKey: string): void {
    this.cbList[eventName] = this.cbList[eventName].filter((touchCbEvent) => {
      return touchCbEvent.key !== behaviorKey;
    });
  }
  off(eventName: TouchEventType): void {
    if (!this.graphInstance) {
      throw new Error('Please bindEvent first');
    }
    this.cbList[eventName] = [];
    this.graphInstance.off(CanvasEvent.POINTER_DOWN);
    this.graphInstance.off(CanvasEvent.POINTER_MOVE);
    this.graphInstance.off(CanvasEvent.POINTER_UP);
  }
  validate(e: IPointerEvent): boolean {
    return e.pointerType === 'touch';
  }
}
export default GraphTouchEvent;
