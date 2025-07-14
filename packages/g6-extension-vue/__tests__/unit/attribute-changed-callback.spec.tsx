import { VueNode } from '../../src';

it('attribute changed callback', () => {
  const oldComponent = () => <div>test</div>;
  const node = new VueNode({
    style: {
      component: oldComponent,
    },
  });
  Object.assign(node, {
    isConnected: true,
    ownerDocument: {
      defaultView: {
        dispatchEvent: () => {},
      },
    },
  });

  const spy = jest.fn();
  node.attributeChangedCallback = spy;

  const component = () => <div>test1</div>;

  try {
    node.update({ component });
  } catch (e) {
    // ignore
  }

  expect(spy).toHaveBeenCalled();
  expect(spy).toHaveBeenLastCalledWith('component', oldComponent, component, undefined, undefined);
});
