import { defaultFont } from 'src/theme/core/typography';

// ----------------------------------------------------------------------

export const STORAGE_KEY = 'app-settings';

export const defaultSettings = {
  colorScheme: 'system',
  direction: 'ltr',
  contrast: 'default',
  navLayout: 'vertical',
  primaryColor: 'default',
  navColor: 'integrate',
  compactLayout: true,
  fontFamily: defaultFont,
  transition: 'all 0.3s ease-in-out',
};
