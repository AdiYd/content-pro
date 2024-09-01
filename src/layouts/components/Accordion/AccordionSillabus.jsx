import { m } from 'framer-motion';
import { useContext } from 'react';

import { useTheme, Container, Typography } from '@mui/material';

import { ColorContext } from 'src/context/colorMain';

import { varFade, MotionContainer } from 'src/components/animate';

import { AccordionView } from './view';

const defaultTitle = 'רק רגע, זה מתאים לי בכלל? למה דווקא Video-Pro?';

function AccordionSyllabus({ title = defaultTitle, accordions = [], ...props }) {
  const { textGradient } = useContext(ColorContext);
  const theme = useTheme();
  return (
    <section dir="rtl" className="px-2">
      <Container sx={{ py: 1 }} component={MotionContainer}>
        <m.div variants={varFade({ duration: 0.5 }).inRight}>
          <Typography
            sx={{
              mb: 2,
              textAlign: { md: 'justify', xs: 'center' },
              //   color: theme.palette[mainColor]?.main,
            }}
            variant="h3"
            component="div"
          >
            מה בדיוק לומדים בקורס?
            <Typography mx={1} component="a" variant="h3" sx={textGradient}>
              סילבוס
            </Typography>
          </Typography>
          <Typography color="text.secondary" variant="p">
            אנחנו כל כך גאים בתכנים שלנו שבחרנו להציג את הסילבוס של הקורס, ככה פשוט.
          </Typography>
          <br />
          <Typography color="text.secondary" variant="p">
            נזכיר לכם שבקהילה שלנו תמשיכו לקבל באופן שוטף עדכונים, מדריכים, וובינרים, טיפים ועוד 😎
          </Typography>
          <AccordionView mode={1} />
        </m.div>
      </Container>
    </section>
  );
}

export default AccordionSyllabus;
