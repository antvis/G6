import { CubicEdge } from './../../../../src/stdlib/item/edge/cubic';
import { data } from './../../../datasets/const';
import { color } from 'color';
// @ts-nocheck
import G6, {
  EdgeDisplayModel,
  Graph,
  IGraph,
  NodeDisplayModel,
} from '../../../../src/index';
import { type } from 'os';
import { extend } from '@antv/util';

let graph:IGraph  
let container: HTMLElement

const defaultData = {
  nodes: [
    {
      id: 'node1',
      data: {
        x: 300,
        y: 100,
      },
    },
    {
      id: 'node2',
      data: { x: 100, y: 350 },
    },
  ],
  edges: [
    {
      id: 'edge1',
      source: 'node1',
      target: 'node2',
      data: {
        type: 'cubic-vertical-edge',
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
        }
      }
    },
  ]
}


// 创建控制器的容器
const createCtrlContainer = () => {
  const container = document.getElementById('container')!;
  const ctrlContainer = document.createElement('div');
  ctrlContainer.id = 'ctrl-container';
  ctrlContainer.style.width = '100%';
  ctrlContainer.style.height = '200px';
  ctrlContainer.style.backgroundColor = '#eee';

  const appElement = document.getElementById('app')!;
  appElement.insertBefore(ctrlContainer, container);
  
}

// 创建选项和控制按钮（用于选择测试不同的功能）
const createControls = () => {
  const parentEle = document.getElementById('ctrl-container')!

  // label

  const labelLabel = document.createElement('span')
  labelLabel.textContent = '是否设置Label'
  labelLabel.style.position = 'absolute'
  labelLabel.style.top = '64px'
  labelLabel.style.left = '16px'
  labelLabel.style.zIndex = '100'

  const labelCb = document.createElement('input')
  labelCb.type = 'checkbox'
  labelCb.value = "highlight"
  labelCb.style.position = 'absolute'
  labelCb.style.width = '20px'
  labelCb.style.height = '20px'
  labelCb.style.top = '64px'
  labelCb.style.left = '166px'
  labelCb.style.zIndex = '100'

  labelCb.addEventListener('click', (e) => {

    if(labelCb.checked) {
      graph.updateData('edge', {
        id: 'edge1',
        data: {
          labelShape: {
            text: 'edge-label',
          }
        }
      })
    }else {
      graph.updateData('edge', {
        id: 'edge1',
        data: {
          labelShape: {
            text: '',
          }
        }
      })
    }
  })

  parentEle.appendChild(labelLabel)
  parentEle.appendChild(labelCb)

  // icon
  const iconLabel = document.createElement('span')
  iconLabel.textContent = '是否设置icon'
  iconLabel.style.position = 'absolute'
  iconLabel.style.top = '94px'
  iconLabel.style.left = '16px'
  iconLabel.style.zIndex = '100'

  const iconCb = document.createElement('input')
  iconCb.type = 'checkbox'
  iconCb.value = "highlight"
  iconCb.style.position = 'absolute'
  iconCb.style.width = '20px'
  iconCb.style.height = '20px'
  iconCb.style.top = '94px'
  iconCb.style.left = '166px'
  iconCb.style.zIndex = '100'

  iconCb.addEventListener('click', (e) => {

    if(iconCb.checked) {
      graph.updateData('edge', {
        id: 'edge1',
        data: {
          labelShape: {
            text: 'police car',
          },
          iconShape: {
            img: 'https://cz.xiaqianghui.com/exampledir/警车.svg',
            // text: 'A',
            fill: '#f00',
            fontSize: 20,
          },
        }
      })
    }else {
      graph.updateData('edge', {
        id: 'edge1',
        data: {
          labelShape: {
            text: 'non-icon',
          },
          iconShape: {
            img: '',
          },
        }
      })
    }
  })

  parentEle.appendChild(iconLabel)
  parentEle.appendChild(iconCb)

  // custom selected style
  const selectedStyleLabel = document.createElement('span')
  selectedStyleLabel.textContent = '自定义selected样式'
  selectedStyleLabel.style.position = 'absolute'
  selectedStyleLabel.style.top = '124px'
  selectedStyleLabel.style.left = '16px'
  selectedStyleLabel.style.zIndex = '100'

  const selectedStyleCb = document.createElement('input')
  selectedStyleCb.type = 'checkbox'
  selectedStyleCb.value = "selected"
  selectedStyleCb.style.position = 'absolute'
  selectedStyleCb.style.width = '20px'
  selectedStyleCb.style.height = '20px'
  selectedStyleCb.style.top = '124px'
  selectedStyleCb.style.left = '166px'
  selectedStyleCb.style.zIndex = '100'

  selectedStyleCb.addEventListener('click', (e) => {

    if(selectedStyleCb.checked) {
      graph.setItemState('edge1', 'selected', true);
    }else {
      graph.setItemState('edge1', 'selected', false);
    }
    

  })

  parentEle.appendChild(selectedStyleLabel)
  parentEle.appendChild(selectedStyleCb)

  // custom hilighted style

  const highlightStyleLabel = document.createElement('span')
  highlightStyleLabel.textContent = '自定义highlight样式'
  highlightStyleLabel.style.position = 'absolute'
  highlightStyleLabel.style.top = '164px'
  highlightStyleLabel.style.left = '16px'
  highlightStyleLabel.style.zIndex = '100'

  const highlightStyleCb = document.createElement('input')
  highlightStyleCb.type = 'checkbox'
  highlightStyleCb.value = "highlight"
  highlightStyleCb.style.position = 'absolute'
  highlightStyleCb.style.width = '20px'
  highlightStyleCb.style.height = '20px'
  highlightStyleCb.style.top = '164px'
  highlightStyleCb.style.left = '166px'
  highlightStyleCb.style.zIndex = '100'

  highlightStyleCb.addEventListener('click', (e) => {

    if(highlightStyleCb.checked) {
      graph.setItemState('edge1', 'highlight', true) 
    }else {
      graph.setItemState('edge1', 'highlight', false) 
    }
  })

  parentEle.appendChild(highlightStyleLabel)
  parentEle.appendChild(highlightStyleCb)
}

export default() => { 
  // 1.创建控制容器（用于存放控制按钮等）
  createCtrlContainer()
  createControls()
  
   
  // 2.创建graph
  container = document.getElementById('container')!;

  graph = new Graph({
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