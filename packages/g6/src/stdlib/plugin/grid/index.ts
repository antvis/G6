// TODO: update type define.
import { createDom, modifyCSS } from '@antv/dom-util';
import { Canvas } from '@antv/g';
import { IGraph } from '../../../types';
import { Plugin as Base, IPluginBaseConfig } from '../../../types/plugin';

const GRID_PNG =
  'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2UwZTBlMCIgb3BhY2l0eT0iMC4yIiBzdHJva2Utd2lkdGg9IjEiLz48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZTBlMGUwIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=)';

export interface GridConfig extends IPluginBaseConfig {
  img?: string;
  follow?: boolean;
}

interface ViewPortEventParam {
  action: string;
  matrix: number[];
}

export class Grid extends Base {
  private canvas: Canvas;
  private viewport: HTMLElement | undefined;
  private container: HTMLDivElement;
  constructor(options?: GridConfig) {
    super(options);
  }

  public getDefaultCfgs(): GridConfig {
    return {
      img: GRID_PNG,
      follow: true,
    };
  }

  public init(graph: IGraph) {
    super.init(graph);
    const minZoom = graph.getZoom();
    const graphContainer = graph.container;
    const canvas = this.canvas || graphContainer.firstChild.nextSibling;
    const [width, height] = graph.getSize();
    const img = this.options.img || GRID_PNG;

    const container: HTMLDivElement = createDom(
      `<div class='g6-grid-container' style="position: absolute; left:0;top:0;right:0;bottom:0;overflow: hidden;"></div>`,
    );

    const gridContainer: HTMLDivElement = createDom(
      `<div 
        class='g6-grid' 
        style='position:absolute;
        transform-origin: 0% 0% 0px;
        background-image: ${img};
        user-select: none
        '></div>`,
    );

    container.appendChild(gridContainer);

    modifyCSS(container, {
      width: `${width}px`,
      height: `${height}px`,
      left: `${graphContainer.offsetLeft}px`,
      top: `${graphContainer.offsetTop}px`,
    });

    modifyCSS(gridContainer, {
      width: `${width / minZoom}px`,
      height: `${height / minZoom}px`,
      left: `0px`,
      top: `0px`,
    });

    graphContainer.insertBefore(container, canvas as Node);

    this.container = container;
  }

  // class-methods-use-this
  public getEvents() {
    return {
      viewportchange: this.updateGrid,
    };
  }

  /**
   * viewport change
   * @param param
   */
  protected updateGrid(param: ViewPortEventParam) {
    const gridContainer: HTMLDivElement = this.container;
    let { matrix } = param;
    if (!matrix) matrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];

    const isFollow = this.options.follow;
    const transform = `matrix(${matrix[0]}, ${matrix[1]}, ${matrix[3]}, ${
      matrix[4]
    }, ${isFollow ? matrix[6] : '0'}, ${isFollow ? matrix[7] : '0'})`;

    modifyCSS(gridContainer, {
      transform,
    });
  }

  public getContainer(): HTMLDivElement {
    return this.container;
  }

  public destroy() {
    super.destroy();
    this.canvas?.destroy();

    const container = this.container;

    if (container?.parentNode) container.parentNode.removeChild(container);
  }
}
