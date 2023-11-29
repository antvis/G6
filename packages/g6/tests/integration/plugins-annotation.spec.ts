import { resetEntityCounter } from '@antv/g';
import annotation from '../demo/plugins/annotation';
import { createContext, sleep, triggerEvent } from './utils';
import './utils/useSnapshotMatchers';
import { Annotation } from '../../src/stdlib/plugin/annotation';
import { RendererName } from '../../src/types/render';

describe('Annotation plugin', () => {
  beforeEach(() => {
    /**
     * SVG Snapshot testing will generate a unique id for each element.
     * Reset to 0 to keep snapshot consistent.
     */
    resetEntityCounter();
  });

  it('should be rendered correctly', (done) => {
    const context = createContext(500, 500);

    process({ context }).then(done);
  });
});

async function process({
  context,
}: {
  context: ReturnType<typeof createContext>;
}) {
  let resolve: any;

  const graph = annotation({
    ...context,
    width: 500,
    height: 500,
  });

  graph.on('afterlayout', async () => {
    const plugin = (graph as any).pluginController.getPlugin('annotation') as Annotation;

    const nodes = graph.getAllNodesData();
    const selectNodes = nodes.slice(0, 10);
    selectNodes.forEach((n) => {
      graph.emit('node:click', {
        itemId: n.id,
        itemType: 'node',
      });
    });

    const annotationWrappers = document.querySelectorAll<HTMLElement>(
      '.g6-annotation-wrapper',
    );

    // 打开多个card，是否正常渲染card和连线
    await sleep(200);
    const cardList = Object.values(plugin.cardInfoMap);
    expect(cardList.length).toBe(selectNodes.length);
    expect(cardList.map((card) => card.link).filter(Boolean).length).toBe(
      selectNodes.length,
    );

    const cardEl = annotationWrappers[0];
    const cardId = selectNodes[0].id;

    // 进入、退出编辑模式
    plugin.editCard(cardId, { position: 'title', value: 'newTitle' });
    plugin.editCard(cardId, { position: 'content', value: 'newContent' });
    const titleInput = cardEl.querySelector<HTMLInputElement>(
      '.g6-annotation-title-input',
    );
    const contentInput = cardEl.querySelector<HTMLInputElement>(
      '.g6-annotation-content-input',
    );
    expect(titleInput).not.toBe(undefined);
    expect(titleInput?.value).toBe('newTitle');
    expect(contentInput).not.toBe(undefined);
    expect(contentInput?.value).toBe('newContent');

    plugin.exitEditCard(cardId, { position: 'title' });
    plugin.exitEditCard(cardId, { position: 'content' });
    expect(cardEl.querySelector('.g6-annotation-title')).not.toBe(undefined);
    expect(cardEl.querySelector('.g6-annotation-content')).not.toBe(undefined);

    // 移动card
    plugin.moveCard(cardId, 20, 20);
    await sleep(500);
    let style = getComputedStyle(cardEl);
    expect(style.left).toBe('20px');
    expect(style.top).toBe('20px');

    // 隐藏card
    plugin.hideCard(cardId);
    await sleep(500);
    style = getComputedStyle(cardEl);
    expect(style.display).toBe('none');

    // 显示card
    plugin.showCard(cardId);
    await sleep(500);
    style = getComputedStyle(cardEl);
    expect(style.display).not.toBe('none');

    graph.destroy();
    resolve();
  });

  return new Promise((res) => {
    resolve = res;
  });
}
