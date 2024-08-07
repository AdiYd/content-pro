'use client';

import { Box } from '@mui/material';

import ColorPicker from './colorPalette';
import ImageDiv from './about/view/ImageDiv';
import { AboutHero } from './about/about-hero';
import { AboutWhat } from './about/about-what';
import { AboutVision } from './about/about-vision';
import SocialProof from './about/view/social-proof';
import { AboutTestimonials } from './about/about-testimonials';
// ----------------------------------------------------------------------

export default function Page() {
  return (
    <Box sx={{ direction: 'rtl' }}>
      <ColorPicker />
      <AboutHero />
      <AboutWhat contentType="aboutCourse" />
      <AboutWhat contentType="aboutMe" />
      <ImageDiv />
      <SocialProof />
      <AboutVision />
      <AboutTestimonials />
      {/* <CarouselView /> */}
    </Box>
  );
}
