'use client';

import { useState } from 'react';

import { Box, Alert, Button, Container, AlertTitle } from '@mui/material';

import { secondary, background, customShadows } from 'src/theme/core';

import ImageGallery from './carousel';
import { ComponentBlock } from './component-block';
import { varSlide, AnimateBorder } from '../animate';
import { MotionContainer } from '../animate/motion-container';
import { AnimateText, animateTextClasses } from '../animate/animate-text';

function Animates({ ...props }) {
  const [isAlert, setAlert] = useState(true);
  return (
    <Container>
      <Container
        sx={{
          borderRadius: 2,
          bgcolor: background.dark.paper,
          my: 2,
          boxShadow: customShadows().secondary,
        }}
        component={MotionContainer}
      >
        <AnimateText
          component="h1"
          variant="h1"
          text={['Where', 'to find us?']}
          variants={varSlide().inDown}
          sx={{
            color: 'common.white',
            [`& .${animateTextClasses.line}[data-index="1"]`]: {
              color: 'primary.main',
            },
          }}
        />
      </Container>
      <Button variant="contained" color="secondary">
        הכפתור של אלירן
      </Button>
      {isAlert && (
        <Box p={2} m={2}>
          <Alert
            onClose={() => {
              setAlert((p) => !p);
            }}
            severity="error"
            color="error"
            variant="outlined"
          >
            <AlertTitle>This is the title</AlertTitle>
            This is the alert message
          </Alert>
        </Box>
      )}
      <ImageGallery />
      <ComponentBlock sx={{ bgcolor: background.dark.paper }} title="border animation">
        <AnimateBorder
          animate={{ disableDoubleline: true, color: secondary.light }}
          sx={{ width: 160, height: 160 }}
        >
          <Container bgcolor={background.light.paper}>whats here?</Container>
        </AnimateBorder>
      </ComponentBlock>
    </Container>
  );
}

export default Animates;
