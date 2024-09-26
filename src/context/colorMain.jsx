'use client';

import React, { useMemo, useState, useEffect, createContext } from 'react';

import { useTheme, keyframes } from '@mui/material';

import { setStorage } from 'src/hooks/use-local-storage';

import { localStorageGetItem } from 'src/utils/storage-available';

import { textGradient } from 'src/theme/styles';

import COLORS from '../theme/core/colors.json';

export const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

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
    const textGradientAnimation = {
      ...textGradient(
        `45deg, ${COLORS[storedColor]?.dark} 25%, ${COLORS[storedColor]?.main} 40%, ${COLORS[storedColor]?.main} 50%,${COLORS[storedColor]?.light} 80%, ${COLORS[storedColor]?.main} 95%`
      ),
      backgroundSize: '200% 200%',
      animation: `${gradientAnimation} 5s ease-in-out infinite`,
    };
    setMainColor(storedColor);
    setThemeColor({
      mode,
      gradMode,
      themeColor,
      accentColor,
      textGradient: textGradients,
      textGradientAnimation,
    });
  };

  useEffect(() => {
    try {
      let storedColor =
        localStorageGetItem('mainColor') &&
        JSON.parse(localStorageGetItem('mainColor', JSON.stringify('error')));

      storedColor =
        storedColor && Object.keys(COLORS).includes(storedColor) ? storedColor : 'error';
      const mode = theme.palette?.mode || 'dark';
      const gradMode = theme.palette.mode === 'light' ? 'dark' : 'light';
      const themeColors = COLORS[storedColor]?.main;
      const accentColor = COLORS[storedColor][gradMode];
      const textGradientName = `to right, ${accentColor}, ${themeColors}`;
      const textGradients = textGradient(textGradientName);
      const textGradientAnimation = {
        ...textGradient(
          `45deg, ${COLORS[storedColor]?.dark} 25%, ${COLORS[storedColor]?.main} 40%, ${COLORS[storedColor]?.main} 50%,${COLORS[storedColor]?.light} 80%, ${COLORS[storedColor]?.main} 95%`
        ),
        backgroundSize: '200% 200%',
        animation: `${gradientAnimation} 5s ease-in-out infinite`,
      };
      setMainColor(storedColor);
      setThemeColor((p) => ({
        mode,
        gradMode,
        themeColor: themeColors,
        accentColor,
        textGradient: textGradients,
        textGradientAnimation,
      }));
    } catch {
      const storedColor = 'primary';
      const mode = theme.palette?.mode || 'dark';
      const gradMode = theme.palette.mode === 'light' ? 'dark' : 'light';
      const themeColors = COLORS[storedColor]?.main;
      const accentColor = COLORS[storedColor][gradMode];
      const textGradientName = `to right, ${accentColor}, ${themeColors}`;
      const textGradients = textGradient(textGradientName);
      const textGradientAnimation = {
        ...textGradient(
          `45deg, ${COLORS[storedColor]?.dark} 25%, ${COLORS[storedColor]?.main} 40%, ${COLORS[storedColor]?.main} 50%,${COLORS[storedColor]?.light} 80%, ${COLORS[storedColor]?.main} 95%`
        ),
        backgroundSize: '200% 200%',
        animation: `${gradientAnimation} 5s ease-in-out infinite`,
      };
      setMainColor(storedColor);
      setThemeColor((p) => ({
        mode,
        gradMode,
        themeColor: themeColors,
        accentColor,
        textGradient: textGradients,
        textGradientAnimation,
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
