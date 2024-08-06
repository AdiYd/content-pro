import { useState, useContext } from 'react';

import { Box, Switch, useTheme, useColorScheme } from '@mui/material';

import colors from 'src/theme/core/colors.json';
import { ColorContext } from 'src/context/colorMain';
import { varAlpha, hexToRgbChannel } from 'src/theme/styles';

import { Iconify } from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';

function ColorPicker({ ...props }) {
  const theme = useTheme();
  const { mainColor, setColor } = useContext(ColorContext);
  const { mode, setMode } = useColorScheme();
  const settings = useSettingsContext();
  const [checkMode, setCheckMode] = useState();

  useState(() => {
    setCheckMode(mode === 'dark');
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        position: 'fixed',
        width: 'fit-content',
        left: 2,
        bottom: 10,
        p: 1,
        borderRadius: 4,
        bgcolor: mainColor && `${varAlpha(hexToRgbChannel(theme.palette[mainColor]?.main), 0.1)}`,
        zIndex: 1000,
        flexDirection: 'column',
        direction: 'ltr',
        rowGap: 1,
        alignItems: 'center',
      }}
    >
      {Object.keys(colors).map(
        (item, index) =>
          colors[item]?.main && (
            <Iconify
              sx={{ cursor: 'pointer', '&:hover': { opacity: 0.8 } }}
              onClick={() => setColor(item)}
              key={index}
              width={mainColor === item ? 40 : 25}
              color={colors[item]?.main}
              icon="mdi:color"
            />
          )
      )}
      <Switch
        onChange={() => {
          settings.onUpdateField('colorScheme', mode === 'light' ? 'dark' : 'light');
          setMode(mode === 'dark' ? 'light' : 'dark');
          setCheckMode((p) => !p);
        }}
        color={mainColor}
        checked={checkMode}
      />
    </Box>
  );
}

export default ColorPicker;
