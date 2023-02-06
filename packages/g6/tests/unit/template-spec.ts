describe('template', () => {
  const el = document.createElement('div');
  el.id = 'test-div-id';
  el.innerHTML = 'hello g6';
  document.querySelector('body').appendChild(el);

  it('div content', () => {
    expect(document.querySelector('#test-div-id').innerHTML).toBe('hello g6');
  });
});
