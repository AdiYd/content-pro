'use client';


import { Box } from '@mui/material';

import AccordionSection from 'src/layouts/components/Accordion/AccordionSection';

import SignUp from 'src/components/signUp/SignUp';
import Footer from 'src/components/footer/Footer';
import StepperSection from 'src/components/stepper/Stepper';
import Considering from 'src/components/considering/Considering';

import ColorPicker from './colorPalette';
import ImageDiv from './about/view/ImageDiv';
import { AboutWhat } from './about/about-what';
import { AboutHero } from './about/about-hero';
import { AboutLead } from './about/about-lead';
import { AboutOrder } from './about/about-order';
import { AboutYouTwo } from './about/about-youTwo';
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
      <AboutYouTwo />
      <StepperSection />
      <AboutOrder />

      <Considering buttonBefore="סקרנים?! לחצו כאן 😉" />
      <ImageDiv />
      <SignUp coursePrice={CoursePrice} />
      <AccordionSection />
      {/* <StepperSection /> */}
      <AboutTestimonials />
      <Considering confettiOnly />

      {/* <Promotion1 /> */}
      {/* <AboutVision /> */}
      <SocialProof />
      <Considering
        booklet
        buttonBefore="רוצים לקבל חוברת הדרכה עם טיפים והסברים? לחצו כאן "
        buttonAfter="🎉 עוד כמה צעדים ואתם מתחילים ליצור את הקהילה שתמיד חלמתם עליה  🎉"
      />
      <AboutLead />

      <Footer />

      {/* <CarouselView /> */}
    </Box>
  );
}
