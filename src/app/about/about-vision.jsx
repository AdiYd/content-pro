import { m } from 'framer-motion';
import { useContext } from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { ColorContext } from 'src/context/colorMain';

import { varFade, MotionViewport } from 'src/components/animate';

import CarouselView from './view/carouselView';

// ----------------------------------------------------------------------

export function AboutVision() {
  const { mainColor, textGradient } = useContext(ColorContext);
  const renderImg = <CarouselView />;

  return (
    <Box
      sx={{
        pb: 10,
        position: 'relative',
        bgcolor: 'background.neutral',
        '&::before': {
          top: 0,
          left: 0,
          width: 1,
          content: "''",
          position: 'absolute',
          height: { xs: 80, md: 120 },
          bgcolor: 'background.default',
        },
      }}
    >
      <Container component={MotionViewport}>
        <Box
          sx={{
            mb: 10,
            borderRadius: 2,
            display: 'flex',
            overflow: 'hidden',
            position: 'relative',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {renderImg}
        </Box>

        <m.div variants={varFade().inUp}>
          <Typography variant="h3" sx={{ textAlign: 'center', maxWidth: 1200, mx: 'auto' }}>
            לייצר תוכן איכותי, מעניין ומקורי מכל מקום ובמינימום מאמץ.
            <br />
            איך לנהל את התוכן ברשתות חברתיות ואיך{' '}
            <Box component="a" sx={textGradient} color={`${mainColor}.main`}>
              לייצר הכנסה שוטפת
            </Box>
          </Typography>
        </m.div>
      </Container>
    </Box>
  );
}
