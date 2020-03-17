import { storiesOf } from '@storybook/react';
import React from 'react';
import DragCanvas from './component/drag-canvas';

export default { title: 'Issues' };

storiesOf('Issues', module)
.add('drag canvas and shift tab', () => (
  <DragCanvas />
));
