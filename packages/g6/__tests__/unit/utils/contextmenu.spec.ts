import { getContentFromItems } from '@/src/plugins/contextmenu/util';

describe('contextmenu', () => {
  it('getContentFromItems', () => {
    expect(
      getContentFromItems([
        { name: 'expand', value: 'expand' },
        { name: 'collapse', value: 'collapse' },
      ]),
    ).toEqual(`
    <ul class="g6-contextmenu-ul">
      <li  class="g6-contextmenu-li" value="expand">expand</li><li  class="g6-contextmenu-li" value="collapse">collapse</li>
    </ul>
  `);
  });
});
