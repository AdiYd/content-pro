'use client';

import { Box, Divider } from '@mui/material';

import AccordionSection from 'src/layouts/components/Accordion/AccordionSection';
import AccordionSyllabus from 'src/layouts/components/Accordion/AccordionSillabus';

import SignUp from 'src/components/signUp/SignUp';
import Footer from 'src/components/footer/Footer';
import StepperSection from 'src/components/stepper/Stepper';
import Considering from 'src/components/considering/Considering';

import ImageDiv from '../about/view/ImageDiv';
import { AboutWhat } from '../about/about-what';
import { AboutHero } from '../about/about-hero';
import { AboutLead } from '../about/about-lead';
import { AboutOrder } from '../about/about-order';
import { AboutMoney } from '../about/about-money';
import { AboutYouTwo } from '../about/about-youTwo';
import SocialProof from '../about/view/social-proof';
import { AboutTestimonials } from '../about/about-testimonials';
// ----------------------------------------------------------------------

export const CoursePrice = 499;

export default function Page() {
  const divider = false;

  return (
    <Box
      sx={{
        transform: 'all 0.4s eas-in-out',
        transition: 'ease-in',
        direction: 'rtl',
      }}
    >
      {/* <ColorPicker /> */}
      <AboutHero
        influencer
        courseName="Influencers-Pro"
        subTitle="ההכשרה שתיקח אתכם מעבודות מזדמנות לשיתופי פעולה קבועים עם מותגים"
        subTitle2="כל הידע והכלים שאתם צריכים כדי להפוך להיות פרזנטורים מבוקשים, עם חוזים יציבים והכנסה קבועה מהתוכן שלכם"
        CTA="לחצו כאן להפוך לפרזנטורים למותגים"
        CTA2={false}
      />
      {/* {divider && <Divider my={0} sx={{ borderStyle: 'dashed' }} variant="middle" />} */}
      <AboutWhat influencer contentType="aboutCourse" />
      {divider && <Divider my={0} sx={{ borderStyle: 'dashed' }} variant="middle" />}

      <AboutYouTwo influencer />
      {divider && <Divider my={0} sx={{ borderStyle: 'dashed' }} variant="middle" />}

      <AboutWhat contentType="aboutMe" />
      {divider && <Divider my={0} sx={{ borderStyle: 'dashed' }} variant="middle" />}
      {/* <IconSection /> */}

      <StepperSection influencer />
      {divider && <Divider my={0} sx={{ borderStyle: 'dashed' }} variant="middle" />}

      <AboutOrder />
      {divider && <Divider my={0} sx={{ borderStyle: 'dashed' }} variant="middle" />}

      <AccordionSyllabus influencer />
      {divider && <Divider my={0} sx={{ borderStyle: 'dashed' }} variant="middle" />}

      <Considering color="mainColor" buttonBefore="סקרנים?! לחצו כאן 😉" />
      {divider && <Divider my={0} sx={{ borderStyle: 'dashed' }} variant="middle" />}

      <ImageDiv />
      {divider && <Divider my={0} sx={{ borderStyle: 'dashed' }} variant="middle" />}

      <SignUp influencer coursName="Influencers-Pro" coursePrice={CoursePrice} />
      {divider && <Divider my={0} sx={{ borderStyle: 'dashed' }} variant="middle" />}

      <AccordionSection
        influencer
        title="רק רגע, זה מתאים לי בכלל? למה דווקא Influencer-Pro"
        courseName="Influencers-Pro"
      />
      {/* <StepperSection /> */}
      {divider && <Divider my={0} sx={{ borderStyle: 'dashed' }} variant="middle" />}
      <AboutTestimonials />

      <AboutMoney />

      {divider && <Divider my={0} sx={{ borderStyle: 'dashed' }} variant="middle" />}
      <Considering confettiOnly />

      {/* <Promotion1 /> */}
      {/* <AboutVision /> */}

      {/* <Considering
        booklet
        buttonBefore="רוצים לקבל חוברת הדרכה עם טיפים והסברים? לחצו כאן "
        buttonAfter="🎉 עוד כמה צעדים ואתם מתחילים ליצור את הקהילה שתמיד חלמתם עליה  🎉"
      /> */}

      {divider && <Divider my={0} sx={{ borderStyle: 'dashed' }} variant="middle" />}
      <SignUp influencer coursName="Influencers-Pro" coursePrice={CoursePrice} />

      {divider && <Divider my={0} sx={{ borderStyle: 'dashed' }} variant="middle" />}
      <SocialProof />

      {divider && <Divider my={0} sx={{ borderStyle: 'dashed' }} variant="middle" />}
      <AboutLead />

      <Footer />

      {/* <CarouselView /> */}
    </Box>
  );
}
