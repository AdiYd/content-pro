import { useContext } from 'react';

import { Box, useTheme, Container } from '@mui/material';

import { ColorContext } from 'src/context/colorMain';
import Steppers from 'src/assets/components/Stepper/Steppers';

import { varFade, AnimateText } from 'src/components/animate';

function Steps({ ...props }) {
  const theme = useTheme();
  const { mainColor } = useContext(ColorContext);
  return (
    <Box my={8} mx={{ md: 8, xs: 4 }}>
      <Container maxWidth={500}>
        <AnimateText
          variant="h2"
          component="h2"
          color={mainColor}
          sx={{ textAlign: 'start' }}
          text="מ-0 ליוצר תוכן - הקורס שיעצב את הקריירה הדיגיטלית שלך"
          variants={varFade({}).inRight}
        />
      </Container>
      <Steppers />
    </Box>
  );
}

export default Steps;
