import { useContext } from 'react';

import { Box, Container } from '@mui/material';

import { ColorContext } from 'src/context/colorMain';

import StepperSection from 'src/components/stepper/Stepper';
import { varFade, AnimateText } from 'src/components/animate';

function Steps({ ...props }) {
  const { mainColor, textGradient } = useContext(ColorContext);
  return (
    <Box my={8} mx={{ md: 8, xs: 4 }}>
      <Container maxWidth={500}>
        <AnimateText
          variant="h2"
          component="h2"
          color={mainColor}
          sx={{ textAlign: 'start', ...textGradient }}
          text="מ-0 ליוצר תוכן - הקורס שיעצב את הקריירה הדיגיטלית שלך"
          variants={varFade({}).inRight}
        />
      </Container>
      <StepperSection />
    </Box>
  );
}

export default Steps;
