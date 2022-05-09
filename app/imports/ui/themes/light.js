import { createTheme } from '@mui/material/styles';
import EoleLight from './eole/eoleLight';
import NormalLight from './normal/normal';

export const LIGHT_THEMES = {
  eole: EoleLight,
  normal: NormalLight,
};

const lightTheme = createTheme(LIGHT_THEMES[Meteor.settings.public.theme || 'laboite']);

export default lightTheme;
