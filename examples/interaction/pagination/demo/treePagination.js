import G6 from '@antv/g6';

// the max number of nodes for each subtree
const MAX_NUM_EACH_SUBTREE = 3;

const graphDiv = document.getElementById('container');
const tipDiv = document.createElement('div');
tipDiv.id = 'tip';
tipDiv.innerHTML = `<div>Hover the nodes of a subtree, and click the triangle icons to switch the nodes patination.</div>
<div>将鼠标移动到有多个子节点的子树上，点击左右小三角按钮以切换该层级的节点，达到分页效果</div>`;
graphDiv.appendChild(tipDiv);

fetch('https://gw.alipayobjects.com/os/bmw-prod/a3ae9b40-ff40-434a-894f-b10c535f8b9f.json')
  .then((res) => res.json())
  .then((data) => {
    const stashSubtrees = {};
    G6.Util.traverseTreeUp(data, subtree => {
      // process the label
      subtree.label = subtree.id,
        subtree.labelCfg = {
          offset: 10,
          position: subtree.children && subtree.children.length > 0 ? 'left' : 'right',
        };

      // stash the origin children for the subtree to be pruned
      if (subtree.children && subtree.children.length > MAX_NUM_EACH_SUBTREE) {
        subtree.overflow = true;
        const stashChildren = [];
        subtree.children.forEach(child => {
          stashChildren.push(Object.assign({}, child));
        })
        stashSubtrees[subtree.id] = {
          oriChildren: stashChildren,
          curBeginIdx: 0,
          curEndIdx: MAX_NUM_EACH_SUBTREE
        };
      }
    });

    // pruning the tree
    G6.Util.traverseTree(data, subtree => {
      if (subtree.overflow) subtree.children = subtree.children.slice(0, MAX_NUM_EACH_SUBTREE);
    });

    const width = graphDiv.scrollWidth;
    const height = (graphDiv.scrollHeight || 500) - 50;
    const graph = new G6.TreeGraph({
      container: 'container',
      width,
      height,
      modes: {
        default: [
          {
            type: 'collapse-expand',
            onChange: function onChange(item, collapsed) {
              item.getModel().collapsed = collapsed;
              Object.keys(iconMap).forEach(parentId => {
                if (!iconMap[parentId] || iconMap[parentId].destroyed) return;
                destroyIcons(parentId);
              });
              return true;
            },
          },
          'drag-canvas',
          'zoom-canvas',
        ],
      },
      defaultNode: {
        size: 26,
        anchorPoints: [
          [0, 0.5],
          [1, 0.5],
        ],
        style: {
          fill: '#C6E5FF',
          stroke: '#5B8FF9',
        },
      },
      defaultEdge: {
        type: 'cubic-horizontal',
        style: {
          stroke: '#A3B1BF',
        },
      },
      layout: {
        type: 'compactBox',
        direction: 'LR',
        getId: function getId(d) {
          return d.id;
        },
        getHeight: function getHeight() {
          return 16;
        },
        getWidth: function getWidth() {
          return 16;
        },
        getVGap: function getVGap() {
          return 10;
        },
        getHGap: function getHGap() {
          return 100;
        },
      },
      fitView: true
    });

    const iconMap = {};

    // draw the icons on the root graphics group of the graph
    const drawIcons = (parentId) => {
      const parentNode = graph.findById(parentId);
      const model = parentNode.getModel();
      delayDestroyIcons(parentId, 2000);
      if (model.overflow) {
        if (iconMap[parentId] && !iconMap[parentId].destroyed) return;
        const graphicsGroup = graph.getGroup();
        const children = model.children;
        const stashSubtree = stashSubtrees[parentId];
        const prePos = [children[0].x, children[0].y - (children[0].size || 26)];
        const nextPos = [children[2].x, children[2].y + (children[0].size || 26)];
        const preIcon = graphicsGroup.addShape('marker', {
          attrs: {
            symbol: 'triangle',
            x: prePos[0],
            y: prePos[1],
            r: 6,
            fill: '#333',
            opacity: 0,
            cursor: 'pointer'
          },
          name: `pre-icon`,
          subtreeID: model.id
        });
        const nextIcon = graphicsGroup.addShape('marker', {
          attrs: {
            symbol: 'triangle-down',
            x: nextPos[0],
            y: nextPos[1],
            r: 6,
            fill: '#333',
            opacity: 0,
            cursor: 'pointer'
          },
          name: `next-icon`,
          subtreeID: model.id
        });

        if (stashSubtree.curBeginIdx > 0) {
          preIcon.animate({
            opacity: 0.5
          }, {
            duration: 150,
            repeat: false
          })
        }
        if (stashSubtree.curEndIdx < stashSubtree.oriChildren.length) {
          nextIcon.animate({
            opacity: 0.5
          }, {
            duration: 150,
            repeat: false
          })
        }

        iconMap[parentId] = {
          preIcon,
          nextIcon,
          destroyed: false
        };
        return true;
      }
      return false;
    }

    // update the icons
    const updateIcons = (parentId) => {
      if (!parentId || !iconMap[parentId]) return;
      const preIcon = iconMap[parentId].preIcon;
      const nextIcon = iconMap[parentId].nextIcon;
      const stashSubtree = stashSubtrees[parentId];

      const parentModel = graph.findById(parentId).getModel();
      const children = parentModel.children;
      if (!children) return;
      const prePos = [children[0].x, children[0].y - (children[0].size || 26)];
      const nextPos = [children[2].x, children[2].y + (children[0].size || 26)];
      preIcon.attr({
        opacity: stashSubtree.curBeginIdx <= 0 || parentModel.collapsed ? 0 : 0.5,
        x: prePos[0],
        y: prePos[1]
      });
      nextIcon.attr({
        opacity: stashSubtree.curEndIdx >= stashSubtree.oriChildren.length || parentModel.collapsed ? 0 : 0.5,
        x: nextPos[0],
        y: nextPos[1]
      });
    }

    // destroy the icons
    const destroyIcons = (parentId) => {
      if (!iconMap[parentId]) return;
      const preIcon = iconMap[parentId].preIcon;
      const nextIcon = iconMap[parentId].nextIcon;
      if (preIcon && !preIcon.destroyed) {
        preIcon.animate({
          opacity: 0
        }, {
          duration: 150,
          repeat: false
        })
        setTimeout(() => {
          preIcon.remove();
          preIcon.destroy();
        }, 150);
      }
      if (nextIcon && !nextIcon.destroyed) {
        nextIcon.animate({
          opacity: 0
        }, {
          duration: 150,
          repeat: false
        })
        setTimeout(() => {
          nextIcon.remove();
          nextIcon.destroy();
        }, 150);
      }
      iconMap[parentId].destroyed = true;
    }

    // destroy the icons with delay
    const delayDestroyIcons = (parentId, delay = 2000) => {
      if (!iconMap[parentId]) return;
      if (iconMap[parentId].timeouter) {
        window.clearTimeout(iconMap[parentId].timeouter);
      }
      iconMap[parentId].timeouter = window.setTimeout(() => {
        destroyIcons(parentId);
      }, delay);
    }

    // mouseenter the node to show the previous/next icons
    graph.on('node:mouseenter', e => {
      const parentNode = e.item.get('parent');
      if (!parentNode) return;
      const parentId = parentNode.getID();
      drawIcons(parentId);
    });

    // mouseleave the node to destroy the icons
    graph.on('node:mouseleave', e => {
      const parentNode = e.item.get('parent');
      if (!parentNode) return;
      const parentId = parentNode.getID();
      delayDestroyIcons(parentId, 2000);
    });

    // click the icon to changeData
    graph.on('click', e => {
      if (e.name === 'click') return;
      const target = e.target;
      const targetName = target.get('name');
      if (targetName !== 'pre-icon' && targetName !== 'next-icon') return;
      const parentId = target.get('subtreeID');
      const stashSubtree = stashSubtrees[parentId];
      const oriChildren = stashSubtree.oriChildren;
      if (targetName === 'pre-icon') {
        if (stashSubtree.curBeginIdx <= 0) return; // touch the top
        stashSubtree.curBeginIdx--;
        stashSubtree.curEndIdx--;
      } else {
        if (stashSubtree.curEndIdx >= oriChildren.length) return; // touch the bottom
        stashSubtree.curBeginIdx++;
        stashSubtree.curEndIdx++;
      }
      const newChildren = oriChildren.slice(stashSubtree.curBeginIdx, stashSubtree.curEndIdx);
      newChildren.forEach(childTree => {
        G6.Util.traverseTreeUp(childTree, subChildTree => {
          if (subChildTree.children && subChildTree.children.length > MAX_NUM_EACH_SUBTREE) {
            subChildTree.children = subChildTree.children.slice(0, MAX_NUM_EACH_SUBTREE);
          }
        });
      });
      graph.updateChildren(newChildren, parentId);
    });

    graph.on('afterlayout', e => {
      Object.keys(iconMap).forEach(parentId => {
        if (!iconMap[parentId] || iconMap[parentId].destroyed) return;
        updateIcons(parentId);
      });
    });

    graph.data(data);
    graph.render();

  });