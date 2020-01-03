import { configure, addDecorator } from '@storybook/react';
import {withInfo} from '@storybook/addon-info'

addDecorator(withInfo)

configure(require.context('../stories', true, /\.stories\.tsx$/), module)