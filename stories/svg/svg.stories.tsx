// import { Button } from '@storybook/react/demo';
import { storiesOf } from '@storybook/react';
import React from 'react';
import Grid from './component/grid';
import ContextMenu from './component/contextMenu';
import Tooltip from './component/tooltip';

export default { title: 'SVG' };

storiesOf('SVG', module)
.add('grid', () => (
  <Grid />
))
.add('context menu', () => (
  <ContextMenu />
))
.add('tooltip', () => (
  <Tooltip />
))
