import React, { useEffect, useState } from 'react';
import G6, { Fisheye } from '../../../src';
import { IGraph } from '../../../src/interface/graph';

let graph: IGraph = null;

let fisheye = new G6.Fisheye({
  r: 200,
  showLabel: true,
});

const FishEye = () => {

  const container = React.useRef();
  const colors = [
    '#8FE9FF',
    '#87EAEF',
    '#FFC9E3',
    '#A7C2FF',
    '#FFA1E3',
    '#FFE269',
    '#BFCFEE',
    '#FFA0C5',
    '#D5FF86',
  ];

  useEffect(() => {
    if (!graph) {
      graph = new G6.Graph({
        container: container.current as string | HTMLElement,
        width: 1000,
        height: 600,
        plugins: [fisheye],
        layout: {
          type: 'force',
          preventOverlap: true,
        },
        modes: {
          // default: ['drag-canvas', 'zoom-canvas'],
        },
      });
      fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/relations.json')
        .then((res) => res.json())
        .then((data) => {
          data.nodes.forEach((node) => {
            node.label = node.id;
            node.size = Math.random() * 40 + 20;
            node.style = {
              fill: colors[Math.floor(Math.random() * 9)],
              lineWidth: 0,
            };
          });
          graph.get('canvas').set('localRefresh', false);
          graph.data(data);
          graph.render();
          graph.getNodes().forEach((node) => {
            node
              .getContainer()
              .getChildren()
              .forEach((shape) => {
                if (shape.get('type') === 'text') shape.set('visible', false);
              });
          });
        });
    }
  });
  const handleClear = () => {
    fisheye.clear();
  };

  const [state, setState] = useState('Disable')
  const handleSwitch = () => {
    if (state === 'Disable') {
      setState('Enable');
      graph.removePlugin(fisheye);
    } else {
      setState('Disable');
      fisheye = new G6.Fisheye({
        r: 100,
        showLabel: true,
      });
      graph.addPlugin(fisheye);
    }
  }

  const handleChangeDTrigger = event => {
    const value = event.target.value;
    fisheye.updateParams({ scaleDBy: value })
  }
  const handleChangeRTrigger = event => {
    const value = event.target.value;
    fisheye.updateParams({ scaleRBy: value })
  }
  const handleChangeTrigger = event => {
    const { r, d, scaleRBy, scaleDBy, showLabel } = fisheye._cfgs;
    graph.removePlugin(fisheye);
    fisheye = new Fisheye({
      trigger: event.target.value,
      r, d, scaleRBy, scaleDBy, showLabel
    })
    graph.addPlugin(fisheye)
  }

  return (
    <>
      <div>
        <div onClick={handleClear} style={{ marginLeft: '24px' }}>click here to clear</div>
        <div onClick={handleSwitch} style={{ marginLeft: '24px' }}>{state}</div>
        <div style={{ marginLeft: '24px' }}>
          <span>fisheye 模式</span>
          <select onChange={handleChangeTrigger}>
            <option value="mousemove">mousemove</option>
            <option value="drag">drag</option>
            <option value="click">click</option>
          </select>
        </div>
        <div style={{ marginLeft: '24px' }}>
          <span>调整范围：</span>
          <select onChange={handleChangeRTrigger}>
            <option value="unset">unset</option>
            <option value="drag">drag</option>
            <option value="wheel">wheel</option>
          </select>
        </div>
        <div style={{ marginLeft: '24px' }}>
          <span>调整缩放系数：</span>
          <select onChange={handleChangeDTrigger}>
            <option value="unset">unset</option>
            <option value="drag">drag</option>
            <option value="wheel">wheel</option>
          </select>
        </div>
      </div>
      <div ref={container}>
      </div>
    </>
  );
};

export default FishEye;
