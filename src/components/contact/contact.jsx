'use client';

import { m } from 'framer-motion';
import { useContext } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies

import { DarkModeTwoTone, LightModeTwoTone } from '@mui/icons-material';
import { Box, Stack, Button, Divider, Container, Typography, useColorScheme } from '@mui/material';

import { ColorContext } from 'src/context/colorMain';
import { AboutLead } from 'src/app/about/about-lead';
import { TwoImageDiv } from 'src/app/about/about-what';

import { varFade, varScale, varBounce, MotionViewport } from 'src/components/animate';

import { Iconify } from '../iconify';

function Contact({ id }) {
  const { setMode } = useColorScheme();
  const { mainColor, mode, textGradientAnimation, textGradient } = useContext(ColorContext);

  const changeMode = () => {
    setMode(mode === 'dark' ? 'light' : 'dark');
  };

  const title = (
    <div className="mb-4">
      <Typography variant="h3" sx={{ mb: 0 }}>
        הצטרפו עכשיו להכשרה ולקהילה שלנו
      </Typography>
      <Typography color="text.secondary" variant="p">
        תלמדו מקצוע מבוקש ותקבלו הזדמנויות עבודה בתור יוצרי תוכן
      </Typography>
    </div>
  );

  const formTitle = (
    <>
      <Typography variant="h4" mx={1} sx={textGradient} color={`${mainColor}.main`}>
        השאירו פרטים ונחזור אליכם
      </Typography>
      <Iconify className="animate-bounce mb-4 top-4 relative" icon="fa6-solid:hand-point-down" />
    </>
  );

  const data = (
    <m.div variants={varFade().in}>
      <AboutLead
        formTitle={formTitle}
        titleDiv={title}
        showComments={false}
        showTerms={false}
        showPhone
      />
    </m.div>
  );

  return (
    <Box
      component="div"
      suppressHydrationWarning
      sx={{
        transform: 'all 0.4s eas-in-out',
        transition: 'ease-in',
        direction: 'rtl',
      }}
      my={4}
      textAlign="center"
    >
      <Container sx={{ position: 'relative' }} component={MotionViewport}>
        <m.div variants={varBounce({ durationIn: 0.8 }).in}>
          <Stack
            direction="row"
            justifyContent="center"
            // position="absolute"
            // bottom={0}
            spacing={4}
          >
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
          </Stack>
          <Typography
            variant="h1"
            sx={{
              ...textGradientAnimation,
            }}
          >
            Video-Pro
          </Typography>
          <Typography variant="h4">הבית של יוצרי התוכן הטובים בישראל</Typography>
          <Divider sx={{ width: 1, mb: 2 }} />
        </m.div>
      </Container>

      <TwoImageDiv url2="Eran2.jpeg" alt2="Eran Farkash" sx={{ width: 130 }} />
      {data}
      <m.div style={{ width: '100%' }} variants={varScale({ delay: 1, durationIn: 1 }).inX}>
        <Button
          size="small"
          variant="contained"
          startIcon={<Iconify icon="lucide-lab:home" />}
          sx={{
            alignSelf: 'center',
            // textDecoration: 'underline',
            // opacity: 0.8,
          }}
          // color="text.secondary"
          href="/home"
          px={1}
        >
          &nbsp; לדף הבית
        </Button>
      </m.div>
    </Box>
  );
}

export default Contact;
