'use client';


import { Box } from '@mui/material';

import AccordionSection from 'src/layouts/components/Accordion/AccordionSection';

import SignUp from 'src/components/signUp/SignUp';
import Footer from 'src/components/footer/Footer';
import StepperSection from 'src/components/stepper/Stepper';
import Considering from 'src/components/considering/Considering';

import ColorPicker from './colorPalette';
import { AboutYou } from './about/about-you';
import ImageDiv from './about/view/ImageDiv';
import { AboutWhat } from './about/about-what';
import { AboutHero } from './about/about-hero';
import { AboutLead } from './about/about-lead';
import { AboutOrder } from './about/about-order';
import SocialProof from './about/view/social-proof';
import { AboutTestimonials } from './about/about-testimonials';
// ----------------------------------------------------------------------

export const CoursePrice = 499;

export default function Page() {
  return (
    <Box sx={{ transform: 'all 0.4s eas-in-out', transition: 'ease-in', direction: 'rtl' }}>
      <ColorPicker />
      <AboutHero />
      <AboutWhat contentType="aboutCourse" />
      <AboutWhat contentType="aboutMe" />
      {/* <IconSection /> */}
      <AboutYou />
      <AboutOrder />
      <Considering buttonBefore="סקרנים?! לחצו כאן 😉" />
      <ImageDiv />
      <SignUp coursePrice={CoursePrice} />
      <AccordionSection />
      <Considering confettiOnly />
      <StepperSection />
      <SocialProof />
      <Considering
        booklet
        buttonBefore="רוצים לקבל חוברת הדרכה? לחצו כאן"
        color="primary"
        buttonAfter="🎉 עוד כמה צעדים ואתם מתחילים ליצור את הקהילה שתמיד חלמתם עליה  🎉"
      />
      {/* <Promotion1 /> */}
      {/* <AboutVision /> */}
      <AboutTestimonials />
      <AboutLead />

      <Footer />

      {/* <CarouselView /> */}
    </Box>
  );
}
