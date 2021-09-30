import { create } from '@storybook/theming';
import pocketLogo from '/src/assets/images/pocket-logo.png'

export default create({
  base: 'light',
  brandTitle: 'Pocket',
  brandUrl: 'https://getpocket.com',
  brandImage: pocketLogo,
});
