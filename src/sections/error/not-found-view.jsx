'use client';

import { m } from 'framer-motion';
import { useContext } from 'react';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Box, Stack, useTheme } from '@mui/material';

import { RouterLink } from 'src/routes/components';

import { ColorContext } from 'src/context/colorMain';
import { PageNotFoundIllustration } from 'src/assets/illustrations';

import { varSlide, varBounce, MotionContainer } from 'src/components/animate';

// ----------------------------------------------------------------------

export function NotFoundView() {
  const theme = useTheme();
  const { mainColor, mode, textGradientAnimation } = useContext(ColorContext);
  console.log(textGradientAnimation);
  return (
    <Box my={8} textAlign="center" mx="auto">
      <Container component={MotionContainer}>
        <m.div variants={varBounce().in}>
          <Typography
            variant="h1"
            sx={{
              mb: 2,
              ...textGradientAnimation,
            }}
          >
            Video-Pro
          </Typography>
          <Typography variant="h3" sx={{ mb: 2 }}>
            מצטערים, הדף שחיפשת לא נמצא
          </Typography>
        </m.div>

        <m.div variants={varSlide().in}>
          <Typography sx={{ color: 'text.secondary' }}>לא נורא, יש לנו דפים טובים יותר</Typography>

          <Stack my={4} mx="auto" spacing={8} direction="row-reverse" justifyContent="center">
            <Button
              color={mainColor}
              component={RouterLink}
              href="/"
              size="large"
              variant="contained"
            >
              חזרה לדף הבית
            </Button>
            <Button
              color={mainColor}
              component={RouterLink}
              href="/login"
              size="large"
              variant="outlined"
            >
              איזור אישי
            </Button>
          </Stack>
        </m.div>
        <m.div variants={varBounce().in}>
          <PageNotFoundIllustration sx={{ my: { xs: 5, sm: 10 }, mx: 'auto' }} />
        </m.div>
      </Container>
    </Box>
  );
}
