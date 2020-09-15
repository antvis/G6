import React, { useEffect } from 'react';
import G6, { Graph } from '../../../src';
import { IGraph } from '../../../src/interface/graph';

let graph: IGraph = null;

const data = {
  nodes: [
    {
      id: 'node1',
      x: 150,
      y: 50,
      label: 'node1',
    },
    {
      id: 'node2',
      x: 200,
      y: 150,
      label: 'node2',
    },
    {
      id: 'node3',
      x: 100,
      y: 150,
      label: 'node3',
    },
  ],
  edges: [
    {
      source: 'node1',
      target: 'node2',
    },
    {
      source: 'node2',
      target: 'node3',
    },
    {
      source: 'node3',
      target: 'node1',
    },
  ],
};

const Grid = () => {
  const container = React.useRef();
  useEffect(() => {
    const imgstr =
      'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAgCAYAAAB3j6rJAAAAAXNSR0IArs4c6QAAAsRJREFUWAntV81LVFEUP+e+j7HEDNxlUIs2RbhqVYv6A0KCxD7moy/UhSJKq3IRLaxNoQ6TUNKXOhVSIBbtWxQEtTHKdQvbBdWozbz35p7OHefNjK/3dD5QXMyFO++er9/5cd69590BqHFE7tEBNWuEAawWYGaGtLlF6wYADq1i0HB7q3mzsxOz1WBWReRKgvZlHPsZER0tTYqIH0K6cf5hH34v1ZezrphIOO50oJQTTGK3XwIm84uE6Er26y/97EG6sol036edy3/tUSDqCgJbo0ecaNxhDDzowZU1+gChLCKx0UybBHhBBAcDcHzViLAgAM5ODoTmfR1KlOy3/oiOWb0S8GOlJBSqilGxCmP9LLzlgxxiCWqRjvWIwdqDfCrRc3XmhG5enuzDn35xvkSicfs4ZWWSAFr9gqrVcbJF1ER4qt9458VYQ6S0NxDQhq/NC1aOjIC83f7vOQUiqjekbTvJTsfKAazdB983GEbY7Tk5IpER5xQTfRzUG2pP6o+geg4X/tL0oD6LalNmbfsHV8L0d99sLVqaYewRzRKWuCwbnvNNo4PwJc9hNUV0khqbUoC/Hes6SLimtELAuSbdfOOSWJGw13asBSXzcXy7yzDPuDb1/GPbr/n1nlDrBsPcH0IoHNWUY52UEp4rGwi43aybt1JNQFMxXFYqXf2o4SoiIxmLj21ukNTS4724lBchNkbFdk2QLbUpn8ioVfjyagYsj/cUY3kfpgFWzXxuLG/sphxRl3glzzoRb7XqFalXxFsBr1zfI/WKeCvglbfNHsldjMJxOiTIalMs+bLcwfN0jjHiXYH0qcgeW6SkRN72mW13ijYVi0P89T2sdAKxG5BSrl0SHmGHq0rmL/crnrk/YBLN+WQ/fsvf0KwnfEe94AZt5ZPvsE+nB82L2+bV5O4jujCGHZmd3cpKuLl0oX1V639/p/zYCjUG8gAAAABJRU5ErkJggg==)';
    if (!graph) {
      const grid = new G6.Grid({
        // img: imgstr
      });
      graph = new Graph({
        container: container.current as string | HTMLElement,
        width: 500,
        height: 500,
        plugins: [grid],
        modes: {
          default: ['drag-canvas', 'zoom-canvas'],
        },
      });
      graph.data(data);
      graph.render();
      let width = 500,
        height = 500;
      graph.on('canvas:click', (evt) => {
        width += 100;
        height += 50;
        graph.changeSize(width, height);
      });
    }
  });
  return <div ref={container}></div>;
};

export default Grid;
