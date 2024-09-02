import { m } from 'framer-motion';
import { useContext } from 'react';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material';
import Avatar from '@mui/material/Avatar';

import { ColorContext } from 'src/context/colorMain';

// ----------------------------------------------------------------------

export function AnimateAvatar({ sx, slotProps, children, width = 40, ...other }) {
  const theme = useTheme();
  const { themeColor, mainColor } = useContext(ColorContext);
  const borderWidth = slotProps?.overlay?.border ?? 2;

  const spacing = slotProps?.overlay?.spacing ?? 2;

  return (
    <Box
      sx={{
        width,
        height: width,
        flexShrink: 0,
        borderRadius: '50%',
        position: 'relative',
        alignItems: 'center',
        display: 'inline-flex',
        justifyContent: 'center',
        ...sx,
      }}
      {...other}
    >
      <Avatar
        alt={slotProps?.avatar?.alt ?? 'My avtar'}
        src={slotProps?.avatar?.src}
        sx={{
          zIndex: 1,
          width: `calc(100% - ${borderWidth * 2 + spacing * 2}px)`,
          height: `calc(100% - ${borderWidth * 2 + spacing * 2}px)`,
          ...slotProps?.avatar?.sx,
        }}
        {...slotProps?.avatar}
      >
        {children}
      </Avatar>

      <Box
        component={m.span}
        animate={{ rotate: 360 }}
        transition={{
          duration: 8,
          ease: 'linear',
          repeat: Infinity,
          ...slotProps?.animate?.transition,
        }}
        sx={{
          top: 0,
          left: 0,
          width: 1,
          height: 1,
          position: 'absolute',
          borderRadius: 'inherit',
          background:
            slotProps?.overlay?.color ??
            `conic-gradient(${theme.palette.info.main || theme.palette.info.main}, transparent, ${theme.palette.info.light || theme.palette.info.light},transparent)`,
          mask: 'linear-gradient(#FFF 0 0) content-box, linear-gradient(#FFF 0 0)',
          WebkitMask: 'linear-gradient(#FFF 0 0) content-box, linear-gradient(#FFF 0 0)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          p: `${borderWidth}px`,
        }}
      />
    </Box>
  );
}
