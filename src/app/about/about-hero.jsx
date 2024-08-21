'use client';

import 'src/global.css';

import Link from 'next/link';
import { m } from 'framer-motion';
import { useRef, useState, useEffect, useContext } from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Stack, Button, useTheme } from '@mui/material';

import { CONFIG } from 'src/config-global';
import { varAlpha } from 'src/theme/styles';
import { ColorContext } from 'src/context/colorMain';

import { Image } from 'src/components/image';
import { Iconify, SocialIcon } from 'src/components/iconify';
import {
  varFade,
  varSlide,
  AnimateText,
  AnimateAvatar,
  MotionContainer,
} from 'src/components/animate';

// ----------------------------------------------------------------------

export function AboutHero() {
  const theme = useTheme();
  const [update, setUpdate] = useState(false);
  const { mainColor } = useContext(ColorContext);
  const colorName = `${mainColor}.main`;
  const waveVector = useRef();
  console.log('theme: ', theme);

  useEffect(() => {
    waveVector.current = `${CONFIG.site.basePath}/assets/background/waveVector_${theme.palette.mode}.svg`;
    setUpdate((p) => !p);
  }, [theme, mainColor]);

  return (
    <Box
      sx={{
        height: { md: 620 },
        overflow: 'visible',
        py: { xs: 10, md: 0 },
        mb: { xs: 8, md: 12 },
        position: 'relative',
        backgroundSize: 'cover',
        backgroundPosition: { md: 'center', xs: 'right' },
        textAlign: 'justify',
        direction: 'rtl',
        backgroundImage: {
          md: `url(${CONFIG.site.basePath}/assets/images/about/hero.webp)`,
          xs: `url(${CONFIG.site.basePath}/assets/background/overlay.svg), url(${CONFIG.site.basePath}/assets/images/about/hero.webp)`,
        },
      }}
    >
      <Container sx={{ py: 2 }} component={MotionContainer}>
        <Box
          sx={{
            top: { md: 100 },
            right: { md: 50, xs: 'unset' },
            // bottom: { md: 80 },
            position: { md: 'absolute' },
            textAlign: { xs: 'center', md: 'unset' },
            alignItems: { xs: 'center', md: 'unset' },
          }}
        >
          <AnimateText
            component="h1"
            variant="h1"
            text="Video-Pro"
            variants={varSlide({ distance: 500 }).inDown}
            sx={{
              color: colorName,
              direction: 'ltr',
              textAlign: { md: 'end', xs: 'unset' },
            }}
          />
          <AnimateText
            component="h2"
            variant="h2"
            text="ליצור תוכן מקורי ורלוונטי"
            variants={varFade().in}
            sx={{
              color: 'common.white',
              direction: 'rtl',
            }}
          />

          <m.div variants={varFade({ distance: 240, duration: 0.5 }).inDown}>
            <Typography
              variant="body1"
              sx={{ color: 'common.white', mt: 3, fontWeight: 'fontWeightSemiBold', opacity: 0.8 }}
            >
              קורס ליסודות יצירת סירטונים ותוכן מקצועי לעסקים ולרשתות החברתיות
            </Typography>
            <Stack
              my={4}
              direction="row"
              sx={{
                justifyContent: { md: 'inherit', xs: 'center' },
                borderRadius: 4,
                p: 1,
                mx: { xs: 'auto', md: 'inherit' },
                width: 'fit-content',
                background: { xs: varAlpha('255 255 255', 0.2), md: 'transparent' },
              }}
              spacing={2}
            >
              <Link
                className="hover:opacity-80"
                passHref
                style={{ cursor: 'pointer' }}
                href="https://www.tiktok.com/@eranfarkash1"
              >
                <Iconify width={30} icon="logos:tiktok-icon" />
              </Link>
              <Link
                className="hover:opacity-80"
                passHref
                style={{ cursor: 'pointer' }}
                href="https://www.instagram.com/eranfarkash/"
              >
                <SocialIcon width={30} icon="instagram" />
              </Link>
              <Link
                className="hover:opacity-80"
                passHref
                style={{ cursor: 'pointer' }}
                href="https://www.linkedin.com/in/eran-farkash-543b42232/?originalSubdomain=il"
              >
                <SocialIcon width={30} icon="linkedin" />
              </Link>
              <Link
                className="hover:opacity-80"
                passHref
                style={{ cursor: 'pointer' }}
                href="https://www.youtube.com/@eranfarkash"
              >
                <Iconify width={30} icon="logos:youtube-icon" />
              </Link>
              <Link
                className="hover:opacity-80"
                passHref
                style={{ cursor: 'pointer' }}
                href="https://www.facebook.com/eran.farkash"
              >
                <SocialIcon width={30} icon="facebook" />
              </Link>
            </Stack>
            <Container
              sx={{
                display: 'flex',
                gap: 4,
                mt: 10,
                pr: { md: 0, xs: 'auto' },
                justifyContent: { md: 'inherit', xs: 'center' },
              }}
            >
              <Button
                sx={{ fontSize: { md: '1rem', xs: '0.7rem' }, borderRadius: 1 }}
                variant="contained"
                color={mainColor}
              >
                הצטרפות לקהילת יוצרי תוכן
              </Button>
              <Button
                sx={{
                  fontSize: { md: '1rem', xs: '0.7rem' },
                  borderRadius: 1,
                  display: { md: 'inherit', xs: 'none' },
                }}
                variant="outlined"
                color={mainColor}
              >
                צרו קשר
              </Button>
            </Container>
          </m.div>
        </Box>
      </Container>
      {waveVector.current && (
        <img
          alt="wave-vector"
          style={{ position: 'absolute', bottom: '-5px' }}
          src={waveVector.current}
          className="w-full absolute bottom-0"
        />
      )}
      <div className="absolute -bottom-8 right-10 hidden justify-center max-sm:flex">
        <AnimateAvatar width={100}>
          <Image
            alt="Our office small"
            src={`${CONFIG.site.basePath}/assets/images/about/Eran.png`}
            ratio="1/1"
            sx={{
              width: 1,
              alignSelf: 'center',
              '&:hover': {
                transform: 'scale(1.4)',
                transition: 'transform 0.5s ease-out',
              },
              // width: 100,
              // borderRadius: 20,
            }}
          />
        </AnimateAvatar>
      </div>
    </Box>
  );
}
