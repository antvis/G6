// import { Button } from '@storybook/react/demo';
import { storiesOf } from '@storybook/react';
import React from 'react';
import DefaultCombo from './component/default-combo';
import RegisterCombo from './component/register-combo';
import CollapseExpand from './component/collapse-expand-combo';
import ComboLayoutCollapseExpand from './component/combo-layout-collapse-expand';
import CollapseExpandVEdge from './component/collapse-expand-vedge';
import ComboCollapseExpandTree from './component/combo-collapse-expand-tree';
import ComboExample from './component/combo-example';
import ComboDragCollapseExpand from './component/combo-drag-collapse-expand';
import RegisterRectCombo from './component/register-rect-combo';
import RegisterCircleCombo from './component/register-circle-combo';
import Edges from './component/edges';
import DagreCombo from './component/dagre-combo';
import Edges2 from './component/edges2';
import CreateCombo from './component/create-combo';
import RemoveItem from './component/remove-item';
import DragNodeOut from './component/drag-node-out';
import TreeGraphCreateCombo from './component/treegraph-create-combo';

export default { title: 'Combo' };

storiesOf('Combo', module)
  .add('default combo', () => <DefaultCombo />)
  .add('register combo', () => <RegisterCombo />)
  .add('register rect combo', () => <RegisterRectCombo />)
  .add('register circle combo', () => <RegisterCircleCombo />)
  .add('collapse expand', () => <CollapseExpand />)
  .add('force + collapse expand', () => <ComboLayoutCollapseExpand />)
  .add('collapse expand vedge', () => <CollapseExpandVEdge />)
  .add('collapse expand tree', () => <ComboCollapseExpandTree />)
  .add('combo example', () => <ComboExample />)
  .add('drag collapse expand', () => <ComboDragCollapseExpand />)
  .add('edges', () => <Edges />)
  .add('dagre combo', () => <DagreCombo />)
  .add('edges2 ', () => <Edges2 />)
  .add('create combo ', () => <CreateCombo />)
  .add('remove item ', () => <RemoveItem />)
  .add('drag node out', () => <DragNodeOut />)
  .add('treegraph create combo', () => <TreeGraphCreateCombo />);
