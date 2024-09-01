'use client';

import 'src/global.css';

import Link from 'next/link';
import { m } from 'framer-motion';
import { useRef, useState, useEffect, useContext } from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Stack, Button, useTheme, useMediaQuery } from '@mui/material';

import { CONFIG } from 'src/config-global';
import { textGradient } from 'src/theme/styles';
import { ColorContext } from 'src/context/colorMain';

import { Image } from 'src/components/image';
import { Iconify, SocialIcon } from 'src/components/iconify';
import { ScrollComponent } from 'src/components/considering/Considering';
import {
  varFade,
  varSlide,
  varBounce,
  AnimateText,
  AnimateAvatar,
  MotionContainer,
} from 'src/components/animate';

import COLORS from '../../theme/core/colors.json';

const emph = (colorPalette, gradient = false) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="160"
    // length="inherit"
    viewBox="0 0 507 98"
    fill="none"
  >
    <path
      d="M12 57.6013C33.1048 53.7342 53.856 49.6152 75.2573 45.995C135.912 35.7348 196.175 28.0455 260.642 22.62C307.691 18.6604 354.925 14.3217 402.971 12.7992C417.848 12.3278 433.689 12.9964 448.271 11.5818C462.601 10.1916 482.505 13.3363 495 10.8513"
      stroke="url(#paint0_linear_10_21)"
      strokeWidth="12"
      strokeLinecap="round"
    />
    <path
      d="M90 84.1352C183.036 69.927 274.401 53.7617 371.004 44.7233C385.381 43.3781 399.984 41.9993 414.661 41.4673C422.768 41.1734 431.556 41.7502 439.482 40.8355C444.72 40.2309 448.433 40.151 453 38.6487"
      stroke="url(#paint1_linear_10_21)"
      strokeWidth="10"
      strokeLinecap="round"
    />
    <defs>
      <linearGradient
        id="paint0_linear_10_21"
        x1="12"
        y1="34.2263"
        x2="495"
        y2="34.2263"
        gradientUnits="userSpaceOnUse"
      >
        {/* <stop stopColor="#020D20" /> */}
        {colorPalette && gradient ? (
          <>
            <stop offset="0" stopColor={colorPalette?.lighter} />
            <stop offset="0.3" stopColor={colorPalette?.light} />
            <stop offset="0.6" stopColor={colorPalette?.main} />
            <stop offset="0.9" stopColor={colorPalette?.dark} />
            <stop offset="1" stopColor={colorPalette?.darker} />
          </>
        ) : (
          <>
            <stop stopColor="#59677C" />
            <stop offset="0.44" stopColor="#EAF2FF" />
          </>
        )}
        {/* <stop offset="1" stopColor="#9BC1FF" /> */}
      </linearGradient>
      <linearGradient
        id="paint1_linear_10_21"
        x1="90"
        y1="61.3919"
        x2="453"
        y2="61.3919"
        gradientUnits="userSpaceOnUse"
      >
        {colorPalette && gradient ? (
          <>
            <stop offset="0" stopColor={colorPalette?.lighter} />
            <stop offset="0.3" stopColor={colorPalette?.light} />
            <stop offset="0.6" stopColor={colorPalette?.main} />
            <stop offset="0.9" stopColor={colorPalette?.dark} />
            <stop offset="1" stopColor={colorPalette?.darker} />
          </>
        ) : (
          <>
            <stop stopColor="#59677C" />
            <stop offset="1" stopColor="#E8EEF7" />
          </>
        )}
        {/* <stop stopColor="#414E64" />
        <stop offset="1" stopColor="#E8EEF7" /> */}
      </linearGradient>
    </defs>
  </svg>
);

// ----------------------------------------------------------------------

export function AboutHero() {
  const theme = useTheme();
  const [update, setUpdate] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { mainColor, mode } = useContext(ColorContext);
  const waveVector = useRef();
  // console.log('theme: ', theme);

  useEffect(() => {
    waveVector.current = `${CONFIG.site.basePath}/assets/background/waveVector_${mode}.svg`;
    setUpdate((p) => !p);
  }, [mode]);

  return (
    <Box
      sx={{
        height: { md: 680, xs: 650 },
        overflow: 'visible',
        pt: { xs: 8, md: 2 },
        pb: { xs: 10, md: 0 },
        mb: { xs: 8, md: 12 },
        position: 'relative',
        backgroundSize: { md: 'cover', xs: 'auto' },
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
              ...textGradient(
                `45deg, ${COLORS[mainColor]?.dark} 25%, ${COLORS[mainColor]?.main} 40%, ${COLORS[mainColor]?.main} 50%,${COLORS[mainColor]?.light} 80%, ${COLORS[mainColor]?.main} 95%`
              ),
              direction: 'ltr',
              textAlign: { md: 'end', xs: 'unset' },
              pb: 2,
            }}
          />
          {/* <AnimateText
            component="h2"
            variant="h2"
            text="ליצור תוכן מקורי ורלוונטי"
            variants={varFade().in}
            sx={{
              color: 'common.white',
              direction: 'rtl',
            }}
          /> */}
          <div className="w-fit h-fit relative max-lg:mx-auto">
            <m.div variants={varFade().in}>
              <Typography color="common.white" variant="h3">
                ההכשרה שעוזרת ליוצרי תוכן
                <br />
                לקבל עבודה באופן שוטף
              </Typography>
            </m.div>
            {/* <AnimateText
              component="h2"
              variant="h2"
              text={['ההכשרה שעוזרת ליוצרי תוכן ', 'לקבל עבודות באופן שוטף']}
              variants={varFade({ durationIn: 0.01 }).in}
              sx={{
                color: 'common.white',
                direction: 'rtl',
              }}
            /> */}
            <m.div
              // className="animate-bounce"
              variants={varBounce({ durationIn: 2, delay: 2 }).inLeft}
            >
              {/* <Box
                sx={{
                  display: 'flex',
                  justifyContent: { lg: 'inherit', md: 'center', xs: 'center' },
                }}
              >
                {emph(theme.palette[mainColor])}
              </Box> */}
            </m.div>
          </div>

          <m.div variants={varFade({ distance: 240, duration: 0.5 }).inDown}>
            <Typography
              variant="h5"
              sx={{ color: 'common.white', mt: 3, fontWeight: 'fontWeightSemiBold', opacity: 0.8 }}
            >
              כל הידע שעזר לי להשיג את העבודה הראשונה שלי בפחות מ-3 שעות
            </Typography>
            <Stack
              mt={4}
              mb={1}
              direction="row"
              sx={{
                justifyContent: { md: 'inherit', xs: 'center' },
                borderRadius: 4,
                p: 1,
                mx: { xs: 'auto', md: 'inherit' },
                width: 'fit-content',
                // background: { xs: varAlpha('255 255 255', 0.2), md: 'transparent' },
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
            {/* <Box
              sx={{
                display: 'flex',
                justifyContent: { lg: 'inherit', md: 'center', xs: 'center' },
              }}
            >
              {emph(theme.palette[mainColor])}
            </Box> */}
            <Container
              sx={{
                display: 'flex',
                gap: 4,
                mt: { md: 6, xs: 6 },
                pr: { md: 0, xs: 'auto' },
                justifyContent: { md: 'inherit', xs: 'center' },
              }}
            >
              <Button
                sx={{ fontSize: { md: '1rem', xs: '1rem' }, borderRadius: 1 }}
                variant={isMobile ? 'contained' : 'contained'}
                color={mainColor}
                onClick={() => ScrollComponent('signUp')}
              >
                הצטרפו לקהילת יוצרי תוכן
              </Button>
              <Button
                sx={{
                  fontSize: { md: '1rem', xs: '1rem' },
                  borderRadius: 1,
                  display: { md: 'inherit', xs: 'none' },
                }}
                variant="outlined"
                color={mainColor}
                onClick={() => ScrollComponent('contactUs')}
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
          style={{ position: 'absolute', bottom: isMobile ? '-5px' : '-20px' }}
          src={waveVector.current}
          className="w-full absolute bottom-0"
        />
      )}
      <div className="absolute -bottom-8 right-10 rounded-full shadow-md shadow-zinc-300/20 hidden justify-center max-lg:flex">
        <AnimateAvatar width={115}>
          <Image
            alt="קורס Video-pro של ערן פרקש"
            src={`${CONFIG.site.basePath}/assets/images/about/Eran2.png`}
            ratio="1/1"
            sx={{
              width: 1,
              objectPosition: 'top',
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
