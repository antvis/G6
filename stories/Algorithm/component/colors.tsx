import React, { useEffect } from 'react';
import G6 from '../../../src';


const Colors = () => {
  const container = React.useRef();

  useEffect(() => {
    // Generate color sets according to subject colors
    const subjectColors = [
      '#5F95FF', // blue
      '#61DDAA',
      '#65789B',
      '#F6BD16',
      '#7262FD',
      '#78D3F8',
      '#9661BC',
      '#F6903D',
      '#008685',
      '#F08BB4'
    ];
    const backColor = '#fff';
    const theme = 'default';
    const disableColor = '#777';
    const colorSets = G6.Util.getColorSetsBySubjectColors(subjectColors, backColor, theme, disableColor);

    const data = { nodes: [] };

    subjectColors.forEach((color, i) => {
      data.nodes.push({
        id: `node-${color}`,
        label: color,
        labelCfg: {
          position: 'bottom'
        },
        style: {
          fill: colorSets[i].mainFill,
          stroke: colorSets[i].mainStroke
        },
        stateStyles: {
          active: {
            fill: colorSets[i].activeFill,
            stroke: colorSets[i].activeStroke,
            shadowColor: colorSets[i].activeStroke,
          },
          inactive: {
            fill: colorSets[i].inactiveFill,
            stroke: colorSets[i].inactiveStroke
          },
          selected: {
            fill: colorSets[i].selectedFill,
            stroke: colorSets[i].selectedStroke,
            shadowColor: colorSets[i].selectedStroke,
          },
          highlight: {
            fill: colorSets[i].highlightFill,
            stroke: colorSets[i].highlightStroke
          },
          disable: {
            fill: colorSets[i].disableFill,
            stroke: colorSets[i].disableStroke
          }
        }
      })
    });

    // data.nodes.push({
    //   id: `node-custom`,
    //   label: `customColor`
    // })

    // G6.Global.nodeStateStyles = {};

    const graph = new G6.Graph({
      container: container.current,
      width: 500,
      height: 500,
      linkCenter: true,
      modes: {
        default: ['drag-canvas', 'drag-node', 'zoom-canvas'],
      },
      fitView: true,
      layout: {
        type: 'grid'
      },
      defaultNode: {
        type: 'circle',
        labelCfg: {
          position: 'bottom'
        }
      },
      nodeStateStyles: {
        active: {
          fill: colorSets[1].activeFill,
          stroke: colorSets[1].activeStroke
        },
      }
    });
    graph.data(data);
    graph.render();

    graph.on('node:mouseenter', e => {
      graph.getNodes().forEach(node => {
        graph.setItemState(node, 'active', false);
      });
      graph.setItemState(e.item, 'active', true);
    });

    graph.on('node:mouseleave', e => {
      graph.setItemState(e.item, 'active', false);
    });

    graph.on('node:click', e => {
      graph.setItemState(e.item, 'selected', true);
    });

    console.log(graph.getNodes());
  });

  return <div ref={container}></div>;
}

export default Colors;