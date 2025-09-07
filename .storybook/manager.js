// eslint-disable-next-line import/no-unresolved
import { addons } from 'storybook/manager-api';
// eslint-disable-next-line import/no-unresolved
import { themes } from 'storybook/theming';

addons.setConfig({
  panelPosition: 'right',
  theme: themes.dark,
});
