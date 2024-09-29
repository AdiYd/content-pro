'use client';

import { m } from 'framer-motion';
import { useContext } from 'react';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Box, Stack, Divider, useTheme, useColorScheme } from '@mui/material';

import { ColorContext } from 'src/context/colorMain';

import { varSlide, varBounce, MotionContainer } from 'src/components/animate';

import { Iconify } from '../iconify';
import Confettis from '../considering/Confettis';

// ----------------------------------------------------------------------

export function NewUser({ ...props }) {
  const theme = useTheme();
  const { setMode } = useColorScheme();
  const { mainColor, mode, textGradientAnimation } = useContext(ColorContext);

  const changeMode = () => {
    setMode(mode === 'dark' ? 'light' : 'dark');
  };

  return (
    <Box my={8} textAlign="center" mx="auto">
      <Confettis />
      <div className="top-0">
        {/* <Stack direction="row" justifyContent="center" mb={2} spacing={8}>
          <div className={`p-2 rounded-full ${mode === 'light' && ' bg-slate-400/30'}`}>
            <LightModeTwoTone
              onClick={changeMode}
              className="cursor-pointer hover:opacity-50"
              titleAccess="Light mode"
            />
          </div>
          <div className={`p-2 rounded-full ${mode === 'dark' && ' bg-slate-400/30'}`}>
            <DarkModeTwoTone
              onClick={changeMode}
              className="cursor-pointer hover:opacity-50"
              titleAccess="DarkModeTwoTone"
            />
          </div>
        </Stack> */}
        <Container component={MotionContainer}>
          <m.div variants={varBounce({ durationIn: 1 }).in}>
            <Typography
              variant="h1"
              sx={{
                ...textGradientAnimation,
              }}
            >
              Video-Pro
            </Typography>

            <Typography variant="h3">הבית של יוצרי התוכן הטובים בישראל</Typography>

            <Divider sx={{ width: 1, mb: 4 }} />
          </m.div>
        </Container>
      </div>

      <Container component={MotionContainer}>
        <m.div variants={varBounce({ durationIn: 0.8 }).in}>
          {/* <Typography
            variant="h1"
            sx={{
              mb: 2,
              ...textGradientAnimation,
            }}
          >
            Video-Pro
          </Typography> */}
          <Typography variant="h3">!איזה כיף שהצטרפת אלינו</Typography>
        </m.div>

        <m.div variants={varSlide().in}>
          <Typography variant="h4">זה הזמן לצפות בסרטוני הקורס וללמוד איך ליצור תוכן</Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            שלחנו לכם את כל הקישורים גם למייל, תוכלו להתחיל בלחיצה למטה
          </Typography>
          <Stack mx={4} direction="column" justifyContent="center" my={8} spacing={2}>
            <Button
              variant="contained"
              fullWidth
              href="https://eranfarkash.thinkific.com/courses/social-platforms"
              sx={{
                ...textGradientAnimation,
                animationDuration: '10s',
                WebkitBackgroundClip: 'inherit',
                WebkitTextFillColor: 'inherit',
                backgroundClip: 'inherit',
                textFillColor: 'inherit',
                color: 'inherit',
                // maxWidth: 100,
                mx: 'auto',
              }}
            >
              מעבר לקורס
            </Button>

            <Button fullWidth href="/login" color={mainColor} variant="outlined">
              לאיזור האישי
            </Button>

            <Button
              href="https://chat.whatsapp.com/DE2HSwpg9ABJpaEYj4ZAfv"
              variant="text"
              // size="small"
            >
              <Iconify icon="logos:whatsapp-icon" />
              &nbsp; &nbsp; הצטרפות לקהילה
            </Button>
          </Stack>

          {/* <EmailVerificationForm noAdmin callback={(data) => console.log('This is data: ', data)} /> */}
        </m.div>
      </Container>

      <Box my={4} display="flex" justifyContent="center" width={1}>
        <Button
          size="small"
          startIcon={<Iconify icon="lucide-lab:home" />}
          sx={{
            alignSelf: 'center',
            // textDecoration: 'underline',
            opacity: 0.8,
          }}
          // color="text.secondary"
          href="/"
          px={1}
        >
          &nbsp; לדף הבית
        </Button>
      </Box>
    </Box>
  );
}
