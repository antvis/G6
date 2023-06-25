<<<<<<< HEAD
<<<<<<< HEAD
import { type } from 'os';
import { color } from 'color';
import { extend } from '@antv/util';
=======
import { CubicEdge } from './../../../../src/stdlib/item/edge/cubic';
import { data } from './../../../datasets/const';
import { color } from 'color';
// @ts-nocheck
>>>>>>> 03c9a9db53 (feat: v5-cubic-horizon-edge)
=======
import { type } from 'os';
import { color } from 'color';
import { extend } from '@antv/util';
>>>>>>> a952e826c4 (chore: lint fix & use English comments)
import G6, {
  EdgeDisplayModel,
  Graph,
  IGraph,
  NodeDisplayModel,
} from '../../../../src/index';
<<<<<<< HEAD
<<<<<<< HEAD
import { CubicEdge } from './../../../../src/stdlib/item/edge/cubic';
import { data } from './../../../datasets/const';
// @ts-nocheck

let graph: IGraph;
let container: HTMLElement;
=======
import { type } from 'os';
import { extend } from '@antv/util';

let graph:IGraph  
let container: HTMLElement
>>>>>>> 03c9a9db53 (feat: v5-cubic-horizon-edge)
=======
import { CubicEdge } from './../../../../src/stdlib/item/edge/cubic';
import { data } from './../../../datasets/const';
// @ts-nocheck

let graph: IGraph;
let container: HTMLElement;
>>>>>>> a952e826c4 (chore: lint fix & use English comments)

const defaultData = {
  nodes: [
    {
      id: 'node1',
      data: {
<<<<<<< HEAD
<<<<<<< HEAD
        x: 300,
=======
        x: 100,
>>>>>>> 03c9a9db53 (feat: v5-cubic-horizon-edge)
=======
        x: 300,
>>>>>>> 618fe4f1e2 (feat: v5-cubic-horizon-edge)
        y: 100,
      },
    },
    {
      id: 'node2',
<<<<<<< HEAD
<<<<<<< HEAD
      data: { x: 100, y: 350 },
=======
      data: { x: 300, y: 350 },
>>>>>>> 03c9a9db53 (feat: v5-cubic-horizon-edge)
=======
      data: { x: 100, y: 350 },
>>>>>>> 618fe4f1e2 (feat: v5-cubic-horizon-edge)
    },
  ],
  edges: [
    {
      id: 'edge1',
      source: 'node1',
      target: 'node2',
      data: {
        type: 'cubic-horizon-edge',
        keyShape: {
          stroke: '#f00',
          lineDash: [2, 2],
        },
      },
      edgeState: {
        selected: {
          keyShape: {
            stroke: '#0f0',
            lineWidth: 2,
          },
        },
        highlight: {
          keyShape: {
            stroke: '#00f',
            opacity: 0.5,
          },
<<<<<<< HEAD
<<<<<<< HEAD
        },
      },
    },
  ],
};

// create container for controllers
=======
        }
      }
=======
        },
      },
>>>>>>> a952e826c4 (chore: lint fix & use English comments)
    },
  ],
};

<<<<<<< HEAD

// 创建控制器的容器
>>>>>>> 03c9a9db53 (feat: v5-cubic-horizon-edge)
=======
// create container for controllers
>>>>>>> a952e826c4 (chore: lint fix & use English comments)
const createCtrlContainer = () => {
  const container = document.getElementById('container')!;
  const ctrlContainer = document.createElement('div');
  ctrlContainer.id = 'ctrl-container';
  ctrlContainer.style.width = '100%';
  ctrlContainer.style.height = '200px';
  ctrlContainer.style.backgroundColor = '#eee';

  const appElement = document.getElementById('app')!;
  appElement.insertBefore(ctrlContainer, container);
<<<<<<< HEAD
<<<<<<< HEAD
};

// Create options and control buttons (for selecting different features to test)
const createControls = () => {
  const parentEle = document.getElementById('ctrl-container')!;

  // label
  const labelLabel = document.createElement('span');
  labelLabel.textContent = 'show Label';
  labelLabel.style.position = 'absolute';
  labelLabel.style.top = '64px';
  labelLabel.style.left = '16px';
  labelLabel.style.zIndex = '100';

  const labelCb = document.createElement('input');
  labelCb.type = 'checkbox';
  labelCb.value = 'highlight';
  labelCb.style.position = 'absolute';
  labelCb.style.width = '20px';
  labelCb.style.height = '20px';
  labelCb.style.top = '64px';
  labelCb.style.left = '166px';
  labelCb.style.zIndex = '100';

  labelCb.addEventListener('click', (e) => {
    if (labelCb.checked) {
=======
  
}
=======
};
>>>>>>> a952e826c4 (chore: lint fix & use English comments)

// Create options and control buttons (for selecting different features to test)
const createControls = () => {
  const parentEle = document.getElementById('ctrl-container')!;

  // label
  const labelLabel = document.createElement('span');
  labelLabel.textContent = 'show Label';
  labelLabel.style.position = 'absolute';
  labelLabel.style.top = '64px';
  labelLabel.style.left = '16px';
  labelLabel.style.zIndex = '100';

  const labelCb = document.createElement('input');
  labelCb.type = 'checkbox';
  labelCb.value = 'highlight';
  labelCb.style.position = 'absolute';
  labelCb.style.width = '20px';
  labelCb.style.height = '20px';
  labelCb.style.top = '64px';
  labelCb.style.left = '166px';
  labelCb.style.zIndex = '100';

  labelCb.addEventListener('click', (e) => {
<<<<<<< HEAD

    if(labelCb.checked) {
>>>>>>> 03c9a9db53 (feat: v5-cubic-horizon-edge)
=======
    if (labelCb.checked) {
>>>>>>> a952e826c4 (chore: lint fix & use English comments)
      graph.updateData('edge', {
        id: 'edge1',
        data: {
          labelShape: {
            text: 'edge-label',
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> a952e826c4 (chore: lint fix & use English comments)
          },
        },
      });
    } else {
<<<<<<< HEAD
=======
          }
        }
      })
    }else {
>>>>>>> 03c9a9db53 (feat: v5-cubic-horizon-edge)
=======
>>>>>>> a952e826c4 (chore: lint fix & use English comments)
      graph.updateData('edge', {
        id: 'edge1',
        data: {
          labelShape: {
            text: '',
<<<<<<< HEAD
<<<<<<< HEAD
          },
        },
      });
    }
  });

  parentEle.appendChild(labelLabel);
  parentEle.appendChild(labelCb);

  // icon
  const iconLabel = document.createElement('span');
  iconLabel.textContent = 'show icon';
  iconLabel.style.position = 'absolute';
  iconLabel.style.top = '94px';
  iconLabel.style.left = '16px';
  iconLabel.style.zIndex = '100';

  const iconCb = document.createElement('input');
  iconCb.type = 'checkbox';
  iconCb.value = 'highlight';
  iconCb.style.position = 'absolute';
  iconCb.style.width = '20px';
  iconCb.style.height = '20px';
  iconCb.style.top = '94px';
  iconCb.style.left = '166px';
  iconCb.style.zIndex = '100';

  iconCb.addEventListener('click', (e) => {
    if (iconCb.checked) {
=======
          }
        }
      })
=======
          },
        },
      });
>>>>>>> a952e826c4 (chore: lint fix & use English comments)
    }
  });

  parentEle.appendChild(labelLabel);
  parentEle.appendChild(labelCb);

  // icon
  const iconLabel = document.createElement('span');
  iconLabel.textContent = 'show icon';
  iconLabel.style.position = 'absolute';
  iconLabel.style.top = '94px';
  iconLabel.style.left = '16px';
  iconLabel.style.zIndex = '100';

  const iconCb = document.createElement('input');
  iconCb.type = 'checkbox';
  iconCb.value = 'highlight';
  iconCb.style.position = 'absolute';
  iconCb.style.width = '20px';
  iconCb.style.height = '20px';
  iconCb.style.top = '94px';
  iconCb.style.left = '166px';
  iconCb.style.zIndex = '100';

  iconCb.addEventListener('click', (e) => {
<<<<<<< HEAD

    if(iconCb.checked) {
>>>>>>> 03c9a9db53 (feat: v5-cubic-horizon-edge)
=======
    if (iconCb.checked) {
>>>>>>> a952e826c4 (chore: lint fix & use English comments)
      graph.updateData('edge', {
        id: 'edge1',
        data: {
          labelShape: {
            text: 'police car',
          },
          iconShape: {
<<<<<<< HEAD
            img: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*Kp_tSb9BrdAAAAAAAAAAAAAADmJ7AQ/original',
=======
            img: 'https://cz.xiaqianghui.com/exampledir/警车.svg',
>>>>>>> 03c9a9db53 (feat: v5-cubic-horizon-edge)
            // text: 'A',
            fill: '#f00',
            fontSize: 20,
          },
<<<<<<< HEAD
<<<<<<< HEAD
        },
      });
    } else {
=======
        }
      })
    }else {
>>>>>>> 03c9a9db53 (feat: v5-cubic-horizon-edge)
=======
        },
      });
    } else {
>>>>>>> a952e826c4 (chore: lint fix & use English comments)
      graph.updateData('edge', {
        id: 'edge1',
        data: {
          labelShape: {
            text: 'non-icon',
          },
          iconShape: {
            img: '',
          },
<<<<<<< HEAD
<<<<<<< HEAD
        },
      });
    }
  });

  parentEle.appendChild(iconLabel);
  parentEle.appendChild(iconCb);

  // custom selected style
  const selectedStyleLabel = document.createElement('span');
  selectedStyleLabel.textContent = 'custom selected style';
  selectedStyleLabel.style.position = 'absolute';
  selectedStyleLabel.style.top = '124px';
  selectedStyleLabel.style.left = '16px';
  selectedStyleLabel.style.zIndex = '100';

  const selectedStyleCb = document.createElement('input');
  selectedStyleCb.type = 'checkbox';
  selectedStyleCb.value = 'selected';
  selectedStyleCb.style.position = 'absolute';
  selectedStyleCb.style.width = '20px';
  selectedStyleCb.style.height = '20px';
  selectedStyleCb.style.top = '124px';
  selectedStyleCb.style.left = '166px';
  selectedStyleCb.style.zIndex = '100';

  selectedStyleCb.addEventListener('click', (e) => {
    if (selectedStyleCb.checked) {
      graph.setItemState('edge1', 'selected', true);
    } else {
      graph.setItemState('edge1', 'selected', false);
    }
  });

  parentEle.appendChild(selectedStyleLabel);
  parentEle.appendChild(selectedStyleCb);

  // custom hilighted style
  const highlightStyleLabel = document.createElement('span');
  highlightStyleLabel.textContent = 'custom highlight style';
  highlightStyleLabel.style.position = 'absolute';
  highlightStyleLabel.style.top = '164px';
  highlightStyleLabel.style.left = '16px';
  highlightStyleLabel.style.zIndex = '100';

  const highlightStyleCb = document.createElement('input');
  highlightStyleCb.type = 'checkbox';
  highlightStyleCb.value = 'highlight';
  highlightStyleCb.style.position = 'absolute';
  highlightStyleCb.style.width = '20px';
  highlightStyleCb.style.height = '20px';
  highlightStyleCb.style.top = '164px';
  highlightStyleCb.style.left = '166px';
  highlightStyleCb.style.zIndex = '100';

  highlightStyleCb.addEventListener('click', (e) => {
    if (highlightStyleCb.checked) {
      graph.setItemState('edge1', 'highlight', true);
    } else {
      graph.setItemState('edge1', 'highlight', false);
    }
  });

  parentEle.appendChild(highlightStyleLabel);
  parentEle.appendChild(highlightStyleCb);
};

export default () => {
  // 1.create control container (for control buttons, etc.)
  createCtrlContainer();
  createControls();

  // 2.create graph
  container = document.getElementById('container')!;

  graph = new Graph({
    container,
    width: 500,
    height: 500,
    type: 'graph',
    data: defaultData,
    modes: {
      // supported behavior
      default: ['activate-relations'],
    },
  });
  
  // 3.return graph
  return graph;
};
=======
        }
      })
=======
        },
      });
>>>>>>> a952e826c4 (chore: lint fix & use English comments)
    }
  });

  parentEle.appendChild(iconLabel);
  parentEle.appendChild(iconCb);

  // custom selected style
  const selectedStyleLabel = document.createElement('span');
  selectedStyleLabel.textContent = 'custom selected style';
  selectedStyleLabel.style.position = 'absolute';
  selectedStyleLabel.style.top = '124px';
  selectedStyleLabel.style.left = '16px';
  selectedStyleLabel.style.zIndex = '100';

  const selectedStyleCb = document.createElement('input');
  selectedStyleCb.type = 'checkbox';
  selectedStyleCb.value = 'selected';
  selectedStyleCb.style.position = 'absolute';
  selectedStyleCb.style.width = '20px';
  selectedStyleCb.style.height = '20px';
  selectedStyleCb.style.top = '124px';
  selectedStyleCb.style.left = '166px';
  selectedStyleCb.style.zIndex = '100';

  selectedStyleCb.addEventListener('click', (e) => {
    if (selectedStyleCb.checked) {
      graph.setItemState('edge1', 'selected', true);
    } else {
      graph.setItemState('edge1', 'selected', false);
    }
  });

  parentEle.appendChild(selectedStyleLabel);
  parentEle.appendChild(selectedStyleCb);

  // custom hilighted style
  const highlightStyleLabel = document.createElement('span');
  highlightStyleLabel.textContent = 'custom highlight style';
  highlightStyleLabel.style.position = 'absolute';
  highlightStyleLabel.style.top = '164px';
  highlightStyleLabel.style.left = '16px';
  highlightStyleLabel.style.zIndex = '100';

  const highlightStyleCb = document.createElement('input');
  highlightStyleCb.type = 'checkbox';
  highlightStyleCb.value = 'highlight';
  highlightStyleCb.style.position = 'absolute';
  highlightStyleCb.style.width = '20px';
  highlightStyleCb.style.height = '20px';
  highlightStyleCb.style.top = '164px';
  highlightStyleCb.style.left = '166px';
  highlightStyleCb.style.zIndex = '100';

  highlightStyleCb.addEventListener('click', (e) => {
    if (highlightStyleCb.checked) {
      graph.setItemState('edge1', 'highlight', true);
    } else {
      graph.setItemState('edge1', 'highlight', false);
    }
  });

  parentEle.appendChild(highlightStyleLabel);
  parentEle.appendChild(highlightStyleCb);
};

export default () => {
  // 1.create control container (for control buttons, etc.)
  createCtrlContainer();
  createControls();

  // 2.create graph
  container = document.getElementById('container')!;

  graph = new Graph({
<<<<<<< HEAD
      container,
      width: 500,
      height: 500,
      type: 'graph',
      data: defaultData,
      modes: {
        // 支持的 behavior
        default: [ 'activate-relations'],
      }
  })
  // 3.返回graph

  return graph 
}
>>>>>>> 03c9a9db53 (feat: v5-cubic-horizon-edge)
=======
    container,
    width: 500,
    height: 500,
    type: 'graph',
    data: defaultData,
    modes: {
      // supported behavior
      default: ['activate-relations'],
    },
  });
  
  // 3.return graph
  return graph;
};
>>>>>>> a952e826c4 (chore: lint fix & use English comments)
