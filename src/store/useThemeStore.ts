import {create} from 'zustand';
import {config} from '@gluestack-ui/config';
import {darkTheme, lightTheme} from '@/theme';

interface ThemeStore {
  isDarkMode: boolean;
  theme: typeof config;
  toggleTheme: () => void;
}

export default create<ThemeStore>((set, get) => ({
  isDarkMode: false,
  theme: {
    ...config,
    tokens: {
      ...config.tokens,
      colors: {
        ...config.tokens.colors,
        ...lightTheme,
      },
    },
  },
  toggleTheme: () => {
    const currentMode = get().isDarkMode;

    const newColors = !currentMode ? lightTheme : darkTheme;

    set({
      isDarkMode: !currentMode,
      theme: {
        ...config,
        tokens: {
          ...config.tokens,
          colors: {
            ...config.tokens.colors,
            ...newColors,
          },
        },
      },
    });
  },
}));
