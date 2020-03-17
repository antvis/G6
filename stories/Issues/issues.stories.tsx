import { storiesOf } from '@storybook/react';
import React from 'react';
import DragCanvas from './component/drag-canvas';
import DagreArrow from './component/dagre-arrow';

export default { title: 'Issues' };

storiesOf('Issues', module)
.add('drag canvas and shift tab', () => (
  <DragCanvas />
))
.add('dagre polyline arrow', () => (
  <DagreArrow />
));
