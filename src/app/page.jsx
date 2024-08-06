'use client';

import { Box } from '@mui/material';

import ColorPicker from './colorPalette';
import ImageDiv from './about/view/ImageDiv';
import { AboutHero } from './about/about-hero';
import { AboutWhat } from './about/about-what';
import { AboutVision } from './about/about-vision';
// ----------------------------------------------------------------------

export default function Page() {
  return (
    <Box>
      <ColorPicker />
      <AboutHero />
      <AboutWhat contentType="aboutCourse" />
      <AboutVision />
      <AboutWhat contentType="aboutMe" />
      <ImageDiv />
      <AboutWhat />
      <AboutWhat />
      <AboutWhat />
    </Box>
  );
}
