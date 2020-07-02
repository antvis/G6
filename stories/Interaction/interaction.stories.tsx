// import { Button } from '@storybook/react/demo';
import { storiesOf } from '@storybook/react';
import React from 'react';
import MoveViewPort from './component/view-port';
import AltTab from './component/alt-tab';
import AddItem from './component/addItem';
import Tooltip from './component/tooltip';
import DragCanvas from './component/drag-canvas';

export default { title: 'Interaction' };

storiesOf('Interaction', module)
  .add('move view port', () => (
    <MoveViewPort />
  ))
  .add('alt tab in windows', () => (
    <AltTab />
  ))
  .add('add item', () => (
    <AddItem />
  ))
  .add('tooltip', () => (
    <Tooltip />
  )).add('drag canvas', () => (
    <DragCanvas />
  ));
