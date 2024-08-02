import type { Contextmenu } from '@/src';
import { NodeEvent } from '@/src';
import { pluginContextmenu } from '@@/demos';
import { createDemoGraph, sleep } from '@@/utils';

describe('plugin contextmenu', () => {
  it('contextmenu', async () => {
    const graph = await createDemoGraph(pluginContextmenu);
    const onClick = jest.fn();
    graph.updatePlugin({ key: 'contextmenu', onClick });

    const container = graph.getCanvas().getContainer()!;

    const el = container.querySelector('.g6-contextmenu') as HTMLDivElement;

    const $dom = container.querySelector('.g6-contextmenu');
    expect($dom).toBeTruthy();
    expect($dom?.classList.contains('custom-class-name')).toBeTruthy();

    expect(el.querySelector('.g6-contextmenu-li')).toBeFalsy();

    const emit = () => {
      graph.emit(NodeEvent.CONTEXT_MENU, {
        target: { id: '1' },
        targetType: 'node',
        client: {
          x: 100,
          y: 100,
        },
      });
    };

    emit();

    await sleep(100);
    expect(el.querySelector('.g6-contextmenu-ul')).toBeTruthy();
    expect(el.querySelectorAll('.g6-contextmenu-li').length).toBe(2);

    const instance = graph.getPluginInstance<Contextmenu>('contextmenu');

    // @ts-expect-error private method
    instance.onMenuItemClick({ target: el.querySelector('.g6-contextmenu-li') });
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(container.querySelector<HTMLDivElement>('.g6-contextmenu')!.style.display).toBe('none');

    emit();

    await sleep(100);
    expect(container.querySelector<HTMLDivElement>('.g6-contextmenu')!.style.display).toBe('block');
    document.body.click();
    expect(container.querySelector<HTMLDivElement>('.g6-contextmenu')!.style.display).toBe('none');
  });
});
