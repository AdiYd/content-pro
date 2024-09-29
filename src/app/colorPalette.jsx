import { useState, useEffect, useContext } from 'react';

import { Box, Switch, useTheme, useColorScheme } from '@mui/material';

import colors from 'src/theme/core/colors.json';
import { ColorContext } from 'src/context/colorMain';
import { varAlpha, hexToRgbChannel } from 'src/theme/styles';

import { Iconify } from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';

function ColorPicker({
  showSwitch = true,
  width = 25,
  inlineChange = true,
  callBack = () => {},
  ...props
}) {
  const theme = useTheme();
  const { mainColor, setColor } = useContext(ColorContext);
  const { mode, setMode } = useColorScheme();
  const settings = useSettingsContext();
  const [checkMode, setCheckMode] = useState();

  useEffect(() => {
    setCheckMode(mode === 'dark');
    // if (mode === 'dark') {
    //   const body = document.querySelector('body');
    //   body.style.backgroundImage =
    //     'linear-gradient(66.06deg, rgb(56, 97, 129) -63.32%, rgb(3 4 25) 62.13%)';
    // } else {
    //   const body = document.querySelector('body');
    //   body.style.backgroundImage = 'none';
    // }
  }, [mode]);

  return (
    <Box
      sx={{
        display: 'flex',
        position: { xs: 'absolute', md: 'fixed' },
        width: 'fit-content',
        left: 2,
        bottom: { xs: 'unset', md: 10 },
        top: { xs: 5, md: 'unset' },
        p: 1,
        borderRadius: 4,
        bgcolor: {
          md: mainColor && `${varAlpha(hexToRgbChannel(theme.palette[mainColor]?.main), 0.1)}`,
          xs: '',
        },
        zIndex: 1000,
        flexDirection: { md: 'column', xs: 'inherit' },
        direction: 'ltr',
        rowGap: 1,
        alignItems: 'center',
        ...props.sx,
      }}
    >
      {Object.keys(colors).map(
        (item, index) =>
          colors[item]?.main && (
            <Iconify
              sx={{ cursor: 'pointer', '&:hover': { opacity: 0.8 } }}
              onClick={() => {
                if (inlineChange) {
                  setColor(item);
                }
                callBack(item);
              }}
              key={index}
              width={mainColor === item ? width + 10 : width}
              color={colors[item]?.main}
              icon="mdi:color"
            />
          )
      )}
      {showSwitch && (
        <Switch
          sx={{ ml: { md: 0, xs: 8 }, mt: { md: 4, xs: 0 } }}
          onChange={() => {
            settings.onUpdateField('colorScheme', mode === 'light' ? 'dark' : 'light');
            setMode(mode === 'dark' ? 'light' : 'dark');
            setCheckMode((p) => !p);
          }}
          color={mainColor}
          checked={checkMode}
        />
      )}
    </Box>
  );
}

export default ColorPicker;
