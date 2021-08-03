import { modifyCSS, createDom } from '@antv/dom-util';
import { IAbstractGraph as IGraph, ViewPortEventParam } from '@antv/g6-core';
import { ICanvas } from '@antv/g-base';
import Base from '../base';

interface GridConfig {
  img?: string;
  /** 网格是否跟随视图移动 */
  follow?: boolean;
}

// 网格背景图片
const GRID_PNG =
  'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2UwZTBlMCIgb3BhY2l0eT0iMC4yIiBzdHJva2Utd2lkdGg9IjEiLz48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZTBlMGUwIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=)';

export default class Grid extends Base {
  constructor(config?: GridConfig) {
    super(config);
  }
  public getDefaultCfgs(): GridConfig {
    return {
      img: GRID_PNG,
      follow: true,
    };
  }

  public init() {
    const graph: IGraph = this.get('graph');
    const graphContainer = graph.get<HTMLDivElement>('container');
    const canvas: HTMLDivElement = graph.get<ICanvas>('canvas').get('el');
    const img = this.get('img') || GRID_PNG;

    const container: HTMLDivElement = createDom(
      `<div class='g6-grid-container' style="position:absolute;overflow:hidden;z-index: -1;"></div>`,
    );

    const gridContainer: HTMLDivElement = createDom(
      `<div
        class='g6-grid'
        style='position:absolute;
        background-image: ${img};
        user-select: none
        '></div>`,
    );

    this.set('container', container);
    this.set('gridContainer', gridContainer);

    this.positionInit();

    container.appendChild(gridContainer);
    graphContainer.insertBefore(container, canvas);
  }

  /** 定位信息初始化 */
  public positionInit() {
    const graph: IGraph = this.get('graph');
    const minZoom = graph.get('minZoom');
    const width = graph.get<number>('width');
    const height: number = graph.get<number>('height');

    modifyCSS(this.get('container'), {
      width: `${width}px`,
      height: `${height}px`,
    });

    // 网格 40*40 需保证 (gridContainerWidth / 2) % 40 = 0 才能让网格线对齐左上角 故 * 80
    const gridContainerWidth = (width * 80) / minZoom;
    const gridContainerHeight = (height * 80) / minZoom;
    modifyCSS(this.get('gridContainer'), {
      width: `${gridContainerWidth}px`,
      height: `${gridContainerHeight}px`,
      left: `-${gridContainerWidth / 2}px`,
      top: `-${gridContainerHeight / 2}px`,
    });
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
    if (!matrix) matrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];

    const isFollow = this.get('follow');
    const transform = `matrix(${matrix[0]}, ${matrix[1]}, ${matrix[3]}, ${matrix[4]}, ${
      isFollow ? matrix[6] : '0'
    }, ${isFollow ? matrix[7] : '0'})`;

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
