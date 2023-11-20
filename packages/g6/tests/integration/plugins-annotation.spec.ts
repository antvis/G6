import { resetEntityCounter } from '@antv/g';
import annotation from '../demo/plugins/annotation';
import { createContext, sleep, triggerEvent } from './utils';
import './utils/useSnapshotMatchers';
import { Annotation } from '../../src/stdlib/plugin/annotation';
import { RendererName } from '../../src/types/render';

describe('Scroll canvas behavior', () => {
  beforeEach(() => {
    /**
     * SVG Snapshot testing will generate a unique id for each element.
     * Reset to 0 to keep snapshot consistent.
     */
    resetEntityCounter();
  });

  it('should be rendered correctly with Canvas2D', (done) => {
    const dir = `${__dirname}/snapshots/canvas/plugins/annotation`;
    const context = createContext('canvas', 500, 500);
    process({ dir, context, renderType: 'canvas' }).then(done)
  });

  it('should be rendered correctly with SVG', (done) => {
    const dir = `${__dirname}/snapshots/svg/plugins/annotation`;
    const context = createContext('svg', 500, 500);

    process({ dir, context, renderType: 'svg' }).then(done)
  });
});

async function process({dir, context, renderType }: { dir: string; context: ReturnType<typeof createContext>; renderType: RendererName}) {
  let resolve: any;

  const graph = annotation({
    ...context,
    width: 500,
    height: 500,
  });

  graph.on('afterlayout', async () => {
      const plugin = graph.pluginController.getPlugin('annotation') as Annotation;

      if (renderType === 'canvas')
        await expect(context.canvas).toMatchCanvasSnapshot(dir, 'plugin-annotation-default');
      else if (renderType === 'svg')
        await expect(context.canvas).toMatchSVGSnapshot(dir, 'plugin-annotation-default');

      const nodes = graph.getAllNodesData()
      const activeNodes = nodes.slice(0, 10)
      activeNodes.forEach(n => {
        graph.emit('node:click', { 
          itemId: n.id,
          itemType: 'node',
        })
      })

      const annotationWrappers = document.querySelectorAll<HTMLElement>('.g6-annotation-wrapper');
      expect(annotationWrappers.length).toBe(activeNodes.length);

      const cardEl = annotationWrappers[0];
      const cardId = activeNodes[0].id;

      plugin.editCard(cardId, { position: 'title', value: 'newTitle' })
      plugin.editCard(cardId, { position: 'content', value: 'newContent' })
      await sleep(500)
      const titleInput = cardEl.querySelector<HTMLInputElement>('.g6-annotation-title-input');
      const contentInput = cardEl.querySelector<HTMLInputElement>('.g6-annotation-content-input');
      expect(titleInput).not.toBe(undefined);expect(titleInput?.value).toBe('newTitle');
      expect(contentInput).not.toBe(undefined);expect(contentInput?.value).toBe('newContent');

      plugin.exitEditCard(cardId, { position: 'title' })
      plugin.exitEditCard(cardId, { position: 'content' });await sleep(500)
      expect(cardEl.querySelector('.g6-annotation-title')).not.toBe(undefined);
      expect(cardEl.querySelector('.g6-annotation-content')).not.toBe(undefined);

      plugin.moveCard(cardId, 20, 20);await sleep(500);
      let style = getComputedStyle(cardEl)
      expect(style.left).toBe('20px');
      expect(style.top).toBe('20px');

      plugin.hideCard(cardId); await sleep(1000);
      style = getComputedStyle(cardEl)
      expect(style.display).toBe('none');

      plugin.showCard(cardId); await sleep(1000);
      style = getComputedStyle(cardEl)
      expect(style.display).not.toBe('none');
      
      graph.destroy();
      resolve()
  });

  return new Promise(res => { resolve = res })
}