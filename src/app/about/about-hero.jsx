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
import { ColorContext } from 'src/context/colorMain';

import { Image } from 'src/components/image';
import { Iconify } from 'src/components/iconify';
import { ScrollComponent } from 'src/components/considering/Considering';
import {
  varFade,
  varBounce,
  AnimateText,
  AnimateAvatar,
  MotionContainer,
} from 'src/components/animate';

const emph = (colorPalette, gradient = false) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="200"
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

export function AboutHero({
  courseName = 'Video-Pro',
  subTitle = 'ההכשרה שעוזרת ליוצרי תוכן לייצר עבודה באופן שוטף',
  subTitle2 = 'כל הידע שעזר לי להשיג את העבודה הראשונה שלי בפחות מ-3 שעות',
  CTA = 'הצטרפו לקהילת יוצרי תוכן',
  CTA2 = 'איזור אישי',
  cta2Href = '/login',
}) {
  const theme = useTheme();
  const [update, setUpdate] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { mainColor, mode, textGradientAnimation } = useContext(ColorContext);
  const waveVector = useRef();
  // console.log('theme: ', theme);

  useEffect(() => {
    waveVector.current = `${CONFIG.site.basePath}/assets/background/waveVector_${mode}.svg`;
    console.log('Uploading wave: ', waveVector.current);
    setUpdate((p) => !p);
  }, [mode]);

  return (
    <Box
      sx={{
        height: { md: 680, xs: 635 },
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
            right: { md: 50 },
            // bottom: { md: 80 },
            position: { md: 'absolute' },
            textAlign: { xs: 'center', md: 'right' },
            alignItems: { xs: 'center', md: 'right' },
          }}
        >
          <AnimateText
            component="h1"
            variant="h1"
            text={courseName}
            // variants={varSlide().inDown}
            sx={{
              ...textGradientAnimation,
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
              <Typography maxWidth={500} color="common.white" variant="h3">
                {subTitle}
                {/* <br /> */}
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
              style={{ display: 'none' }}
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
          <div className="w-fit h-fit relative max-lg:mx-auto">
            <m.div variants={varFade({ distance: 240, duration: 0.5 }).inDown}>
              <Typography
                variant="p"
                component="div"
                maxWidth={500}
                sx={{
                  color: 'common.white',
                  mt: 4,
                  fontWeight: 'fontWeightSemiBold',
                  opacity: 0.8,
                }}
              >
                {subTitle2}
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
                  color: 'common.white',
                  // background: { xs: varAlpha('255 255 255', 0.2), md: 'transparent' },
                }}
                spacing={3}
              >
                <Link
                  className="hover:opacity-80 cursor-pointer"
                  passHref
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.tiktok.com/@eranfarkash1"
                >
                  <Iconify width={25} icon="bi:tiktok" />
                </Link>
                <Link
                  className="hover:opacity-80 cursor-pointer"
                  passHref
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.instagram.com/eranfarkash/"
                >
                  <Iconify width={25} icon="lucide:instagram" />
                </Link>
                <Link
                  className="hover:opacity-80 cursor-pointer"
                  passHref
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.linkedin.com/in/eran-farkash-543b42232/?originalSubdomain=il"
                >
                  <Iconify width={25} icon="bi:linkedin" />
                </Link>
                <Link
                  className="hover:opacity-80 cursor-pointer"
                  passHref
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.youtube.com/@eranfarkash"
                >
                  <Iconify width={25} icon="bi:youtube" />
                </Link>
                <Link
                  className="hover:opacity-80 cursor-pointer"
                  passHref
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.facebook.com/eran.farkash"
                >
                  <Iconify width={25} icon="ri:facebook-fill" />
                </Link>
              </Stack>
              {/* <Stack
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
                className="hover:opacity-80 cursor-pointer"
                passHref
                 target="_blank" 
                  rel="noopener noreferrer" 
                href="https://www.tiktok.com/@eranfarkash1"
              >
                <Iconify width={30} icon="logos:tiktok-icon" />
              </Link>
              <Link
                className="hover:opacity-80 cursor-pointer"
                passHref
                 target="_blank" 
                  rel="noopener noreferrer" 
                href="https://www.instagram.com/eranfarkash/"
              >
                <SocialIcon width={30} icon="instagram" />
              </Link>
              <Link
                className="hover:opacity-80 cursor-pointer"
                passHref
                 target="_blank" 
                  rel="noopener noreferrer" 
                href="https://www.linkedin.com/in/eran-farkash-543b42232/?originalSubdomain=il"
              >
                <SocialIcon width={30} icon="linkedin" />
              </Link>
              <Link
                className="hover:opacity-80 cursor-pointer"
                passHref
                 target="_blank" 
                  rel="noopener noreferrer" 
                href="https://www.youtube.com/@eranfarkash"
              >
                <Iconify width={30} icon="logos:youtube-icon" />
              </Link>
              <Link
                className="hover:opacity-80 cursor-pointer"
                passHref
                 target="_blank" 
                  rel="noopener noreferrer" 
                href="https://www.facebook.com/eran.farkash"
              >
                <SocialIcon width={30} icon="facebook" />
              </Link>
            </Stack> */}
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
                  flexDirection: { md: 'row', xs: 'column' },
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
                  {CTA}
                </Button>
                {CTA2 && (
                  <Button
                    sx={{
                      fontSize: { md: '1rem', xs: '1rem' },
                      borderRadius: 1,
                      // display: { md: 'inherit', xs: 'none' },
                    }}
                    variant="outlined"
                    color={mainColor}
                    href={cta2Href}
                    // onClick={() => ScrollComponent('contactUs')}
                  >
                    {CTA2}
                  </Button>
                )}
              </Container>
            </m.div>
          </div>
        </Box>
      </Container>
      {waveVector.current && (
        <img
          alt="wave-vector"
          style={{
            position: 'absolute',
            bottom: isMobile ? '-5px' : '-15px',
          }}
          src={waveVector.current}
          className="w-full absolute bottom-0"
        />
      )}
      <div className="absolute -bottom-6 right-10 rounded-full shadow-md shadow-zinc-300/20 hidden justify-center max-lg:flex">
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
