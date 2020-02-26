// import { Button } from '@storybook/react/demo';
import { storiesOf } from '@storybook/react';
import React from 'react';
import Grid from './component/grid';
import ContextMenu from './component/contextMenu';

export default { title: 'SVG' };

storiesOf('SVG', module)
.add('grid', () => (
  <Grid />
))
.add('context menu', () => (
  <ContextMenu />
))
