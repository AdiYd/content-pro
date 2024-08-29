'use client';

import React, { useMemo, useState, useEffect, createContext } from 'react';

import { useTheme } from '@mui/material';

import { setStorage } from 'src/hooks/use-local-storage';

import { localStorageGetItem } from 'src/utils/storage-available';

import { textGradient } from 'src/theme/styles';

import COLORS from '../theme/core/colors.json';

export const ColorContext = createContext();

const ColorProvider = ({ children }) => {
  const theme = useTheme();
  const [mainColor, setMainColor] = useState();
  const [themeColor, setThemeColor] = useState({ mode: 'dark' });

  const changeColors = (colorName) => {
    const storedColor = colorName || 'primary';
    const mode = theme.palette?.mode || 'dark';
    const gradMode = theme.palette.mode === 'light' ? 'dark' : 'light';
    const themeColors = COLORS[storedColor]?.main;
    const accentColor = COLORS[storedColor][gradMode];
    const textGradientName = `to right, ${accentColor}, ${themeColors}`;
    const textGradients = textGradient(textGradientName);
    setMainColor(storedColor);
    setThemeColor({
      mode,
      gradMode,
      themeColor,
      accentColor,
      textGradient: textGradients,
    });
  };

  useEffect(() => {
    try {
      let storedColor =
        localStorageGetItem('mainColor') &&
        JSON.parse(localStorageGetItem('mainColor', JSON.stringify('info')));

      storedColor =
        storedColor && Object.keys(COLORS).includes(storedColor) ? storedColor : 'primary';
      const mode = theme.palette?.mode || 'dark';
      const gradMode = theme.palette.mode === 'light' ? 'dark' : 'light';
      const themeColors = COLORS[storedColor]?.main;
      const accentColor = COLORS[storedColor][gradMode];
      const textGradientName = `to right, ${accentColor}, ${themeColors}`;
      const textGradients = textGradient(textGradientName);
      setMainColor(storedColor);
      setThemeColor((p) => ({
        mode,
        gradMode,
        themeColor: themeColors,
        accentColor,
        textGradient: textGradients,
      }));
    } catch {
      const storedColor = 'primary';
      const mode = theme.palette?.mode || 'dark';
      const gradMode = theme.palette.mode === 'light' ? 'dark' : 'light';
      const themeColors = COLORS[storedColor]?.main;
      const accentColor = COLORS[storedColor][gradMode];
      const textGradientName = `to right, ${accentColor}, ${themeColors}`;
      const textGradients = textGradient(textGradientName);
      setMainColor(storedColor);
      setThemeColor((p) => ({
        mode,
        gradMode,
        themeColor: themeColors,
        accentColor,
        textGradient: textGradients,
      }));
    }
  }, [theme.palette?.mode]);

  const setColor = (color) => {
    console.log('Changing Theme color: ', color);
    setStorage('mainColor', color);
    changeColors(color);
  };

  // Memoize the context value
  const value = useMemo(
    () => ({
      mainColor,
      ...themeColor,
    }),
    [mainColor, themeColor] // Dependencies for memoization
  );

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  return <ColorContext.Provider value={{ ...value, setColor }}>{children}</ColorContext.Provider>;
};

export default ColorProvider;
