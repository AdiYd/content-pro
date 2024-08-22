import { m } from 'framer-motion';
import { useContext } from 'react';

import { useTheme, Container, Typography } from '@mui/material';

import { ColorContext } from 'src/context/colorMain';

import { varFade, MotionContainer } from 'src/components/animate';

import { AccordionView } from './view';

const defaultTitle = 'רק רגע, זה מתאים לי? למה דווקא Video-Pro?';

function AccordionSection({ title = defaultTitle, accordions = [], ...props }) {
  const { mainColor } = useContext(ColorContext);
  const theme = useTheme();
  return (
    <section dir="rtl" className="px-2">
      <Container component={MotionContainer}>
        <m.div
          variants={varFade({ duration: 0.5 }).inRight}
          sx={{
            py: 1,
          }}
        >
          <Typography
            sx={{
              pb: 2,
              textAlign: { md: 'justify', xs: 'center' },
              color: theme.palette[mainColor]?.main,
            }}
            variant="h3"
            component="h3"
          >
            {title}
          </Typography>
          <AccordionView title={title} />
        </m.div>
      </Container>
    </section>
  );
}

export default AccordionSection;