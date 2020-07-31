// import { Button } from '@storybook/react/demo';
import { storiesOf } from '@storybook/react';
import React from 'react';
import Grid from './component/grid';
import Minimap from './component/minimap';
import MinimapForce from './component/minimap-force';
import ImgMinimap from './component/image-minimap';
import ImgMinimap2 from './component/image-minimap2'

export default { title: 'Plugins' };

storiesOf('Plugins', module)
  .add('grid', () => (
    <Grid />
  ))
  .add('minimap', () => (
    <Minimap />
  ))

  .add('minimap force', () => (
    <MinimapForce />
  ))

  .add('image minimap', () => (
    <ImgMinimap />
  ))
  .add('image minimap small graph', () => (
    <ImgMinimap2 />
  ))
