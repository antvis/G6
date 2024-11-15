import { sizeOf } from '@/src/utils/dom';

describe('dom', () => {
  it('should return the size of the graph container', () => {
    // Create a mock container element
    const container = document.createElement('div');
    container.style.width = '500px';
    container.style.height = '300px';

    // Call the sizeOf function
    const result = sizeOf(container);

    // Assert the result
    expect(result).toEqual([500, 300]);
  });
});
