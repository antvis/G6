import G6 from '@antv/g6';
import insertCss from 'insert-css';

// define the CSS with the id of your menu
insertCss(`
  #contextMenu {
    position: absolute;
    list-style-type: none;
    padding: 10px 8px;
    left: -150px;
    background-color: rgba(255, 255, 255, 0.9);
    border: 1px solid #e2e2e2;
    border-radius: 4px;
    font-size: 12px;
    color: #545454;
  }
  #contextMenu li {
    cursor: pointer;
		list-style-type:none;
    list-style: none;
    margin-left: 0px;
  }
  #contextMenu li:hover {
    color: #aaa;
  }
`);


const descriptionDiv = document.createElement('div');
descriptionDiv.id = 'discription';
descriptionDiv.innerHTML = 'Left click a node to activate a contextMenu.';
document.getElementById('container').appendChild(descriptionDiv);


// JSX and HTML templates are available for the menu
// create ul
const conextMenuContainer = document.createElement('ul');
conextMenuContainer.id = 'contextMenu';

// create li
const firstLi = document.createElement('li');
firstLi.innerText = 'Option 1';
conextMenuContainer.appendChild(firstLi);

const lastLi = document.createElement('li');
lastLi.innerText = 'Option 2';
conextMenuContainer.appendChild(lastLi);
document.getElementById('container').appendChild(conextMenuContainer);

const width = document.getElementById('container').scrollWidth;
const height = document.getElementById('container').scrollHeight || 500;
const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  linkCenter: true,
  defaultNode: {
    size: [ 80, 40 ],
    shape: 'rect',
    style: {
      fill: '#DEE9FF',
      stroke: '#5B8FF9'
    }
  },
  defaultEdge: {
    style: {
      stroke: '#b5b5b5',
      lineAppendWidth: 3 // Enlarge the range the edge to be hitted
    },
    labelCfg: {
      autoRotate: true,
      style: {
        // A white stroke with width 5 helps show the label more clearly avoiding the interference of the overlapped edge
        stroke: 'white',
        lineWidth: 5
      }
    }
  },
  modes: {
    default: [ 'drag-node' ]
  }
});

const data = {
  nodes: [{
    id: 'node1',
    label: 'node1',
    x: 200,
    y: 100,
    shape: 'rect'
  }, {
    id: 'node2',
    label: 'node2',
    x: 250,
    y: 250,
    shape: 'rect'
  }, {
    id: 'node3',
    label: 'node3',
    x: 350,
    y: 100,
    shape: 'rect'
  }],
  edges: [{
    source: 'node1',
    target: 'node2',
    label: 'Test Label'
  }, {
    source: 'node1',
    target: 'node3',
    label: 'Test Label 2'
  }]
};

graph.data(data);
graph.render();

graph.on('node:contextmenu', function(evt) {
  conextMenuContainer.style.left = evt.x + 'px';
  conextMenuContainer.style.top = evt.y + 'px';
});

graph.on('node:mouseleave', () => {
  conextMenuContainer.style.left = '-150px';
});
