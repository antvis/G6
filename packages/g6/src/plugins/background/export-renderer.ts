import type { PluginExportContext } from '../types';

/**
 * 背景插件导出渲染器
 * Background plugin export renderer
 * @remarks
 * 负责将背景插件的DOM内容渲染到导出画布
 * Responsible for rendering background plugin DOM content to export canvas
 */
export class BackgroundExportRenderer {
  /**
   * 渲染背景到导出画布
   * Render background to export canvas
   * @param domElement - 背景DOM元素
   *                     Background DOM element
   * @param context - 导出上下文
   *                  Export context
   */
  public async renderToCanvas(domElement: HTMLElement, context: PluginExportContext): Promise<void> {
    const { offscreenCanvas, devicePixelRatio } = context;
    const canvasElement = offscreenCanvas.getContextService().getDomElement() as HTMLCanvasElement;
    const ctx = canvasElement?.getContext('2d');

    if (!ctx) {
      return;
    }

    const computedStyle = window.getComputedStyle(domElement);

    const tempCanvas = this.createTempCanvas(canvasElement);

    if (!tempCanvas) {
      return;
    }

    try {
      // 准备画布
      // Prepare canvas
      this.prepareCanvas(ctx, canvasElement, computedStyle);

      // 计算尺寸
      // Calculate dimensions
      const displayWidth = canvasElement.width / devicePixelRatio;
      const displayHeight = canvasElement.height / devicePixelRatio;

      // 绘制背景
      // Draw background
      await this.drawBackground(ctx, computedStyle, displayWidth, displayHeight, devicePixelRatio);

      // 恢复原内容
      // Restore original content
      ctx.globalCompositeOperation = 'source-over';
      ctx.drawImage(tempCanvas, 0, 0);
    } catch (error) {
      // 失败时恢复原内容
      // Restore original content on failure
      this.restoreCanvas(ctx, tempCanvas);
    }

    ctx.restore();
  }

  /**
   * 创建临时画布用于保存原始内容
   * Create temporary canvas to save original content
   * @param canvasElement - 原始画布元素
   *                        Original canvas element
   * @returns 临时画布元素或null
   *          Temporary canvas element or null
   */
  private createTempCanvas(canvasElement: HTMLCanvasElement): HTMLCanvasElement | null {
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvasElement.width;
    tempCanvas.height = canvasElement.height;
    const tempCtx = tempCanvas.getContext('2d');

    if (!tempCtx) return null;

    tempCtx.drawImage(canvasElement, 0, 0);
    return tempCanvas;
  }

  /**
   * 准备画布，设置初始状态和透明度
   * Prepare canvas, set initial state and opacity
   * @param ctx - 2D渲染上下文
   *              2D rendering context
   * @param canvasElement - 画布元素
   *                        Canvas element
   * @param computedStyle - 计算样式
   *                        Computed style
   */
  private prepareCanvas(
    ctx: CanvasRenderingContext2D,
    canvasElement: HTMLCanvasElement,
    computedStyle: CSSStyleDeclaration,
  ): void {
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);

    const opacity = parseFloat(computedStyle.opacity) || 1;
    const backgroundColor = computedStyle.backgroundColor;
    if (opacity < 1 && backgroundColor && backgroundColor !== 'transparent' && backgroundColor !== 'rgba(0, 0, 0, 0)') {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvasElement.width, canvasElement.height);
    }

    ctx.save();
    ctx.globalAlpha = opacity;
  }

  /**
   * 绘制背景（包括背景色和背景图）
   * Draw background (including background color and image)
   * @param ctx - 2D渲染上下文
   *              2D rendering context
   * @param computedStyle - 计算样式
   *                        Computed style
   * @param displayWidth - 显示宽度
   *                       Display width
   * @param displayHeight - 显示高度
   *                        Display height
   * @param devicePixelRatio - 设备像素比
   *                           Device pixel ratio
   */
  private async drawBackground(
    ctx: CanvasRenderingContext2D,
    computedStyle: CSSStyleDeclaration,
    displayWidth: number,
    displayHeight: number,
    devicePixelRatio: number,
  ): Promise<void> {
    // 绘制背景颜色
    // Draw background color
    this.drawBackgroundColor(ctx, computedStyle, displayWidth * devicePixelRatio, displayHeight * devicePixelRatio);

    // 绘制背景图片
    // Draw background image
    await this.drawBackgroundImage(ctx, computedStyle, displayWidth, displayHeight, devicePixelRatio);

    ctx.restore();
  }

  /**
   * 绘制背景颜色
   * Draw background color
   * @param ctx - 2D渲染上下文
   *              2D rendering context
   * @param computedStyle - 计算样式
   *                        Computed style
   * @param width - 绘制宽度
   *                Drawing width
   * @param height - 绘制高度
   *                 Drawing height
   */
  private drawBackgroundColor(
    ctx: CanvasRenderingContext2D,
    computedStyle: CSSStyleDeclaration,
    width: number,
    height: number,
  ): void {
    const backgroundColor = computedStyle.backgroundColor;
    if (backgroundColor && backgroundColor !== 'transparent' && backgroundColor !== 'rgba(0, 0, 0, 0)') {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, width, height);
    }
  }

  /**
   * 绘制背景图片
   * Draw background image
   * @param ctx - 2D渲染上下文
   *              2D rendering context
   * @param computedStyle - 计算样式
   *                        Computed style
   * @param displayWidth - 显示宽度
   *                       Display width
   * @param displayHeight - 显示高度
   *                        Display height
   * @param devicePixelRatio - 设备像素比
   *                           Device pixel ratio
   */
  private async drawBackgroundImage(
    ctx: CanvasRenderingContext2D,
    computedStyle: CSSStyleDeclaration,
    displayWidth: number,
    displayHeight: number,
    devicePixelRatio: number,
  ): Promise<void> {
    const backgroundImage = computedStyle.backgroundImage;
    if (!backgroundImage || backgroundImage === 'none') return;

    const imageUrl = this.extractImageUrl(backgroundImage);
    if (!imageUrl) return;

    try {
      const img = await this.loadImage(imageUrl);
      this.drawImageWithScale(ctx, img, computedStyle, displayWidth, displayHeight, devicePixelRatio);
    } catch (error) {
      // 静默处理图片加载错误
      // Silently handle image loading errors
    }
  }

  /**
   * 从background-image CSS属性中提取图片URL
   * Extract image URL from background-image CSS property
   * @param backgroundImage - background-image CSS值
   *                          background-image CSS value
   * @returns 图片URL或null
   *          Image URL or null
   */
  private extractImageUrl(backgroundImage: string): string | null {
    const urlMatch = backgroundImage.match(/url\(["']?([^"')]+)["']?\)/);
    return urlMatch?.[1] || null;
  }

  /**
   * 异步加载图片
   * Load image asynchronously
   * @param imageUrl - 图片URL
   *                   Image URL
   * @returns Promise<HTMLImageElement> - 加载的图片元素
   *                                      Loaded image element
   */
  private loadImage(imageUrl: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error(`Failed to load image: ${imageUrl}`));
      img.src = imageUrl;
    });
  }

  /**
   * 根据CSS样式绘制缩放后的图片
   * Draw scaled image based on CSS styles
   * @param ctx - 2D渲染上下文
   *              2D rendering context
   * @param img - 图片元素
   *              Image element
   * @param computedStyle - 计算样式
   *                        Computed style
   * @param displayWidth - 显示宽度
   *                       Display width
   * @param displayHeight - 显示高度
   *                        Display height
   * @param devicePixelRatio - 设备像素比
   *                           Device pixel ratio
   */
  private drawImageWithScale(
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    computedStyle: CSSStyleDeclaration,
    displayWidth: number,
    displayHeight: number,
    devicePixelRatio: number,
  ): void {
    const backgroundSize = computedStyle.backgroundSize || 'auto';
    const backgroundPosition = computedStyle.backgroundPosition || '0% 0%';
    const backgroundRepeat = computedStyle.backgroundRepeat || 'repeat';

    ctx.save();
    ctx.scale(devicePixelRatio, devicePixelRatio);

    const { width: imgWidth, height: imgHeight } = this.calculateImageSize(
      img,
      backgroundSize,
      displayWidth,
      displayHeight,
    );

    const { x: posX, y: posY } = this.parsePosition(
      backgroundPosition,
      displayWidth - imgWidth,
      displayHeight - imgHeight,
    );

    this.drawImageWithRepeat(ctx, img, posX, posY, imgWidth, imgHeight, backgroundRepeat, displayWidth, displayHeight);

    ctx.restore();
  }

  /**
   * 根据background-size计算图片尺寸
   * Calculate image size based on background-size
   * @param img - 图片元素
   *              Image element
   * @param backgroundSize - background-size CSS值
   *                         background-size CSS value
   * @param containerWidth - 容器宽度
   *                         Container width
   * @param containerHeight - 容器高度
   *                          Container height
   * @returns 计算后的图片宽高
   *          Calculated image width and height
   */
  private calculateImageSize(
    img: HTMLImageElement,
    backgroundSize: string,
    containerWidth: number,
    containerHeight: number,
  ): { width: number; height: number } {
    switch (backgroundSize) {
      case 'cover': {
        const scale = Math.max(containerWidth / img.width, containerHeight / img.height);
        return { width: img.width * scale, height: img.height * scale };
      }
      case 'contain': {
        const scale = Math.min(containerWidth / img.width, containerHeight / img.height);
        return { width: img.width * scale, height: img.height * scale };
      }
      case 'auto':
        return { width: img.width, height: img.height };
      default: {
        // 处理自定义尺寸
        // Handle custom dimensions
        const sizes = backgroundSize.split(/\s+/);
        let width: number | 'auto', height: number | 'auto';

        const parseValue = (value: string, total: number): number | 'auto' => {
          if (value === 'auto') return 'auto';
          if (value.endsWith('%')) return (total * parseFloat(value)) / 100;
          return parseFloat(value);
        };

        if (sizes.length === 1) {
          width = parseValue(sizes[0], containerWidth);
          height = 'auto';
        } else {
          width = parseValue(sizes[0], containerWidth);
          height = parseValue(sizes[1], containerHeight);
        }

        if (width === 'auto' && height === 'auto') {
          return { width: img.width, height: img.height };
        }
        if (width === 'auto') {
          width = img.width * ((height as number) / img.height);
        } else if (height === 'auto') {
          height = img.height * ((width as number) / img.width);
        }

        return { width: width as number, height: height as number };
      }
    }
  }

  /**
   * 解析background-position，计算图片定位
   * Parse background-position to calculate image positioning
   * @param position - background-position CSS值
   *                   background-position CSS value
   * @param availableWidth - 可用宽度空间
   *                         Available width space
   * @param availableHeight - 可用高度空间
   *                          Available height space
   * @returns 图片定位坐标
   *          Image positioning coordinates
   */
  private parsePosition(position: string, availableWidth: number, availableHeight: number): { x: number; y: number } {
    const parts = position.trim().split(/\s+/);

    if (parts.length === 1) {
      const part = parts[0];
      const xKeywords: Record<string, number> = {
        left: 0,
        center: availableWidth / 2,
        right: availableWidth,
      };
      const yKeywords: Record<string, number> = {
        top: 0,
        center: availableHeight / 2,
        bottom: availableHeight,
      };

      if (part in xKeywords) {
        return { x: xKeywords[part], y: availableHeight / 2 };
      }
      if (part in yKeywords) {
        return { x: availableWidth / 2, y: yKeywords[part] };
      }
      if (part.endsWith('%')) {
        return {
          x: (availableWidth * parseFloat(part)) / 100,
          y: availableHeight / 2,
        };
      }
      return { x: parseFloat(part), y: availableHeight / 2 };
    }

    const [xPart, yPart] = parts;
    const x = this.parsePositionValue(xPart, availableWidth, {
      left: 0,
      center: availableWidth / 2,
      right: availableWidth,
    });
    const y = this.parsePositionValue(yPart, availableHeight, {
      top: 0,
      center: availableHeight / 2,
      bottom: availableHeight,
    });

    return { x, y };
  }

  /**
   * 解析位置值（支持关键字、百分比、像素值）
   * Parse position value (supports keywords, percentages, pixel values)
   * @param value - 位置值
   *                Position value
   * @param available - 可用空间
   *                    Available space
   * @param keywords - 关键字映射
   *                   Keyword mappings
   * @returns 计算后的像素值
   *          Calculated pixel value
   */
  private parsePositionValue(value: string, available: number, keywords: Record<string, number>): number {
    if (value in keywords) return keywords[value];
    if (value.endsWith('%')) return (available * parseFloat(value)) / 100;
    return parseFloat(value);
  }

  /**
   * 根据background-repeat绘制重复图片
   * Draw repeated images based on background-repeat
   * @param ctx - 2D渲染上下文
   *              2D rendering context
   * @param img - 图片元素
   *              Image element
   * @param startX - 起始X坐标
   *                 Starting X coordinate
   * @param startY - 起始Y坐标
   *                 Starting Y coordinate
   * @param imgWidth - 图片宽度
   *                   Image width
   * @param imgHeight - 图片高度
   *                    Image height
   * @param repeat - 重复方式
   *                 Repeat mode
   * @param containerWidth - 容器宽度
   *                         Container width
   * @param containerHeight - 容器高度
   *                          Container height
   */
  private drawImageWithRepeat(
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    startX: number,
    startY: number,
    imgWidth: number,
    imgHeight: number,
    repeat: string,
    containerWidth: number,
    containerHeight: number,
  ): void {
    switch (repeat) {
      case 'no-repeat':
        ctx.drawImage(img, startX, startY, imgWidth, imgHeight);
        break;
      case 'repeat':
        this.drawRepeatedImage(
          ctx,
          img,
          startX,
          startY,
          imgWidth,
          imgHeight,
          containerWidth,
          containerHeight,
          true,
          true,
        );
        break;
      case 'repeat-x':
        this.drawRepeatedImage(
          ctx,
          img,
          startX,
          startY,
          imgWidth,
          imgHeight,
          containerWidth,
          containerHeight,
          true,
          false,
        );
        break;
      case 'repeat-y':
        this.drawRepeatedImage(
          ctx,
          img,
          startX,
          startY,
          imgWidth,
          imgHeight,
          containerWidth,
          containerHeight,
          false,
          true,
        );
        break;
      default:
        ctx.drawImage(img, startX, startY, imgWidth, imgHeight);
    }
  }

  /**
   * 绘制重复的图片瓦片
   * Draw repeated image tiles
   * @param ctx - 2D渲染上下文
   *              2D rendering context
   * @param img - 图片元素
   *              Image element
   * @param startX - 起始X坐标
   *                 Starting X coordinate
   * @param startY - 起始Y坐标
   *                 Starting Y coordinate
   * @param imgWidth - 图片宽度
   *                   Image width
   * @param imgHeight - 图片高度
   *                    Image height
   * @param containerWidth - 容器宽度
   *                         Container width
   * @param containerHeight - 容器高度
   *                          Container height
   * @param repeatX - 是否在X轴重复
   *                  Whether to repeat on X axis
   * @param repeatY - 是否在Y轴重复
   *                  Whether to repeat on Y axis
   */
  private drawRepeatedImage(
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    startX: number,
    startY: number,
    imgWidth: number,
    imgHeight: number,
    containerWidth: number,
    containerHeight: number,
    repeatX: boolean,
    repeatY: boolean,
  ): void {
    const xStart = repeatX ? (startX % imgWidth) - imgWidth : startX;
    const yStart = repeatY ? (startY % imgHeight) - imgHeight : startY;
    const xEnd = repeatX ? containerWidth : startX + imgWidth;
    const yEnd = repeatY ? containerHeight : startY + imgHeight;
    const xStep = repeatX ? imgWidth : containerWidth;
    const yStep = repeatY ? imgHeight : containerHeight;

    for (let x = xStart; x < xEnd; x += xStep) {
      for (let y = yStart; y < yEnd; y += yStep) {
        ctx.drawImage(img, x, y, imgWidth, imgHeight);
      }
    }
  }

  /**
   * 恢复画布到原始状态
   * Restore canvas to original state
   * @param ctx - 2D渲染上下文
   *              2D rendering context
   * @param tempCanvas - 临时画布（包含原始内容）
   *                     Temporary canvas (containing original content)
   */
  private restoreCanvas(ctx: CanvasRenderingContext2D, tempCanvas: HTMLCanvasElement): void {
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.drawImage(tempCanvas, 0, 0);
    ctx.restore();
  }
}
