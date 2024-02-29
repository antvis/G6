import { createGraphCanvas } from '@@/utils';

describe('Canvas', () => {
  const svg = createGraphCanvas(null, 500, 500, 'svg');
  beforeAll(async () => {
    await svg.init();
  });

  it('getRendererType', () => {
    expect(svg.getRendererType()).toBe('svg');
  });

  it('context', () => {
    expect(svg.context).toBeDefined();
  });

  it('getDevice', async () => {
    // getDevice only exists on webgl
    // webgl canvas cannot init in test env
    // expect(webgl.getDevice()).toBeDefined();
  });

  it('viewport2Client', () => {
    expect(svg.viewport2Client({ x: 250, y: 250 })).toEqual({ x: 250, y: 250 });
  });

  it('viewport2Canvas', () => {
    expect(svg.viewport2Canvas({ x: 250, y: 250 })).toEqual({ x: 250, y: 250 });
  });

  it('client2Viewport', () => {
    expect(svg.client2Viewport({ x: 250, y: 250 })).toEqual({ x: 250, y: 250 });
  });
});
