import type { DisplayObject, DisplayObjectConfig, ImageStyleProps as GImageStyleProps } from '@antv/g';
import { ElementEvent, Image as GImage, Rect as GRect } from '@antv/g';
import { getAncestorShapes } from '../../utils/shape';

export interface ImageStyleProps extends GImageStyleProps {
  /**
   * <zh/> 圆角半径
   *
   * <en/> Radius of the rounded corner
   */
  radius?: number | number[];
}

export class Image extends GImage {
  constructor(options: DisplayObjectConfig<ImageStyleProps>) {
    super(options);
    current = this;
    this.isMutationObserved = true;
    this.addEventListener(ElementEvent.MOUNTED, this.onMounted);
    this.addEventListener(ElementEvent.ATTR_MODIFIED, this.onAttrModified);
  }

  private onMounted = () => {
    this.handleRadius();
  };

  private onAttrModified = () => {
    this.handleRadius();
  };

  public handleRadius() {
    const { radius, clipPath, width = 0, height = 0 } = this.attributes as ImageStyleProps;

    if (radius && width && height) {
      const [x, y] = this.getBounds().min;
      const clipPathStyle = { x, y, radius, width, height };

      if (clipPath) {
        Object.assign(this.parsedStyle.clipPath!.style, clipPathStyle);
      } else {
        const rect = new GRect({ style: clipPathStyle });
        this.style.clipPath = rect;
      }
    } else {
      if (clipPath) this.style.clipPath = null;
    }
  }
}

const ImagesWeakMap = new WeakMap<DisplayObject, Image[]>();

let current: Image | null = null;

/**
 * <zh/> 由于 g clipPath 不支持相对位置，因此当作用的元素发生位置变化时，需要通知 Image 更新 clipPath。
 *
 * 通过 connectImage 创建图形与图片的关联，并结合 dispatchPositionChange 方法触发更新
 *
 * ⚠️ 这是一种临时的、黑盒的解决方案，如果后续 g 支持相对位置，会移除该方法。
 *
 * <en/> Since g clipPath does not support relative positions, when the position of the affected element changes, the Image needs to be notified to update the clipPath.
 *
 * Use connectImage to create an association between the shape and the image, and combine it with the dispatchPositionChange method to trigger the update.
 *
 * ⚠️ This is a temporary, black-box solution, and if g supports relative positions in the future, this method will be removed.
 * @param target - <zh/> 目标元素 <en/> Target element
 */
export const connectImage = (target: DisplayObject) => {
  if (current && getAncestorShapes(current).includes(target)) {
    const images = ImagesWeakMap.get(target);
    if (images) {
      if (!images.includes(current)) images.push(current);
    } else ImagesWeakMap.set(target, [current]);
  }
};

/**
 * <zh/> 触发关联的图片更新位置
 *
 * <en/> Trigger the associated image to update its position
 * @param target - <zh/> 目标元素 <en/> Target element
 */
export const dispatchPositionChange = (target: DisplayObject) => {
  const image = ImagesWeakMap.get(target);
  if (image) {
    image.forEach((i) => i.handleRadius());
  }
};
