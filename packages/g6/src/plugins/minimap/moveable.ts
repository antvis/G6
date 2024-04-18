export interface MoveableOptions {
  container?: Window | Node | Element;
  scaleRatio?: number;
  width?: number;
  height?: number;
  boundary?: number;
}

const getBoundingClientRectByScale = (el: HTMLElement | Element, scaleRatio: number) => {
  const curRect = el.getBoundingClientRect();
  return {
    ...curRect,
    left: curRect.left / scaleRatio,
    top: curRect.top / scaleRatio,
    right: curRect.right / scaleRatio,
    bottom: curRect.bottom / scaleRatio,
    width: curRect.width / scaleRatio,
    height: curRect.height / scaleRatio,
  } as DOMRect;
};

const applyDefaults = (options: Record<string, any> | undefined | null, defaults: any) => {
  options = options || {};
  defaults = defaults || {};
  const keys = [...Object.keys(options), ...Object.keys(defaults)];

  return keys.reduce(
    (obj, key) => ({
      ...obj,
      [key]: options[key] ?? defaults[key],
    }),
    {},
  );
};

export type DragData = {
  width: number;
  height: number;
  left: number;
  top: number;
  delta: [number, number];
};
type EventFn = (e: MouseEvent, payload: DragData) => void;

export default class Moveable {
  public options: Required<MoveableOptions>;
  static defaultOptions = {
    scaleRatio: 1,
    width: 100,
    height: 100,
    boundary: true,
  };
  private dragData: DragData = { width: 0, height: 0, left: 0, top: 0, delta: [0, 0] };
  private target: HTMLElement;
  private isMousedown = false;
  private eventMap: Partial<Record<'dragStart' | 'drag' | 'dragEnd', EventFn[]>> = {};
  constructor(target: HTMLElement, options: MoveableOptions = {}) {
    this.options = applyDefaults(options, Moveable.defaultOptions) as Required<MoveableOptions>;
    this.target = target;

    target.addEventListener('mousedown', this.onMouseDown);
  }

  private onMouseDown = (e: MouseEvent) => {
    this.isMousedown = true;
    // 外部可以修改viewport得位置,所以无法放构造器做
    const { width, height, left, top } = getBoundingClientRectByScale(this.target, this.options.scaleRatio);
    this.dragData = {
      width: width || this.options.width,
      height: height || this.options.height,
      left: left,
      top: top,
      delta: [0, 0],
    };
    let minX = 0;
    let maxX = 0;
    let minY = 0;
    let maxY = 0;
    if (this.options.boundary) {
      [minX, maxX, minY, maxY] = this.getBoundary();
    }

    const { clientX: downX, clientY: downY } = e;

    this.emit('dragStart', e, this.dragData);

    const onMousemove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      let moveX = (clientX - downX) / this.options.scaleRatio + left;
      let moveY = (clientY - downY) / this.options.scaleRatio + top;

      if (this.options.boundary) {
        [moveX, moveY] = this.fixBoundary(moveX, moveY, minX, maxX, minY, maxY);
      }
      this.dragData.delta = [moveX - this.dragData.left, moveY - this.dragData.top];
      this.dragData.left = moveX;
      this.dragData.top = moveY;

      this.emit('drag', e, this.dragData);
    };

    const onMouseup = (e: MouseEvent) => {
      this.isMousedown = false;
      this.emit('dragEnd', e, this.dragData);
      document.removeEventListener('mousemove', onMousemove);
      document.removeEventListener('mouseup', onMouseup);
      document.removeEventListener('mouseleave', onMouseup);
    };

    document.addEventListener('mousemove', onMousemove);
    document.addEventListener('mouseup', onMouseup);
    document.addEventListener('mouseleave', onMouseup);
  };

  private getBoundary = () => {
    const minX = 0;
    const minY = 0;
    const { left, top, height, width } = this.dragData;
    const parentEl = this.target.offsetParent || document.body;
    const parentElRect = parentEl.getBoundingClientRect();

    // 最大x
    const maxX = parentElRect.width - width;
    // 最大y
    const maxY = parentElRect.height - height;
    return [minX, maxX - minX, minY, maxY - minY, parentElRect.width, parentElRect.height];
  };

  private fixBoundary = (moveX: number, moveY: number, minX: number, maxX: number, minY: number, maxY: number) => {
    // 判断x最小最大边界
    moveX = moveX < minX ? minX : moveX;
    moveX = moveX > maxX ? maxX : moveX;

    // 判断y最小最大边界
    moveY = moveY < minY ? minY : moveY;
    moveY = moveY > maxY ? maxY : moveY;
    return [moveX, moveY];
  };

  public on = (name: keyof typeof this.eventMap, cb: EventFn) => {
    this.eventMap[name] = [...(this.eventMap[name] || []), cb];
    return this;
  };

  private emit = (eventName: keyof typeof this.eventMap, e: MouseEvent, payload: DragData) => {
    (this.eventMap[eventName] || []).forEach((cb) => cb(e, payload));
  };
  public unset = () => {
    this.target.removeEventListener('mousedown', this.onMouseDown);
  };
}
