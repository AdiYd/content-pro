'use client';

import { Box } from '@mui/material';

import StepperSection from 'src/components/stepper/Stepper';

import ColorPicker from './colorPalette';
import ImageDiv from './about/view/ImageDiv';
import { AboutWhat } from './about/about-what';
import { AboutHero } from './about/about-hero';
import Promotion1 from './about/about-promotion';
import { AboutVision } from './about/about-vision';
import SocialProof from './about/view/social-proof';
import { AboutTestimonials } from './about/about-testimonials';
// ----------------------------------------------------------------------

export default function Page() {
  return (
    <Box sx={{ transform: 'all 0.4s eas-in-out', transition: 'ease-in', direction: 'rtl' }}>
      <ColorPicker />
      <AboutHero />
      <AboutWhat contentType="aboutCourse" />
      <AboutWhat contentType="aboutMe" />
      <ImageDiv />
      <StepperSection />
      <Promotion1 />
      <SocialProof />
      <AboutVision />
      <AboutTestimonials />
      {/* <CarouselView /> */}
    </Box>
  );
}
