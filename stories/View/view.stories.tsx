import { storiesOf } from '@storybook/react';
import React from 'react';
import MoveTo from './component/moveTo';
import AnimateFitView from './component/animate-fitview';

export default { title: 'View' };

storiesOf('View', module)
  .add('MoveTo', () => <MoveTo />)
  .add('Animate and FitView', () => <AnimateFitView />);
