import { storiesOf } from '@storybook/react';
import React from 'react';
import DragCanvas from './component/drag-canvas';
import DagreArrow from './component/dagre-arrow';
import ChageData from './changeData'
import ChangeAttr from './attrs'

export default { title: 'Issues' };

storiesOf('Issues', module)
.add('drag canvas and shift tab', () => (
  <DragCanvas />
))
.add('dagre polyline arrow', () => (
  <DagreArrow />
))
.add('change data', () => (
  <ChageData />
))
.add('change attr', () => (
  <ChangeAttr />
))
