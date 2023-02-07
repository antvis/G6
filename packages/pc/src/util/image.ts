import { IElement } from "@antv/g-base";

/**
 * Clone group and clone the clip shapes of image shapes.
 * @param group group to be cloned
 * @returns cloned group with same clipped shapes of original group
 */
export const cloneGElement = (element: IElement): IElement => {
  const vElement = element.clone();
  applyCloneClip(element, vElement);
  return vElement;
}

/**
 * Apply the clipShape for image shapes from original element to cloned one (clonedElement).
 * @param element original element
 * @param clonedElement cloned element of original element
 */
const applyCloneClip = (element: IElement, clonedElement: IElement) => {
  if (element.isGroup() && clonedElement.isGroup()) {
    element.get('children')?.forEach((child, i) => {
      const clonedChild = clonedElement.get('children')[i];
      applyCloneClip(child, clonedChild);
    });
  }
  const type = element.get('type');
  const clonedType = clonedElement.get('type');
  if (type !== 'image' || clonedType !== 'image') return;
  const clipShape = element.get('clipShape');
  if (clipShape) {
    clonedElement.setClip({
      type: clipShape.get('type'),
      attrs: clipShape.attr()
    });
  }
}