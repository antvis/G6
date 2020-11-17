// import { Button } from '@storybook/react/demo';
import { storiesOf } from '@storybook/react';
import React from 'react';
import RegisterLayout from './component/register-layout';
import DagreLayout from './component/dagre-layout';
import FruchtermanWorker from './component/fruchterman-worker-layout';
import AddNodeLayout from './component/addNodeLayout';
import ChangeData from './component/changeData';
import ComboForceLayout from './component/combo-force-layout';
import ForceLayout from './component/force-layout';
import CompactBox from './component/compact-box';
import AutoLayout from './component/auto-layout';
import ForceClusteringLayout from './component/force-clustering-layout';
import GraphinForceLayout from './component/graphin-force-layout';

export default { title: 'Layout' };

storiesOf('Layout', module)
  .add('Register layout', () => <RegisterLayout />)
  .add('Dagre layout', () => <DagreLayout />)
  .add('Fruchterman worker layout', () => <FruchtermanWorker />)
  .add('add node and layout', () => <AddNodeLayout />)
  .add('change data', () => <ChangeData />)
  .add('combo force layout', () => <ComboForceLayout />)
  .add('Fruchterman worker layout', () => <FruchtermanWorker />)
  .add('force layout', () => <ForceLayout />)
  .add('compactbox layout', () => <CompactBox />)
  .add('auto layout', () => <AutoLayout />)
  .add('force clustering layout', () => <ForceClusteringLayout />)
  .add('graphin force layout', () => <GraphinForceLayout />)
