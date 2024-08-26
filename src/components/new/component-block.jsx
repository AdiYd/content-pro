import { useContext } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material';
import Container from '@mui/material/Container';

import { ColorContext } from 'src/context/colorMain';
import { varAlpha, stylesMode } from 'src/theme/styles';

import { AnimateBorder } from '../animate';

// ----------------------------------------------------------------------

export function ComponentBlock({ title, sx, children, ...other }) {
  const theme = useTheme();
  const { mainColor } = useContext(ColorContext);
  return (
    <AnimateBorder animate={{ color: theme.palette.success?.main }} sx={{ borderRadius: 1.5 }}>
      <Stack
        sx={{
          px: 3,
          py: 6,
          gap: 2,
          width: 1,
          flexWrap: 'wrap',
          borderRadius: 1.5,
          position: 'relative',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: varAlpha(theme.vars.palette.grey['500Channel'], 0.04),
          boxShadow: `0 0 0 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.16)}`,
          ...sx,
        }}
        {...other}
      >
        {title && (
          <Box
            component="span"
            sx={{
              px: 1,
              top: 0,
              ml: 2.5,
              right: 20,
              py: 0.25,
              zIndex: 10,
              borderRadius: 2,
              position: 'absolute',
              color: 'text.primary',
              bgcolor: 'common.white',
              transform: 'translateY(-50%)',
              fontSize: theme.typography.caption.fontSize,
              fontWeight: theme.typography.fontWeightSemiBold,
              border: `solid 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.24)}`,
              [stylesMode.dark]: { bgcolor: 'background.neutral' },
            }}
          >
            {title}
          </Box>
        )}

        {children}
      </Stack>
    </AnimateBorder>
  );
}

// ----------------------------------------------------------------------

export function ComponentContainer({ children, sx, ...other }) {
  return (
    <Container
      sx={{
        mt: 10,
        mb: 15,
        gap: 5,
        display: 'flex',
        flexDirection: 'column',
        ...sx,
      }}
      {...other}
    >
      {children}
    </Container>
  );
}
