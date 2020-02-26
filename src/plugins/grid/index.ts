import createDOM from '@antv/dom-util/lib/create-dom';
import modifyCSS from '@antv/dom-util/lib/modify-css';
import Canvas from '@antv/g-base/lib/abstract/canvas';
import { IGraph } from '../../interface/graph';
import { ViewPortEventParam } from '../../types';
import Base from '../base';
import { mat3 } from '@antv/matrix-util';

// 网格背景图片
const GRID_PNG =
  'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2UwZTBlMCIgb3BhY2l0eT0iMC4yIiBzdHJva2Utd2lkdGg9IjEiLz48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZTBlMGUwIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=)';

export default class Grid extends Base {
  public init() {
    const graph: IGraph = this.get('graph');
    const minZoom = graph.get<number>('minZoom');
    const graphContainer = graph.get<HTMLDivElement>('container');
    const canvas: HTMLDivElement = graph.get<Canvas>('canvas').get('el');
    const width = graph.get<number>('width');
    const height: number = graph.get<number>('height');

    const container: HTMLDivElement = createDOM(
      `<div style="position: absolute; left:0;top:0;right:0;bottom:0;overflow: hidden;z-index: -1;"></div>`,
    );

    const gridContainer: HTMLDivElement = createDOM(
      `<div 
        class='g6-grid' 
        style='position:absolute;transform-origin: 0% 0% 0px; background-image: ${GRID_PNG}'></div>`,
    );

    container.appendChild(gridContainer);
    modifyCSS(container, {
      width: `${width}px`,
      height: `${height}px`,
    });

    modifyCSS(gridContainer, {
      width: `${width}px`,
      height: `${height}px`,
      left: 0,
      top: 0,
    });

    graphContainer.insertBefore(container, canvas);

    this.set('container', container);
    this.set('gridContainer', gridContainer);
  }

  // class-methods-use-this
  public getEvents() {
    return {
      viewportchange: 'updateGrid',
    };
  }

  /**
   * viewport change 事件的响应函数
   * @param param
   */
  protected updateGrid(param: ViewPortEventParam) {
    const gridContainer: HTMLDivElement = this.get('gridContainer');
    let { matrix } = param;
    if (!matrix) matrix = mat3.create();

    const transform = `matrix(${matrix[0]}, ${matrix[1]}, ${matrix[3]}, ${matrix[4]}, 0, 0)`;

    modifyCSS(gridContainer, {
      transform,
    });
  }

  public getContainer(): HTMLDivElement {
    return this.get('container');
  }

  public destroy() {
    const graph: IGraph = this.get('graph');
    const graphContainer = graph.get<HTMLDivElement>('container');
    const container: HTMLDivElement = this.get('container');

    graphContainer.removeChild(container);
  }
}
