// import { Button } from '@storybook/react/demo';
import { storiesOf } from '@storybook/react';
import React from 'react';
import Grid from './component/grid';

export default { title: 'Plugins' };

storiesOf('Plugins', module)
.add('grid', () => (
  <Grid />
))
