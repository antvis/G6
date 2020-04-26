import ActionBase from '../base'
import { IG6GraphEvent } from '../../../types';
import { IShape } from '@antv/g-base/lib/interfaces';
import { IGraph } from '../../../interface/graph';

export default abstract class DelagateBase extends ActionBase {
  protected delegateShape: IShape = null
  protected originDelegate = null
  protected origin = null
  protected type = ''

  /**
   * 移动 delegate
   */
  public move() {
    const { width, height, minX, minY } = this.originDelegate
    const evt = this.context.event
    const clientX = evt.x - this.origin.x + minX;
    const clientY = evt.y - this.origin.y + minY;

    if (this.type === 'circle') {
      this.delegateShape.attr({
        x: clientX + width / 2,
        y: clientY + height / 2
      })
    } else if (this.type = 'rect') {
      this.delegateShape.attr({
        x: clientX,
        y: clientY
      })
    }
  }

  public end() {
    // 拖动结束后，清除 delegate 图形
    if (this.delegateShape) {
      this.delegateShape.remove()
      this.delegateShape = null
    }
  }

  /**
   * 计算delegate位置，包括左上角左边及宽度和高度
   * @memberof ItemGroup
   * @return {object} 计算出来的delegate坐标信息及宽高
   */
  protected calculationGroupPosition() {
    const evt = this.context.event as IG6GraphEvent
    const graph: IGraph = this.getGraph()
    const { item } = evt

    const nodes = graph.findAllByState('node', 'selected');

    const currentNodeId = item.get('id');

    // 当前拖动的节点是否是选中的节点
    const dragNodes = nodes.filter(node => {
      const nodeId = node.get('id');
      return currentNodeId === nodeId;
    });

    // 如果当前拖动的元素不是选中的元素，则说明只拖动当前一个元素
    if (dragNodes.length === 0) {
      nodes.length = 0
      nodes.push(item)
    }

    let minx = Infinity;
    let maxx = -Infinity;
    let miny = Infinity;
    let maxy = -Infinity;

    // 获取已节点的所有最大最小x y值
    for (let i = 0; i < nodes.length; i++) {
      const element = nodes[i];
      const bbox = element.getBBox();
      const { minX, minY, maxX, maxY } = bbox;
      if (minX < minx) {
        minx = minX;
      }

      if (minY < miny) {
        miny = minY;
      }

      if (maxX > maxx) {
        maxx = maxX;
      }

      if (maxY > maxy) {
        maxy = maxY;
      }
    }

    const x = Math.floor(minx);
    const y = Math.floor(miny);
    const width = Math.ceil(maxx) - Math.floor(minx);
    const height = Math.ceil(maxy) - Math.floor(miny);

    return {
      x,
      y,
      width,
      height,
      minX: minx,
      minY: miny,
    };
  } 
}